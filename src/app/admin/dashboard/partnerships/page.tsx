"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Handshake, Search, Eye, Trash2 } from "lucide-react";
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

export default function PartnershipsPage() {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPartnership, setSelectedPartnership] = useState<any>(null);

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const fetchPartnerships = async () => {
    try {
      const res = await fetch("/api/admin/partnerships");
      const data = await res.json();
      if (data.success) setPartnerships(data.data.partnerships);
    } catch (error) {
      toast.error("Failed to fetch partnerships");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/partnerships", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Status updated");
        fetchPartnerships();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deletePartnership = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partnership inquiry?"))
      return;

    try {
      const res = await fetch(`/api/admin/partnerships?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Partnership deleted");
        fetchPartnerships();
      }
    } catch (error) {
      toast.error("Failed to delete partnership");
    }
  };

  const filteredPartnerships = partnerships.filter((p: any) => {
    const matchesSearch =
      p.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: partnerships.length,
    new: partnerships.filter((p: any) => p.status === "new").length,
    read: partnerships.filter((p: any) => p.status === "read").length,
    responded: partnerships.filter((p: any) => p.status === "responded").length,
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Partnership Inquiries
          </h1>
          <p className="text-gray-600">Manage partnership requests</p>
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
              placeholder="Search partnerships..."
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
        ) : filteredPartnerships.length === 0 ? (
          <div className="text-center py-20">
            <Handshake className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No partnerships found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-green-50">
                <TableHead className="font-bold text-green-800">
                  Organization
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Contact Person
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Email
                </TableHead>
                <TableHead className="font-bold text-green-800">Type</TableHead>
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
              {filteredPartnerships.map((partnership: any) => (
                <TableRow
                  key={partnership._id}
                  className="hover:bg-green-50/50"
                >
                  <TableCell className="font-medium">
                    {partnership.organizationName}
                  </TableCell>
                  <TableCell>{partnership.contactPerson}</TableCell>
                  <TableCell>{partnership.email}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {partnership.organizationType}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        partnership.status === "new"
                          ? "bg-red-100 text-red-700"
                          : partnership.status === "read"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {partnership.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(partnership.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPartnership(partnership)}
                        className="hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {partnership.status === "new" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(partnership._id, "read")}
                          className="hover:bg-green-50"
                        >
                          Mark Read
                        </Button>
                      )}
                      {partnership.status !== "responded" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateStatus(partnership._id, "responded")
                          }
                          className="hover:bg-purple-50"
                        >
                          Responded
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePartnership(partnership._id)}
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

      {/* View Partnership Dialog */}
      <Dialog
        open={!!selectedPartnership}
        onOpenChange={() => setSelectedPartnership(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-800">
              Partnership Inquiry Details
            </DialogTitle>
          </DialogHeader>
          {selectedPartnership && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Organization
                  </p>
                  <p className="text-lg">
                    {selectedPartnership.organizationName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Contact Person
                  </p>
                  <p className="text-lg">{selectedPartnership.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Email
                  </p>
                  <p className="text-lg">{selectedPartnership.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Phone
                  </p>
                  <p className="text-lg">{selectedPartnership.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Organization Type
                  </p>
                  <p className="text-lg">
                    {selectedPartnership.organizationType}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Area of Interest
                  </p>
                  <p className="text-lg">
                    {selectedPartnership.areaOfInterest}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Message
                </p>
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                  <p className="whitespace-pre-wrap">
                    {selectedPartnership.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Submitted:{" "}
                  {new Date(selectedPartnership.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2">
                  {selectedPartnership.status !== "responded" && (
                    <Button
                      onClick={() => {
                        updateStatus(selectedPartnership._id, "responded");
                        setSelectedPartnership(null);
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
