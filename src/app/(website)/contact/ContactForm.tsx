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
import {
  Loader,
  Mail,
  User,
  MessageSquare,
  Send,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-bold text-green-800 text-2xl md:text-3xl">
                  Send Us a Message
                </h3>
              </div>
            </FieldLegend>

            <FieldGroup className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-6 border-2 border-gray-100">
                <h4 className="text-lg font-semibold text-green-800 mb-5 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Information
                </h4>

                <div className="space-y-5">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-green-600" />
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
                </div>
              </div>

              {/* Message Details */}
              <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-6 border-2 border-gray-100">
                <h4 className="text-lg font-semibold text-green-800 mb-5 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Your Message
                </h4>

                <div className="space-y-5">
                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      Subject (Optional)
                    </FieldLabel>
                    <Input
                      placeholder="What's your message about?"
                      disabled={isSubmitting}
                      {...register("subject")}
                      className="border-2 rounded-xl py-6"
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      Message *
                    </FieldLabel>
                    <Textarea
                      placeholder="Type your message here..."
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

          {/* Response Time Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Quick Response Guaranteed
                </h4>
                <p className="text-sm text-blue-800">
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  <span className="hidden sm:inline">Sending Message...</span>
                  <span className="sm:hidden">Sending...</span>
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Send Message</span>
                  <span className="sm:hidden">Send</span>
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-center text-sm text-gray-500 mt-4">
            We respect your privacy and will never share your information
          </p>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ContactForm;
