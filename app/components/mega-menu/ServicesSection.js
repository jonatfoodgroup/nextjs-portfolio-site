"use client";
import React from "react";
import audiences from "../../data/audiences";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWordpress } from "../../providers/WordpressProvider";
import { decode } from "html-entities";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ServicesSection = () => {
  const { services } = useWordpress();

  // Featured services (change logic as needed)
  const featuredServices = [
    {
      title: { rendered: "Service 1" },
      slug: "service-1",
      acf: { icon: "carbon:service-icon-1" },
      excerpt: { rendered: "This is a brief description of Service 1." },
    },
    {
      title: { rendered: "Service 2" },
      slug: "service-2",
      acf: { icon: "carbon:service-icon-2" },
      excerpt: { rendered: "This is a brief description of Service 2." },
    },
    {
      title: { rendered: "Service 3" },
      slug: "service-2",
      acf: { icon: "carbon:service-icon-2" },
      excerpt: { rendered: "This is a brief description of Service 2." },
    }
  ]

  return (
    <div className="flex flex-col md:flex-row items-start w-full">
      {/* Services Section */}
      <div className="ml-4 pt-4 md:pt-0 py-4 md:py-4 w-full">
        <section className="w-full flex flex-row mx-auto">
          {/* Left Side - List of Services */}
          <div className="flex flex-col w-1/2 mb-4">
            <div className="flex flex-col">
              <div className="flex items-center border-b-2 border-gray-800 pb-2">
                <h2 className="text-2xl font-semibold text-white">Focus Areas</h2>
                <Link href="/services" className="text-sm font-light text-orange-500 hover:text-orange-600 transition-colors duration-300 ml-auto">
                  View All
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {services.map((service, index) => (
                <Link
                  key={service.title.rendered}
                  href={`/services/${service.slug}`}
                  className="text-xs font-light text-slate-500 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2"
                >
                  <Icon
                    icon={service.acf?.icon}
                    className="text-xl m-2 text-orange-500 drop-shadow-lg transition-transform transform hover:scale-125 hover:text-orange-600"
                  />
                  <span className="text-sm font-light text-gray-300 hover:text-white transition-colors duration-300">
                    {decode(service.title.rendered)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Swiper Slider for Featured Services */}
          <div className="flex w-1/2">
            <Swiper
              modules={[Pagination]}
              spaceBetween={0}
              slidesPerView={2}
              pagination={{ clickable: true }}
              className="w-full"
            >
              {featuredServices.map((service) => (
                <SwiperSlide key={service.title.rendered} className="bg-gray-900 p-6 rounded-lg shadow-lg">
                  <Link href={`/services/${service.slug}`} className="flex flex-col items-center shiny-button  text-center">
                    <div className="bg-gray-700 h-[300px] w-full p-4 rounded-lg mb-4 flex items-center justify-center flex flex-col">
                      <h3 className="text-lg font-semibold text-white">{decode(service.title.rendered)}</h3>
                      <p className="text-sm text-gray-400">{decode(service.excerpt.rendered)}</p>
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Icon icon={service.acf?.icon} className="text-3xl text-orange-500" />
                      </div>
                    </div>
                    <span className="shiny-effect"></span>
                  </Link>
                  
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesSection;