import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { ApiResponse } from "@/lib/api-response";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      return ApiResponse.error("No signature found", 400);
    }

    // Verify webhook signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return ApiResponse.error("Invalid signature", 400);
    }

    const event = JSON.parse(body);

    await connectDB();

    if (event.event === "charge.success") {
      const { reference, status, paid_at, id } = event.data;

      const donation = await Donation.findOne({ paystackReference: reference });

      if (donation) {
        donation.paymentStatus = "success";
        donation.transactionId = id;
        donation.paidAt = new Date(paid_at);
        await donation.save();

        // console.log(`Donation ${donation._id} completed successfully`);
      }
    } else if (event.event === "charge.failed") {
      const { reference } = event.data;

      const donation = await Donation.findOne({ paystackReference: reference });

      if (donation) {
        donation.paymentStatus = "failed";
        await donation.save();
      }
    }

    return ApiResponse.success(null, "Webhook processed", 200);
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return ApiResponse.error("Webhook processing failed", 500);
  }
}
