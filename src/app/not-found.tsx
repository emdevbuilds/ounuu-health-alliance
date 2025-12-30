"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowRight, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-4xl w-full">
        {/* Main Content Container */}
        <div className="text-center space-y-8">
          {/* Animated 404 Number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <motion.h1
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl sm:text-9xl md:text-[180px] font-black"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-400">
                4
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-green-400">
                0
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">
                4
              </span>
            </motion.h1>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-24 sm:h-24 opacity-20"
            >
              <Heart className="w-full h-full text-green-500" />
            </motion.div>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/30 rotate-12"
            >
              <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We couldn't find the page you're looking for. But don't worry, our
              mission to serve communities continues.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto group px-8 py-6 text-base sm:text-lg"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 w-full sm:w-auto px-8 py-6 text-base sm:text-lg"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                <span className="font-semibold">Contact Us</span>
              </Link>
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="pt-8 px-4"
          >
            <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/team", label: "Our Team" },
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
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-green-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-green-300/10 rounded-full blur-3xl"
          />
        </div>
      </div>
    </div>
  );
}
