import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get authenticated admin email
    const adminEmail = await requireAuth();

    // Connect to database
    await connectDB();

    // Find admin by email
    const admin = await Admin.findOne({ email: adminEmail })
      .select("name email role isActive")
      .lean();

    if (!admin) {
      return ApiResponse.error("Admin not found", 404);
    }

    // Return admin data
    return ApiResponse.success({
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (err: any) {
    console.error("Admin /me error:", err);

    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }

    return ApiResponse.error("Failed to fetch admin details", 500);
  }
}
