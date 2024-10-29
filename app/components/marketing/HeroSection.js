"use client";
import React from "react";
import Link from "next/link";

const HeroSection = ({
    content = null
}) => {
    if (!content) return null;
    return (
        <section className="relative bg-cover bg-center h-screen"
            style={{
                maxHeight: "95vh",
                backgroundImage: `url('${content.bg_image}')`
            }}>
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="container relative mx-auto h-full flex flex-col justify-end items-start space-y-4 text-white">
                <div className="max-w-2xl mb-20">
                    <h1
                        data-aos="fade-in"
                        className="text-4xl md:text-6xl font-bold mb-10">
                        <span dangerouslySetInnerHTML={{ __html: content.title() }} />
                    </h1>
                    <p
                        data-aos="fade-in"
                        data-aos-delay="200"
                        className="text-lg">
                        {content.description}
                    </p>
                    <br />
                    <Link
                        data-aos="fade-in"
                        data-aos-delay="400"
                        href={content.cta.url} className="bg-white text-black px-4 py-2 rounded-full text-xl">
                        {content.cta.label}
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;