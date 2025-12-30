import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Partnership from "@/models/Partnership";
import { ApiResponse } from "@/lib/api-response";
import { partnershipSchema } from "@/app/(website)/partnership/schema";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    // const ip =
    //   req.headers.get("x-forwarded-for") ||
    //   req.headers.get("x-real-ip") ||
    //   "unknown";

    // if (!checkRateLimit(ip, 5, 60000)) {
    //   return ApiResponse.error(
    //     "Too many requests. Please try again later.",
    //     429
    //   );
    // }

    const body = await req.json();
    const validatedData = partnershipSchema.parse(body);

    await connectDB();

    const partnership = await Partnership.create(validatedData);

    return ApiResponse.success(
      { id: partnership._id },
      "Thank you for your partnership inquiry! We'll be in touch shortly to discuss next steps.",
      201
    );
  } catch (err: any) {
    console.error("Partnership inquiry form error:", err);

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
