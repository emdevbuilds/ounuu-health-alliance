import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { ApiResponse } from "@/lib/api-response";
import { donationSchema } from "@/app/(website)/donation/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = donationSchema.parse(body);

    await connectDB();

    // Create donation record
    const donation = await Donation.create({
      ...validatedData,
      paymentStatus: "pending",
    });

    // Initialize Paystack transaction
    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validatedData.email,
          amount: validatedData.amount * 100, // Convert to kobo
          currency: validatedData.currency,
          reference: donation._id.toString(),
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation/verify`,
          metadata: {
            donationId: donation._id.toString(),
            fullName: validatedData.fullName,
            phone: validatedData.phone,
            purpose: validatedData.purpose,
            donationType: validatedData.donationType,
            // isAnonymous: validatedData.isAnonymous,
          },
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      throw new Error(paystackData.message || "Failed to initialize payment");
    }

    // Update donation with Paystack reference and access code
    donation.paystackReference = paystackData.data.reference;
    donation.paystackAccessCode = paystackData.data.access_code;
    await donation.save();

    return ApiResponse.success(
      {
        donationId: donation._id,
        authorizationUrl: paystackData.data.authorization_url,
        reference: paystackData.data.reference,
        accessCode: paystackData.data.access_code,
      },
      "Payment initialized successfully",
      200
    );
  } catch (err: any) {
    console.error("Donation initialization error:", err);

    if (err.name === "ZodError") {
      return ApiResponse.error(
        "Validation failed",
        400,
        err.errors.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
        }))
      );
    }

    if (err.name === "ValidationError") {
      return ApiResponse.error(
        "Validation failed",
        400,
        Object.values(err.errors).map((e: any) => ({
          field: e.path,
          message: e.message,
        }))
      );
    }

    return ApiResponse.error(
      err.message || "Failed to initialize donation. Please try again later.",
      500
    );
  }
}
