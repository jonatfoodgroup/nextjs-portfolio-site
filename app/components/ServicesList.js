"use client";
import services from "../data/services";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const ServiceList = () => {
    services.sort((a, b) => a.title.localeCompare(b.title));
    return (
        <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 grid-cols-1 py-0">
                {services.map((service) => (
                    <Link href={`/services/${service.slug}`} key={service.slug} className="p-8 shadow rounded-md hover:shadow-lg group relative border border-gray-200 bg-white">
                        <Icon icon={service.icon} className="text-6xl text-dark-blue mb-4 bg-light-blue p-2 rounded-md" />
                        <h2 className="text-3xl font-bold text-dark-blue mt-6 flex flex-row group-hover:text-blue-500">
                            {service.title}</h2>

                        {/* <p className="mt-0 text-text text-md">{service.tagline}</p> */}
                        {/* <Link href={`/services/${service.slug}`} className="block text-text text-md font-bold mt-4"> */}
                            <h3 className="text-lg font-semibold text-dark-blue mt-1 mb-2">{service.description}</h3>
                        {/* </Link> */}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ServiceList;