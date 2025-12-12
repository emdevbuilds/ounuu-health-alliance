"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HandHelping, HeartHandshake, Menu } from "lucide-react";
import {
  Facebook,
  Youtube,
  XTwitter,
  Tiktok,
  Instagram,
} from "@/assets/icons/files";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="w-full fixed top-0 shadow bg-green-50/20 backdrop-blur-sm flex items-center justify-between py-2 px-6 lg:px-12 z-50">
      <Link href="/" className="text-green-800 hover:font-bold">
        <Image
          className="inline"
          alt="OUNUU Logo"
          src="/logo.svg"
          width={60}
          height={60}
        />
        <span className="font-bold text-lg pl-2 lg:pl-3">
          OUNUU Health Alliance
        </span>
      </Link>
      <nav className="hidden lg:flex">
        <Link
          className={`px-3 py-2 rounded-xl hover:bg-green-50/50 focus:bg-green-50/50 ${
            pathname === "/" && "bg-green-50/50"
          }`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`px-3 py-2 rounded-xl hover:bg-green-50/50 focus:bg-green-50/50 ${
            pathname === "/about" && "bg-green-50/50"
          }`}
          href="/about"
        >
          About
        </Link>
        <Link
          className={`px-3 py-2 rounded-xl hover:bg-green-50/50 focus:bg-green-50/50 ${
            pathname === "/team" && "bg-green-50/50"
          }`}
          href="/team"
        >
          Team
        </Link>
        <Link
          className={`px-3 py-2 rounded-xl hover:bg-green-50/50 focus:bg-green-50/50 ${
            pathname === "/volunteer" && "bg-green-50/50"
          }`}
          href="/volunteer"
        >
          Volunteer
        </Link>
        <Link
          className={`px-3 py-2 rounded-xl hover:bg-green-50/50 focus:bg-green-50/50 ${
            pathname === "/partnership" && "bg-green-50/50"
          }`}
          href="/partnership"
        >
          Partnership
        </Link>
        <Link
          className={`px-3 py-2 rounded-xl hover:bg-green-50/50 focus:bg-green-50/50 ${
            pathname === "/contact" && "bg-green-50/50"
          }`}
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className={`px-3 py-2 rounded-xl hover:bg-green-50/50 focus:bg-green-50/50 ${
            pathname === "/blog" && "bg-green-50/50"
          }`}
          href="/blog"
        >
          Blog
        </Link>
      </nav>
      <nav className="hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <div className="relative flex items-center !p-0">
                  <Button
                    asChild
                    className="bg-green-700 text-green-900 hover:bg-green-800 shadow-lg"
                    size="lg"
                  >
                    <Link
                      href="/donation"
                      className="flex-row items-center text-white"
                    >
                      <span>Donate</span>
                      <HeartHandshake className="text-white !w-5 !h-5" />
                    </Link>
                  </Button>
                  <span className="absolute top-0 -right-1 w-[10px] h-[10px] animate-ping rounded-full bg-green-500 opacity-85"></span>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="text-green-800 hover:text-green-700" />
            {/* <Button className="lg:hidden bg-green-700/80 hover:bg-green-700">
            <Menu />
          </Button> */}
          </SheetTrigger>
          <SheetContent className="bg-green-800 border-none">
            <SheetHeader>
              <SheetTitle className="text-shadow-md text-lg text-gray-200">
                OUNUU Health Alliance
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col">
              <Link
                className={`border-secondary text-gray-200 py-3 hover:bg-green-50/20 hover:border-l-5 hover:pl-4 hover:text-white hover:text-shadow-md focus:bg-green-50/20 pl-3 ${
                  pathname === "/" &&
                  "border-l-3 backdrop-blur-lg bg-green-50/12"
                }`}
                href="/"
              >
                Home
              </Link>
              <Link
                className={`border-secondary text-gray-200 py-3 hover:bg-green-50/20 hover:border-l-5 hover:pl-4 hover:text-white hover:text-shadow-md focus:bg-green-50/20 pl-3 ${
                  pathname === "/about" &&
                  "border-l-3 backdrop-blur-lg bg-green-50/12"
                }`}
                href="/about"
              >
                About
              </Link>
              <Link
                className={`border-secondary text-gray-200 py-3 hover:bg-green-50/20 hover:border-l-5 hover:pl-4 hover:text-white hover:text-shadow-md focus:bg-green-50/20 pl-3 ${
                  pathname === "/team" &&
                  "border-l-3 backdrop-blur-lg bg-green-50/12"
                }`}
                href="/team"
              >
                Team
              </Link>
              <Link
                className={`border-secondary text-gray-200 py-3 hover:bg-green-50/20 hover:border-l-5 hover:pl-4 hover:text-white hover:text-shadow-md focus:bg-green-50/20 pl-3 ${
                  pathname === "/volunteer" &&
                  "border-l-3 backdrop-blur-lg bg-green-50/12"
                }`}
                href="/volunteer"
              >
                Volunteer
              </Link>
              <Link
                className={`border-secondary text-gray-200 py-3 hover:bg-green-50/20 hover:border-l-5 hover:pl-4 hover:text-white hover:text-shadow-md focus:bg-green-50/20 pl-3 ${
                  pathname === "/partnership" &&
                  "border-l-3 backdrop-blur-lg bg-green-50/12"
                }`}
                href="/partnership"
              >
                Partnership
              </Link>
              <Link
                className={`border-secondary text-gray-200 py-3 hover:bg-green-50/20 hover:border-l-5 hover:pl-4 hover:text-white hover:text-shadow-md focus:bg-green-50/20 pl-3 ${
                  pathname === "/contact" &&
                  "border-l-3 backdrop-blur-lg bg-green-50/12"
                }`}
                href="/contact"
              >
                Contact
              </Link>
              <Link
                className={`border-secondary text-gray-200 py-3 hover:bg-green-50/20 hover:border-l-5 hover:pl-4 hover:text-white hover:text-shadow-md focus:bg-green-50/20 pl-3 ${
                  pathname === "/blog" &&
                  "border-l-3 backdrop-blur-lg bg-green-50/12"
                }`}
                href="/blog"
              >
                Blog
              </Link>
            </nav>
            <div className="relative flex items-center pl-3 my-2">
              <Button
                asChild
                className="bg-green-700 text-green-900 hover:bg-green-600 shadow-lg"
                size="lg"
              >
                <Link
                  href="/donation"
                  className="flex-row items-center text-white"
                >
                  <span>Donate</span>
                  <HeartHandshake className="text-white !w-5 !h-5" />
                </Link>
              </Button>
              <span className="absolute top-0 left-32 w-[10px] h-[10px] animate-ping rounded-full bg-green-500 opacity-85"></span>
            </div>
            {/* social icons */}

            <SheetFooter>
              <h2 className="text-gray-100 text-lg font-semibold">
                Connect With Us
              </h2>
              <div className="w-full flex justify-between text-white bg-green-50/20 backdrop-blur-md shadow-md py-2 rounded-full px-3">
                <Link
                  href="https://youtube.com/@obiumunnanaumuadahealthallianc?si=6Lj96LlZqLgQduHs"
                  target="_blank"
                >
                  <Youtube className="hover:text-red-500" />
                </Link>
                <Link
                  href="https://www.facebook.com/share/1ZVnPZEPLe/"
                  target="_blank"
                >
                  <Facebook className="hover:text-blue" />
                </Link>
                <Link
                  href="https://www.instagram.com/obiumunnanaumuadahealth?utm_source=qr&igsh=MWRhYmVsdWY0NzBhag=="
                  target="_blank"
                >
                  <Instagram className="hover:text-red-400" />
                </Link>
                <Link
                  href="https://x.com/OBiUMUNNAHEALTH?t=NxmaLo3vEdJ8002FdJx98g&s=09"
                  target="_blank"
                >
                  <XTwitter className="hover:text-black" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@obiumunnanaumuada?_t=ZN-8zNQ46HnQSU&_r=1"
                  target="_blank"
                >
                  <Tiktok className="hover:text-black" />
                </Link>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
