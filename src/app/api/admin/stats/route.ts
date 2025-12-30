import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";
import Contact from "@/models/Contact";
import Volunteer from "@/models/Volunteer";
import Partnership from "@/models/Partnership";
import Donation from "@/models/Donation";

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    await requireAuth();

    await connectDB();

    // Get counts and stats
    const [
      totalContacts,
      newContacts,
      totalVolunteers,
      newVolunteers,
      totalPartnerships,
      newPartnerships,
      totalDonations,
      totalDonationAmount,
      recentDonations,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Volunteer.countDocuments(),
      Volunteer.countDocuments({ status: "new" }),
      Partnership.countDocuments(),
      Partnership.countDocuments({ status: "new" }),
      Donation.countDocuments({ paymentStatus: "success" }),
      Donation.aggregate([
        { $match: { paymentStatus: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Donation.find({ paymentStatus: "success" })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("amount currency donationType createdAt isAnonymous fullName")
        .lean(),
    ]);

    // Recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fullName email subject status createdAt")
      .lean();

    // Recent volunteers
    const recentVolunteers = await Volunteer.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fullName email areaOfInterest status createdAt")
      .lean();

    const stats = {
      contacts: {
        total: totalContacts,
        new: newContacts,
        recent: recentContacts,
      },
      volunteers: {
        total: totalVolunteers,
        new: newVolunteers,
        recent: recentVolunteers,
      },
      partnerships: {
        total: totalPartnerships,
        new: newPartnerships,
      },
      donations: {
        total: totalDonations,
        totalAmount: totalDonationAmount[0]?.total || 0,
        recent: recentDonations,
      },
    };

    return ApiResponse.success(stats, "Stats fetched successfully");
  } catch (err: any) {
    console.error("Stats error:", err);

    if (err.message === "Unauthorized") {
      return ApiResponse.error("Unauthorized", 401);
    }

    return ApiResponse.error("Failed to fetch stats", 500);
  }
}
