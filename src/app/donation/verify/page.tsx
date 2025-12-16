"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function VerifyDonationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [donationDetails, setDonationDetails] = useState<any>(null);

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      setStatus("failed");
      setMessage("Invalid payment reference");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/donation/verify?reference=${reference}`);
        const result = await res.json();

        if (res.ok && result.data.status === "success") {
          setStatus("success");
          setMessage("Thank you for your generous donation!");
          setDonationDetails(result.data);
        } else {
          setStatus("failed");
          setMessage(
            result.message ||
              "Payment verification failed. Please contact support."
          );
        }
      } catch (error) {
        setStatus("failed");
        setMessage("An error occurred while verifying your payment.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === "loading" && (
          <>
            <Loader className="w-16 h-16 text-green-700 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-semibold mb-2">
              Verifying Payment...
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your donation.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-700 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              Donation Successful!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            {donationDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Amount:</strong> {donationDetails.currency}{" "}
                  {donationDetails.amount?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(donationDetails.paidAt).toLocaleDateString()}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-green-700 hover:bg-green-800"
              >
                Return Home
              </Button>
              <Button
                onClick={() => router.push("/donation")}
                variant="outline"
                className="w-full"
              >
                Make Another Donation
              </Button>
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-red-800 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/donation")}
                className="w-full bg-green-700 hover:bg-green-800"
              >
                Try Again
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full"
              >
                Return Home
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyDonation() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Loader className="w-16 h-16 text-green-700 animate-spin" />
        </div>
      }
    >
      <VerifyDonationContent />
    </Suspense>
  );
}
