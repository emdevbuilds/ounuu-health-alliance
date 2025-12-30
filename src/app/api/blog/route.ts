import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "published";
    const limit = parseInt(searchParams.get("limit") || "10");
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");

    // Build query
    const query: any = { status };

    if (featured === "true") {
      query.featured = true;
    }

    if (category) {
      query.category = category;
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return ApiResponse.success({ blogs, count: blogs.length });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return ApiResponse.error("Failed to fetch blogs", 500);
  }
}
