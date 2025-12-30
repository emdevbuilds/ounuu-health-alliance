import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { ApiResponse } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const blog = await Blog.findOne({ slug, status: "published" });

    if (!blog) {
      return ApiResponse.error("Blog post not found", 404);
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    // Get related posts (same category, exclude current)
    const relatedPosts = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
      status: "published",
    })
      .select("-content")
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean();

    return ApiResponse.success({
      blog: blog.toObject(),
      relatedPosts,
    });
  } catch (err: any) {
    console.error("Blog detail error:", err);
    return ApiResponse.error("Failed to fetch blog post", 500);
  }
}
