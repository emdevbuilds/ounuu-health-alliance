"use client";

import VolunteerForm from "./VolunteerForm";
import { motion, Variants } from "framer-motion";
import {
  Users,
  Heart,
  Calendar,
  Award,
  CheckCircle,
  Sparkles,
} from "lucide-react";

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

const benefits = [
  {
    icon: Heart,
    title: "Make an Impact",
    description: "Directly help families and communities in need",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Build Connections",
    description: "Join a passionate community of changemakers",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Develop Skills",
    description: "Gain valuable experience and grow personally",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Volunteer on your own time and availability",
    gradient: "from-purple-500 to-pink-500",
  },
];

const Page = () => {
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
          className="text-center relative z-10 mb-12 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-100 rounded-full"
          >
            <Users className="w-5 h-5 text-green-700" />
            <span className="text-sm font-semibold text-green-800">
              Join Our Team
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
            Volunteer{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              With Us
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Join our team of passionate volunteers and make a real difference in
            underserved communities. Your time and skills can change lives.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={scaleIn}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 h-full"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`p-4 rounded-full bg-gradient-to-r ${benefit.gradient} mb-4`}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Volunteer Form Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-4xl mx-auto">
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
              className="h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Application Form
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below to start your volunteering journey with us
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl shadow-2xl border-2 border-green-100 p-6 md:p-12">
              <VolunteerForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              What to Expect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's what happens after you apply
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "1",
                title: "Submit Application",
                description:
                  "Fill out the volunteer form with your details and interests",
              },
              {
                step: "2",
                title: "Review & Contact",
                description:
                  "Our team will review your application and reach out within 3-5 days",
              },
              {
                step: "3",
                title: "Get Started",
                description:
                  "Attend orientation and begin making an impact in the community",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={scaleIn}>
                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center mb-6">
                      <span className="text-3xl font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-100 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    Important Information
                  </h3>
                  <p className="text-blue-800">
                    Please read before submitting your application
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Commitment:</strong> We ask for a minimum commitment
                    of 4 hours per month
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Training:</strong> All volunteers receive
                    comprehensive orientation and ongoing support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Safety:</strong> Your safety is our priority. We
                    provide necessary equipment and guidelines
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Recognition:</strong> Volunteers receive
                    certificates and recognition for their valuable
                    contributions
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Page;
