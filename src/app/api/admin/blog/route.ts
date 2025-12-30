import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog, { IBlog } from "@/models/Blog";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";
import { Document } from "mongoose";

// GET /api/admin/blog - Get all blogs (including drafts)
export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const total = await Blog.countDocuments(query);

    const blogs = await Blog.find(query)
      .select("-content")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return ApiResponse.success({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    console.error("Admin blog fetch error:", err);
    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }
    return ApiResponse.error("Failed to fetch blogs", 500);
  }
}

// POST /api/admin/blog - Create new blog
export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    await connectDB();

    const body = await req.json();

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // Add author info
    body.author = {
      id: session.userId,
      name: session.email.split("@")[0],
      email: session.email,
    };

    // Set publishedAt if publishing
    if (body.status === "published" && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const createdBlogs = await Blog.create(body);
    const blog = Array.isArray(createdBlogs) ? createdBlogs[0] : createdBlogs;

    return ApiResponse.success(
      {
        id: (blog as any)._id.toString(),
        slug: (blog as any).slug,
      },
      "Blog post created successfully",
      201
    );
  } catch (err: any) {
    console.error("Blog creation error:", err);

    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
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
      return ApiResponse.error("A blog with this slug already exists", 409);
    }

    return ApiResponse.error("Failed to create blog post", 500);
  }
}

// PATCH /api/admin/blog - Update blog
export async function PATCH(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return ApiResponse.error("Blog ID is required", 400);
    }

    // Set publishedAt if changing to published
    if (updates.status === "published") {
      const existingBlog = await Blog.findById(id);
      if (existingBlog && !existingBlog.publishedAt) {
        updates.publishedAt = new Date();
      }
    }

    const blog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return ApiResponse.error("Blog not found", 404);
    }

    return ApiResponse.success({ blog }, "Blog updated successfully");
  } catch (err: any) {
    console.error("Blog update error:", err);

    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
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

    return ApiResponse.error("Failed to update blog", 500);
  }
}

// DELETE /api/admin/blog - Delete blog
export async function DELETE(req: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ApiResponse.error("Blog ID is required", 400);
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return ApiResponse.error("Blog not found", 404);
    }

    return ApiResponse.success(null, "Blog deleted successfully");
  } catch (err: any) {
    console.error("Blog delete error:", err);

    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }

    return ApiResponse.error("Failed to delete blog", 500);
  }
}
