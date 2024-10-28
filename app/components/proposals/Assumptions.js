"use client";
import React from "react";

const Assumptions = () => {
    return (
        <section id="Assumptions" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">
                Assumptions
              </h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0">
              {/* an assumptions list */}
              <div className="flex flex-col">
                <ul className="text-2xl text-gray-500 leading-relaxed max-w-4xl">
                  <li>
                    <span className="font-bold text-black">Content:</span> All
                    content will be provided by KwikLok in a timely manner.
                  </li>
                  <li>
                    <span className="font-bold text-black">Images:</span> All
                    images will be provided by KwikLok in a timely manner.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Assumptions;