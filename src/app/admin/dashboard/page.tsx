"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Users,
  Handshake,
  Heart,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Stats {
  contacts: { total: number; new: number; recent: any[] };
  volunteers: { total: number; new: number; recent: any[] };
  partnerships: { total: number; new: number };
  donations: { total: number; totalAmount: number; recent: any[] };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-green-100 text-lg">
          Manage your NGO operations, track engagement, and make an impact.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Contacts */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            {stats?.contacts.new! > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                {stats?.contacts.new} New
              </span>
            )}
          </div>
          <h3 className="text-gray-600 font-medium mb-1">
            Contact Submissions
          </h3>
          <p className="text-3xl font-bold text-green-800 mb-4">
            {stats?.contacts.total || 0}
          </p>
          <Link href="/admin/dashboard/contacts">
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              View All
            </Button>
          </Link>
        </motion.div>

        {/* Volunteers */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            {stats?.volunteers.new! > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                {stats?.volunteers.new} New
              </span>
            )}
          </div>
          <h3 className="text-gray-600 font-medium mb-1">
            Volunteer Applications
          </h3>
          <p className="text-3xl font-bold text-blue-800 mb-4">
            {stats?.volunteers.total || 0}
          </p>
          <Link href="/admin/dashboard/volunteers">
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              View All
            </Button>
          </Link>
        </motion.div>

        {/* Partnerships */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Handshake className="w-8 h-8 text-purple-600" />
            </div>
            {stats?.partnerships.new! > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                {stats?.partnerships.new} New
              </span>
            )}
          </div>
          <h3 className="text-gray-600 font-medium mb-1">
            Partnership Inquiries
          </h3>
          <p className="text-3xl font-bold text-purple-800 mb-4">
            {stats?.partnerships.total || 0}
          </p>
          <Link href="/admin/dashboard/partnerships">
            <Button
              variant="outline"
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              View All
            </Button>
          </Link>
        </motion.div>

        {/* Donations */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Heart className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h3 className="text-gray-600 font-medium mb-1">Total Donations</h3>
          <p className="text-2xl font-bold text-orange-800 mb-1">
            {formatCurrency(stats?.donations.totalAmount || 0)}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            {stats?.donations.total || 0} donations
          </p>
          <Link href="/admin/dashboard/donations">
            <Button
              variant="outline"
              className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              View All
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-800">
              Recent Contact Submissions
            </h2>
            <Link href="/admin/dashboard/contacts">
              <Button variant="ghost" size="sm" className="text-green-600">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="p-6">
            {stats?.contacts.recent && stats.contacts.recent.length > 0 ? (
              <div className="space-y-4">
                {stats.contacts.recent.map((contact: any) => (
                  <div
                    key={contact._id}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {contact.fullName}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {contact.subject || "No subject"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(contact.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        contact.status === "new"
                          ? "bg-red-100 text-red-600"
                          : contact.status === "read"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No recent contacts
              </p>
            )}
          </div>
        </div>

        {/* Recent Volunteers */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-800">
              Recent Volunteer Applications
            </h2>
            <Link href="/admin/dashboard/volunteers">
              <Button variant="ghost" size="sm" className="text-green-600">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="p-6">
            {stats?.volunteers.recent && stats.volunteers.recent.length > 0 ? (
              <div className="space-y-4">
                {stats.volunteers.recent.map((volunteer: any) => (
                  <div
                    key={volunteer._id}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {volunteer.fullName}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {volunteer.areaOfInterest}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(volunteer.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        volunteer.status === "new"
                          ? "bg-red-100 text-red-600"
                          : volunteer.status === "reviewed"
                          ? "bg-blue-100 text-blue-600"
                          : volunteer.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No recent volunteers
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h2 className="text-xl font-bold text-green-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/dashboard/blog/create">
            <Button className="w-full bg-green-700 hover:bg-green-800 h-auto py-4">
              Create New Blog Post
            </Button>
          </Link>
          <Link href="/admin/dashboard/team">
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50 h-auto py-4"
            >
              Manage Team Members
            </Button>
          </Link>
          <Link href="/admin/dashboard/contacts">
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50 h-auto py-4"
            >
              Review New Messages
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
