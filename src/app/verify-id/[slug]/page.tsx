"use client";

import { useParams } from "next/navigation";
import { members } from "@/lib/members";
import Image from "next/image";
import {
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function VerifyIDPage() {
  const params = useParams();
  const slug = params.slug as string;

  const member = members.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4 overflow-hidden">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center">
            {/* Error Icon */}
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle
                  className="w-12 h-12 sm:w-14 sm:h-14 text-red-600"
                  strokeWidth={2.5}
                />
              </div>
            </motion.div>

            {/* Content */}
            <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-3">
              Invalid ID Card
            </h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              This ID card could not be verified in our system. It may be fake,
              expired, or tampered with.
            </p>

            {/* Warning Box */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-5 mb-6">
              <p className="text-sm sm:text-base text-red-800 font-medium">
                ⚠️ <strong>Security Alert:</strong> Only official OUNUU Health
                Alliance ID cards can be verified through this system.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-green-700 hover:bg-green-800"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <span className="font-semibold">Go to Homepage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/team">View Our Team</Link>
              </Button>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-24 -right-24 w-72 h-72 bg-red-400/20 rounded-full blur-3xl"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Success Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-4"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle
                className="w-12 h-12 sm:w-14 sm:h-14 text-green-600"
                strokeWidth={2.5}
              />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-2">
            ✅ Verified Team Member
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            This ID has been successfully verified
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="h-32 sm:h-40 relative bg-gradient-to-r from-green-600 via-green-500 to-green-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                  OUNUU HEALTH ALLIANCE
                </h2>
                <p className="text-white/90 text-xs sm:text-sm mt-1">
                  Official Team Member Verification
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Member Info */}
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
              {/* Photo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="flex-shrink-0 mx-auto md:mx-0"
              >
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-green-100 shadow-xl">
                  <Image
                    src={member.picture}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  {/* Verified badge */}
                  <div className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Details */}
              <div className="flex-1 text-center md:text-left">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-2">
                    {member.title} {member.name}
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-700 font-semibold mb-4">
                    {member.role}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <a
                        href={`mailto:${member.contact.email}`}
                        className="text-blue-600 hover:text-blue-700 hover:underline break-all text-sm sm:text-base"
                      >
                        {member.contact.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <a
                        href={`tel:${member.contact.phone}`}
                        className="text-green-600 hover:text-green-700 hover:underline text-sm sm:text-base"
                      >
                        {member.contact.phone}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* About Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-5 sm:p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-800 text-lg">About</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {member.intro}
              </p>
            </motion.div>

            {/* Verification Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 sm:p-6 mb-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-green-800 mb-1 text-base sm:text-lg">
                    Official Verification
                  </h4>
                  <p className="text-xs sm:text-sm text-green-700 leading-relaxed">
                    This ID card has been verified against our official
                    database. This person is a confirmed member of the OUNUU
                    Health Alliance team. This verification page cannot be faked
                    or replicated.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg group"
              >
                <Link
                  href={`/team/${member.slug}`}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="font-semibold">View Full Profile</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-300"
              >
                <Link href="/">Go to Homepage</Link>
              </Button>
            </motion.div>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                🔒 Verified on{" "}
                <strong suppressHydrationWarning>
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>{" "}
                • Powered by OUNUU Health Alliance Verification System
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-6 text-center"
        >
          <p className="text-xs sm:text-sm text-gray-600 px-4">
            If you suspect this ID is being misused, please contact us
            immediately at{" "}
            <a
              href="mailto:obiumunnanaumuadahealthallianc@gmail.com"
              className="text-green-600 hover:text-green-700 font-medium hover:underline"
            >
              obiumunnanaumuadahealthallianc@gmail.com
            </a>
          </p>
        </motion.div>

        {/* Background Decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-green-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.25, 0.35, 0.25] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
