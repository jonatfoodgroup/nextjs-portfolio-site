"use client"; // Only if you're using client-side components in the layout

import React from "react";
import Link from "next/link";
import Sidebar from "../components/portal/Sidebar";
import PortalHeader from "../components/portal/PortalHeader";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../providers/UserProvider";
import ActiveTimer from "../components/portal/ActiveTimer";

export default function PortalLayout({ children }) {
    return (
        <SessionProvider>
            <UserProvider>
                <div className="flex flex-col h-screen">

                    <PortalHeader />
                    <Sidebar />
                    <div className="pl-[280px]">
                        {children}
                    </div>
                </div>
                <ActiveTimer />
            </UserProvider>
        </SessionProvider>

    );
}