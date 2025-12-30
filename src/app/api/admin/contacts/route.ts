import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";

// GET all contacts
export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const total = await Contact.countDocuments();
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return ApiResponse.success({
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }
    return ApiResponse.error("Failed to fetch contacts", 500);
  }
}

// PATCH - Update contact status
export async function PATCH(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return ApiResponse.error("ID and status are required", 400);
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return ApiResponse.error("Contact not found", 404);
    }

    return ApiResponse.success({ contact }, "Status updated successfully");
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }
    return ApiResponse.error("Failed to update contact", 500);
  }
}

// DELETE contact
export async function DELETE(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ApiResponse.error("Contact ID is required", 400);
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return ApiResponse.error("Contact not found", 404);
    }

    return ApiResponse.success(null, "Contact deleted successfully");
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }
    return ApiResponse.error("Failed to delete contact", 500);
  }
}
