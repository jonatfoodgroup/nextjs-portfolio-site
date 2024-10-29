"use client";
import Link from "next/link";
import React from "react";

const GetStarted = ({
    content = null
}) => {
    if (!content) return null;
    return (
        <section className="bg-white p-6 py-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-left pr-20 w-1/2">
                    <h2 className="text-5xl font-regular text-gray-800 mb-3" data-aos="fade-in">
                        {content.title}
                    </h2>
                    <p className="text-gray-500 mb-10" data-aos="fade-in" data-aos-delay="200">
                        {content.description}
                    </p>
                    <Link
                        href={content.cta.url}
                        data-aos="fade-in"
                        data-aos-delay="400"
                        className="mt-4 bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
                        {content.cta.label}
                    </Link>
                </div>
                <img className="w-1/2 object-cover rounded-2xl"
                    data-aos="fade-in"
                    src={content.image}
                    alt="Carsova Electric Car" style={{ height: "400px" }} />
            </div>
        </section>
    )
}

export default GetStarted;