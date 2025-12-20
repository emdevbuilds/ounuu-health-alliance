"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { members } from "@/lib/members";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { use } from "react";

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

const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
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

function getTeamBySlug(slug: string) {
  const member = members.find((member) => member.slug == slug);

  if (!member) notFound();

  return { member };
}

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const team_info = getTeamBySlug(slug);

  return (
    <main className="overflow-hidden bg-gradient-to-br from-green-50/30 via-white to-green-50/20">
      {/* Back Button */}
      <section className="padding pt-24 pb-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Team
          </Link>
        </div>
      </section>

      {/* Profile Section */}
      <section className="padding py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image & Contact */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="space-y-8"
            >
              {/* Profile Image */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl blur-3xl opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                  <Image
                    alt={`${team_info.member.name} picture`}
                    className="rounded-2xl w-full"
                    src={team_info.member.picture}
                    height={570}
                    width={570}
                  />
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-100"
              >
                <h3 className="font-bold text-green-800 text-xl mb-6 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${team_info.member.contact.email}`}
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-medium">Email</p>
                      <p className="text-green-800 font-semibold break-all">
                        {team_info.member.contact.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${team_info.member.contact.phone}`}
                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-medium">Phone</p>
                      <p className="text-green-800 font-semibold">
                        {team_info.member.contact.phone}
                      </p>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Work Experience - Desktop */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="hidden lg:block bg-white rounded-2xl p-6 shadow-xl border-2 border-green-100"
              >
                <h3 className="font-bold text-green-800 text-xl mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Work Experience
                </h3>
                <ul className="space-y-4">
                  {team_info.member.workExperience.map((work, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 bg-green-50 rounded-xl"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{work}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Column - Bio & Education */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-green-100 rounded-full">
                  <Award className="w-4 h-4 text-green-700" />
                  <span className="text-sm font-semibold text-green-800">
                    {team_info.member.role}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-6">
                  {team_info.member.title}. {team_info.member.name}
                </h1>
              </div>

              {/* Biography */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100">
                <h3 className="font-bold text-green-800 text-xl mb-6">About</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                  <p>{team_info.member.intro}</p>
                  <p>{team_info.member.biography}</p>
                </div>
              </div>

              {/* Work Experience - Mobile */}
              <div className="lg:hidden bg-white rounded-2xl p-6 shadow-xl border-2 border-green-100">
                <h3 className="font-bold text-green-800 text-xl mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Work Experience
                </h3>
                <ul className="space-y-4">
                  {team_info.member.workExperience.map((work, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 bg-green-50 rounded-xl"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{work}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-100">
                <h3 className="font-bold text-green-800 text-xl mb-6 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-green-50 hover:bg-green-50 border-green-100">
                        <TableHead className="font-semibold text-base text-green-800">
                          School
                        </TableHead>
                        <TableHead className="font-semibold text-base text-green-800">
                          Qualification
                        </TableHead>
                        <TableHead className="font-semibold text-base text-green-800">
                          Year
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {team_info.member.education.map((education) => (
                        <TableRow
                          className="hover:bg-green-50/50 border-green-50"
                          key={`${education.school}-${education.qualification}`}
                        >
                          <TableCell className="font-medium text-gray-800">
                            {education.school}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {education.qualification}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {education.year}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
