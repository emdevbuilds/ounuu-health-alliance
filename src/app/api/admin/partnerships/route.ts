import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Partnership from "@/models/Partnership";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();
    const partnerships = await Partnership.find()
      .sort({ createdAt: -1 })
      .lean();
    return ApiResponse.success({ partnerships });
  } catch (err: any) {
    if (err.message === "Unauthorized")
      return ApiResponse.error("Unauthorized", 401);
    return ApiResponse.error("Failed to fetch partnerships", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();
    const { id, status } = await req.json();
    const partnership = await Partnership.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!partnership) return ApiResponse.error("Partnership not found", 404);
    return ApiResponse.success({ partnership }, "Status updated");
  } catch (err: any) {
    if (err.message === "Unauthorized")
      return ApiResponse.error("Unauthorized", 401);
    return ApiResponse.error("Failed to update partnership", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const partnership = await Partnership.findByIdAndDelete(id);
    if (!partnership) return ApiResponse.error("Partnership not found", 404);
    return ApiResponse.success(null, "Partnership deleted");
  } catch (err: any) {
    if (err.message === "Unauthorized")
      return ApiResponse.error("Unauthorized", 401);
    return ApiResponse.error("Failed to delete partnership", 500);
  }
}
