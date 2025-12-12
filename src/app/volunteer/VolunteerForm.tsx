"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { volunteerSchema, VolunteerFormValues } from "./schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";

enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum AreaOfInterestEnum {
  HEALTHCARE_OUTREACH = "HEALTHCARE_OUTREACH",
  EMERGENCY_RELIEF = "EMERGENCY_RELIEF",
  COMMUNITY_SUPPORT = "COMMUNITY_SUPPORT",
  SPONSORSHIP_CSR = "SPONSORSHIP_CSR",
  TRAINING_EDUCATION = "TRAINING_EDUCATION",
  OTHER = "OTHER",
}

const VolunteerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      address: "",
      availability: ["Saturday", "Sunday"],
      areaOfInterest: "",
      skillAndExperience: "",
      motivation: "",
      consent: true,
    },
  });

  const onSubmit = async (data: VolunteerFormValues) => {
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(
          result.message || "Partnership inquiry sent successfully!",
          {
            position: "top-center",
          }
        );
        reset();
      } else {
        toast.error(
          result.message ||
            "Failed to submit partnership form. Please try again.",
          {
            position: "top-center",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Oops! Something went wrong on our end. Please try submitting the form again.",
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            {/* <FieldLegend>
              <h3 className="font-semibold text-green-800 pb-3 md:text-2xl">
                Send Us a Message
              </h3>
            </FieldLegend> */}
            <FieldGroup>
              <Field>
                <FieldLabel className="text-base">Full Name</FieldLabel>
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
                <FieldLabel className="text-base">Email</FieldLabel>
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
                <FieldLabel className="text-base">Phone Number</FieldLabel>
                <Input
                  placeholder="Enter phone number"
                  disabled={isSubmitting}
                  {...register("phoneNumber")}
                  aria-invalid={errors.phoneNumber ? "true" : "false"}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-base">Gender</FieldLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Select Your Gender --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={GenderEnum.MALE}>Male</SelectItem>
                        <SelectItem value={GenderEnum.FEMALE}>
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-base">Address</FieldLabel>
                <Textarea
                  placeholder="Enter your city/location"
                  rows={5}
                  disabled={isSubmitting}
                  {...register("address")}
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-base">Availability</FieldLabel>
                <Controller
                  name="availability"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-2">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <label key={day} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={day}
                            checked={field.value?.includes(day)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, day]);
                              } else {
                                field.onChange(
                                  field.value.filter((d) => d !== day)
                                );
                              }
                            }}
                          />
                          {day}
                        </label>
                      ))}
                      {errors.availability && (
                        <span className="text-red-500 text-sm">
                          {errors.availability.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </Field>

              <Field>
                <FieldLabel className="text-base">Area of Interest</FieldLabel>
                <Controller
                  name="areaOfInterest"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Select Area of Interest --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value={AreaOfInterestEnum.HEALTHCARE_OUTREACH}
                        >
                          Healthcare Outreach
                        </SelectItem>
                        <SelectItem value={AreaOfInterestEnum.EMERGENCY_RELIEF}>
                          Emergency Relief
                        </SelectItem>
                        <SelectItem
                          value={AreaOfInterestEnum.COMMUNITY_SUPPORT}
                        >
                          Community Support
                        </SelectItem>
                        <SelectItem value={AreaOfInterestEnum.SPONSORSHIP_CSR}>
                          Sponsorship / CSR
                        </SelectItem>
                        <SelectItem
                          value={AreaOfInterestEnum.TRAINING_EDUCATION}
                        >
                          Training & Education
                        </SelectItem>
                        <SelectItem value={AreaOfInterestEnum.OTHER}>
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.areaOfInterest && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.areaOfInterest.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-base">
                  Skills & Experience
                </FieldLabel>
                <Textarea
                  placeholder="e.g., medical training, teaching, community outreach, fundraising, logistics"
                  rows={5}
                  disabled={isSubmitting}
                  {...register("skillAndExperience")}
                  aria-invalid={errors.skillAndExperience ? "true" : "false"}
                />
                {errors.skillAndExperience && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.skillAndExperience.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-base">Motivation</FieldLabel>
                <Textarea
                  placeholder="Tell us why you want to volunteer"
                  rows={5}
                  disabled={isSubmitting}
                  {...register("motivation")}
                  aria-invalid={errors.motivation ? "true" : "false"}
                />
                {errors.motivation && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.motivation.message}
                  </p>
                )}
              </Field>

              <Field>
                <Controller
                  name="consent"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-start gap-x-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(val) => field.onChange(val)}
                      />
                      <div className="grid gap-2">
                        <FieldLabel>Data Use & Privacy Consent</FieldLabel>
                        <p className="text-muted-foreground text-sm">
                          I consent to OUNUU Health Alliance using my
                          information for volunteer coordination and
                          communication purposes.
                        </p>
                        {errors.consent && (
                          <span className="text-red-500 text-sm">
                            {errors.consent.message}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 text-white hover:bg-green-800 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Become a Volunteer"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default VolunteerForm;
