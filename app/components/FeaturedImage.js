"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedImage({ mediaId }) {

    const [image, setImage] = useState(null);
    // let baseUrl = process.env.WORDPRESS_URL;
    useEffect(() => {
        const fetchMedia = async () => {
            const response = await fetch(`https://jonsenterfitt.com/wp-json/wp/v2/media/${mediaId}`);
            const data = await response.json();
            setImage(data);
        };

        fetchMedia();
    }, [mediaId]);

    if (!image) {
        return <div>Loading...</div>;
    }
    return (
        <Image
            src={image.source_url}
            alt={image.alt_text}
            width={image.media_details.width}
            height={image.media_details.height}
            className="rounded-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 object-cover object-top w-full h-96 bg-gray-200"
        />
    );
}