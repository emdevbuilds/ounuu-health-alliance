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
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            {/* <FieldLegend>
              <h3 className="font-semibold text-green-800 pb-3 md:text-2xl">
                Send Us a Message
              </h3>
            </FieldLegend> */}
            <FieldGroup>
              <Field>
                <FieldLabel className="text-base">Organization Name</FieldLabel>
                <Input
                  placeholder="Enter your organization's name"
                  disabled={isSubmitting}
                  {...register("organizationName")}
                  aria-invalid={errors.organizationName ? "true" : "false"}
                />
                {errors.organizationName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.organizationName.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-base">Contact Person</FieldLabel>
                <Input
                  placeholder="Enter full name of contact person"
                  disabled={isSubmitting}
                  {...register("contactPerson")}
                  aria-invalid={errors.contactPerson ? "true" : "false"}
                />
                {errors.contactPerson && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.contactPerson.message}
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
                <FieldLabel className="text-base">Organization Type</FieldLabel>
                <Controller
                  name="organizationType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Select Organization Type --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OrganizationTypeEnum.CORPORATE}>
                          Corporate
                        </SelectItem>
                        <SelectItem value={OrganizationTypeEnum.NGO_NONPROFIT}>
                          NGO (Nonprofit)
                        </SelectItem>
                        <SelectItem
                          value={OrganizationTypeEnum.FAITH_BASED_GROUP}
                        >
                          Faith-Based Group
                        </SelectItem>
                        <SelectItem
                          value={OrganizationTypeEnum.COMMUNITY_ORGANIZATION}
                        >
                          Community Organization
                        </SelectItem>
                        <SelectItem
                          value={OrganizationTypeEnum.GOVERNMENT_INSTITUTION}
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors.organizationType.message}
                  </p>
                )}
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
                  Message / Proposal
                </FieldLabel>
                <Textarea
                  placeholder="Type your message here..."
                  rows={5}
                  disabled={isSubmitting}
                  {...register("message")}
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
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
              "Send Your Inquiry"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default PartnershipForm;
