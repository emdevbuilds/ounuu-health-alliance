import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Volunteer from "@/models/Volunteer";
import { ApiResponse } from "@/lib/api-response";
import { volunteerSchema } from "@/app/(website)/volunteer/schema";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = volunteerSchema.parse(body);

    await connectDB();

    const volunteer = await Volunteer.create(validatedData);

    return ApiResponse.success(
      { id: volunteer._id },
      "Thank you for offering your time and skills! Together, we can make a lasting impact. Our team will connect with you soon.",
      201
    );
  } catch (err: any) {
    console.error("Volunteer form error:", err);

    if (err.name === "ZodError") {
      return ApiResponse.error(
        "Validation failed",
        400,
        err.errors.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
        }))
      );
    }

    if (err.name === "ValidationError") {
      return ApiResponse.error(
        "Validation failed",
        400,
        Object.values(err.errors).map((e: any) => ({
          field: e.path,
          message: e.message,
        }))
      );
    }

    if (err.code === 11000) {
      return ApiResponse.error("Duplicate entry detected", 409);
    }

    return ApiResponse.error(
      "Failed to submit form. Please try again later.",
      500
    );
  }
}
