import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Youtube,
  XTwitter,
  Tiktok,
  Instagram,
} from "@/assets/icons/files";
import { HeartHandshake, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="w-full text-green-800 flex flex-col bg-green-50/50 py-7 padding-x">
      <div className="flex flex-col lg:flex-row lg:gap-x-6">
        <div className="my-5 lg:w-2/5">
          <div className="flex items-center">
            <Image
              alt="OUNUU Health ALliance"
              src="/logo.svg"
              width={60}
              height={60}
            />
            <h1 className="text-xl font-bold pl-3">OUNUU Health Alliance</h1>
          </div>
          <div className="py-4 lg:w-4/5">
            <p className="text-lg/8">
              United for Health and Community, Serving Communities and Saving
              Lives.
            </p>
          </div>
          <div className="relative flex items-center !p-0 my-2">
            <Button
              asChild
              className="bg-green-700 hover:bg-green-800 shadow-lg"
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
            <span className="absolute top-0 left-29 w-[10px] h-[10px] animate-ping rounded-full bg-green-500 opacity-85"></span>
          </div>
        </div>

        <div className="my-5 lg:w-2/5">
          <h2 className="font-semibold text-xl mb-3">Contact Information</h2>
          <div className="flex py-2">
            <MapPin className="mt-1 flex-shrink-0" size={25} />
            <p className="text-lg leading pl-2">
              Plot 19/20 Mile 50 Layout between NEPA Junction & Ebonyi Voice
              Junction, Opposite MTN Branch office Abakaliki, Ebonyi State,
              Nigeria
            </p>
          </div>
          <div className="flex py-2">
            <Mail className="mt-1 flex-shrink-0" size={25} />
            <p className="text-lg/8 break-all whitespace-normal pl-2">
              obiumunnanaumuadahealthallianc@gmail.com
            </p>
          </div>
          <div className="flex py-2">
            <Phone className="mt-1 flex-shrink-0" size={25} />
            <p className="text-lg/8 tracking-wide pl-2">+2348063289585</p>
          </div>
        </div>

        <div className="my-5 lg:w-1/5">
          <h2 className="font-semibold text-xl mb-2">Quick Links</h2>
          <div className="py-2">
            <Link className="text-lg hover:pl-1 hover:text-green-700" href="/">
              Home
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="text-lg hover:pl-1 hover:text-green-700"
              href="/about"
            >
              About
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="text-lg hover:pl-1 hover:text-green-700"
              href="/team"
            >
              Team
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="text-lg hover:pl-1 hover:text-green-700"
              href="/volunteer"
            >
              Volunteer
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="text-lg hover:pl-1 hover:text-green-700"
              href="/contact"
            >
              Contact
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="text-lg hover:pl-1 hover:text-green-700"
              href="/partnership"
            >
              Partnership
            </Link>
          </div>
          <div className="py-2">
            <Link
              className="text-lg hover:pl-1 hover:text-green-700"
              href="/blog"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="my-5">
          <h1 className="text-xl font-semibold mb-4">Connect With Us</h1>
          <div className="flex flex-row justify-between py-2 lg:w-1/4">
            <Link
              href="https://youtube.com/@obiumunnanaumuadahealthallianc?si=6Lj96LlZqLgQduHs"
              target="_blank"
            >
              <Youtube className="w-6 h-6 hover:text-red-500" />
            </Link>
            <Link
              href="https://www.facebook.com/share/1ZVnPZEPLe/"
              target="_blank"
            >
              <Facebook className="w-6 h-6 hover:text-blue" />
            </Link>
            <Link
              href="https://www.instagram.com/obiumunnanaumuadahealth?utm_source=qr&igsh=MWRhYmVsdWY0NzBhag=="
              target="_blank"
            >
              <Instagram className="w-6 h-6 hover:text-red-400" />
            </Link>
            <Link
              href="https://x.com/OBiUMUNNAHEALTH?t=NxmaLo3vEdJ8002FdJx98g&s=09"
              target="_blank"
            >
              <XTwitter className="w-6 h-6 hover:text-black" />
            </Link>
            <Link
              href="https://www.tiktok.com/@obiumunnanaumuada?_t=ZN-8zNQ46HnQSU&_r=1"
              target="_blank"
            >
              <Tiktok className="hover:text-black" />
            </Link>
          </div>
        </div>

        <div className="text-center text-lg my-5">
          <div className="text-base">
            Build with ❤️ by Emmanuel -{" "}
            <Link href="https://github.com/emdevbuilds" target="_blank">
              Find me on Github
            </Link>
          </div>
          <hr className="my-3 border-green-800/30" />
          <div>
            © {new Date().getFullYear()} Copyright OUNUU Health Alliance. All
            right reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
