"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { decode } from "html-entities";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ServiceCard({ serviceId }) {
    let iconSize = 'h-12 w-12';

    const [service, setService] = useState(null);
    let baseUrl = process.env.WORDPRESS_URL;
    useEffect(() => {
        const fetchRelationships = async () => {
            const response = await fetch(`https://jonsenterfitt.com/wp-json/wp/v2/service/${serviceId}`);
            const data = await response.json();
            console.log('data', data);
            setService(data);
        };

        fetchRelationships();
    }, [serviceId]);

    if (!service) {
        return <div>Loading...</div>;
    }
    return (
        <Link href={`/services/${service.slug}`} key={service.title.rendered} className="text-lg font-semibold leading-6 hover:text-foreground group pr-6 py-1">
            <div className="flex flex-col">
                <div className="ml-4 mb-4 flex items-center">
                    <div className={`flex items-center justify-center ${iconSize} rounded-md bg-light-blue text-dark-blue`}>
                        <Icon icon={service.acf?.icon} className={`text-2xl`} />
                    </div>
                </div>
                <div className="ml-4">
                    <h4 className="text-xl font-semibold text-foreground leading-8 hover:text-blue-500 mt-0 mb-0">
                        {decode(service.title.rendered)}
                    </h4>
                    <p className="text-sm line-clamp-2 font-light text-slate-500 leading-normal mt-2">
                        {decode(service.acf?.masthead?.masthead_content)}
                    </p>
                </div>
            </div>
        </Link>
    );
}