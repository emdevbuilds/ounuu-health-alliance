"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Menu, X } from "lucide-react";
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

  return (
    <>
      <header
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
          <Image
            className="w-14 h-14 md:w-14 md:h-14"
            alt="OUNUU Logo"
            src="/logo.svg"
            width={60}
            height={60}
            priority
          />
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
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Donate Button */}
        <div className="hidden lg:block">
          <Link href="/donation">
            <Button
              className="bg-green-700 text-white hover:bg-green-800 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
              size="lg"
            >
              <span className="mr-2">Donate</span>
              <HeartHandshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 animate-ping rounded-full bg-green-400"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"></span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-green-800 hover:bg-green-50 p-2 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden transition-all duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu with Slide-in Animation */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gradient-to-br from-green-800 via-green-700 to-green-900 z-[70] lg:hidden shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-green-600/30">
            <h2 className="text-lg font-bold text-white">
              OUNUU Health Alliance
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Links with Staggered Animation */}
          <nav className="flex flex-col flex-1 overflow-y-auto py-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                className={`px-6 py-3.5 text-base font-medium transition-all duration-200 border-l-4 ${
                  pathname === link.href
                    ? "border-green-300 bg-green-600/30 text-white"
                    : "border-transparent text-gray-200 hover:border-green-400 hover:bg-green-600/20 hover:text-white"
                }`}
                style={{
                  animation: isOpen
                    ? `slideIn 0.4s ease-out ${index * 50}ms forwards`
                    : "none",
                  opacity: 0,
                }}
                href={link.href}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Donate Button */}
          <div className="px-6 py-4 border-t border-green-600/30">
            <Link href="/donation" onClick={handleLinkClick}>
              <Button
                className="w-full bg-white text-green-800 hover:bg-green-50 shadow-lg font-semibold relative group"
                size="lg"
              >
                <span className="mr-2">Donate Now</span>
                <HeartHandshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-3 h-3 animate-ping rounded-full bg-green-400"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"></span>
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="px-6 pb-6 border-t border-green-600/30 pt-4">
            <h2 className="text-white text-lg font-semibold mb-4">
              Connect With Us
            </h2>
            <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-full py-3 px-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white transition-all duration-200 hover:scale-110 ${social.hoverColor}`}
                  style={{
                    animation: isOpen
                      ? `bounceIn 0.5s ease-out ${400 + index * 50}ms forwards`
                      : "none",
                    opacity: 0,
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
