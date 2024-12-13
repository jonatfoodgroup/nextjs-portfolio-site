"use client";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Callout = ({
    content = null
}) => {
    if (!content) return null;
    return (
        <section className="relative bg-cover bg-center h-screen" data-aos="fade-in"
            style={{
                backgroundImage: `url('${content.bg_image}')`,
                maxHeight: "60vh"
                }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div
                className="container mx-auto h-full flex flex-col justify-end items-start space-y-4 text-white px-4 relative z-50 pb-20">
                <div className="flex flex-col w-2/3">
                    <h2 
                    data-aos="fade-in"
                    data-aos-delay="100"
                    className="text-5xl font-regular mb-6">
                        {content.title}
                    </h2>
                    <p 
                    data-aos="fade-in"
                    data-aos-delay="200"
                    className="text-lg">
                        {content.description}
                    </p>
                </div>
                <Link
                href={content.cta.url}
                data-aos="fade-in"
                data-aos-delay="300"
                className="bg-white text-black px-4 py-2 mt-8 font-semibold flex items-center space-x-2">
                    <span>{content.cta.label}</span>
                    <Icon icon="akar-icons:arrow-right" className="text-black" />

                </Link>
            </div>
        </section>
    )
}

export default Callout;