"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Eye,
  Share2,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: { name: string; email: string };
  publishedAt: string;
  views: number;
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      const data = await res.json();

      if (data.success) {
        setBlog(data.data.blog);
        setRelatedPosts(data.data.relatedPosts || []);
      }
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const shareOnTwitter = () => {
    if (!blog) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog.title);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Blog Post Not Found
        </h1>
        <Link href="/blog">
          <Button className="bg-green-700 hover:bg-green-800">
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto padding pb-12 w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white hover:text-green-300 mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            <div className="inline-block px-4 py-2 ml-4 bg-green-600 text-white rounded-full text-sm font-semibold mb-4">
              {blog.category}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(blog.publishedAt)}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {blog.views.toLocaleString()} views
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">By {blog.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="padding py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Excerpt */}
          <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-green-50 rounded-2xl border-l-4 border-green-600">
            {blog.excerpt}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Blog Content */}
          <div
            className="prose prose-lg max-w-none 
            prose-headings:text-green-800 prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-green-800 prose-strong:font-bold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-gray-700 prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-green-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Share Section */}
          <div className="mt-16 pt-10 border-t-2 border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <Share2 className="w-6 h-6 text-green-700" />
              <h3 className="text-2xl font-bold text-green-800">
                Share this article
              </h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                  onClick={shareOnTwitter}
                >
                  <Twitter className="w-5 h-5" />
                  Share on Twitter
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  onClick={shareOnFacebook}
                >
                  <Facebook className="w-5 h-5" />
                  Share on Facebook
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mb-6"
              />
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                Related Articles
              </h2>
              <p className="text-xl text-gray-600">
                Continue exploring our stories and updates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-100 h-full"
                  >
                    <div className="relative h-56">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-green-800 mb-3 line-clamp-2 hover:text-green-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
