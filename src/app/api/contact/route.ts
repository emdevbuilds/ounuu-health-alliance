import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { ApiResponse } from "@/lib/api-response";
import { contactSchema } from "@/app/(website)/contact/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    await connectDB();

    const contact = await Contact.create(validatedData);

    return ApiResponse.success(
      { id: contact._id },
      "Thank you for contacting us! We'll get back to you soon.",
      201
    );
  } catch (err: any) {
    console.error("Contact form error:", err);

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

    // Handle Mongoose validation errors
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

    // Handle duplicate entries (if you add unique constraint)
    if (err.code === 11000) {
      return ApiResponse.error("Duplicate entry detected", 409);
    }

    return ApiResponse.error(
      "Failed to submit form. Please try again later.",
      500
    );
  }
}
