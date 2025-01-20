"use client"; // Only if you're using client-side components in the layout

import React, { useEffect } from "react";
import PortalHeader from "../components/portal/PortalHeader";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../providers/UserProvider";

export default function ScheduleLayout({ children }) {
    useEffect(() => {
        // add a class to the body to apply dark mode
        document.body.classList.add("dark");
    }, []);

    return (
        <SessionProvider>
            <UserProvider>
                <div className="flex flex-col min-h-screen bg-gray-800 py-20">
                    <PortalHeader />
                    <div className={`flex-1 p-4 md:p-8`}>
                        {children}
                    </div>
                </div>
            </UserProvider>
        </SessionProvider>

    );
}