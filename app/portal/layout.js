"use client"; // Only if you're using client-side components in the layout

import React, { useEffect } from "react";
import Sidebar from "../components/portal/Sidebar";
import PortalHeader from "../components/portal/PortalHeader";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../providers/UserProvider";
import ActiveTimer from "../components/portal/ActiveTimer";

export default function PortalLayout({ children }) {
    useEffect(() => {
        // add a class to the body to apply dark mode
        document.body.classList.add("dark");
    }, []);
    return (
        <SessionProvider>
            <UserProvider>
                <div className="flex flex-col min-h-screen bg-gray-800 py-20">
                    <PortalHeader />
                    <Sidebar />
                    <div className="pl-0 md:pl-[300px] bg-gray-800 pr-10">
                        {children}
                    </div>
                </div>
                <ActiveTimer />
            </UserProvider>
        </SessionProvider>

    );
}