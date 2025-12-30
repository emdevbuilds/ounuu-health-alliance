import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth, hashPassword } from "@/lib/auth";

// GET all admins
export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();

    // Only super_admin can view all admins
    if (session.role !== "super_admin") {
      return ApiResponse.error(
        "Unauthorized. Super admin access required.",
        403
      );
    }

    await connectDB();

    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return ApiResponse.success({ admins });
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }
    return ApiResponse.error("Failed to fetch admins", 500);
  }
}

// POST - Create new admin
export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();

    // Only super_admin can create admins
    if (session.role !== "super_admin") {
      return ApiResponse.error(
        "Unauthorized. Super admin access required.",
        403
      );
    }

    await connectDB();

    const { email, password, name, role } = await req.json();

    // Validation
    if (!email || !password || !name) {
      return ApiResponse.error("Email, password, and name are required", 400);
    }

    if (password.length < 8) {
      return ApiResponse.error("Password must be at least 8 characters", 400);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return ApiResponse.error("Admin with this email already exists", 409);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin
    const admin = await Admin.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: role || "admin",
      isActive: true,
    });

    return ApiResponse.success(
      { id: admin._id },
      "Admin created successfully",
      201
    );
  } catch (err: any) {
    console.error("Create admin error:", err);

    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }

    if (err.code === 11000) {
      return ApiResponse.error("Admin with this email already exists", 409);
    }

    return ApiResponse.error("Failed to create admin", 500);
  }
}

// PATCH - Update admin (activate/deactivate)
export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAuth();

    // Only super_admin can update admins
    if (session.role !== "super_admin") {
      return ApiResponse.error(
        "Unauthorized. Super admin access required.",
        403
      );
    }

    await connectDB();

    const { id, isActive } = await req.json();

    if (!id) {
      return ApiResponse.error("Admin ID is required", 400);
    }

    const admin = await Admin.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    ).select("-password");

    if (!admin) {
      return ApiResponse.error("Admin not found", 404);
    }

    return ApiResponse.success({ admin }, "Admin updated successfully");
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }
    return ApiResponse.error("Failed to update admin", 500);
  }
}

// DELETE admin
export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAuth();

    // Only super_admin can delete admins
    if (session.role !== "super_admin") {
      return ApiResponse.error(
        "Unauthorized. Super admin access required.",
        403
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ApiResponse.error("Admin ID is required", 400);
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return ApiResponse.error("Admin not found", 404);
    }

    // Prevent deleting main admin
    if (admin.email === "admin@ounuu.org") {
      return ApiResponse.error("Cannot delete the main admin account", 403);
    }

    // Prevent self-deletion
    if (admin._id.toString() === session.userId) {
      return ApiResponse.error("Cannot delete your own account", 403);
    }

    await Admin.findByIdAndDelete(id);

    return ApiResponse.success(null, "Admin deleted successfully");
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }
    return ApiResponse.error("Failed to delete admin", 500);
  }
}
