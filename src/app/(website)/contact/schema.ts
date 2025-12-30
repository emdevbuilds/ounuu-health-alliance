import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim(),
  email: z.string().email("Enter a valid email address").toLowerCase().trim(),
  subject: z
    .string()
    .max(200, "Subject is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long")
    .trim(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
