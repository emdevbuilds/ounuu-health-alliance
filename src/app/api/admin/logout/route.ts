import { NextRequest } from "next/server";
import { deleteSession } from "@/lib/auth";
import { ApiResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await deleteSession();
    return ApiResponse.success(null, "Logged out successfully");
  } catch (err: any) {
    console.error("Logout error:", err);
    return ApiResponse.error("Logout failed", 500);
  }
}
