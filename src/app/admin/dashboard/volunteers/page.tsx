"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Search, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
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

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await fetch("/api/admin/volunteers");
      const data = await res.json();
      if (data.success) setVolunteers(data.data.volunteers);
    } catch (error) {
      toast.error("Failed to fetch volunteers");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/volunteers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Status updated");
        fetchVolunteers();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteVolunteer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this volunteer application?"))
      return;

    try {
      const res = await fetch(`/api/admin/volunteers?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Volunteer deleted");
        fetchVolunteers();
      }
    } catch (error) {
      toast.error("Failed to delete volunteer");
    }
  };

  const filteredVolunteers = volunteers.filter((v: any) => {
    const matchesSearch =
      v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: volunteers.length,
    new: volunteers.filter((v: any) => v.status === "new").length,
    read: volunteers.filter((v: any) => v.status === "read").length,
    responded: volunteers.filter((v: any) => v.status === "responded").length,
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Volunteer Applications
          </h1>
          <p className="text-gray-600">Manage volunteer applications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Total</p>
          <p className="text-3xl font-bold text-green-800">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-100"
        >
          <p className="text-gray-600 mb-2 font-medium">New</p>
          <p className="text-3xl font-bold text-red-800">{stats.new}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Read</p>
          <p className="text-3xl font-bold text-blue-800">{stats.read}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Responded</p>
          <p className="text-3xl font-bold text-purple-800">
            {stats.responded}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search volunteers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "new", "read", "responded"].map((status) => (
              <Button
                key={status}
                onClick={() => setStatusFilter(status)}
                variant={statusFilter === status ? "default" : "outline"}
                className={
                  statusFilter === status
                    ? "bg-green-700 hover:bg-green-800"
                    : ""
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
          </div>
        ) : filteredVolunteers.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No volunteers found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-green-50">
                <TableHead className="font-bold text-green-800">Name</TableHead>
                <TableHead className="font-bold text-green-800">
                  Email
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Area of Interest
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Status
                </TableHead>
                <TableHead className="font-bold text-green-800">Date</TableHead>
                <TableHead className="font-bold text-green-800 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.map((volunteer: any) => (
                <TableRow key={volunteer._id} className="hover:bg-green-50/50">
                  <TableCell className="font-medium">
                    {volunteer.fullName}
                  </TableCell>
                  <TableCell>{volunteer.email}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {volunteer.areaOfInterest}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        volunteer.status === "new"
                          ? "bg-red-100 text-red-700"
                          : volunteer.status === "read"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(volunteer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedVolunteer(volunteer)}
                        className="hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {volunteer.status === "new" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(volunteer._id, "read")}
                          className="hover:bg-green-50"
                        >
                          Mark Read
                        </Button>
                      )}
                      {volunteer.status !== "responded" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateStatus(volunteer._id, "responded")
                          }
                          className="hover:bg-purple-50"
                        >
                          Responded
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteVolunteer(volunteer._id)}
                        className="hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* View Volunteer Dialog */}
      <Dialog
        open={!!selectedVolunteer}
        onOpenChange={() => setSelectedVolunteer(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-800">
              Volunteer Application Details
            </DialogTitle>
          </DialogHeader>
          {selectedVolunteer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Full Name
                  </p>
                  <p className="text-lg">{selectedVolunteer.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Email
                  </p>
                  <p className="text-lg">{selectedVolunteer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Phone Number
                  </p>
                  <p className="text-lg">{selectedVolunteer.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Gender
                  </p>
                  <p className="text-lg">{selectedVolunteer.gender}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Address
                </p>
                <p className="text-lg">{selectedVolunteer.address}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Area of Interest
                </p>
                <p className="text-lg">{selectedVolunteer.areaOfInterest}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Skills and Experience
                </p>
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                  <p className="whitespace-pre-wrap">
                    {selectedVolunteer.skillAndExperience}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Motivation
                </p>
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                  <p className="whitespace-pre-wrap">
                    {selectedVolunteer.motivation}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Applied:{" "}
                  {new Date(selectedVolunteer.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2">
                  {selectedVolunteer.status !== "responded" && (
                    <Button
                      onClick={() => {
                        updateStatus(selectedVolunteer._id, "responded");
                        setSelectedVolunteer(null);
                      }}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      Mark as Responded
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
