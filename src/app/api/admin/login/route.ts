import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { ApiResponse } from "@/lib/api-response";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return ApiResponse.error("Email and password are required", 400);
    }

    await connectDB();

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return ApiResponse.error("Invalid email or password", 401);
    }

    // Check if admin is active
    if (!admin.isActive) {
      return ApiResponse.error("Account is deactivated", 403);
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.password);

    if (!isValid) {
      return ApiResponse.error("Invalid email or password", 401);
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Create session
    await createSession({
      userId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    return ApiResponse.success(
      {
        user: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
      "Login successful"
    );
  } catch (err: any) {
    console.error("Login error:", err);
    return ApiResponse.error("Login failed. Please try again.", 500);
  }
}
