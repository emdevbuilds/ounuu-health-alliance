"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UsersRound, IdCard, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { members } from "@/lib/members";

export default function TeamManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Team Management
          </h1>
          <p className="text-gray-600">
            Manage team members and generate ID cards
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Total Team Members</p>
          <p className="text-3xl font-bold text-green-800">{members.length}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Doctors</p>
          <p className="text-3xl font-bold text-blue-800">
            {members.filter((m) => m.title === "Dr").length}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Medical Staff</p>
          <p className="text-3xl font-bold text-purple-800">
            {members.filter((m) => m.role.includes("Medical")).length}
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <Input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2"
        />
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.slug}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-green-100">
                <Image
                  src={member.picture}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-green-800">
                  {member.title} {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href={`mailto:${member.contact.email}`}
                  className="text-blue-600 hover:underline truncate"
                >
                  {member.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <a
                  href={`tel:${member.contact.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {member.contact.phone}
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {member.intro}
            </p>

            <div className="flex gap-2">
              <Link
                href={`/team/${member.slug}`}
                target="_blank"
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Link
                href={`/admin/dashboard/team/id-card/${member.slug}`}
                target="_blank"
                className="flex-1"
              >
                <Button className="w-full bg-green-700 hover:bg-green-800 flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  ID Card
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-20">
          <UsersRound className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No team members found</p>
        </div>
      )}

      {/* Info Note */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 className="font-bold text-blue-800 mb-2">ℹ️ About Team Data</h3>
        <p className="text-blue-700">
          Team member data is stored in{" "}
          <code className="bg-blue-100 px-2 py-1 rounded">lib/members.js</code>.
          To add or update team members, edit that file directly. ID cards are
          generated dynamically from this data.
        </p>
      </div>
    </div>
  );
}
