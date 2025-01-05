"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import FancyMasthead from "./FancyMasthead";


import Link from "next/link";
const Masthead = () => {
    return (
        <div className="bg-black pt-16 pb-36 flex items-center justify-center md:pt-36 relative min-h-[80vh]">
            <div className="container mx-auto inner-container relative z-50">
                <div className="w-full max-w-4xl mx-auto text-center items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mt-16 md:mt-36">
                        Integrating the Modern Web
                    </h1>
                    <p className="text-md md:text-2xl text-white mt-4 md:mt-6" style={{ lineHeight: "1.4" }}>
                        We design, build and optimize web properties for competitive businesses.
                    </p>

                    {/* Two buttons 1. Schedule an audit 2. Learn our process */}
                    <div className="flex mt-8 justify-center items-center">
                        <Link href="/services/audit" className="bg-orange text-white text-xl font-bold px-8 py-4 mr-4 flex items-center hover:shadow-xl transition-all duration-300">
                            <Icon icon="qlementine-icons:preview-16" className="mr-2 " />
                            Schedule an Audit</Link>
                        <Link href="/services" className="hidden bg-light-orange text-orange text-xl font-bold px-8 py-4 border border-text flex items-center md:flex 
                    ">
                            <Icon icon="fluent-mdl2:learning-tools" className="mr-2" />
                            View Our Services</Link>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <FancyMasthead />
            </div>
        </div>
    );
}

export default Masthead;