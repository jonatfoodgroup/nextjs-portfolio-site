"use client";
import React from "react";

const Signature = ({ proposal }) => {
  return (
    <section id="Signature" className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
          <div className="md:w-1/4 mt-8 md:mt-0">
            <h2 className="text-3xl font-medium mb-2 leading-tight">
              Signature
            </h2>
          </div>
          <div className="md:w-2/3 mt-8 md:mt-0">
            <SignatureForm />
          </div>
        </div>
      </div>
    </section>
  )

};

const SignatureForm = () => {
  return (
    <form className="flex flex-col align-top justify-start bg-white border-border border p-8 space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-0" htmlFor="name">
            Name
          </label>
          <input
            className="border border-gray-300 bg-white p-2 pl-4"
            type="text"
            id="name"
            placeholder="Your name"
            name="name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-0" htmlFor="signature">
            Signature
          </label>
          <input
            className="border border-gray-300 bg-white p-2 pl-4 mb-4"
            type="text"
            id="signature"
            placeholder="Your signature"
            name="signature"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 text-center align-middle justify-center"
        type="submit"
      >
        Sign
      </button>
    </form>
  );
};

export default Signature;