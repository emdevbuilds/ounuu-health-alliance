"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Trash2, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "admin",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) setAdmins(data.data.admins);
    } catch (error) {
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Admin user created successfully!");
        setShowCreateDialog(false);
        setFormData({ email: "", password: "", name: "", role: "admin" });
        fetchAdmins();
      } else {
        toast.error(data.message || "Failed to create admin");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteAdmin = async (id: string, email: string) => {
    if (email === "admin@ounuu.org") {
      toast.error("Cannot delete the main admin account!");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${email}?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Admin deleted successfully");
        fetchAdmins();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete admin");
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Admin ${!currentStatus ? "activated" : "deactivated"}`);
        fetchAdmins();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update admin");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Admin Users
          </h1>
          <p className="text-gray-600">Manage admin accounts and permissions</p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-green-700 hover:bg-green-800 flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Create New Admin
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Total Admins</p>
          <p className="text-3xl font-bold text-green-800">{admins.length}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Active</p>
          <p className="text-3xl font-bold text-blue-800">
            {admins.filter((a: any) => a.isActive).length}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Super Admins</p>
          <p className="text-3xl font-bold text-purple-800">
            {admins.filter((a: any) => a.role === "super_admin").length}
          </p>
        </motion.div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-green-50">
                <TableHead className="font-bold text-green-800">Name</TableHead>
                <TableHead className="font-bold text-green-800">
                  Email
                </TableHead>
                <TableHead className="font-bold text-green-800">Role</TableHead>
                <TableHead className="font-bold text-green-800">
                  Status
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Last Login
                </TableHead>
                <TableHead className="font-bold text-green-800 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin: any) => (
                <TableRow key={admin._id} className="hover:bg-green-50/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {admin.role === "super_admin" && (
                        <Shield className="w-4 h-4 text-purple-600" />
                      )}
                      {admin.name}
                    </div>
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        admin.role === "super_admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {admin.role.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        admin.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {admin.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {admin.lastLogin
                      ? new Date(admin.lastLogin).toLocaleDateString()
                      : "Never"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleToggleActive(admin._id, admin.isActive)
                        }
                        className="hover:bg-blue-50"
                      >
                        {admin.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      {admin.email !== "admin@ounuu.org" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDeleteAdmin(admin._id, admin.email)
                          }
                          className="hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Create Admin Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-800">
              Create New Admin
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password (min 8 characters)
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-700 hover:bg-green-800"
              >
                Create Admin
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
