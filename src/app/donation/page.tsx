"use client";

import DonationForm from "./DonationForm";

const Donate = () => {
  return (
    <main className="padding bg-gray-50">
      <div className="pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Support Our Mission
            </h1>
            <p className="text-lg text-gray-600">
              Your donation helps us make a positive impact in our community.
              Every contribution counts!
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <DonationForm />
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Your donation is secure and encrypted. We use Paystack for safe
              payment processing.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Donate;
