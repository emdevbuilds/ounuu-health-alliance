"use client";

import DonationForm from "./DonationForm";
import { motion, Variants } from "framer-motion";
import { HeartHandshake, Shield, CheckCircle, Users } from "lucide-react";
import Image from "next/image";

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

const impactStats = [
  {
    icon: Users,
    number: "5,000+",
    label: "Lives Impacted",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: HeartHandshake,
    number: "500+",
    label: "Families Supported",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: CheckCircle,
    number: "20+",
    label: "Communities Served",
    gradient: "from-purple-500 to-pink-500",
  },
];

const Donate = () => {
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
            <HeartHandshake className="w-5 h-5 text-green-700" />
            <span className="text-sm font-semibold text-green-800">
              Make a Difference Today
            </span>
          </motion.div>

          <h1 className="text-4xl leading-10 md:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
            Support Our{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Mission
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Your donation helps us deliver healthcare, support families, and
            respond to emergencies. Every contribution—big or small—saves lives
            and builds hope in underserved communities.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10"
        >
          {impactStats.map((stat, index) => (
            <motion.div key={index} variants={scaleIn}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`p-4 rounded-full bg-gradient-to-r ${stat.gradient} mb-4`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-green-800 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Donation Form Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl shadow-2xl border-2 border-green-100 p-6 md:p-12">
              <DonationForm />
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-700" />
                <h3 className="text-lg font-bold text-green-800">
                  Secure & Trusted
                </h3>
              </div>
              <p className="text-center text-gray-700">
                Your donation is secure and encrypted. We use Paystack for safe
                payment processing. All transactions are protected with
                industry-standard security measures.
              </p>
            </div>
          </motion.div>

          {/* Tax Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-8"
          >
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
              <h3 className="text-lg font-bold text-green-800 mb-4 text-center">
                Additional Information
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    You will receive an email receipt immediately after your
                    donation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    100% of your donation goes directly to our programs and
                    services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Monthly donors receive quarterly impact reports showing how
                    their contributions help
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Ways to Help Section */}
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
              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Other Ways to Help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Can't donate right now? There are other ways you can support our
              mission
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={scaleIn}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-100 h-full"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">
                    Volunteer With Us
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Join our team and make a direct impact in your community
                    through volunteering.
                  </p>
                  <motion.a
                    href="/volunteer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={scaleIn}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-100 h-full"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                    <HeartHandshake className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">
                    Partner With Us
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Collaborate with us to amplify our impact and reach more
                    communities in need.
                  </p>
                  <motion.a
                    href="/partnership"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Learn More
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Donate;
