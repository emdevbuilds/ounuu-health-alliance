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
import {
  Loader,
  DollarSign,
  CreditCard,
  Heart,
  Lock,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
        return 2;
      case "NGN":
      default:
        return 100;
    }
  };

  const getPresetAmounts = () => {
    switch (selectedCurrency) {
      case "USD":
        return [10, 100, 500, 1000, 5000, 10000];
      case "NGN":
      default:
        return [500, 1000, 5000, 10000, 50000, 80000];
    }
  };

  const presetAmounts = getPresetAmounts();

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
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Heart className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-bold text-green-800 text-2xl md:text-3xl">
                  Make Your Donation
                </h3>
              </div>
            </FieldLegend>

            <FieldGroup className="space-y-6">
              {/* Donation Type */}
              <Field>
                <FieldLabel className="text-lg font-semibold text-green-800 mb-3">
                  How would you like to give?
                </FieldLabel>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`relative flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      donationType === "one-time"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value="one-time"
                      {...register("donationType")}
                      className="sr-only"
                    />
                    <DollarSign className="w-5 h-5 text-green-700" />
                    <span className="font-semibold">One-time</span>
                    {donationType === "one-time" && (
                      <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-green-600" />
                    )}
                  </label>
                  <label
                    className={`relative flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      donationType === "monthly"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value="monthly"
                      {...register("donationType")}
                      className="sr-only"
                    />
                    <Heart className="w-5 h-5 text-green-700" />
                    <span className="font-semibold">Monthly</span>
                    {donationType === "monthly" && (
                      <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-green-600" />
                    )}
                  </label>
                </div>
                {donationType === "monthly" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-green-700 bg-green-50 p-3 rounded-lg"
                  >
                    💚 Monthly donations help us plan better and create
                    sustainable impact!
                  </motion.p>
                )}
              </Field>

              {/* Currency & Amount Selection */}
              <Field>
                <FieldLabel className="text-lg font-semibold text-green-800 mb-3">
                  Choose your donation amount
                </FieldLabel>

                {/* Currency Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    {...register("currency")}
                    disabled={isSubmitting}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base focus:border-green-600 focus:outline-none transition-colors"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preset Amounts */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <motion.button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-2.5 px-2 sm:py-3 sm:px-4 rounded-xl border-2 font-semibold text-sm sm:text-base transition-all ${
                        selectedAmount === amount
                          ? "bg-green-700 text-white border-green-700 shadow-lg"
                          : "border-gray-200 hover:border-green-600 hover:bg-green-50"
                      }`}
                      disabled={isSubmitting}
                    >
                      <span className="block truncate">
                        {getCurrencySymbol()}
                        {amount.toLocaleString()}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    {getCurrencySymbol()}
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    disabled={isSubmitting}
                    min={getMinimumAmount()}
                    className="pl-10 py-6 text-lg border-2 rounded-xl focus:border-green-600"
                  />
                </div>
                {errors.amount && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 mt-2 flex items-center gap-2"
                  >
                    <span>⚠️</span> {errors.amount.message}
                  </motion.p>
                )}
              </Field>

              {/* Purpose */}
              <Field>
                <FieldLabel className="text-lg font-semibold text-green-800 mb-3">
                  What would you like to support? (Optional)
                </FieldLabel>
                <select
                  {...register("purpose")}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base focus:border-green-600 focus:outline-none transition-colors"
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
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isAnonymous
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    {...register("isAnonymous")}
                    className="w-5 h-5 text-green-700 rounded focus:ring-green-500"
                    disabled={isSubmitting}
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800">
                      Make this donation anonymous
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Your name will not be displayed publicly
                    </p>
                  </div>
                </label>
              </Field>

              {/* Donor Information */}
              <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-6 border-2 border-gray-100">
                <h4 className="text-lg font-semibold text-green-800 mb-4">
                  {isAnonymous ? "Contact Information" : "Your Information"}
                </h4>

                <div className="space-y-4">
                  {!isAnonymous && (
                    <Field>
                      <FieldLabel className="text-base font-medium text-gray-700">
                        Full Name *
                      </FieldLabel>
                      <Input
                        placeholder="John Doe"
                        disabled={isSubmitting}
                        {...register("fullName")}
                        aria-invalid={errors.fullName ? "true" : "false"}
                        className="border-2 rounded-xl py-6"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-600 mt-2">
                          {errors.fullName.message}
                        </p>
                      )}
                    </Field>
                  )}

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700">
                      Email {isAnonymous ? "(for receipt)" : ""} *
                    </FieldLabel>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                      className="border-2 rounded-xl py-6"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </Field>

                  {!isAnonymous && (
                    <Field>
                      <FieldLabel className="text-base font-medium text-gray-700">
                        Phone Number (Optional)
                      </FieldLabel>
                      <Input
                        type="tel"
                        placeholder="+234 800 000 0000"
                        disabled={isSubmitting}
                        {...register("phone")}
                        className="border-2 rounded-xl py-6"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 mt-2">
                          {errors.phone.message}
                        </p>
                      )}
                    </Field>
                  )}
                </div>
              </div>

              {/* Message */}
              <Field>
                <FieldLabel className="text-lg font-semibold text-green-800 mb-3">
                  Leave a Message (Optional)
                </FieldLabel>
                <Textarea
                  placeholder="Share why you're supporting our mission..."
                  rows={4}
                  disabled={isSubmitting}
                  {...register("message")}
                  className="border-2 rounded-xl resize-none"
                />
                {errors.message && (
                  <p className="text-sm text-red-600 mt-2">
                    {errors.message.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Payment Security Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Lock className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Secure Payment Processing
                </h4>
                <p className="text-sm text-blue-800">
                  You will be redirected to Paystack to complete your{" "}
                  {donationType === "monthly" ? "monthly" : "one-time"} donation
                  securely. All transactions are encrypted and protected.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  <span className="hidden sm:inline">
                    Processing Your Donation...
                  </span>
                  <span className="sm:hidden">Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  <span>Donate Now</span>
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-center text-sm text-gray-500 mt-4">
            By donating, you agree to our terms and conditions
          </p>
        </FieldGroup>
      </form>
    </div>
  );
};

export default DonationForm;
