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
                    <div data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                        <Link href={`/services/${service.slug}`} className="p-8 shadow rounded-md hover:shadow-lg border border-gray-200 bg-white z-10 flex flex-col items-start justify-start group hover:-translate-y-2 hover:shadow-xl transition-transform duration-300">
                            <Icon icon={service.acf.icon} className="text-6xl text-orange mb-0 bg-light-orange p-2 rounded-md" />
                            <h2 className="text-2xl font-bold text-dark-blue mt-6 flex flex-row group-hover:text-orange-500">
                                {decode(service.title.rendered)}
                            </h2>
                            <h3 className="text-md font-regular text-dark-blue mt-2 mb-2 sm:text-sm md:text-md">{service.acf.masthead.masthead_content}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceList;