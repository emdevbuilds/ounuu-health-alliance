"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Eye, DollarSign, Trash2 } from "lucide-react";
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

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await fetch("/api/admin/donations");
      const data = await res.json();
      if (data.success) {
        setDonations(data.data.donations);
        setStats(data.data.stats);
      }
    } catch (error) {
      toast.error("Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  const deleteDonation = async (id: string, donorName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete the donation from ${donorName}? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/donations?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Donation deleted successfully");
        fetchDonations(); // Refresh the list
      } else {
        toast.error(data.message || "Failed to delete donation");
      }
    } catch (error) {
      toast.error("Failed to delete donation");
    }
  };

  const filteredDonations = donations.filter((d: any) => {
    const matchesSearch =
      d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || d.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
    }).format(amount);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Donations</h1>
          <p className="text-gray-600">Manage and track donations</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Total Donations</p>
          <p className="text-3xl font-bold text-green-800">
            {stats.total || 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Total Amount</p>
          <p className="text-2xl font-bold text-blue-800">
            {formatCurrency(stats.totalAmount || 0, "NGN")}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Successful</p>
          <p className="text-3xl font-bold text-green-800">
            {stats.successful || 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100"
        >
          <p className="text-gray-600 mb-2 font-medium">Pending</p>
          <p className="text-3xl font-bold text-orange-800">
            {stats.pending || 0}
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
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "success", "pending", "failed"].map((status) => (
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
        ) : filteredDonations.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No donations found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-green-50">
                <TableHead className="font-bold text-green-800">
                  Donor
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Email
                </TableHead>
                <TableHead className="font-bold text-green-800">
                  Amount
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
              {filteredDonations.map((donation: any) => (
                <TableRow key={donation._id} className="hover:bg-green-50/50">
                  <TableCell className="font-medium">
                    {donation.isAnonymous ? "Anonymous" : donation.fullName}
                  </TableCell>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell className="font-semibold text-green-700">
                    {formatCurrency(donation.amount, donation.currency)}
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{donation.donationType}</span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        donation.paymentStatus === "success"
                          ? "bg-green-100 text-green-700"
                          : donation.paymentStatus === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {donation.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDonation(donation)}
                        className="hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {/* Allow deletion of pending, failed, or abandoned donations */}
                      {(donation.paymentStatus === "pending" ||
                        donation.paymentStatus === "failed" ||
                        donation.paymentStatus === "abandoned") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            deleteDonation(
                              donation._id,
                              donation.isAnonymous
                                ? "Anonymous Donor"
                                : donation.fullName,
                            )
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

      {/* View Donation Dialog */}
      <Dialog
        open={!!selectedDonation}
        onOpenChange={() => setSelectedDonation(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-800">
              Donation Details
            </DialogTitle>
          </DialogHeader>
          {selectedDonation && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Donor Name
                  </p>
                  <p className="text-lg">
                    {selectedDonation.isAnonymous
                      ? "Anonymous Donor"
                      : selectedDonation.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Email
                  </p>
                  <p className="text-lg break-all whitespace-normal">
                    {selectedDonation.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Amount
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {formatCurrency(
                      selectedDonation.amount,
                      selectedDonation.currency,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Donation Type
                  </p>
                  <p className="text-lg capitalize">
                    {selectedDonation.donationType}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Payment Status
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedDonation.paymentStatus === "success"
                        ? "bg-green-100 text-green-700"
                        : selectedDonation.paymentStatus === "pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedDonation.paymentStatus}
                  </span>
                </div>
                {selectedDonation.phone && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Phone
                    </p>
                    <p className="text-lg">{selectedDonation.phone}</p>
                  </div>
                )}
              </div>

              {selectedDonation.purpose && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Purpose
                  </p>
                  <p className="text-lg">{selectedDonation.purpose}</p>
                </div>
              )}

              {selectedDonation.message && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Message
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                    <p className="whitespace-pre-wrap">
                      {selectedDonation.message}
                    </p>
                  </div>
                </div>
              )}

              {selectedDonation.paystackReference && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Transaction Reference
                  </p>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {selectedDonation.paystackReference}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Donated:{" "}
                  {new Date(selectedDonation.createdAt).toLocaleString()}
                </p>
                {selectedDonation.paidAt && (
                  <p className="text-sm text-gray-600">
                    Paid: {new Date(selectedDonation.paidAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
