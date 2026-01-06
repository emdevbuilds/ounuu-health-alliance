"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Mail,
  Users,
  Handshake,
  Heart,
  FileText,
  UsersRound,
  LogOut,
  Menu,
  X,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Image from "next/image";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Contacts",
    href: "/admin/dashboard/contacts",
    icon: Mail,
  },
  {
    name: "Volunteers",
    href: "/admin/dashboard/volunteers",
    icon: Users,
  },
  {
    name: "Partnerships",
    href: "/admin/dashboard/partnerships",
    icon: Handshake,
  },
  {
    name: "Donations",
    href: "/admin/dashboard/donations",
    icon: Heart,
  },
  {
    name: "Blog",
    href: "/admin/dashboard/blog",
    icon: FileText,
  },
  {
    name: "Team",
    href: "/admin/dashboard/team",
    icon: UsersRound,
  },
  {
    name: "Admin Users",
    href: "/admin/dashboard/admins",
    icon: UserCog,
  },
];

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentAdmin();
  }, []);

  const fetchCurrentAdmin = async () => {
    try {
      const res = await fetch("/api/admin/me", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      if (data.success && data.data?.admin) {
        setUser({
          name: data.data.admin.name,
          email: data.data.admin.email,
          role: data.data.admin.role,
        });
      } else {
        // Fallback
        setUser({ name: "Admin", email: "admin@ounuu.org", role: "admin" });
      }
    } catch (error) {
      console.error("Failed to fetch admin:", error);
      // Fallback
      setUser({ name: "Admin", email: "admin@ounuu.org", role: "admin" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      const data = await res.json();

      if (data.success) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-br from-green-800 to-green-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-green-700">
            <Link href="/" className="flex items-center gap-3">
              <div>
                <Image
                  className="w-14 h-14 md:w-18 md:h-18"
                  alt="OUNUU Logo"
                  src="/logo.svg"
                  width={60}
                  height={60}
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">OUNUU Admin</h1>
                <p className="text-xs text-green-200">Dashboard</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-green-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-white text-green-800 font-semibold shadow-lg"
                        : "text-green-100 hover:bg-green-700/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-green-700">
            <div className="bg-green-700/50 rounded-xl p-4 mb-3">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-3 bg-green-600/30 rounded animate-pulse w-20"></div>
                  <div className="h-4 bg-green-600/30 rounded animate-pulse w-32"></div>
                  <div className="h-3 bg-green-600/30 rounded animate-pulse w-24"></div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-green-200 mb-1">Logged in as</p>
                  <p className="font-semibold text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-green-300 truncate">
                    {user?.email}
                  </p>
                  {user?.role && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                      {user.role.replace("_", " ").toUpperCase()}
                    </span>
                  )}
                </>
              )}
            </div>
            <Button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-green-700"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h2 className="text-2xl pl-3 font-bold text-green-800">
                {navigation.find((item) => item.href === pathname)?.name ||
                  "Dashboard"}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-600 hover:text-green-700 hidden sm:block"
              >
                View Website →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-73px)]">{children}</main>
      </div>
    </div>
  );
}
