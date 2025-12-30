"use client";

import PartnershipForm from "./PartnershipForm";
import { motion, Variants } from "framer-motion";
import {
  Handshake,
  Building2,
  Target,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Users,
  Globe,
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
    icon: Target,
    title: "Shared Impact",
    description: "Amplify your social impact through collaborative initiatives",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Community Reach",
    description: "Access to diverse communities and grassroots networks",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Brand Visibility",
    description: "Enhanced reputation and visibility in community development",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Globe,
    title: "Network Growth",
    description: "Connect with like-minded organizations and stakeholders",
    gradient: "from-orange-500 to-amber-500",
  },
];

const partnerTypes = [
  {
    title: "Corporate Partners",
    description: "CSR programs, employee engagement, and brand partnerships",
    icon: Building2,
  },
  {
    title: "NGO & Nonprofits",
    description: "Collaborative programs and resource sharing",
    icon: Handshake,
  },
  {
    title: "Healthcare Institutions",
    description: "Medical outreach and capacity building initiatives",
    icon: Target,
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
            <Handshake className="w-5 h-5 text-green-700" />
            <span className="text-sm font-semibold text-green-800">
              Partner With Us
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
            Build a{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Stronger Future
            </span>{" "}
            Together
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Join us in creating sustainable impact. Together, we can reach more
            communities, save more lives, and build a healthier future for all.
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
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-100 h-full"
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

      {/* Who Can Partner Section */}
      <section className="bg-white padding py-20">
        <div className="max-w-7xl mx-auto">
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
              Who Can Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We welcome partnerships from diverse organizations
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {partnerTypes.map((type, index) => (
              <motion.div key={index} variants={scaleIn}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-xl border-2 border-green-100 h-full"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-white rounded-2xl shadow-lg mb-6">
                      <type.icon className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-3">
                      {type.title}
                    </h3>
                    <p className="text-gray-700">{type.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
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
              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Start a Partnership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and let's explore how we can work together
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl shadow-2xl border-2 border-green-100 p-6 md:p-12">
            <PartnershipForm />
          </div>
        </div>
      </section>

      {/* Partnership Process Section */}
      <section className="bg-white padding py-20">
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
              Our Partnership Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to start making an impact together
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              {
                step: "1",
                title: "Submit Inquiry",
                description: "Complete the partnership form with your details",
              },
              {
                step: "2",
                title: "Initial Discussion",
                description: "We'll schedule a call to discuss opportunities",
              },
              {
                step: "3",
                title: "Proposal Development",
                description: "Collaborate on a mutually beneficial plan",
              },
              {
                step: "4",
                title: "Launch Partnership",
                description: "Begin creating impact in communities together",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={scaleIn}>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-100 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-green-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="bg-gradient-to-br from-green-50/50 via-white to-green-50/30 padding py-20">
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
                    Why Partner With OUNUU?
                  </h3>
                  <p className="text-green-800">
                    Discover the benefits of collaborating with us
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Proven Impact:</strong> Track record of successful
                    community interventions and measurable outcomes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Transparency:</strong> Regular reporting and open
                    communication throughout our partnership
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Flexibility:</strong> Customizable partnership
                    models to suit your organization's goals and capacity
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Community Connection:</strong> Direct access to
                    underserved communities and authentic grassroots engagement
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
