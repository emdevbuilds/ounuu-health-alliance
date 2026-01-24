"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { members } from "@/lib/members";
import Image from "next/image";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";

export default function IDCardPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [qrCode, setQrCode] = useState("");
  const [verifyUrl, setVerifyUrl] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const member = members.find((m) => m.slug === slug);

  useEffect(() => {
    if (member) {
      const url = `${window.location.origin}/verify-id/${member.slug}`;
      setVerifyUrl(url);
      QRCode.toDataURL(url, {
        width: 200,
        margin: 1,
        color: {
          dark: "#16a34a",
          light: "#ffffff",
        },
      }).then(setQrCode);
    }
  }, [member]);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Member Not Found
          </h1>
          <p className="text-gray-600">
            No team member found with slug: {slug}
          </p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      const { domToPng } = await import("modern-screenshot");

      if (cardRef.current) {
        const dataUrl = await domToPng(cardRef.current, {
          scale: 3,
          quality: 1,
          style: {
            margin: "0",
          },
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${member.slug}-id-card.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading card:", error);
      alert("Failed to download card. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 no-print">
        {/* Print Buttons - Hidden when printing */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-green-800">
                ID Card Generator
              </h1>
              <p className="text-sm text-gray-600">
                {member.title} {member.name}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handlePrint}
                className="bg-green-700 hover:bg-green-800 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* ID Card Container */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <div
              ref={cardRef}
              className="w-[400px] h-[250px] bg-white rounded-2xl shadow-2xl overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              }}
            >
              {/* Header */}
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-700">O</span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-sm">
                      OUNUU HEALTH ALLIANCE
                    </h2>
                    <p className="text-white/80 text-xs">Official Staff ID</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex items-center gap-4 px-6 py-4">
                {/* Photo */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                  <Image
                    src={member.picture}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg truncate">
                    {member.title} {member.name.split(" ")[0]}{" "}
                    {member.name.split(" ")[member.name.split(" ").length - 1]}
                  </h3>
                  <p className="text-white/90 text-sm mb-1 truncate">
                    {member.role}
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 inline-block">
                    <p className="text-white text-xs font-mono">
                      ID: {member.slug.toUpperCase().slice(0, 10)}
                    </p>
                  </div>
                </div>

                {/* QR Code */}
                {qrCode && (
                  <div className="bg-white p-2 rounded-lg flex-shrink-0">
                    <Image
                      src={qrCode}
                      alt="QR Code"
                      width={70}
                      height={70}
                      className="rounded"
                    />
                    <p className="text-[8px] text-center text-gray-600 mt-1">
                      Scan to Verify
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm px-6 py-2 border-t border-white/20">
                <div className="flex items-center justify-between text-white/80 text-xs">
                  <span>📧 {member.contact.email.split("@")[0]}...</span>
                  <span>📞 {member.contact.phone.slice(0, 9)}...</span>
                  <span>Valid • 2025</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-20 right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-green-800 mb-3">
              ℹ️ ID Card Instructions
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">1.</span>
                <span>
                  Click <strong>Print</strong> to print this ID card on card
                  stock (recommended: 300gsm)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">2.</span>
                <span>
                  The QR code links to:{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {verifyUrl}
                  </code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">3.</span>
                <span>
                  Anyone can scan the QR code to verify this ID is authentic
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">4.</span>
                <span>
                  Recommended size: Standard ID card (85.6mm × 54mm / 3.375" ×
                  2.125")
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Print-only version */}
      <div className="print-only">
        <div
          className="w-[400px] h-[250px] bg-white rounded-2xl overflow-hidden relative border-2 border-gray-300"
          style={{
            background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
          }}
        >
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-700">O</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-sm">
                  OUNUU HEALTH ALLIANCE
                </h2>
                <p className="text-white/80 text-xs">Official Staff ID</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex items-center gap-4 px-6 py-4">
            {/* Photo */}
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              <Image
                src={member.picture}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-lg truncate">
                {member.title} {member.name.split(" ")[0]}{" "}
                {member.name.split(" ")[member.name.split(" ").length - 1]}
              </h3>
              <p className="text-white/90 text-sm mb-1 truncate">
                {member.role}
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 inline-block">
                <p className="text-white text-xs font-mono">
                  ID: {member.slug.toUpperCase().slice(0, 10)}
                </p>
              </div>
            </div>

            {/* QR Code */}
            {qrCode && (
              <div className="bg-white p-2 rounded-lg flex-shrink-0">
                <Image
                  src={qrCode}
                  alt="QR Code"
                  width={70}
                  height={70}
                  className="rounded"
                />
                <p className="text-[8px] text-center text-gray-600 mt-1">
                  Scan to Verify
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm px-6 py-2 border-t border-white/20">
            <div className="flex items-center justify-between text-white/80 text-xs">
              <span>📧 {member.contact.email.split("@")[0]}...</span>
              <span>📞 {member.contact.phone.slice(0, 9)}...</span>
              <span>Valid • {new Date().getFullYear()}</span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        .no-print {
          display: block;
        }

        .print-only {
          display: none;
        }

        @media print {
          body {
            margin: 0;
            padding: 0;
          }

          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
          }

          @page {
            size: 400px 250px;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}
