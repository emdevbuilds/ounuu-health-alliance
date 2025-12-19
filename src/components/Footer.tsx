"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Youtube,
  XTwitter,
  Tiktok,
  Instagram,
} from "@/assets/icons/files";
import { HeartHandshake, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Contact", href: "/contact" },
  { name: "Partnership", href: "/partnership" },
  { name: "Blog", href: "/blog" },
];

const socialLinks = [
  {
    name: "YouTube",
    href: "https://youtube.com/@obiumunnanaumuadahealthallianc?si=6Lj96LlZqLgQduHs",
    icon: Youtube,
    hoverColor: "hover:text-red-500",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1ZVnPZEPLe/",
    icon: Facebook,
    hoverColor: "hover:text-blue-600",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/obiumunnanaumuadahealth?utm_source=qr&igsh=MWRhYmVsdWY0NzBhag==",
    icon: Instagram,
    hoverColor: "hover:text-pink-600",
  },
  {
    name: "Twitter",
    href: "https://x.com/OBiUMUNNAHEALTH?t=NxmaLo3vEdJ8002FdJx98g&s=09",
    icon: XTwitter,
    hoverColor: "hover:text-black",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@obiumunnanaumuada?_t=ZN-8zNQ46HnQSU&_r=1",
    icon: Tiktok,
    hoverColor: "hover:text-black",
  },
];

const Footer = () => {
  return (
    <footer className="w-full text-green-800 flex flex-col bg-gradient-to-br from-green-50/80 via-white to-green-50/80 border-t-2 border-green-100">
      <div className="padding-x py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row lg:gap-x-8 gap-y-10"
        >
          {/* Brand Section */}
          <motion.div variants={fadeInUp} className="lg:w-2/5 space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-green-600/20 rounded-full blur-md group-hover:bg-green-600/30 transition-all" />
                <Image
                  alt="OUNUU Health Alliance Logo"
                  src="/logo.svg"
                  width={60}
                  height={60}
                  className="relative z-10"
                />
              </div>
              <h1 className="text-xl font-bold pl-3 group-hover:text-green-700 transition-colors">
                OUNUU Health Alliance
              </h1>
            </Link>

            <p className="text-lg leading-relaxed text-gray-700 lg:w-4/5">
              United for Health and Community, Serving Communities and Saving
              Lives.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-fit"
            >
              <Button
                asChild
                className="bg-green-700 hover:bg-green-800 shadow-lg text-white group"
                size="lg"
              >
                <Link href="/donation" className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Donate Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <span className="absolute -top-1 -right-1 w-3 h-3 animate-ping rounded-full bg-green-500" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-600" />
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="lg:w-2/5 space-y-4">
            <h2 className="font-bold text-2xl mb-4 text-green-800">
              Contact Information
            </h2>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex gap-3 group cursor-pointer"
            >
              <MapPin
                className="mt-1 flex-shrink-0 text-green-700 group-hover:text-green-600 transition-colors"
                size={24}
              />
              <p className="text-base leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors">
                Plot 19/20 Mile 50 Layout between NEPA Junction & Ebonyi Voice
                Junction, Opposite MTN Branch office Abakaliki, Ebonyi State,
                Nigeria
              </p>
            </motion.div>

            <motion.a
              href="mailto:obiumunnanaumuadahealthallianc@gmail.com"
              whileHover={{ x: 5 }}
              className="flex gap-3 group"
            >
              <Mail
                className="mt-1 flex-shrink-0 text-green-700 group-hover:text-green-600 transition-colors"
                size={24}
              />
              <p className="text-base break-all whitespace-normal text-gray-700 group-hover:text-green-700 group-hover:underline transition-colors">
                obiumunnanaumuadahealthallianc@gmail.com
              </p>
            </motion.a>

            <motion.a
              href="tel:+2348063289585"
              whileHover={{ x: 5 }}
              className="flex gap-3 group"
            >
              <Phone
                className="mt-1 flex-shrink-0 text-green-700 group-hover:text-green-600 transition-colors"
                size={24}
              />
              <p className="text-base tracking-wide text-gray-700 group-hover:text-green-700 group-hover:underline transition-colors">
                +234 806 328 9585
              </p>
            </motion.a>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="lg:w-1/5 space-y-3">
            <h2 className="font-bold text-2xl mb-4 text-green-800">
              Quick Links
            </h2>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ x: 5 }}>
                  <Link
                    className="text-base text-gray-700 hover:text-green-700 hover:font-semibold transition-all duration-200 inline-flex items-center gap-2 group"
                    href={link.href}
                  >
                    <span className="w-0 h-0.5 bg-green-700 group-hover:w-4 transition-all duration-200" />
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        {/* Social Links & Copyright */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 pt-8 border-t-2 border-green-100"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-xl font-bold text-green-800">
              Connect With Us
            </h2>

            <div className="flex flex-wrap gap-6">
              {socialLinks.map((social) => (
                <motion.div
                  key={social.name}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-100 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      <social.icon
                        className={`w-8 h-8 text-green-700 ${social.hoverColor} transition-colors relative z-10`}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 pt-6 border-t border-green-100 space-y-3 text-center"
          >
            <p className="text-sm text-gray-600">
              Built with{" "}
              <span className="text-red-500 inline-block animate-pulse">
                ❤️
              </span>{" "}
              by{" "}
              <Link
                href="https://github.com/emdevbuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-green-700 hover:text-green-600 hover:underline transition-colors"
              >
                Emmanuel
              </Link>
            </p>

            <p className="text-sm text-gray-700">
              © {new Date().getFullYear()} OUNUU Health Alliance. All rights
              reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
