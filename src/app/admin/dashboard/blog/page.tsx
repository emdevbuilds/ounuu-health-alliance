"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  FileText,
  CheckCircle,
  Clock,
  Archive,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: "draft" | "published" | "archived";
  views: number;
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const status = statusFilter === "all" ? "" : `?status=${statusFilter}`;
      const res = await fetch(`/api/admin/blog${status}`);
      const data = await res.json();

      if (data.success) {
        setBlogs(data.data.blogs);
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/blog`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Blog ${newStatus} successfully`);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update blog status");
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: "bg-gray-100 text-gray-700",
      published: "bg-green-100 text-green-700",
      archived: "bg-orange-100 text-orange-700",
    };
    return badges[status as keyof typeof badges] || badges.draft;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      draft: <Clock className="w-4 h-4" />,
      published: <CheckCircle className="w-4 h-4" />,
      archived: <Archive className="w-4 h-4" />,
    };
    return icons[status as keyof typeof icons] || icons.draft;
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    draft: blogs.filter((b) => b.status === "draft").length,
    totalViews: blogs.reduce((sum, b) => sum + b.views, 0),
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Blog Management
          </h1>
          <p className="text-gray-600">
            Create, edit, and manage your blog posts
          </p>
        </div>
        <Link href="/admin/dashboard/blog/create">
          <Button className="bg-green-700 hover:bg-green-800 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Total Posts</span>
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-800">{stats.total}</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Published</span>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-800">{stats.published}</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Drafts</span>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-800">{stats.draft}</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Total Views</span>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-800">
            {stats.totalViews.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {["all", "published", "draft", "archived"].map((status) => (
              <Button
                key={status}
                onClick={() => setStatusFilter(status)}
                variant={statusFilter === status ? "default" : "outline"}
                className={
                  statusFilter === status
                    ? "bg-green-700 hover:bg-green-800"
                    : ""
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">No blog posts found</p>
            <p className="text-gray-500">
              Create your first blog post to get started
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-green-50">
                <TableHead className="font-bold text-green-800">
                  Title
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Category
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Status
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Views
                </TableHead>
                <TableHead className="font-bold text-green-800">Date</TableHead>
                <TableHead className="font-bold text-green-800 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.map((blog) => (
                <TableRow key={blog._id} className="hover:bg-green-50/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {blog.featured && (
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                      )}
                      <span className="line-clamp-1">{blog.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {blog.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${getStatusBadge(
                        blog.status
                      )}`}
                    >
                      {getStatusIcon(blog.status)}
                      {blog.status}
                    </div>
                  </TableCell>
                  <TableCell>{blog.views.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {blog.publishedAt
                      ? formatDate(blog.publishedAt)
                      : formatDate(blog.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/blog/${blog.slug}`} target="_blank">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/dashboard/blog/edit/${blog._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-green-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      {blog.status === "draft" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(blog._id, "published")
                          }
                          className="hover:bg-green-50"
                        >
                          Publish
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(blog._id)}
                        className="hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
