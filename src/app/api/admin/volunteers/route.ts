import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Volunteer from "@/models/Volunteer";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();
    const volunteers = await Volunteer.find().sort({ createdAt: -1 }).lean();
    return ApiResponse.success({ volunteers });
  } catch (err: any) {
    if (err.message === "Unauthorized")
      return ApiResponse.error("Unauthorized", 401);
    return ApiResponse.error("Failed to fetch volunteers", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();
    const { id, status } = await req.json();
    const volunteer = await Volunteer.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!volunteer) return ApiResponse.error("Volunteer not found", 404);
    return ApiResponse.success({ volunteer }, "Status updated");
  } catch (err: any) {
    if (err.message === "Unauthorized")
      return ApiResponse.error("Unauthorized", 401);
    return ApiResponse.error("Failed to update volunteer", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const volunteer = await Volunteer.findByIdAndDelete(id);
    if (!volunteer) return ApiResponse.error("Volunteer not found", 404);
    return ApiResponse.success(null, "Volunteer deleted");
  } catch (err: any) {
    if (err.message === "Unauthorized")
      return ApiResponse.error("Unauthorized", 401);
    return ApiResponse.error("Failed to delete volunteer", 500);
  }
}
