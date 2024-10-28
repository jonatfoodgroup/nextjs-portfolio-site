"use client";
import React from "react";

const GetStarted = () => {
    let image = "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return (
        <section className="bg-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-left pr-20 w-1/2">
                    <h2 className="text-5xl font-regular text-gray-800 mb-3" data-aos="fade-in">Ready to start simplifying solutions and improving your business?</h2>
                    <p className="text-gray-500" data-aos="fade-in" data-aos-delay="200">
                        An informal chat to discuss your business needs and how we can help you, followed by an improvement plan and a quote is all it takes to get started.
                    </p>
                    <button
                        data-aos="fade-in"
                        data-aos-delay="400"
                        className="mt-4 bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
                        Let's Begin
                        </button>
                </div>
                <img className="w-1/2 object-cover rounded-2xl"
                    data-aos="fade-in"
                    
                    src={image}
                    alt="Carsova Electric Car" style={{ height: "400px" }} />
            </div>
        </section>
    )
}

export default GetStarted;