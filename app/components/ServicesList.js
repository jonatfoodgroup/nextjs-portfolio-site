"use client";
import services from "../data/services";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const ServiceList = () => {
    services.sort((a, b) => a.title.localeCompare(b.title));
    return (
        <div className="grid md:grid-cols-2 gap-8 mt-8 grid-cols-1">
            {services.map((service) => (
                <Link href={`/services/${service.slug}`} key={service.slug} className="p-8 shadow rounded-md hover:shadow-lg group relative">
                    <Icon icon={service.icon} className="text-4xl text-black mb-4" />
                    <h2 className="text-2xl font-bold text-text flex flex-row group-hover:text-blue-500">
                        {service.title}</h2>
                    <h3 className="text-md font-semibold text-text mt-1 mb-2">{service.tagline}</h3>
                    <p className="mt-2 text-text text-md">{service.description}</p>
                    <Link href={`/services/${service.slug}`} className="mt-4 block text-text underline text-sm font-bold">View Service</Link>
                </Link>
            ))}
        </div>
    );
}

export default ServiceList;