import { z } from "zod";

export const partnershipSchema = z.object({
  organizationName: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name is too long")
    .trim(),
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters")
    .max(100, "Contact person name is too long")
    .trim(),
  email: z.string().email("Enter a valid email address").toLowerCase().trim(),
  phoneNumber: z
    .string()
    .min(4, "Phone number must be at least 4 digits")
    .max(16, "Phone number is too long")
    .trim(),
  organizationType: z.string().min(1, "Please select an organization type"),
  areaOfInterest: z.string().min(1, "Please select an Area of Interest"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long")
    .trim(),
});

export type PartnershipFormValues = z.infer<typeof partnershipSchema>;
