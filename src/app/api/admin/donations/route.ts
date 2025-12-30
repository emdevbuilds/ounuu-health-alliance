import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";

// GET all donations with stats
export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const donations = await Donation.find().sort({ createdAt: -1 }).lean();

    const stats = {
      total: donations.length,
      totalAmount: donations
        .filter((d) => d.paymentStatus === "success")
        .reduce((sum, d) => sum + d.amount, 0),
      successful: donations.filter((d) => d.paymentStatus === "success").length,
      pending: donations.filter((d) => d.paymentStatus === "pending").length,
      failed: donations.filter((d) => d.paymentStatus === "failed").length,
    };

    return ApiResponse.success({ donations, stats });
  } catch (err: any) {
    if (err.message === "Unauthorized")
      return ApiResponse.error("Unauthorized", 401);
    return ApiResponse.error("Failed to fetch donations", 500);
  }
}

// DELETE a donation (only for pending, failed, or abandoned)
export async function DELETE(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ApiResponse.error("Donation ID is required", 400);
    }

    const donation = await Donation.findById(id);

    if (!donation) {
      return ApiResponse.error("Donation not found", 404);
    }

    // Security: Only allow deletion of non-successful donations
    if (donation.paymentStatus === "success") {
      return ApiResponse.error(
        "Cannot delete successful donations. Contact support if you need to refund.",
        403
      );
    }

    await Donation.findByIdAndDelete(id);

    return ApiResponse.success(null, "Donation deleted successfully");
  } catch (err: any) {
    if (err.message === "Unauthorized")
      return ApiResponse.error("Unauthorized", 401);
    return ApiResponse.error("Failed to delete donation", 500);
  }
}
