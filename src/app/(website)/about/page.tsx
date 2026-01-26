"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { members } from "@/lib/members";
import {
  HeartHandshake,
  MoveUpRight,
  Users,
  Target,
  Eye,
  Heart,
  ArrowRight,
  Sparkles,
  Award,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// Animation variants
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

const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Core values data with enhanced styling
const coreValues = [
  {
    title: "Empathy",
    description: "We listen with heart",
    icon: Heart,
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
  },
  {
    title: "Compassion",
    description: "We act with kindness",
    icon: HeartHandshake,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    title: "Equity",
    description: "We stand for fairness",
    icon: Shield,
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-50 to-indigo-50",
  },
  {
    title: "Excellence",
    description: "We strive for impact",
    icon: Award,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
  },
  {
    title: "Service",
    description: "We serve holistically",
    icon: Sparkles,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
];

const About = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Section with Gradient Background */}
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
          className="text-center relative z-10 mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-100 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-green-700" />
            <span className="text-sm font-semibold text-green-800">
              About Us
            </span>
          </motion.div>
          <h1 className="text-4xl leading-10 md:text-5xl lg:text-6xl font-bold text-green-800 mb-4">
            Making a Difference,{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              One Life at a Time
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated to transforming healthcare access and empowering
            underserved communities across Nigeria
          </p>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section className="bg-white padding py-20">
        <div className="flex flex-col gap-16 lg:flex-row items-center max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
            className="flex flex-col gap-y-8 lg:w-1/2"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full"
              />
              <h2 className="font-bold text-green-800 text-3xl md:text-4xl">
                Who We Are
              </h2>
            </div>
            <div className="space-y-6">
              <p className="leading-relaxed text-lg text-gray-700">
                <span className="text-2xl font-bold text-green-700">
                  Obiumunna Na Umuada Health Alliance
                </span>{" "}
                is the healthcare arm of{" "}
                <strong className="text-green-800">
                  Obiumunna Na Umuada United.
                </strong>{" "}
                We were created to address the urgent health needs of
                underserved communities, focusing on preventive care, emergency
                relief, and support for indigent groups.
              </p>
              <div className="relative pl-6 border-l-4 border-green-200">
                <p className="leading-relaxed text-lg text-gray-700 italic">
                  "We believe that access to healthcare is a human right — not a
                  privilege — and we are committed to bridging the gap for those
                  who need it most."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="lg:w-1/2 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-8 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse" />
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <Image
                  alt="Obiumunna Na Umuada Health Alliance Logo"
                  src="/logo.svg"
                  height={400}
                  width={400}
                  className="relative z-10"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Founder Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <div className="space-y-4 mb-12">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full"
            />
            <h2 className="font-bold text-green-800 text-3xl md:text-4xl">
              Our Founder
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-6 border-2 border-green-100">
            <p className="leading-relaxed text-lg text-gray-700">
              <strong className="text-green-800 text-xl">
                Obiumunna Na Umuada United
              </strong>{" "}
              was founded by{" "}
              <Link
                href="https://obiumunnanaumuadaunited.com/2024/05/21/prfile-mazi-godwin-e-chukwu-founder-president-trustees-member/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 font-bold hover:text-green-600 hover:underline transition-colors decoration-2 underline-offset-4"
              >
                Mazi Godwin E. Chukwu
              </Link>
              , a visionary leader and passionate advocate for community
              empowerment. His commitment to equity, compassion, and service
              laid the foundation for our mission to uplift vulnerable
              populations and transform lives across Nigeria.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-600">
              <p className="leading-relaxed text-lg text-gray-700">
                Through his leadership, the organization launched{" "}
                <strong className="text-green-800">
                  Obiumunna Na Umuada Health Alliance
                </strong>{" "}
                — a dedicated initiative focused on improving health outcomes
                and delivering care to underserved communities.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission, Vision, Core Values Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {/* Mission */}
            <motion.div variants={scaleIn}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative z-10 space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-fit"
                    >
                      <div className="p-4 bg-white rounded-2xl shadow-lg w-fit">
                        <Target className="w-10 h-10 text-blue-600" />
                      </div>
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-green-800">
                      Our Mission
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-lg leading-relaxed text-gray-700">
                      To serve humanity through health optimization, community
                      support, and alleviating the ordeal of indigent groups.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Vision */}
            <motion.div variants={scaleIn}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative z-10 space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-fit"
                    >
                      <div className="p-4 bg-white rounded-2xl shadow-lg w-fit">
                        <Eye className="w-10 h-10 text-purple-600" />
                      </div>
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-green-800">
                      Our Vision
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-lg leading-relaxed text-gray-700">
                      Transforming lives and communities through accessible
                      healthcare and holistic services.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Core Values */}
            <motion.div variants={scaleIn} className="lg:col-span-1">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative z-10 space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-fit"
                    >
                      <div className="p-4 bg-white rounded-2xl shadow-lg w-fit">
                        <Heart className="w-10 h-10 text-green-600" />
                      </div>
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-green-800">
                      Our Core Values
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <ul className="space-y-3">
                      {coreValues.map((value, index) => (
                        <motion.li
                          key={index}
                          whileHover={{ x: 5 }}
                          className="flex items-start gap-3 group/item"
                        >
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-green-600 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                          <div className="text-base">
                            <strong className="text-green-800">
                              {value.title}
                            </strong>
                            <span className="text-gray-700">
                              {" "}
                              – {value.description}
                            </span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Leadership Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <div className="space-y-4 mb-12">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full"
            />
            <h2 className="font-bold text-green-800 text-3xl md:text-4xl">
              Our Leadership
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-green-100">
            <p className="leading-relaxed text-lg text-gray-700">
              Our Board of Trustees and leadership team guide our mission with
              integrity, compassion, and a deep commitment to community health.
              Together, we work tirelessly to ensure that every decision we make
              brings us closer to our vision of accessible healthcare for all.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mb-6"
            />
            <h2 className="font-bold text-green-800 text-3xl md:text-4xl mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to making healthcare accessible
              to everyone
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {members.slice(0, 3).map((member) => (
              <motion.div key={member.slug} variants={scaleIn}>
                <motion.div whileHover={{ y: -10 }}>
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex items-center justify-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-white border-2 border-green-700 text-green-800 hover:text-white hover:bg-green-800 shadow-lg group"
                size="lg"
              >
                <Link href="/team" className="flex items-center gap-2">
                  <span className="font-semibold">Meet the Full Team</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Get Involved CTA Section */}
      <section className="relative bg-gradient-to-r from-green-700 via-green-600 to-green-700 padding py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Get Involved Today
            </h2>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              Whether you're looking to volunteer, donate, or partner with us,
              there's a place for you at Obiumunna Na Umuada Health Alliance.
              Together, we can transform lives.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="text-green-800 shadow-2xl border-2 border-white/20 bg-white hover:bg-green-50 transition-all duration-300 w-full sm:w-auto group text-lg px-8 py-6"
                size="lg"
              >
                <Link href="/volunteer" className="flex items-center gap-2">
                  <Users className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span className="font-bold">Join Us as a Volunteer</span>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                asChild
                className="bg-green-800 text-white hover:bg-green-900 border-2 border-white/20 shadow-2xl transition-all duration-300 w-full sm:w-auto overflow-hidden group text-lg px-8 py-6"
                size="lg"
              >
                <Link
                  href="/donation"
                  className="flex items-center gap-2 relative"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <HeartHandshake className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="font-bold relative z-10">Donate Now</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <span className="absolute -top-1 -right-1 w-3 h-3 animate-ping rounded-full bg-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;
