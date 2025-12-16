import { z } from "zod";

export const donationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim(),
  email: z.string().email("Enter a valid email address").toLowerCase().trim(),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number")
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  amount: z
    .number()
    .min(100, "Minimum donation is ₦100")
    .max(10000000, "Amount is too large"),
  currency: z.enum(["NGN", "USD", "GHS", "ZAR"]),
  donationType: z.enum(["one-time", "monthly"]),
  purpose: z
    .string()
    .max(200, "Purpose is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .max(500, "Message is too long")
    .optional()
    .or(z.literal("")),
  isAnonymous: z.boolean(),
});

export type DonationFormValues = z.infer<typeof donationSchema>;
