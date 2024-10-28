"use client";
import React from "react";

const Callout = () => {
    let image = 'https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    return (
        <section className="relative bg-cover bg-center h-screen" data-aos="fade-in"
            style={{
                backgroundImage: "url('https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                maxHeight: "60vh"
                }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div
                className="container mx-auto h-full flex flex-col justify-end items-start space-y-4 text-white px-4 relative z-50 pb-20">
                <div className="flex flex-col w-1/2">
                    <h2 
                    data-aos="fade-in"
                    data-aos-delay="100"
                    className="text-5xl font-regular mb-6">Advanced Technology for Optimal Performance</h2>
                    <p 
                    data-aos="fade-in"
                    data-aos-delay="200"
                    className="text-lg">From the efficient electric drive system to the advanced stabilization control, every component
                        is designed to blend harmoniously to create an extraordinary driving experience.</p>
                </div>
                <button 
                data-aos="fade-in"
                data-aos-delay="300"
                className="bg-white text-black px-4 py-2 rounded-full mt-8">Learn More</button>
            </div>
        </section>
    )
}

export default Callout;