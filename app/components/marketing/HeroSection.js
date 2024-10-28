"use client";
import React from "react";
import Link from "next/link";

const HeroSection = ({
    bgImage = null,
    title = "Modern solutions for current and future IoT needs.",
    ctaLink = "#",
}) => {
    return (
        <section className="relative bg-cover bg-center h-screen"
            style={{ 
                maxHeight: "80vh",
                backgroundImage: "url('https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="container relative mx-auto h-full flex flex-col justify-end items-start space-y-4 text-white">
                <div className="max-w-2xl mb-20">
                    <h1 
                    data-aos="fade-in"
                    className="text-4xl md:text-6xl font-bold mb-10">Better Process.<br />Better Product.</h1>
                    <p 
                    data-aos="fade-in"
                    data-aos-delay="200"
                    className="text-lg">We deliver solutions rooted in a deep understanding of your business challenges, the people you serve, and the platforms you rely on, transforming complex problems into streamlined, impactful outcomes.</p>
                    <br />
                    <Link 
                    data-aos="fade-in"
                    data-aos-delay="400"
                    href="#" className="bg-white text-black px-4 py-2 rounded-full text-xl">Learn More</Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;