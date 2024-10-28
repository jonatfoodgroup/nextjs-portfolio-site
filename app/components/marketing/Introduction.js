"use client";
import React from "react";
import Link from "next/link";

const Introduction = ({
    sectionTitle = null,
    heading = null,
    description = null,
    ctaLink = "#",
    ctaText = "Read More",
}) => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <section className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
                    <div className="md:w-1/3">
                        <p 
                        data-aos="fade-in"

                        className="text-gray-500">People, platforms & processes.</p>
                    </div>
                    <div className="md:w-2/3 mt-8 md:mt-0">
                        <h2 className="text-4xl font-regular mb-8" data-aos="fade-in" data-aos-delay="100">
                        Strong relationships with customers, partners, and employees are the backbone of your business. Our technology solutions are the bridge, enhancing connections and enabling growth.
                            <br />
                            <br />
                            <span 
                            data-aos="fade-in"
                            data-aos-delay="200"
                                className="text-2xl text-gray-500">Build seamless integrations with Belfort.</span>
                        </h2>
                        <Link 
                        data-aos="fade-in"
                        data-aos-delay="300"
                        href="#" className="bg-black text-white pl-4 pr-2 py-2 rounded-full inline-flex items-center text-xl">
                        See How We Work
                            <div className="ml-4 bg-white rounded-full">
                                
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default Introduction;