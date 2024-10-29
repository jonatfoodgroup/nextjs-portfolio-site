"use client";
import React from "react";
import Link from "next/link";

const Introduction = ({
   content = null
}) => {
    if(!content) return null;
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <section className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
                    <div className="md:w-1/3">
                        <p 
                        data-aos="fade-in"
                        className="text-gray-500">{content.sectionTitle}</p>
                    </div>
                    <div className="md:w-2/3 mt-8 md:mt-0">
                        <h2 className="text-4xl font-regular mb-8" data-aos="fade-in" data-aos-delay="100">
                            {content.headline()}
                        </h2>
                        <Link 
                        data-aos="fade-in"
                        data-aos-delay="300"
                        href={content.cta.url} className="bg-black text-white pl-4 pr-2 py-2 rounded-full inline-flex items-center text-xl">
                            {content.cta.label}
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