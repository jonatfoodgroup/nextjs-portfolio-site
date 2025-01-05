"use client";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWordpress } from "../providers/WordpressProvider";
import { decode } from "html-entities";

const ServiceList = () => {
  const { services } = useWordpress();

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-4 gap-8 grid-cols-1 py-0">
        {services.map((service, index) => (
          <div
          data-aos="fade-up"
          data-aos-delay={index * 50}
          key={service.title.rendered}
          className="flex justify-center items-center"
        >
          <Link
            href={`/services/${service.slug}`}
            className="group p-4 bg-white shadow-md rounded-lg transition-transform duration-300 cursor-pointer border border-gray-200 flex flex-col justify-center items-center hover:-translate-y-2 hover:shadow-xl min-h-[240px] max-h-[240px]"
          >
            <div className="flex flex-col justify-center items-center h-full w-full">
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`flex items-center justify-center rounded-md bg-light-orange text-orange`}
                >
                  <Icon
                    icon={service.acf?.icon}
                    className={`text-3xl m-2 hover:transform hover:scale-110 transition-transform`}
                  />
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-black leading-6 group-hover:text-orange-500 transition-colors duration-300">
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
    </div>
  );
};

export default ServiceList;