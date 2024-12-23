"use client";
import React from "react";
import processSteps from "../data/processSteps.json";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ProcessSteps() {
    const [space, setSpace] = React.useState(16);
    return (
        <section className=" text-text">
            <div className="container mx-auto inner-container bg-white  py-0 md:py-8">


                {/* Vertical Layout with 3 Columns */}
                <div className="relative ">
                    {/* Dotted Vertical Line */}
                    <div className="absolute top-0 left-[24px] h-full border-l-2 border-gray-100"></div>

                    {/* Steps */}
                    <div className="">
                        {processSteps.map((step) => (
                            <div key={step.id} className={`relative grid grid-cols-1 md:grid-cols-3 gap-8 items-start border-b border-gray-100 pb-8 mt-16`}>
                                {/* Step Number */}
                                <div className="absolute left-0 h-12 w-12 bg-light-blue rounded-full flex items-center justify-center text-white text-lg font-bold">
                                    <Icon
                                        icon={step.icon}
                                        className="text-4xl text-dark-blue"
                                    />
                                </div>
                                {/* Column 1: Title */}
                                <div className="ml-16 md:ml-16">
                                    <div className="flex items-center mb-0">
                                        <h3 className="text-5xl font-semibold text-dark-blue">{step.title}</h3>
                                    </div>
                                </div>
                                {/* Column 2: Description */}
                                <div>
                                    <p className="text-gray-600 text-lg">{step.description}</p>
                                </div>
                                {/* Column 3: List of Services */}
                                <div>
                                    <ul className="text-text space-y-4">
                                        {step.services.map((service, index) => (
                                            <li key={index} className="flex items-center text-2xl underline">
                                                {/* <span className="mr-2 text-gray-500">•</span> */}
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}