"use client"; // Only if you're using client-side components in the layout

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/portal/Sidebar";
import PortalHeader from "../components/portal/PortalHeader";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../providers/UserProvider";
import ActiveTimer from "../components/portal/ActiveTimer";
import { HubspotProvider } from "../providers/HubspotProvider";
import { TasksProvider } from "../providers/TasksProvider";
import TranscriptionOverlay from "../components/TranscriptionOverlay";

export default function PortalLayout({ children }) {
    useEffect(() => {
        document.body.classList.add("dark");
    }, []);

    const [showSidebar, setShowSidebar] = React.useState(false);

    return (
        <SessionProvider>
            <UserProvider>
                <HubspotProvider>
                    <TasksProvider>
                        {/* Animated Background */}
                        <motion.div
                            className="fixed inset-0 z-0 opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-60" />
                        </motion.div>

                        {/* Content with Blur & Motion */}
                        <motion.div
                            className="flex flex-col min-h-screen py-16 relative z-10"
                            initial={{ opacity: 0.5, scale: 0.98, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <PortalHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
                            <Sidebar showSidebar={showSidebar} />

                            <motion.div
                                className={`flex-1 md:p-0 ${showSidebar ? "ml-64" : ""}`}
                                initial={{ opacity: 0.6, y: 10, filter: "blur(5px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                {children}
                                {/* 3D Force Graph - Kept Interactive */}
                                {/* <div
                                    className="fixed inset-0 flex justify-center items-center top-0 left-0 right-0 bottom-0 sticky min-h-screen"
                                    style={{ zIndex: -1 }}
                                >
                                    <ForceGraph backgroundColor="black" graphData={sampleData} />
                                </div> */}
                            </motion.div>
                        </motion.div>


                    </TasksProvider>
                </HubspotProvider>
                <ActiveTimer />
                <TranscriptionOverlay />
            </UserProvider>
        </SessionProvider>
    );
}