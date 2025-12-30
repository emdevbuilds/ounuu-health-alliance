"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  RefreshCcw,
  AlertCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-4xl w-full">
        {/* Main Content Container */}
        <div className="text-center space-y-8">
          {/* Animated Error Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/30 rotate-12">
                <AlertCircle
                  className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                  strokeWidth={2.5}
                />
              </div>

              {/* Pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-orange-500 rounded-3xl rotate-12"
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Oops! Something Went Wrong
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We encountered an unexpected error. Don't worry, we're on it!
            </p>
          </motion.div>

          {/* Error Details - Development Only */}
          {process.env.NODE_ENV === "development" && error.message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mx-4 sm:mx-auto max-w-2xl"
            >
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-6 text-left">
                <p className="text-sm font-semibold text-red-800 mb-2">
                  Error Details (Development Mode):
                </p>
                <p className="text-xs sm:text-sm font-mono text-red-600 break-words">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <Button
              onClick={reset}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto group px-8 py-6 text-base sm:text-lg"
            >
              <RefreshCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-semibold">Try Again</span>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 w-full sm:w-auto px-8 py-6 text-base sm:text-lg"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </Link>
            </Button>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-8 px-4 space-y-6"
          >
            {/* Contact Support Card */}
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-gray-800">Need Help?</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Our team is here to assist you. Get in touch and we'll help
                resolve this issue.
              </p>
              <Button
                asChild
                className="w-full bg-green-700 hover:bg-green-800 text-white group"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2"
                >
                  <span className="font-semibold">Contact Support</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Or visit these pages:
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/blog", label: "Blog" },
                  { href: "/volunteer", label: "Volunteer" },
                  { href: "/donation", label: "Donate" },
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-green-600 hover:text-green-700 font-medium hover:underline underline-offset-4 transition-colors text-sm sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-orange-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-red-400/20 rounded-full blur-3xl"
          />
        </div>
      </div>
    </div>
  );
}
