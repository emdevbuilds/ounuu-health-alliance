"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { members } from "@/lib/members";
import ProgramCarousel from "@/components/ProgramCarousel";
import DonateForm from "@/components/DonateForm";
import {
  Ambulance,
  Apple,
  Handshake,
  HeartHandshake,
  HeartPlus,
  Megaphone,
  MoveRight,
  MoveUpRight,
  Rss,
  Users,
  View,
} from "lucide-react";

import { Facebook, Youtube } from "@/assets/icons/files";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="w-full bg-white relative padding">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
          }}
        />
        <div className="flex flex-col lg:flex-row relative z-10 gap-x-y">
          <div className="flex flex-col text-center justify-center items-center gap-y-7 lg:w-1/2">
            <div className="flex flex-col gap-y-3 pt-12 lg:pt-0">
              <div className="flex justify-center">
                <div className="flex items-center border border-green-600 rounded-full px-4 py-2 w-fit">
                  <span className="font-medium text-sm">
                    Proudly Serving 5+ Underserved Regions
                  </span>
                </div>
              </div>

              <h1 className="leading-12 tracking-tight text-green-800 font-bold py-2 md:text-4xl md:leading-14">
                Serving Communities and Saving Lives.
              </h1>
              <p className="text-lg md:text-xl py-2 leading lg:text-left">
                OUNUU Health Alliance is a community-driven nonprofit. We
                transform lives by providing accessible healthcare and support
                to the underserved, and building healthier communities.
              </p>
            </div>

            <div className="flex flex-row gap-x-6 lg:gap-x-12">
              <div className="relative flex items-center !p-0">
                <Button
                  asChild
                  className="text-primary shadow-lg border border-green-700 bg-transparent hover:text-white hover:bg-green-800"
                  size="lg"
                >
                  <Link
                    href="/volunteer"
                    className="flex-row items-center text-black"
                  >
                    <span>Volunteer</span>
                    <Users className="!w-5 !h-5" />
                  </Link>
                </Button>
              </div>
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
                    <span>Donate Now</span>
                    <HeartHandshake className="text-white !w-5 !h-5" />
                  </Link>
                </Button>
                <span className="absolute top-0 -right-1 w-[10px] h-[10px] animate-ping rounded-full bg-green-500 opacity-85"></span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 lg:flex">
            <Image
              className="rounded-lg"
              alt="Banner"
              src="/banner.png"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="flex flex-col lg:flex-row padding gap-x-y">
        <div className="flex flex-col gap-y-8 lg:order-2 lg:w-1/2">
          <h2 className="font-bold text-green-800 md:text-3xl">
            <span className="border-l-4 border-green-800 pl-3">Who We Are</span>
          </h2>
          <p className="leading text-lg text-primary md:text-xl">
            <strong>Obiumunna Na Umuada United (OUNUU)</strong> Health Alliance
            is the healthcare initiative of{" "}
            <strong>
              <Link href="https://obiumunnanaumuadaunited.com/" target="_blank">
                Obiumunna Na Umuada United,
              </Link>{" "}
            </strong>
            a nonprofit organization dedicated to transforming lives and
            empowering communities. Through OUNUU Health Alliance, we improve
            health outcomes and support vulnerable populations with compassion
            and purpose.
          </p>
          <Button
            asChild
            className="shadow-lg border bg-green-700 text-white hover:bg-green-800 w-1/2 ml-4"
            size="lg"
          >
            <Link href="/about" className="flex-row items-center text-black">
              <span>Learn More</span>
              <MoveRight className="!w-5 !h-5" />
            </Link>
          </Button>
        </div>

        <div className="flex justify-center items-start lg:order-1 lg:w-1/2">
          <Image
            alt="Who we are image"
            className="rounded-lg"
            src="/about-img.jpg"
            width={800}
            height={800}
          />
        </div>
      </div>

      {/* Our programs section */}
      <div className="bg-green-50/30 flex flex-col gap-x-y padding">
        <h2 className="font-bold text-right text-green-800 pb-3 lg:text-left md:text-3xl">
          Our Programs
        </h2>
        <div className="grid grid-cols-1 gap-x-y md:grid-cols-2 ">
          <Card className="bg-green-50/40 border-green-50 border-2 w-full shadow-lg">
            <CardHeader className="">
              <CardTitle className="text-xl font-bold text-green-800 text-center">
                <div className="flex items-center justify-center pb-4">
                  <Ambulance size={40} />
                </div>
                Emergency Relief
              </CardTitle>
            </CardHeader>

            <CardContent className="text-primary leading text-base text-center">
              In times of crisis, we mobilize quickly to deliver aid, medical
              support, and shelter to affected communities.
            </CardContent>
          </Card>

          <Card className="bg-green-50/40 border-green-50 border-2 w-full shadow-lg">
            <CardHeader className="">
              <CardTitle className="text-xl font-bold text-green-800 text-center">
                <div className="flex items-center justify-center pb-4">
                  <HeartHandshake size={40} />
                </div>
                Community Support
              </CardTitle>
            </CardHeader>

            <CardContent className="text-primary leading text-base text-center">
              From food distribution to mental health workshops, we support
              communities with resources that foster dignity and resilience.
            </CardContent>
          </Card>

          <Card className="bg-green-50/40 border-green-50 border-2 w-full shadow-lg">
            <CardHeader className="">
              <CardTitle className="text-xl font-bold text-green-800 text-center">
                <div className="flex items-center justify-center pb-4">
                  <HeartPlus size={40} />
                </div>
                Health Optimization
              </CardTitle>
            </CardHeader>

            <CardContent className="text-primary leading text-base text-center">
              We provide preventive care, medical outreach, and wellness
              education to underserved populations.
            </CardContent>
          </Card>

          <Card className="bg-green-50/40 border-green-50 border-2 w-full shadow-lg">
            <CardHeader className="">
              <CardTitle className="text-xl font-bold text-green-800 text-center">
                <div className="flex items-center justify-center pb-4">
                  <Megaphone size={40} />
                </div>
                Indigent Outreach
              </CardTitle>
            </CardHeader>

            <CardContent className="text-primary leading text-base text-center">
              Focused aid for orphans, widows, displaced persons—ensuring they
              receive the care, and opportunities they deserve.
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Get Involved section */}
      <div className="flex flex-col justify-center padding gap-x-y">
        <h2 className="font-bold text-green-800 pb-3 text-center md:text-3xl">
          Get Invloved
        </h2>
        <div className="flex flex-col lg:flex-row gap-x-y items-stretch">
          <Card className="w-full h-full shadow-lg">
            <CardContent className="mt-3">
              <div className="flex justify-center items-center">
                <Image
                  alt="Volunteer icon"
                  src="/volunteer.png"
                  width={80}
                  height={80}
                />
              </div>
            </CardContent>

            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-green-800 py-3 text-center">
                Volunteer With Us
              </CardTitle>
              <CardDescription className="text-base text-primary leading py-3 text-center">
                Your time and skills can change lives. Join our team of
                passionate volunteers and make a tangible impact in your
                community.
              </CardDescription>
              <Button
                asChild
                className="bg-green-700 text-white hover:bg-green-800 my-3"
                size="lg"
              >
                <Link
                  href="/volunteer"
                  className="flex-row items-center text-primary"
                >
                  <span>Volunteer</span>
                  <Users className="!w-5 !h-5" />
                </Link>
              </Button>
            </CardHeader>
          </Card>

          <Card className="w-full h-full shadow-lg">
            <CardContent className="mt-3">
              <div className="flex justify-center items-center">
                <Image
                  alt="Help save lives icon"
                  src="/save-life.png"
                  width={80}
                  height={80}
                />
              </div>
            </CardContent>

            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-green-800 py-3 text-center">
                Help Save Lives
              </CardTitle>
              <CardDescription className="text-base text-primary leading py-3 text-center">
                Every contribution you make helps us deliver critical
                healthcare, support vulnerable families, and respond to
                emergencies in underserved communities.
              </CardDescription>
              <Button
                asChild
                className="bg-green-700 text-white hover:bg-green-800 my-3"
                size="lg"
              >
                <Link
                  href="/donation"
                  className="flex-row items-center text-primary"
                >
                  <span>Help Save Lives</span>
                  <HeartHandshake className="!w-5 !h-5" />
                </Link>
              </Button>
            </CardHeader>
          </Card>

          <Card className="w-full h-full shadow-lg">
            <CardContent className="mt-3">
              <div className="flex justify-center items-center">
                <Image
                  alt="partner icon"
                  src="/partner.png"
                  width={80}
                  height={80}
                />
              </div>
            </CardContent>

            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-green-800 py-3 text-center">
                Partner With Us
              </CardTitle>
              <CardDescription className="text-base text-primary leading py-3 text-center">
                We collaborate with organizations, businesses, and institutions
                that share our vision. Let’s build healthier communities
                together.
              </CardDescription>
              <Button
                asChild
                className="bg-green-700 text-white hover:bg-green-800 my-3"
                size="lg"
              >
                <Link
                  href="/partner"
                  className="flex-row items-center text-primary"
                >
                  <span>Partner With Us</span>
                  <Handshake className="!w-5 !h-5" />
                </Link>
              </Button>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Donation section */}
      <div className="w-full bg-white relative padding-x pt-12 pb-8 lg:py-14">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(3, 71, 6, 0.4) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="flex flex-col relative z-10 gap-x-y">
          <h2 className="font-bold text-green-800 pb-3 md:text-3xl">
            Support Our Mission
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-x-y">
            <div className="md:w-1/2">
              <Image
                alt="Donate image"
                className="rounded-lg"
                src="/donate-img2.jpg"
                width={800}
                height={800}
              />
            </div>

            <div className="md:w-1/2">
              <h3 className="text-green-800 font-bold pb-6 md:text-2xl">
                Make a Difference Today
              </h3>
              <p className="text-lg leading">
                Your donation helps us deliver healthcare, support families, and
                respond to emergencies. Every contribution—big or small—saves
                lives.
              </p>
              <Button
                asChild
                className="bg-green-700 text-white hover:bg-green-800 my-6"
                size="lg"
              >
                <Link
                  href="/donation"
                  className="flex-row items-center text-primary"
                >
                  <span>Donate Now</span>
                  <HeartHandshake className="!w-5 !h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Team section */}
      <div className="bg-green-50/30 flex flex-col justify-center padding gap-x-y">
        <h2 className="font-bold text-green-800 pb-3 text-center md:text-3xl">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-y items-start">
          {members.slice(0, 3).map((member) => (
            <div key={member.slug}>
              <Card className="flex flex-col bg-green-50/40 border-green-50 border-2 w-full shadow-lg">
                <CardContent className="mt-0">
                  <div className="flex justify-center items-center">
                    <Image
                      alt={`${member.name} picture`}
                      className="rounded-full border-3 border-green-500 p-3"
                      src={member.picture}
                      width={250}
                      height={250}
                    />
                  </div>
                </CardContent>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-green-800 leading-8 py-3 text-center">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="font-semibold text-base text-primary leading-7 py-3 text-center">
                    {member.role}
                  </CardDescription>
                  <Button
                    asChild
                    className="bg-green-700 text-white hover:bg-green-800 my-3"
                    size="lg"
                  >
                    <Link
                      href={`/team/${member.slug}`}
                      className="flex-row items-center text-primary"
                    >
                      <span>View profile</span>
                      <MoveUpRight className="!w-5 !h-5" />
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <Button
            asChild
            className="bg-transparent border-2 border-green-800 text-primary hover:text-white hover:bg-green-800 my-3"
            size="lg"
          >
            <Link href="/team" className="flex-row items-center text-primary">
              <span>Meet the Full Team</span>
              <MoveUpRight className="!w-5 !h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Blog */}
      <div className="flex flex-col justify-center padding gap-y-8">
        <h2 className="lg:text-3xl font-bold text-green-800 py-12">
          News & Updates
        </h2>
        <div className="flex flex-col lg:flex-row gap-x-y items-start">
          <Card className="w-full pt-0">
            <CardHeader className="px-0">
              <Image
                className="pb-6 rounded-t-xl"
                alt="Health camp image"
                src="/blog1.jpg"
                width={500}
                height={500}
              />
              <span className="text-right text-sm italic text-green-700 pr-6 pb-4">
                yesterday
              </span>
              <CardTitle className="text-xl leading font-bold text-green-800 text-center px-3 lg:px-6">
                Community Health Camp Reaches Over 500 Families
              </CardTitle>
            </CardHeader>

            <CardContent className="text-primary leading text-base text-center">
              <p className="line-clamp-4">
                Last weekend in Oruku, our team provided free medical checkups,
                health education, and essential supplies to more than 500
                families. It was a powerful reminder of what compassion and
                collaboration can achieve.
              </p>

              <Button asChild className="my-3" size="lg" variant="link">
                <Link
                  href="/blog"
                  className="flex-row items-center !text-base !text-green-800"
                >
                  <span>Continue Reading</span>
                  <MoveRight className="!w-5 !h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full pt-0">
            <CardHeader className="px-0">
              <Image
                className="pb-6 rounded-t-xl"
                alt="partnership image"
                src="/blog2.jpg"
                width={500}
                height={500}
              />
              <span className="text-right text-sm italic text-green-700 pr-6 pb-4">
                7hrs ago
              </span>
              <CardTitle className="text-xl leading font-bold text-green-800 text-center px-3 lg:px-6">
                New Partnership Expands Our Medical Outreach
              </CardTitle>
            </CardHeader>

            <CardContent className="text-primary leading text-base text-center">
              <p className="line-clamp-4">
                We’re excited to announce a new partnership with local hospitals
                and pharmacies, allowing us to reach more underserved
                communities with vital healthcare services and medications.
              </p>

              <Button asChild className="my-3" size="lg" variant="link">
                <Link
                  href="/blog"
                  className="flex-row items-center !text-base !text-green-800"
                >
                  <span>Continue Reading</span>
                  <MoveRight className="!w-5 !h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full pt-0">
            <CardHeader className="px-0">
              <Image
                className="pb-6 rounded-t-xl"
                alt="mental awareness image"
                src="/blog3.jpg"
                width={500}
                height={500}
              />
              <span className="text-right text-sm italic text-green-700 pr-6 pb-4">
                20th Octomber 2025
              </span>
              <CardTitle className="text-xl leading font-bold text-green-800 text-center px-3 lg:px-6">
                Mental Health Awareness Walk Inspires Change
              </CardTitle>
            </CardHeader>

            <CardContent className="text-primary leading text-base text-center">
              <p className="line-clamp-4">
                Over 200 participants joined our recent walk to raise awareness
                about mental health. The event sparked conversations, built
                solidarity, and reminded us that healing begins with
                understanding.
              </p>

              <Button asChild className="my-3" size="lg" variant="link">
                <Link
                  href="/blog"
                  className="flex-row items-center !text-base !text-green-800"
                >
                  <span>Continue Reading</span>
                  <MoveRight className="!w-5 !h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <Button
            asChild
            className="my-3 border border-green-700 text-primary bg-transparent hover:bg-green-800 hover:text-white"
            size="lg"
          >
            <Link href="/blog" className="flex-row items-center !text-base">
              <span>More News & Updates</span>
              <Rss className="!w-5 !h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
