"use client";
import React from "react";
import ourProcess from "../data/ourProcess.json";

export default function OurProcess() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">

                {/* Process Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {ourProcess.map((step, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg bg-background text-text`}
                        >
                            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                            <ul className="space-y-2">
                                {step.steps.map((childStep, childIndex) => (
                                    <li
                                        key={childIndex}
                                        className="border-b border-gray-500 pb-2 text-sm"
                                    >
                                        {childStep}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}