"use client";
import { useState } from "react";

const Scope = ({ proposal }) => {
    return (
        <section id="Scope" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight text-text">
                Phases
              </h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0 flex flex-col space-y-12">
              <div className="flex flex-col md:w-2/3 w-full">
                <h3 className="text-2xl font-medium text-text">Gather & Identify</h3>
                <h5 className="text-md font-medium text-text mb-4">1-3 weeks</h5>
                <p className="text-gray-500">
                  We kick off by diving deep into your company, customers,
                  products, and competitors. We&apos;ll start with your
                  analytics to see what&apos;s working, what needs improvement,
                  and how we can enhance user experience and distribution
                  strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Scope;