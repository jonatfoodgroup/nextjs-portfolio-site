"use client";
import React from "react";
import Link from "next/link";

const GetStartedBanner = () => {
    return (
        <div className="container mx-auto inner-container my-16 bg-white">
            <section className="py-16 flex flex-row rounded-lg px-0 md:px-16" style={{ border: "2px solid #e5e7eb" }}>
                <div className="w-full max-w-5xl text-center md:px-0 px-8 items-center justify-center mx-auto">
                    <h2 className="text-2xl md:text-4xl md:text-6xl font-semibold mb-4 text-text">Work With Us Today</h2>
                    <p className="md:text-2xl text-gray-600 mb-6 leading-relaxed">
                        Embrace innovation to drive new value for your organization. Let’s innovate something great together.
                    </p>
                    <Link
                        href="/contact-us"
                        className="px-6 py-3 text-lg font-medium bg-orange text-white shiny-button"
                    >
                        Work With Us
                        <span className="shiny-effect"></span>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default GetStartedBanner;