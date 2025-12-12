"use client";

import PartnershipForm from "./PartnershipForm";

const page = () => {
  return (
    <main className="padding">
      <div className="flex flex-col relative z-10 gap-x-y pt-12 md:pt-16">
        <h2 className="font-bold text-center text-green-800 md:text-3xl">
          Become a Partner
        </h2>

        <div className="mt-4 flex flex-col justify-center items-center gap-x-y lg:mt-6">
          <div className="w-full border p-4 shadow-md rounded-2xl md:p-6 lg:w-2/3">
            <PartnershipForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
