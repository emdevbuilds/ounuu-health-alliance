"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center z-50 overflow-hidden">
      <div className="relative">
        {/* Main Loader */}
        <div className="flex flex-col items-center space-y-8">
          {/* Animated Heart Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Pulsing background */}
              <motion.div
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 bg-green-500 rounded-full blur-xl"
              />

              {/* Heart icon */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/30">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">
              Loading...
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Preparing your content
            </p>
          </motion.div>

          {/* Animated Progress Dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-3 h-3 bg-green-600 rounded-full"
              />
            ))}
          </div>

          {/* Rotating Ring Loader */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-16 h-16 sm:w-20 sm:h-20"
          >
            <svg className="w-full h-full" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
              />
              <motion.circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#16a34a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="80 200"
                animate={{
                  strokeDashoffset: [0, -125],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Top Right Blob */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-green-400/20 rounded-full blur-3xl"
          />

          {/* Bottom Left Blob */}
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.25, 0.35, 0.25],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-green-500/20 rounded-full blur-3xl"
          />

          {/* Center Blob */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-green-300/10 rounded-full blur-3xl"
          />

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className="absolute w-2 h-2 bg-green-500 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                bottom: "10%",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
