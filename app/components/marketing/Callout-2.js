"use client";
import React from "react";

const Callout2 = () => {
    return (
        <section className="relative py-16">
            <div className="container mx-auto px-4 justify-center">
                <div className="flex flex-row">
                    <div className="w-1/3">
                        <div className="flex flex-col justify-center items-start">
                            <img
                                src="<?php echo $stock_image; ?>"
                                alt="Electric Car" className="w-full mb-8 object-cover object-center rounded-xl" style={{ height: "600px" }} />
                        </div>
                    </div>
                    <div className="w-2/3 px-10">
                        <div className="flex flex-col justify-center items-start">

                            <h4 className="text-gray-500 mb-10 mt-10">Technology</h4>
                            <h2 className="text-5xl font-semibold mb-8">Presenting Advanced Technology for the Driving Experience of the Future</h2>
                            <p className="text-lg text-gray-500 mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.</p>
                            <a href="#" className="bg-black text-white pl-4 pr-2 py-2 rounded-full inline-flex items-center text-xl">
                                Read More
                                <div className="ml-4 bg-white rounded-full">
                                    

                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Callout2;