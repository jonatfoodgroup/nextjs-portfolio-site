"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedImage({ mediaId, width = 64, height = 64 }) {

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
        return <></>;
    }
    return (
        <Image
            src={image.source_url}
            alt={image.alt_text}
            width={width}
            height={height}
            className="rounded-full"
        />
    );
}