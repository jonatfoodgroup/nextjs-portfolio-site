"use client";
import { motion } from "framer-motion"; // Framer Motion for animations
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import ForceGraph from "./ForceGraph";
import { useState } from "react";
import sampleData from "../data/sample-force-graph.json";

const Masthead = () => {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <div className="min-h-screen bg-transparent pointer-events-none relative flex items-center justify-center">
            {/* Centered Text Box */}
            {
                isVisible && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center 
                bg-black/10 backdrop-blur-lg rounded-lg px-10 py-10 max-w-3xl text-center z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                staggerChildren: 0.3,
                            },
                        },
                    }}
                >
                    {/* close button on top right subtle */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 text-white"
                    >
                        <Icon icon="carbon:close" className="h-6 w-6" />
                    </button>
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white"
                        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        Your Partner For Digital Success
                    </motion.h1>
                    <motion.p
                        className="text-md md:text-lg text-gray-300 mt-4"
                        style={{ lineHeight: "1.4" }}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        Bring harmony to people, processes, and platforms with StrongStart.
                    </motion.p>

                    {/* Buttons with Hover Animation */}
                    <motion.div
                        className="flex mt-6 justify-center space-x-4"
                        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                    >
                        <Link
                            href="/services/audit"
                            className="shiny-button bg-orange text-black text-lg font-bold px-6 py-3 flex items-center rounded-lg hover:-translate-y-2 hover:shadow-xl transition-transform duration-300"
                        >
                            <Icon icon="carbon:chat" className="mr-2" />
                            Launch With Us
                        </Link>
                        <Link
                            href="/services/audit"
                            className="shiny-button bg-black border border-white text-white text-lg font-bold px-6 py-3 flex items-center rounded-lg hover:-translate-y-2 hover:shadow-xl transition-transform duration-300"
                        >
                            <Icon icon="carbon:chat" className="mr-2" />
                            Discover How
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

                )
            }

            {/* 3D Force Graph - Kept Interactive
            <div
                className="absolute inset-0 flex justify-center items-center"
                style={{ zIndex: 0 }}
            >
                <ForceGraph backgroundColor="black" graphData={sampleData} />
            </div> */}
        </div>
    );
};

export default Masthead;