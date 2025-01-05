"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { decode } from "html-entities";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ServiceItem({ serviceId }) {
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
        <Link href={`/services/${service.slug}`} key={service.title.rendered} className="text-md font-semibold hover:text-foreground group py-1 flex items-center space-x-2 mb-2">
            <div className="flex flex-col">
                <h4 className="text-md font-semibold text-foreground hover:text-orange-500 flex items-center space-x-2">
                    <Icon icon={service.acf?.icon} className={`text-2xl`} /> <span>{decode(service.title.rendered)}</span>
                </h4>
                <p className="text-xs line-clamp-3 font-light text-slate-500 leading-normal">
                    {decode(service.acf?.masthead?.masthead_title)}
                </p>
            </div>
        </Link>
    );
}