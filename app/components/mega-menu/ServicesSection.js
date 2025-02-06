"use client";
import React from "react";
import audiences from "../../data/audiences";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWordpress } from "../../providers/WordpressProvider";
import { decode } from "html-entities";

const ServicesSection = () => {
  let iconSize = "h-12 w-12";
  const { services } = useWordpress();

  return (
    <div className="flex flex-col md:flex-row items-start w-full">
      {/* Services Section */}
      <div className="ml-4 pt-4 md:pt-0 py-4 md:py-4 w-full">
        <section className="w-full flex flex-row container mx-auto">
          <div className="flex flex-col w-1/4 mb-4">
            <div className="flex flex-col">
              <div className="flex items-center  border-b-2 border-gray-800 pb-2">
                <h2 className="text-2xl font-semibold text-white">Focus Areas</h2>
                <Link href="/services" className="text-sm font-light text-orange-500 hover:text-orange-600 transition-colors duration-300 ml-auto">
                  View All
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
              {services.map((service, index) => (
                <Link
                  key={service.title.rendered}
                  href={`/services/${service.slug}`}
                  className="text-sm font-light text-slate-500 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2"
                >
                  <Icon
                    icon={service.acf?.icon}
                    className="text-4xl m-2 text-orange-500 drop-shadow-lg transition-transform transform hover:scale-125 hover:text-orange-600"
                  />                  <span
                    className="text-md font-light text-white hover:text-orange-500 transition-colors duration-300"
                  >{decode(service.title.rendered)}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-3/4">

          </div>

        </section>
      </div>
    </div>
  );
};

export default ServicesSection;