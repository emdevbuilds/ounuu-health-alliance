"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { members } from "@/lib/members";
import { useState, useEffect } from "react";
import {
  Ambulance,
  HeartHandshake,
  HeartPlus,
  Megaphone,
  MoveRight,
  MoveUpRight,
  Rss,
  Users,
  Handshake,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Animation variants (keep all your existing variants)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Keep all your existing data arrays (programs, getInvolvedCards)
const programs = [
  {
    icon: Ambulance,
    title: "Emergency Relief",
    desc: "In times of crisis, we mobilize quickly to deliver aid, medical support, and shelter to affected communities.",
    gradient: "from-red-50 to-orange-50",
    iconColor: "text-red-600",
    borderColor: "border-red-100",
  },
  {
    icon: HeartHandshake,
    title: "Community Support",
    desc: "From food distribution to mental health workshops, we support communities with resources that foster dignity and resilience.",
    gradient: "from-blue-50 to-cyan-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
  },
  {
    icon: HeartPlus,
    title: "Health Optimization",
    desc: "We provide preventive care, medical outreach, and wellness education to underserved populations.",
    gradient: "from-green-50 to-emerald-50",
    iconColor: "text-green-600",
    borderColor: "border-green-100",
  },
  {
    icon: Megaphone,
    title: "Indigent Outreach",
    desc: "Focused aid for orphans, widows, displaced persons—ensuring they receive the care and opportunities they deserve.",
    gradient: "from-purple-50 to-pink-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-100",
  },
];

const getInvolvedCards = [
  {
    img: "/volunteer.png",
    title: "Volunteer With Us",
    desc: "Your time and skills can change lives. Join our team of passionate volunteers and make a tangible impact in your community.",
    link: "/volunteer",
    icon: Users,
    btnText: "Join Us",
    gradient: "from-blue-50 to-cyan-50",
  },
  {
    img: "/save-life.png",
    title: "Help Save Lives",
    desc: "Every contribution you make helps us deliver critical healthcare, support vulnerable families, and respond to emergencies.",
    link: "/donation",
    icon: HeartHandshake,
    btnText: "Donate",
    gradient: "from-green-50 to-emerald-50",
  },
  {
    img: "/partner.png",
    title: "Partner With Us",
    desc: "We collaborate with organizations, businesses, and institutions that share our vision. Let's build healthier communities together.",
    link: "/partnership",
    icon: Handshake,
    btnText: "Partner",
    gradient: "from-purple-50 to-pink-50",
  },
];

// Fallback news if no blogs published yet
const fallbackNews = [
  {
    img: "/blog1.jpg",
    date: "yesterday",
    title: "Community Health Camp Reaches Over 500 Families",
    desc: "Last weekend in Oruku, our team provided free medical checkups, health education, and essential supplies to more than 500 families.",
    slug: "community-health-camp-2024",
    _id: "fallback-blog-1",
    coverImage: "/blog1.jpg",
    excerpt:
      "Last weekend in Oruku, our team provided free medical checkups, health education, and essential supplies to more than 500 families.",
    createdAt: new Date().toISOString(),
  },
  {
    img: "/blog2.jpg",
    date: "7hrs ago",
    title: "New Partnership Expands Our Medical Outreach",
    desc: "We're excited to announce a new partnership with local hospitals and pharmacies, allowing us to reach more underserved communities.",
    slug: "new-partnership-medical-outreach-2024",
    _id: "fallback-blog-2",
    coverImage: "/blog2.jpg",
    excerpt:
      "We're excited to announce a new partnership with local hospitals and pharmacies, allowing us to reach more underserved communities.",
    createdAt: new Date().toISOString(),
  },
  {
    img: "/blog3.jpg",
    date: "20th October 2024",
    title: "Mental Health Awareness Walk Inspires Change",
    desc: "Over 200 participants joined our recent walk to raise awareness about mental health. The event sparked conversations and built solidarity.",
    slug: "mental-health-awareness-walk-2024",
    _id: "fallback-blog-3",
    coverImage: "/blog3.jpg",
    excerpt:
      "Over 200 participants joined our recent walk to raise awareness about mental health. The event sparked conversations and built solidarity.",
    createdAt: new Date().toISOString(),
  },
];

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const res = await fetch("/api/blog?status=published&limit=3");
      const data = await res.json();

      if (data.success && data.data.blogs && data.data.blogs.length > 0) {
        setBlogPosts(data.data.blogs);
      } else {
        setBlogPosts(fallbackNews);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogPosts(fallbackNews);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHrs < 1) return "Just now";
    if (diffHrs < 24) return `${diffHrs}hrs ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-green-50 via-white to-green-50/30 relative padding min-h-[85vh] flex items-center">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
            className="absolute top-10 right-10 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
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
            className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="flex flex-col lg:flex-row relative z-10 gap-16 items-center w-full max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="flex flex-col text-center lg:text-left justify-center items-center lg:items-start gap-y-8 lg:w-1/2"
          >
            <div className="flex flex-col gap-y-6 pt-12 lg:pt-0">
              <motion.div
                variants={scaleIn}
                className="flex justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 border-2 border-green-600/50 bg-gradient-to-r from-green-50 to-white backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-green-700" />
                  <span className="font-semibold text-sm text-green-800">
                    Proudly Serving 5+ Underserved Regions
                  </span>
                </motion.div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="leading-tight tracking-tight font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-green-700 to-green-600">
                  Serving Communities
                </span>
                <br />
                <span className="text-green-800">and Saving Lives.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 max-w-2xl"
              >
                OUNUU Health Alliance is a community-driven nonprofit
                transforming lives through accessible healthcare and unwavering
                support for underserved communities.
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="text-green-800 shadow-xl border-2 border-green-700/50 bg-white hover:text-white hover:bg-green-800 transition-all duration-300 w-full sm:w-auto group text-lg px-8 py-6"
                  size="lg"
                >
                  <Link href="/volunteer" className="flex items-center gap-2">
                    <Users className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-semibold">Volunteer</span>
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
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 w-full sm:w-auto overflow-hidden group text-lg px-8 py-6"
                  size="lg"
                >
                  <Link
                    href="/donation"
                    className="flex items-center gap-2 relative"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <HeartHandshake className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold relative z-10">
                      Donate Now
                    </span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <span className="absolute -top-1 -right-1 w-3 h-3 animate-ping rounded-full bg-green-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="lg:w-1/2 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600 via-green-500 to-green-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
              <Image
                className="rounded-3xl shadow-2xl relative z-10 border-4 border-white"
                alt="Healthcare volunteers helping community members"
                src="/banner.png"
                width={800}
                height={800}
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
            className="flex justify-center items-start lg:order-1 lg:w-1/2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl blur-3xl opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                <Image
                  alt="OUNUU team members working with community"
                  className="rounded-2xl relative z-10"
                  src="/about-img.jpg"
                  width={800}
                  height={800}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
            className="flex flex-col gap-y-8 lg:order-2 lg:w-1/2"
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
            <p className="leading-relaxed text-lg text-gray-700 md:text-xl">
              <strong className="text-green-800 text-xl">
                Obiumunna Na Umuada United (OUNUU) Health Alliance
              </strong>{" "}
              is the healthcare initiative of{" "}
              <Link
                href="https://obiumunnanaumuadaunited.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 font-semibold hover:text-green-600 hover:underline transition-colors decoration-2 underline-offset-4"
              >
                Obiumunna Na Umuada United
              </Link>
              , a nonprofit organization dedicated to transforming lives and
              empowering communities with accessible healthcare and
              compassionate support.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="shadow-xl bg-green-700 text-white hover:bg-green-800 w-fit group"
                size="lg"
              >
                <Link href="/about" className="flex items-center gap-2">
                  <span className="font-semibold">Learn More</span>
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20 relative overflow-hidden">
        {/* Background decoration */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-green-200/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 relative z-10"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mb-6"
            />
            <h2 className="font-bold text-green-800 text-3xl md:text-4xl mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed to serve and empower
              communities
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 relative z-10"
          >
            {programs.map((program, index) => (
              <motion.div key={index} variants={scaleIn}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`bg-gradient-to-br ${program.gradient} border-2 ${program.borderColor} w-full shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group h-full`}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="relative z-10 pb-4">
                      <CardTitle className="text-2xl font-bold text-green-800 text-center">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="flex items-center justify-center pb-6"
                        >
                          <div className="p-5 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                            <program.icon
                              size={48}
                              className={program.iconColor}
                            />
                          </div>
                        </motion.div>
                        {program.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-gray-700 leading-relaxed text-base md:text-lg text-center relative z-10 px-6 pb-8">
                      {program.desc}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
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
              Get Involved
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in making a difference in the lives of those who need it
              most
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {getInvolvedCards.map((item, index) => (
              <motion.div key={index} variants={scaleIn}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`w-full h-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-100 group overflow-hidden bg-white`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <CardContent className="mt-6 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex justify-center items-center"
                      >
                        <div
                          className={`p-4 bg-gradient-to-br ${item.gradient} rounded-full shadow-lg`}
                        >
                          <Image
                            alt={item.title}
                            src={item.img}
                            width={80}
                            height={80}
                          />
                        </div>
                      </motion.div>
                    </CardContent>

                    <CardHeader className="pb-6 relative z-10">
                      <CardTitle className="text-2xl font-bold text-green-800 py-3 text-center">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-base md:text-lg text-gray-700 leading-relaxed py-3 text-center min-h-[120px]">
                        {item.desc}
                      </CardDescription>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          asChild
                          className="bg-green-700 text-white hover:bg-green-800 my-3 w-full group/btn shadow-lg"
                          size="lg"
                        >
                          <Link
                            href={item.link}
                            className="flex items-center justify-center gap-2"
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-semibold">
                              {item.btnText}
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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

      {/* Support Our Mission Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20 relative overflow-hidden">
        {/* Dot pattern background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(22, 163, 74, 0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mb-6"
            />
            <h2 className="font-bold text-green-800 text-3xl md:text-4xl mb-4">
              Support Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your generosity transforms lives and builds hope in communities
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <motion.div variants={slideInLeft} className="md:w-1/2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl blur-3xl opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                  <Image
                    alt="Community members receiving support"
                    className="rounded-2xl relative z-10"
                    src="/donate-img2.jpg"
                    width={800}
                    height={800}
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={slideInRight} className="md:w-1/2 space-y-6">
              <h3 className="text-green-800 font-bold text-2xl md:text-3xl">
                Make a Difference Today
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Your donation helps us deliver healthcare, support families, and
                respond to emergencies. Every contribution—big or small—saves
                lives and builds hope in underserved communities.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-xl hover:shadow-2xl group"
                  size="lg"
                >
                  <Link href="/donation" className="flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Donate Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to serving our communities with
              excellence
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

      {/* News & Updates Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
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
              News & Updates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about our latest initiatives and community impact
            </p>
          </motion.div>

          {loadingBlogs ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((blog, index) => (
                <motion.div
                  key={blog._id || blog.slug || index}
                  variants={scaleIn}
                >
                  <motion.div whileHover={{ y: -10 }}>
                    <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-100 group overflow-hidden h-full pt-0 flex flex-col bg-white">
                      <CardHeader className="p-0 relative">
                        <div className="relative overflow-hidden h-56">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full"
                          >
                            <Image
                              className="w-full h-full object-cover"
                              alt={blog.title}
                              src={blog.coverImage || blog.img || "/blog1.jpg"}
                              width={500}
                              height={300}
                            />
                          </motion.div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-green-700 shadow-lg">
                          {formatDate(
                            blog.publishedAt || blog.createdAt || blog.date
                          )}
                        </span>
                      </CardHeader>

                      <CardHeader className="flex-1 px-6 pt-6">
                        <CardTitle className="text-xl font-bold text-green-800 leading-tight group-hover:text-green-700 transition-colors">
                          {blog.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="text-gray-700 leading-relaxed text-base px-6 pb-6">
                        <p className="line-clamp-3 mb-4">
                          {blog.excerpt || blog.desc}
                        </p>

                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex justify-center"
                        >
                          <Button
                            asChild
                            className="p-0 h-auto"
                            size="lg"
                            variant="link"
                          >
                            <Link
                              href={blog.slug ? `/blog/${blog.slug}` : "/blog"}
                              className="flex items-center gap-2 text-green-700 hover:text-green-800 group/link"
                            >
                              <span className="font-semibold">
                                Continue Reading
                              </span>
                              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

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
                className="border-2 border-green-700 text-green-800 bg-white hover:bg-green-800 hover:text-white shadow-lg group"
                size="lg"
              >
                <Link href="/blog" className="flex items-center gap-2">
                  <Rss className="w-5 h-5" />
                  <span className="font-semibold">More News & Updates</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
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
          className="relative z-10 text-center space-y-8 max-w-5xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            Together, We Can Save Lives
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto"
          >
            Every donation brings hope. Every volunteer makes a difference. Join
            us in transforming communities across Nigeria.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-white text-green-800 hover:bg-green-50 shadow-2xl text-lg px-8 py-6 group"
                size="lg"
              >
                <Link href="/donation" className="flex items-center gap-2">
                  <HeartHandshake className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">Donate Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-green-800 text-white hover:bg-green-900 border-2 border-white/20 shadow-2xl text-lg px-8 py-6 group"
                size="lg"
              >
                <Link href="/volunteer" className="flex items-center gap-2">
                  <Users className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span className="font-bold">Volunteer Now</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
