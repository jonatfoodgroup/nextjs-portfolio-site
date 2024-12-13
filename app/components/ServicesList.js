"use client";
import services from "../data/services";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const ServiceList = () => {
    services.sort((a, b) => a.title.localeCompare(b.title));
    return (
        <div className="grid md:grid-cols-3 gap-4 mt-8 grid-cols-1">
            {services.map((service) => (
                <Link href={`/services/${service.slug}`} key={service.slug} className="p-4 shadow rounded-md hover:shadow-lg group">
                    <h2 className="text-2xl font-bold text-text flex flex-row group-hover:text-blue-500">
                        {/* <Icon icon={service.icon} className={`mr-2 bg-white rounded text-2xl text-gray-300`} /> */}
                        {service.title}</h2>
                    <p className="mt-2 text-text text-md">{service.description}</p>
                    <Link href={`/services/${service.slug}`} className="mt-4 block text-text underline">Read more</Link>
                </Link>
            ))}
        </div>
    );
}

export default ServiceList;