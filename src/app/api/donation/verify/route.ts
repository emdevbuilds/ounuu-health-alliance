import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const reference = searchParams.get("reference");

    if (!reference) {
      return ApiResponse.error("Payment reference is required", 400);
    }

    await connectDB();

    // Verify payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return ApiResponse.error(
        paystackData.message || "Payment verification failed",
        400
      );
    }

    const transactionData = paystackData.data;

    // Find and update donation
    const donation = await Donation.findOne({ paystackReference: reference });

    if (!donation) {
      return ApiResponse.error("Donation not found", 404);
    }

    // Update donation status based on payment status
    if (transactionData.status === "success") {
      donation.paymentStatus = "success";
      donation.transactionId = transactionData.id;
      donation.paidAt = new Date(transactionData.paid_at);
    } else if (transactionData.status === "failed") {
      donation.paymentStatus = "failed";
    } else {
      donation.paymentStatus = "abandoned";
    }

    await donation.save();

    return ApiResponse.success(
      {
        donationId: donation._id,
        status: donation.paymentStatus,
        amount: donation.amount,
        currency: donation.currency,
        paidAt: donation.paidAt,
      },
      `Payment ${donation.paymentStatus}`,
      200
    );
  } catch (err: any) {
    console.error("Payment verification error:", err);

    return ApiResponse.error(
      "Failed to verify payment. Please contact support.",
      500
    );
  }
}
