"use client";
import services from "../data/services";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const ServiceList = () => {
    services.sort((a, b) => a.title.localeCompare(b.title));
    return (
        <div className="grid md:grid-cols-3 gap-8 mt-8 grid-cols-1">
            {services.map((service) => (
                <Link href={`/services/${service.slug}`} key={service.slug} className="p-8 shadow rounded-md hover:shadow-lg group relative border border-gray-200">
                    <Icon icon={service.icon} className="text-6xl text-black mb-4 bg-gray-200 p-2 rounded-md" />
                    <h2 className="text-3xl font-bold text-text mt-6 flex flex-row group-hover:text-blue-500">
                        {service.title}</h2>
                    
                    <p className="mt-0 text-text text-md">{service.tagline}</p>
                    <Link href={`/services/${service.slug}`} className="mt-4 block text-text text-md font-bold mt-4">
                        <h3 className="text-lg font-semibold text-text mt-1 mb-2">{service.description}</h3>
                    </Link>
                </Link>
            ))}
        </div>
    );
}

export default ServiceList;