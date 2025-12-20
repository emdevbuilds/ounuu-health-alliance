"use client";

import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import ContactForm from "./ContactForm";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const Contact = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50/30 padding pt-24 pb-16">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-100 rounded-full"
          >
            <MessageCircle className="w-5 h-5 text-green-700" />
            <span className="text-sm font-semibold text-green-800">
              Get in Touch
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
            Contact{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Us
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            We'd love to hear from you. Reach out with any questions, comments,
            or partnership inquiries.
          </p>
        </motion.div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mb-6"
                />
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
                  Contact Information
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24
                  hours.
                </p>
              </motion.div>

              <motion.div variants={scaleIn} className="space-y-6">
                {/* Email */}
                <motion.a
                  href="mailto:obiumunnanaumuadahealthallianc@gmail.com"
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 group hover:shadow-lg transition-all"
                >
                  <div className="p-3 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800 mb-1">Email</h3>
                    <p className="text-gray-700 break-all">
                      obiumunnanaumuadahealthallianc@gmail.com
                    </p>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  href="tel:+2348063289585"
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-100 group hover:shadow-lg transition-all"
                >
                  <div className="p-3 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800 mb-1">Phone</h3>
                    <p className="text-gray-700">+234 806 328 9585</p>
                  </div>
                </motion.a>

                {/* Address */}
                <motion.div
                  variants={scaleIn}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 group hover:shadow-lg transition-all"
                >
                  <div className="p-3 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800 mb-1">
                      Office Address
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Plot 19/20 Mile 50 Layout between NEPA Junction & Ebonyi
                      Voice Junction, Opposite MTN Branch office Abakaliki,
                      Ebonyi State, Nigeria
                    </p>
                  </div>
                </motion.div>

                {/* Office Hours */}
                <motion.div
                  variants={scaleIn}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-100"
                >
                  <div className="p-3 bg-white rounded-xl shadow-md flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800 mb-1">
                      Office Hours
                    </h3>
                    <p className="text-gray-700">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-700">
                      Saturday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl shadow-2xl border-2 border-green-100 p-6 md:p-10 sticky top-24">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Find Us Here
            </h2>
            <p className="text-xl text-gray-600">
              Visit our office or schedule an appointment
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="relative w-full pb-[56.25%] h-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.369997381913!2d8.081005173116024!3d6.346110425203215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105b5ff01eca7139%3A0x1558aa72bcf6d884!2sEbonyi%20Voice%20Junction!5e0!3m2!1sen!2sng!4v1763400415258!5m2!1sen!2sng"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  title="OUNUU Health Alliance Office Location"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Need Immediate Assistance?
                  </h3>
                  <p className="text-green-800 mb-4">
                    For urgent matters or emergency relief requests, please call
                    us directly
                  </p>
                  <a
                    href="tel:+2348063289585"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
