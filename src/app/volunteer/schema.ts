import { z } from "zod";

export const volunteerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long")
    .trim(),
  email: z.string().email("Enter a valid email address").toLowerCase().trim(),
  phoneNumber: z
    .string()
    .min(4, "Phone number must be at least 4 digits")
    .max(16, "Phone number is too long")
    .trim(),
  gender: z.string().min(1, "Please select your gender"),
  address: z.string().min(2, "Address must be at least 2 characters").trim(),
  availability: z
    .array(z.string())
    .min(1, "Please select at least one day of availability"),
  areaOfInterest: z.string().min(1, "Please select an Area of Interest"),
  skillAndExperience: z
    .string()
    .min(10, "Skill and Experience must be at least 10 characters")
    .max(2000, "Skill and Experience is too long")
    .trim(),
  motivation: z
    .string()
    .min(10, "Motivation must be at least 10 characters")
    .max(2000, "Motivation is too long")
    .trim(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Data Use & Privacy Consent",
  }),
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;
