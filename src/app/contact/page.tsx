"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <main className="padding">
      <div className="flex flex-col relative z-10 gap-x-y pt-12 md:pt-16">
        <h2 className="font-bold text-center text-green-800 md:text-3xl">
          Contact Us
        </h2>

        <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-x-y lg:mt-6">
          <div className="mt-4 w-full space-y-6 order-2 md:order-1 md:w-1/2 md:mt-0">
            <h3 className="font-semibold pb-3 text-green-800 md:text-2xl">
              Contact Information
            </h3>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-row gap-4">
                <Mail />
                <p className="text-base break-all whitespace-normal">
                  obiumunnanaumuadahealthallianc@gmail.com
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <Phone /> <p className="text-base">+2348063289585</p>
              </div>
              <div className="flex flex-row gap-4">
                <MapPin className="flex-shrink-0" />
                <p className="text-base">
                  Plot 19/20 Mile 50 Layout between NEPA Junction & Ebonyi Voice
                  Junction, Opposite MTN Branch office Abakaliki, Ebonyi State,
                  Nigeria
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.369997381913!2d8.081005173116024!3d6.346110425203215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105b5ff01eca7139%3A0x1558aa72bcf6d884!2sEbonyi%20Voice%20Junction!5e0!3m2!1sen!2sng!4v1763400415258!5m2!1sen!2sng"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="w-full border p-4 shadow-md rounded-2xl order-1 md:order-2 md:p-6 md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
