"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

import Link from "next/link";
const Masthead = () => {
    return (
        <div className="bg-background pt-16 flex items-center justify-center md:pt-24">
            <div className="container mx-auto">
                <div className="w-full md:w-2/3">
                    <h1 className="text-4xl md:text-6xl font-bold text-text mt-20 md:mt-48">
                        We make software and marketing simple.
                    </h1>
                    <p className="text-xl text-text mt-4">
                        Whether you're a small business with a big vision or a large enterprise looking to streamline your operations, we have the tools and expertise to help you succeed.
                    </p>

                    {/* Two buttons 1. Schedule an audit 2. Learn our process */}
                    <div className="flex mt-8">
                        <Link href="/services/audit" className="bg-black text-white text-md font-bold px-8 py-4 mr-4 flex items-center hover:shadow-xl transition-all duration-300">
                            <Icon icon="qlementine-icons:preview-16" className="mr-2" />
                            Schedule an Audit</Link>
                        <Link href="/process" className="hidden bg-background text-text text-md font-bold px-8 py-4 border border-text flex items-center md:flex 
                    ">
                            <Icon icon="fluent-mdl2:learning-tools" className="mr-2" />
                            Learn Our Process</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Masthead;