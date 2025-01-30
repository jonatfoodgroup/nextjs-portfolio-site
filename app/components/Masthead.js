"use client";
import { motion } from "framer-motion"; // Framer Motion for animations
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import ForceGraph from "./ForceGraph";
import { useEffect, useState } from "react";
import { useWordpress } from "../providers/WordpressProvider";
import sampleData from "../data/sample-force-graph.json";

const generateGraphData = (posts) => {
    const nodes = [];
    const links = [];

    const tagNodes = new Set(); // To avoid duplicate tag nodes
    const categoryNodes = new Set(); // To avoid duplicate category nodes

    posts.forEach((post) => {
        // Add post node
        nodes.push({
            id: `post-${post.id}`,
            group: "posts",
            label: post.title.rendered,
        });

        // Add tag nodes and links
        post.tags.forEach((tag) => {
            if (!tagNodes.has(tag)) {
                nodes.push({
                    id: `tag-${tag}`,
                    group: "tags",
                    label: `Tag: ${tag}`,
                });
                tagNodes.add(tag);
            }
            links.push({
                source: `post-${post.id}`,
                target: `tag-${tag}`,
            });
        });

        // Add category nodes and links
        post.categories.forEach((category) => {
            if (!categoryNodes.has(category)) {
                nodes.push({
                    id: `category-${category}`,
                    group: "categories",
                    label: `Category: ${category}`,
                });
                categoryNodes.add(category);
            }
            links.push({
                source: `post-${post.id}`,
                target: `category-${category}`,
            });
        });
    });

    return { nodes, links };
};

const Masthead = () => {
    const [graphData, setGraphData] = useState({
        nodes: [
            { id: "Core Platform", group: 1 },
            { id: "Client Portal", group: 1 },
            { id: "Service Design", group: 2 },
            { id: "Project Management", group: 2 },
            { id: "API Integration", group: 3 },
            { id: "Analytics Dashboard", group: 3 },
            { id: "Automation Engine", group: 4 },
            { id: "Team Collaboration", group: 4 },
            { id: "Knowledge Base", group: 5 },
            { id: "Custom Plugins", group: 6 },
        ],
        links: [
            { source: "Core Platform", target: "Client Portal" },
            { source: "Core Platform", target: "Service Design" },
            { source: "Service Design", target: "Project Management" },
            { source: "Client Portal", target: "Analytics Dashboard" },
            { source: "Analytics Dashboard", target: "Automation Engine" },
            { source: "Automation Engine", target: "Team Collaboration" },
            { source: "API Integration", target: "Custom Plugins" },
            { source: "Team Collaboration", target: "Knowledge Base" },
        ],
    });
    const { posts } = useWordpress();

    useEffect(() => { }, [posts]);

    return (
        <div className="min-h-screen bg-black relative">
            {/* Text Section with Staggered Motion */}
            <div className="absolute bottom-0 left-0 w-1/2 flex flex-col h-screen items-center justify-end pt-16 pb-36" style={{ zIndex: 3 }}>
                <motion.div
                    className="flex flex-col pl-[25%] space-y-4"
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
                    <motion.div
                        className="w-full max-w-6xl mx-auto text-left items-start justify-center"
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-white pointer-events-none"
                            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            Your Partner in Digital Transformation
                        </motion.h1>
                        <motion.p
                            className="text-md md:text-2xl text-gray-300 mt-4 md:mt-6"
                            style={{ lineHeight: "1.4" }}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            Bring harmony to people, processes, and platforms with StrongStart.
                        </motion.p>

                        {/* Buttons with Hover and Entrance Animation */}
                        <motion.div
                            className="flex mt-8 justify-start items-center space-x-4"
                            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                        >
                            <Link
                                href="/services/audit"
                                className="shiny-button bg-black text-white text-lg font-bold px-6 py-3 flex items-center relative overflow-hidden rounded-lg hover:-translate-y-2 hover:shadow-xl transition-transform duration-300 border-2 border-white"
                            >
                                <Icon icon="carbon:chat" className="mr-2" />
                                Get Started
                                <span className="shiny-effect"></span>
                            </Link>
                            {/* discover how button */}
                            <Link
                                href="/services/audit"
                                className="shiny-button bg-black text-white text-lg font-bold px-6 py-3 flex items-center relative overflow-hidden rounded-lg hover:-translate-y-2 hover:shadow-xl transition-transform duration-300 border-2 border-gray-300"
                            >
                                <Icon icon="carbon:chat" className="mr-2" />
                                Discover How
                                <span className="shiny-effect"></span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* 3D Force Graph with Fade-in */}
            <div
                className="absolute top-0 right-0 w-full flex justify-center items-center"
                style={{
                    zIndex: 1,
                }}
            >
                <div className="w-full h-full bg-black absolute" style={{ zIndex: 2, background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)', pointerEvents: "none" }}></div>
                {
                    !graphData && (
                        <div className="bg-black w-full h-full flex items-center justify-center">
                            <Icon icon="bx:bx-loader-alt" className="text-white text-4xl animate-spin" />
                        </div>
                    )
                }

                {graphData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ width: "100%", height: "100vh", zIndex: 1 }}
                        className="no-select"
                    >
                        <ForceGraph backgroundColor="black" graphData={sampleData} />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Masthead;