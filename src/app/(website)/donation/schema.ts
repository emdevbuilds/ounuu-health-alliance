import { z } from "zod";

export const donationSchema = z
  .object({
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
    amount: z.number().positive("Amount must be greater than zero"),
    currency: z.enum(["NGN", "USD"]),
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
  })
  .refine(
    (data) => {
      // Currency-specific minimum validation
      const minimums: Record<string, number> = {
        NGN: 100,
        USD: 2, // Paystack minimum for USD
      };
      return data.amount >= minimums[data.currency];
    },
    {
      message: "Amount is below minimum",
      path: ["amount"],
    }
  )
  .superRefine((data, ctx) => {
    // Add custom error message based on currency
    const minimums: Record<string, number> = {
      NGN: 100,
      USD: 2, // Paystack minimum for USD
    };

    if (data.amount < minimums[data.currency]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          data.currency === "USD"
            ? "Minimum donation is $2"
            : "Minimum donation is ₦100",
        path: ["amount"],
      });
    }
  });

export type DonationFormValues = z.infer<typeof donationSchema>;
