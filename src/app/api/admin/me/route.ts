import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get authenticated session (throws error if not authenticated)
    const session = await requireAuth();

    // Connect to database
    await connectDB();

    // Find admin by email from session
    const admin = await Admin.findOne({ email: session.email })
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
    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }
    console.error("Admin /me error:", err);
    return ApiResponse.error("Failed to fetch admin details", 500);
  }
}
