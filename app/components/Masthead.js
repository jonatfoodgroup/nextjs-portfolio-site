"use client";
import { Icon } from "@iconify/react/dist/iconify.js";


import Link from "next/link";
const Masthead = () => {
    return (
        <div className="bg-light-gray pt-16 pb-36 flex items-center justify-center md:pt-20">
            <div className="container mx-auto inner-container">
                <div className="w-full max-w-4xl mx-auto text-center items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-dark-blue mt-8 md:mt-36 leading-relaxed">
                     Architects & Implementers of the Modern Web.
                    </h1>
                    <p className="text-md md:text-2xl text-dark-blue mt-4 md:mt-6" style={{ lineHeight: "1.4" }}>
                        We design, build and optimize web properties for competitive businesses.
                    </p>

                    {/* Two buttons 1. Schedule an audit 2. Learn our process */}
                    <div className="flex mt-8 justify-center items-center">
                        <Link href="/services/audit" className="bg-dark-blue text-white text-xl font-bold px-8 py-4 mr-4 flex items-center hover:shadow-xl transition-all duration-300">
                            <Icon icon="qlementine-icons:preview-16" className="mr-2 " />
                            Schedule an Audit</Link>
                        <Link href="/services" className="hidden bg-background text-dark-blue text-xl font-bold px-8 py-4 border border-text flex items-center md:flex 
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