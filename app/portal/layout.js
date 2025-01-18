"use client"; // Only if you're using client-side components in the layout

import React from "react";
import Sidebar from "../components/portal/Sidebar";
import PortalHeader from "../components/portal/PortalHeader";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../providers/UserProvider";
import ActiveTimer from "../components/portal/ActiveTimer";

export default function PortalLayout({ children }) {
    return (
        <SessionProvider>
            <UserProvider>
                <div className="flex flex-col h-screen bg-gray-800 py-20">
                    <PortalHeader />
                    <Sidebar />
                    <div className="pl-[300px] bg-gray-800 pr-10">
                        {children}
                    </div>
                </div>
                <ActiveTimer />
            </UserProvider>
        </SessionProvider>

    );
}