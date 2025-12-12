"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "./schema";
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

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Message sent successfully!", {
          position: "top-center",
        });
        reset();
      } else {
        toast.error(
          result.message || "Failed to send message. Please try again.",
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
              <h3 className="font-semibold text-green-800 pb-3 md:text-2xl">
                Send Us a Message
              </h3>
            </FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel className="text-base">Full Name *</FieldLabel>
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
                <FieldLabel className="text-base">Email *</FieldLabel>
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
                <FieldLabel className="text-base">Subject</FieldLabel>
                <Input
                  placeholder="What's your message about?"
                  disabled={isSubmitting}
                  {...register("subject")}
                />
              </Field>

              <Field>
                <FieldLabel className="text-base">Message *</FieldLabel>
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
              "Send Message"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ContactForm;
