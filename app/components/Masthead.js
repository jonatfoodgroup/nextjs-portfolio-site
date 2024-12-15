"use client";
import { Icon } from "@iconify/react/dist/iconify.js";


import Link from "next/link";
const Masthead = () => {
    return (
        <div className="bg-background pt-16 flex items-center justify-center md:pt-20">
            <div className="container mx-auto inner-container">
                <div className="w-full md:w-2/3">
                    <h1 className="text-4xl md:text-7xl font-bold text-text mt-8 md:mt-48 leading-relaxed">
                        Digital Architects of the Modern Web.
                    </h1>
                    <p className="text-md md:text-4xl text-text mt-4 md:mt-6" style={{ lineHeight: "1.4" }}>
                        We design, build and optimize web properties for competitive businesses.
                    </p>

                    {/* Two buttons 1. Schedule an audit 2. Learn our process */}
                    <div className="flex mt-8">
                        <Link href="/services/audit" className="bg-black text-white text-xl font-bold px-8 py-4 mr-4 flex items-center hover:shadow-xl transition-all duration-300">
                            <Icon icon="qlementine-icons:preview-16" className="mr-2 " />
                            Schedule an Audit</Link>
                        <Link href="/services" className="hidden bg-background text-text text-xl font-bold px-8 py-4 border border-text flex items-center md:flex 
                    ">
                            <Icon icon="fluent-mdl2:learning-tools" className="mr-2" />
                            View Our Services</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Masthead;