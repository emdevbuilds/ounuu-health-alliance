"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { members } from "@/lib/members";
import { MoveUpRight, Users, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const Page = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50/30 padding pt-24 pb-16">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-100 rounded-full"
          >
            <Users className="w-5 h-5 text-green-700" />
            <span className="text-sm font-semibold text-green-800">
              Our Leadership
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Team
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Dedicated professionals committed to transforming healthcare and
            empowering communities across Nigeria.
          </p>
        </motion.div>
      </section>

      {/* Team Grid Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {members.map((member) => (
              <motion.div key={member.slug} variants={scaleIn}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="flex flex-col bg-white border-2 border-green-100 w-full shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardContent className="pt-8 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex justify-center items-center"
                      >
                        <div className="relative">
                          <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                          <Image
                            alt={`${member.name}, ${member.role}`}
                            className="rounded-full border-4 border-white relative z-10 shadow-lg"
                            src={member.picture}
                            width={200}
                            height={200}
                          />
                        </div>
                      </motion.div>
                    </CardContent>

                    <CardHeader className="pb-6 relative z-10 text-center">
                      <CardTitle className="text-xl font-bold text-green-800 leading-tight py-2">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="font-semibold text-base text-green-600 py-2">
                        {member.role}
                      </CardDescription>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          asChild
                          className="bg-green-700 text-white hover:bg-green-800 mt-4 w-full group/btn shadow-lg"
                          size="lg"
                        >
                          <Link
                            href={`/team/${member.slug}`}
                            className="flex items-center justify-center gap-2"
                          >
                            <span>View Profile</span>
                            <MoveUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Link>
                        </Button>
                      </motion.div>
                    </CardHeader>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Our Team CTA Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div>
                  <div className="py-3 flex flex-row">
                    <Sparkles className="w-6 h-6 text-green-700" />
                    <h3 className="pl-2 text-2xl font-bold text-green-900 mb-2">
                      Join Our Team
                    </h3>
                  </div>

                  <p className="text-green-800 mb-4">
                    Are you passionate about making a difference in healthcare
                    and community development? We're always looking for
                    dedicated individuals to join our mission.
                  </p>
                  <Link
                    href="/volunteer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                  >
                    <Users className="w-5 h-5" />
                    Volunteer With Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Page;
