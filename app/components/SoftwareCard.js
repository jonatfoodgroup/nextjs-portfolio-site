"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { decode } from "html-entities";

export default function SoftwareCard({ softwareId }) {
    const [software, setSoftware] = useState(null);
    let baseUrl = process.env.WORDPRESS_URL;
    useEffect(() => {
        const fetchRelationships = async () => {
            const response = await fetch(`https://jonsenterfitt.com/wp-json/wp/v2/software/${softwareId}`);
            const data = await response.json();
            setSoftware(data);
        };

        fetchRelationships();
    }, [softwareId]);

    if (!software) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Link href={`/software/${software.slug}`}>
                <h2>{}</h2>
            </Link>
            <Link key={decode(software.title.rendered)} className="p-4 bg-white hover:shadow-xl rounded-lg transition duration-300 cursor-pointer border border-border flex flex-col items-center justify-center" href={`/softwares/${software.slug}`}>
                <img
                    src={`/images/software-logos/${decode(software.title.rendered).toLowerCase()}.webp`}
                    alt={`${decode(software.title.rendered)} logo`}
                    className="w-full md:h-20 object-contain mb-2"
                />
                <h2 className="text-sm text-text font-semibold">{decode(software.title.rendered)}</h2>
            </Link>
        </div>
    );
}