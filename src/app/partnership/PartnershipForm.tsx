"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnershipSchema, PartnershipFormValues } from "./schema";
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
  Building2,
  User,
  Mail,
  Phone,
  Target,
  MessageSquare,
  Handshake,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

enum OrganizationTypeEnum {
  CORPORATE = "CORPORATE",
  NGO_NONPROFIT = "NGO_NONPROFIT",
  FAITH_BASED_GROUP = "FAITH_BASED_GROUP",
  COMMUNITY_ORGANIZATION = "COMMUNITY_ORGANIZATION",
  GOVERNMENT_INSTITUTION = "GOVERNMENT_INSTITUTION",
  OTHER = "OTHER",
}

enum AreaOfInterestEnum {
  HEALTHCARE_OUTREACH = "HEALTHCARE_OUTREACH",
  EMERGENCY_RELIEF = "EMERGENCY_RELIEF",
  COMMUNITY_SUPPORT = "COMMUNITY_SUPPORT",
  SPONSORSHIP_CSR = "SPONSORSHIP_CSR",
  TRAINING_EDUCATION = "TRAINING_EDUCATION",
  OTHER = "OTHER",
}

const PartnershipForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      organizationName: "",
      contactPerson: "",
      email: "",
      phoneNumber: "",
      organizationType: "",
      areaOfInterest: "",
      message: "",
    },
  });

  const onSubmit = async (data: PartnershipFormValues) => {
    try {
      const res = await fetch("/api/partnership", {
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
            <FieldLegend>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Handshake className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-bold text-green-800 text-2xl md:text-3xl">
                  Partnership Inquiry
                </h3>
              </div>
            </FieldLegend>

            <FieldGroup className="space-y-6">
              {/* Organization Information Section */}
              <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-6 border-2 border-gray-100">
                <h4 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Organization Information
                </h4>

                <div className="space-y-5">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-green-600" />
                      Organization Name *
                    </FieldLabel>
                    <Input
                      placeholder="Enter your organization's name"
                      disabled={isSubmitting}
                      {...register("organizationName")}
                      aria-invalid={errors.organizationName ? "true" : "false"}
                      className="border-2 rounded-xl py-6"
                    />
                    {errors.organizationName && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.organizationName.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700">
                      Organization Type *
                    </FieldLabel>
                    <Controller
                      name="organizationType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="border-2 rounded-xl py-6">
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={OrganizationTypeEnum.CORPORATE}>
                              Corporate
                            </SelectItem>
                            <SelectItem
                              value={OrganizationTypeEnum.NGO_NONPROFIT}
                            >
                              NGO / Nonprofit
                            </SelectItem>
                            <SelectItem
                              value={OrganizationTypeEnum.FAITH_BASED_GROUP}
                            >
                              Faith-Based Group
                            </SelectItem>
                            <SelectItem
                              value={
                                OrganizationTypeEnum.COMMUNITY_ORGANIZATION
                              }
                            >
                              Community Organization
                            </SelectItem>
                            <SelectItem
                              value={
                                OrganizationTypeEnum.GOVERNMENT_INSTITUTION
                              }
                            >
                              Government Institution
                            </SelectItem>
                            <SelectItem value={OrganizationTypeEnum.OTHER}>
                              Other
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.organizationType && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.organizationType.message}
                      </p>
                    )}
                  </Field>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-6 border-2 border-gray-100">
                <h4 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Contact Information
                </h4>

                <div className="space-y-5">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-green-600" />
                      Contact Person *
                    </FieldLabel>
                    <Input
                      placeholder="Full name of contact person"
                      disabled={isSubmitting}
                      {...register("contactPerson")}
                      aria-invalid={errors.contactPerson ? "true" : "false"}
                      className="border-2 rounded-xl py-6"
                    />
                    {errors.contactPerson && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.contactPerson.message}
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
                      placeholder="organization@example.com"
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
                </div>
              </div>

              {/* Partnership Details Section */}
              <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-6 border-2 border-gray-100">
                <h4 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Partnership Details
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
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      Message / Proposal *
                    </FieldLabel>
                    <Textarea
                      placeholder="Tell us about your organization and how you'd like to partner with us..."
                      rows={6}
                      disabled={isSubmitting}
                      {...register("message")}
                      aria-invalid={errors.message ? "true" : "false"}
                      className="border-2 rounded-xl resize-none"
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.message.message}
                      </p>
                    )}
                  </Field>
                </div>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Information Notice */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <Handshake className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900 mb-2">
                  What Happens Next?
                </h4>
                <p className="text-sm text-green-800">
                  Our partnership team will review your inquiry and reach out
                  within 3-5 business days to discuss potential collaboration
                  opportunities.
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
                  <span className="hidden sm:inline">Sending Inquiry...</span>
                  <span className="sm:hidden">Sending...</span>
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Send Your Inquiry</span>
                  <span className="sm:hidden">Send Inquiry</span>
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-center text-sm text-gray-500 mt-4">
            By submitting, you agree to be contacted regarding partnership
            opportunities
          </p>
        </FieldGroup>
      </form>
    </div>
  );
};

export default PartnershipForm;
