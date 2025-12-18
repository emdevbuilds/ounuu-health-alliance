"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationSchema, DonationFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  Field,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const DonationForm = () => {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const purposes = [
    "General Support",
    "Education",
    "Healthcare",
    "Food Relief",
    "Emergency Response",
    "Other",
  ];

  const currencies = [
    { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
    { code: "USD", symbol: "$", name: "US Dollar" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      amount: 0,
      currency: "NGN",
      donationType: "one-time",
      purpose: "",
      message: "",
      isAnonymous: false,
    },
  });

  const isAnonymous = watch("isAnonymous");
  const donationType = watch("donationType");
  const selectedCurrency = watch("currency");

  const getCurrencySymbol = () => {
    return currencies.find((c) => c.code === selectedCurrency)?.symbol || "₦";
  };

  const getMinimumAmount = () => {
    switch (selectedCurrency) {
      case "USD":
        return 2; // $2 minimum (Paystack requirement)
      case "NGN":
      default:
        return 100; // ₦100 minimum
    }
  };

  const getPresetAmounts = () => {
    switch (selectedCurrency) {
      case "USD":
        return [5, 10, 25, 50, 100]; // Removed $2 since minimum is now $2
      case "NGN":
      default:
        return [500, 1000, 2500, 5000, 10000];
    }
  };

  const presetAmounts = getPresetAmounts();

  // Reset amount when currency changes
  useEffect(() => {
    setSelectedAmount(null);
    setCustomAmount("");
    setValue("amount", 0);
  }, [selectedCurrency, setValue]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setValue("amount", amount, { shouldValidate: true });
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    const numValue = parseInt(value) || 0;
    setValue("amount", numValue, { shouldValidate: true });
  };

  const onSubmit = async (data: DonationFormValues) => {
    try {
      const res = await fetch("/api/donation/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // Redirect to Paystack payment page
        window.location.href = result.data.authorizationUrl;
      } else {
        toast.error(
          result.message || "Failed to process donation. Please try again.",
          {
            position: "top-center",
          }
        );
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try submitting again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>
              <h3 className="font-semibold text-green-800 pb-3 md:text-2xl">
                Make a Donation
              </h3>
            </FieldLegend>

            <FieldGroup>
              {/* Donation Type */}
              <Field>
                <FieldLabel className="text-base">Donation Type *</FieldLabel>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="one-time"
                      {...register("donationType")}
                      className="w-4 h-4 text-green-700"
                    />
                    <span>One-time</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="monthly"
                      {...register("donationType")}
                      className="w-4 h-4 text-green-700"
                    />
                    <span>Monthly</span>
                  </label>
                </div>
              </Field>

              {/* Amount Selection */}
              <Field>
                <FieldLabel className="text-base">Donation Amount *</FieldLabel>

                {/* Currency Selector */}
                <div className="mb-3">
                  <select
                    {...register("currency")}
                    disabled={isSubmitting}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-700 focus:outline-none"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-2 px-4 rounded-md border-2 transition-colors ${
                        selectedAmount === amount
                          ? "bg-green-700 text-white border-green-700"
                          : "border-gray-300 hover:border-green-700"
                      }`}
                      disabled={isSubmitting}
                    >
                      {getCurrencySymbol()}
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Or enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  disabled={isSubmitting}
                  min={getMinimumAmount()}
                />
                {errors.amount && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </Field>

              {/* Purpose */}
              <Field>
                <FieldLabel className="text-base">
                  Purpose (Optional)
                </FieldLabel>
                <select
                  {...register("purpose")}
                  disabled={isSubmitting}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-700 focus:outline-none"
                >
                  <option value="">Select a purpose</option>
                  {purposes.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Anonymous Donation */}
              <Field>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isAnonymous")}
                    className="w-4 h-4 text-green-700 rounded"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm">Make this donation anonymous</span>
                </label>
              </Field>

              {/* Donor Information */}
              {!isAnonymous && (
                <>
                  <Field>
                    <FieldLabel className="text-base">Full Name *</FieldLabel>
                    <Input
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                      {...register("fullName")}
                      aria-invalid={errors.fullName ? "true" : "false"}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-base">Email *</FieldLabel>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-base">
                      Phone (Optional)
                    </FieldLabel>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      disabled={isSubmitting}
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </Field>
                </>
              )}

              {isAnonymous && (
                <Field>
                  <FieldLabel className="text-base">
                    Email (for receipt) *
                  </FieldLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </Field>
              )}

              {/* Message */}
              <Field>
                <FieldLabel className="text-base">
                  Message (Optional)
                </FieldLabel>
                <Textarea
                  placeholder="Leave a message with your donation..."
                  rows={4}
                  disabled={isSubmitting}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-sm text-gray-600">
              You will be redirected to Paystack to complete your{" "}
              {donationType === "monthly" ? "monthly" : "one-time"} donation
              securely.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 text-white hover:bg-green-800 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Proceed to Payment`
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default DonationForm;
