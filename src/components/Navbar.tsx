"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Youtube,
  XTwitter,
  Tiktok,
  Instagram,
} from "@/assets/icons/files";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/partnership", label: "Partnership" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: "https://youtube.com/@obiumunnanaumuadahealthallianc?si=6Lj96LlZqLgQduHs",
    icon: Youtube,
    label: "YouTube",
    hoverColor: "hover:text-red-500",
  },
  {
    href: "https://www.facebook.com/share/1ZVnPZEPLe/",
    icon: Facebook,
    label: "Facebook",
    hoverColor: "hover:text-blue-500",
  },
  {
    href: "https://www.instagram.com/obiumunnanaumuadahealth?utm_source=qr&igsh=MWRhYmVsdWY0NzBhag==",
    icon: Instagram,
    label: "Instagram",
    hoverColor: "hover:text-pink-500",
  },
  {
    href: "https://x.com/OBiUMUNNAHEALTH?t=NxmaLo3vEdJ8002FdJx98g&s=09",
    icon: XTwitter,
    label: "Twitter",
    hoverColor: "hover:text-gray-900",
  },
  {
    href: "https://www.tiktok.com/@obiumunnanaumuada?_t=ZN-8zNQ46HnQSU&_r=1",
    icon: Tiktok,
    label: "TikTok",
    hoverColor: "hover:text-gray-900",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const linkVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  const socialVariants = {
    closed: { scale: 0.3, opacity: 0 },
    open: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4 + i * 0.05,
        duration: 0.5,
        ease: [0.68, -0.55, 0.265, 1.55] as const, // Bounce easing
      },
    }),
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-full fixed top-0 flex items-center justify-between py-3 px-4 md:px-8 lg:px-12 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-green-50/40 backdrop-blur-lg shadow-lg"
            : "bg-green-50/30 backdrop-blur-md shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-green-800 transition-opacity"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Image
              className="w-14 h-14 md:w-14 md:h-14"
              alt="OUNUU Logo"
              src="/logo.svg"
              width={60}
              height={60}
              priority
            />
          </motion.div>
          <span className="font-bold text-lg md:text-lg lg:text-xl whitespace-nowrap">
            OUNUU Health Alliance
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-green-100 text-green-800"
                  : "text-primary hover:bg-green-50 hover:text-green-800"
              }`}
              href={link.href}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.span>
            </Link>
          ))}
        </nav>

        {/* Desktop Donate Button */}
        <div className="hidden lg:block">
          <Link href="/donation">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-green-700 text-white hover:bg-green-800 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                size="lg"
              >
                <span className="mr-2">Donate</span>
                <HeartHandshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-3 h-3 animate-ping rounded-full bg-green-400"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"></span>
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-green-800 hover:bg-green-50 p-2 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gradient-to-br from-green-800 via-green-700 to-green-900 z-[70] lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-green-600/30">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-bold text-white"
                >
                  OUNUU Health Alliance
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Mobile Navigation Links with Staggered Animation */}
              <nav className="flex flex-col flex-1 overflow-y-auto py-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    custom={index}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      className={`block px-6 py-3.5 text-base font-medium transition-all duration-200 border-l-4 ${
                        pathname === link.href
                          ? "border-green-300 bg-green-600/30 text-white"
                          : "border-transparent text-gray-200 hover:border-green-400 hover:bg-green-600/20 hover:text-white"
                      }`}
                      href={link.href}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Donate Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-6 py-4 border-t border-green-600/30"
              >
                <Link href="/donation" onClick={handleLinkClick}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-white text-green-800 hover:bg-green-50 shadow-lg font-semibold relative group"
                      size="lg"
                    >
                      <span className="mr-2">Donate Now</span>
                      <HeartHandshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 animate-ping rounded-full bg-green-400"></span>
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"></span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Social Links */}
              <div className="px-6 pb-6 border-t border-green-600/30 pt-4">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-white text-lg font-semibold mb-4"
                >
                  Connect With Us
                </motion.h2>
                <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-full py-3 px-4">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      custom={index}
                      variants={socialVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`text-white transition-colors duration-200 ${social.hoverColor}`}
                        >
                          <social.icon className="w-5 h-5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
