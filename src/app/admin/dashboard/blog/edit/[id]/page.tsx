"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "Other",
    tags: "",
    featured: false,
    status: "draft",
  });

  const categories = [
    "Health News",
    "Community Stories",
    "Medical Outreach",
    "Volunteer Highlights",
    "Emergency Relief",
    "Mental Health",
    "Success Stories",
    "Announcements",
    "Events",
    "Other",
  ];

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/admin/blog?id=${blogId}`);
      const data = await res.json();

      if (data.success && data.data.blogs && data.data.blogs.length > 0) {
        const blog = data.data.blogs[0];
        setFormData({
          title: blog.title || "",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          coverImage: blog.coverImage || "",
          category: blog.category || "Other",
          tags: blog.tags?.join(", ") || "",
          featured: blog.featured || false,
          status: blog.status || "draft",
        });
      } else {
        toast.error("Blog not found");
        router.push("/admin/dashboard/blog");
      }
    } catch (error) {
      toast.error("Failed to fetch blog");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/blog", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blogId,
          ...formData,
          tags: tagsArray,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Blog post updated successfully!");
        router.push("/admin/dashboard/blog");
      } else {
        toast.error(data.message || "Failed to update blog post");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Edit Blog Post
        </h1>
        <p className="text-gray-600">Update your blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="Enter blog title"
            className="text-lg border-2"
          />
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Excerpt *{" "}
            <span className="text-gray-400 font-normal">
              (50-300 characters)
            </span>
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            required
            rows={3}
            minLength={50}
            maxLength={300}
            className="w-full p-3 border-2 rounded-lg focus:border-green-600 focus:outline-none"
            placeholder="Write a brief summary of your post..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.excerpt.length}/300 characters
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Content *
          </label>
          <div className="mb-3 flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
            <button
              type="button"
              onClick={() => {
                const textarea = document.getElementById(
                  "content"
                ) as HTMLTextAreaElement;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = formData.content;
                const before = text.substring(0, start);
                const selected = text.substring(start, end);
                const after = text.substring(end);
                setFormData({
                  ...formData,
                  content: `${before}<strong>${
                    selected || "bold text"
                  }</strong>${after}`,
                });
              }}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-100 font-bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => {
                const textarea = document.getElementById(
                  "content"
                ) as HTMLTextAreaElement;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = formData.content;
                const before = text.substring(0, start);
                const selected = text.substring(start, end);
                const after = text.substring(end);
                setFormData({
                  ...formData,
                  content: `${before}<em>${
                    selected || "italic text"
                  }</em>${after}`,
                });
              }}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-100 italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => {
                const textarea = document.getElementById(
                  "content"
                ) as HTMLTextAreaElement;
                const start = textarea.selectionStart;
                const text = formData.content;
                const before = text.substring(0, start);
                const after = text.substring(start);
                setFormData({
                  ...formData,
                  content: `${before}<h2>Heading</h2>${after}`,
                });
              }}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter URL:");
                const linkText = prompt("Enter link text:") || "link";
                if (url) {
                  const textarea = document.getElementById(
                    "content"
                  ) as HTMLTextAreaElement;
                  const start = textarea.selectionStart;
                  const text = formData.content;
                  const before = text.substring(0, start);
                  const after = text.substring(start);
                  setFormData({
                    ...formData,
                    content: `${before}<a href="${url}">${linkText}</a>${after}`,
                  });
                }
              }}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
            >
              🔗 Link
            </button>
          </div>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            rows={15}
            className="w-full p-4 border-2 rounded-lg focus:border-green-600 focus:outline-none font-mono text-sm"
            placeholder="Write your content here..."
          />
        </div>

        {/* Cover Image */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image URL *
          </label>
          <Input
            value={formData.coverImage}
            onChange={(e) =>
              setFormData({ ...formData, coverImage: e.target.value })
            }
            required
            type="url"
            placeholder="https://example.com/image.jpg"
            className="border-2"
          />
          {formData.coverImage && (
            <div className="mt-3">
              <img
                src={formData.coverImage}
                alt="Cover preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-3 border-2 rounded-lg focus:border-green-600 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-3 border-2 rounded-lg focus:border-green-600 focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags{" "}
            <span className="text-gray-400 font-normal">(comma-separated)</span>
          </label>
          <Input
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="health, community, outreach"
            className="border-2"
          />
          {formData.tags && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tags
                .split(",")
                .filter(Boolean)
                .slice(0, 10)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* Featured */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-5 h-5 text-green-600 border-2 rounded"
            />
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Featured Post
              </span>
              <p className="text-xs text-gray-500">
                Featured posts appear on the homepage
              </p>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 sticky bottom-0 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-700 hover:bg-green-800"
          >
            {loading ? "Updating..." : "Update Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
