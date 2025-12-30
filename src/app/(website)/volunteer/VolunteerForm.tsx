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
import {
  Loader,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Briefcase,
  MessageSquare,
  Shield,
  UserCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

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
          result.message || "Volunteer application submitted successfully!",
          {
            position: "top-center",
          }
        );
        reset();
      } else {
        toast.error(
          result.message ||
            "Failed to submit volunteer application. Please try again.",
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
            <FieldLegend>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-bold text-green-800 text-2xl md:text-3xl">
                  Volunteer Application
                </h3>
              </div>
            </FieldLegend>

            <FieldGroup className="space-y-6">
              {/* Personal Information Section */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border-2 border-gray-100">
                <h4 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  Personal Information
                </h4>

                <div className="space-y-5">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-600" />
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

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-600" />
                      Email *
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

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      Phone Number *
                    </FieldLabel>
                    <Input
                      placeholder="+234 800 000 0000"
                      disabled={isSubmitting}
                      {...register("phoneNumber")}
                      aria-invalid={errors.phoneNumber ? "true" : "false"}
                      className="border-2 rounded-xl py-6"
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700">
                      Gender *
                    </FieldLabel>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="border-2 rounded-xl py-6">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={GenderEnum.MALE}>
                              Male
                            </SelectItem>
                            <SelectItem value={GenderEnum.FEMALE}>
                              Female
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.gender.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      Address *
                    </FieldLabel>
                    <Textarea
                      placeholder="Enter your city/location"
                      rows={4}
                      disabled={isSubmitting}
                      {...register("address")}
                      aria-invalid={errors.address ? "true" : "false"}
                      className="border-2 rounded-xl resize-none"
                    />
                    {errors.address && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.address.message}
                      </p>
                    )}
                  </Field>
                </div>
              </div>

              {/* Availability Section */}
              <Field>
                <FieldLabel className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  When are you available? *
                </FieldLabel>
                <Controller
                  name="availability"
                  control={control}
                  render={({ field }) => (
                    <div className="bg-gradient-to-br from-green-50/50 to-blue-50/30 rounded-2xl p-6 border-2 border-green-100">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ].map((day) => (
                          <label
                            key={day}
                            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              field.value?.includes(day)
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white border-gray-200 hover:border-green-400"
                            }`}
                          >
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
                              className="sr-only"
                            />
                            <span className="font-medium text-sm">{day}</span>
                          </label>
                        ))}
                      </div>
                      {errors.availability && (
                        <p className="text-sm text-red-600 mt-3">
                          {errors.availability.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </Field>

              {/* Interests & Skills Section */}
              <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-6 border-2 border-gray-100">
                <h4 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Your Interests & Skills
                </h4>

                <div className="space-y-5">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700">
                      Area of Interest *
                    </FieldLabel>
                    <Controller
                      name="areaOfInterest"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="border-2 rounded-xl py-6">
                            <SelectValue placeholder="Select your area of interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value={AreaOfInterestEnum.HEALTHCARE_OUTREACH}
                            >
                              Healthcare Outreach
                            </SelectItem>
                            <SelectItem
                              value={AreaOfInterestEnum.EMERGENCY_RELIEF}
                            >
                              Emergency Relief
                            </SelectItem>
                            <SelectItem
                              value={AreaOfInterestEnum.COMMUNITY_SUPPORT}
                            >
                              Community Support
                            </SelectItem>
                            <SelectItem
                              value={AreaOfInterestEnum.SPONSORSHIP_CSR}
                            >
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
                      <p className="text-sm text-red-600 mt-2">
                        {errors.areaOfInterest.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-green-600" />
                      Skills & Experience *
                    </FieldLabel>
                    <Textarea
                      placeholder="e.g., medical training, teaching, community outreach, fundraising, logistics"
                      rows={5}
                      disabled={isSubmitting}
                      {...register("skillAndExperience")}
                      aria-invalid={
                        errors.skillAndExperience ? "true" : "false"
                      }
                      className="border-2 rounded-xl resize-none"
                    />
                    {errors.skillAndExperience && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.skillAndExperience.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      Why do you want to volunteer? *
                    </FieldLabel>
                    <Textarea
                      placeholder="Tell us what motivates you to volunteer with us..."
                      rows={5}
                      disabled={isSubmitting}
                      {...register("motivation")}
                      aria-invalid={errors.motivation ? "true" : "false"}
                      className="border-2 rounded-xl resize-none"
                    />
                    {errors.motivation && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.motivation.message}
                      </p>
                    )}
                  </Field>
                </div>
              </div>

              {/* Consent Section */}
              <Field>
                <Controller
                  name="consent"
                  control={control}
                  render={({ field }) => (
                    <div
                      className={`flex items-start gap-4 p-6 rounded-2xl border-2 transition-all ${
                        field.value
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          <FieldLabel className="text-base font-semibold text-gray-800">
                            Data Use & Privacy Consent *
                          </FieldLabel>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          I consent to OUNUU Health Alliance using my
                          information for volunteer coordination and
                          communication purposes. Your data will be kept secure
                          and confidential.
                        </p>
                        {errors.consent && (
                          <p className="text-sm text-red-600 mt-2">
                            {errors.consent.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  <span className="hidden sm:inline">
                    Submitting Application...
                  </span>
                  <span className="sm:hidden">Submitting...</span>
                </>
              ) : (
                <>
                  <Users className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Submit Application</span>
                  <span className="sm:hidden">Submit</span>
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-center text-sm text-gray-500 mt-4">
            By submitting, you agree to our volunteer terms and conditions
          </p>
        </FieldGroup>
      </form>
    </div>
  );
};

export default VolunteerForm;
