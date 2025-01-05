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
      <div className="ml-4 pt-4 md:pt-0 py-4 md:py-4">
        <section className="d-block">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {services.map((service, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 50}
                key={service.title.rendered}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group p-4 bg-white shadow-md rounded-lg transition-transform duration-300 cursor-pointer border border-gray-200 flex flex-col hover:-translate-y-2 hover:shadow-xl"

                >
                  <div className="flex flex-col">
                    <div className="ml-4 mb-4 flex items-center">
                      <div
                        className={`flex items-center justify-center rounded-md bg-light-orange text-orange`}
                      >
                        <Icon
                          icon={service.acf?.icon}
                          className={`text-3xl m-2 hover:transform hover:scale-110 transition-transform`}
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-black leading-6 group-hover:text-orange-500 transition-colors duration-300 mt-0 mb-0">
                        {decode(service.title.rendered)}
                      </h4>
                      <p className="text-sm line-clamp-3 font-light text-slate-500 leading-normal mt-2">
                        {decode(service.acf?.masthead?.masthead_content)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesSection;