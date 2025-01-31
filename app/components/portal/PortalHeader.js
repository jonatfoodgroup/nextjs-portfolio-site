"use client";
import ProjectSearch from "./ProjectSearch";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import DropdownMenu from "./Header/DropdownMenu";
import Button from "../Button";

const PortalHeader = ({
    setShowSidebar,
    showSidebar
}) => {
    return (
        <header className="bg-black text-white px-4 py-2 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={() => setShowSidebar(!showSidebar)}
                        variant="outline"
                        icon="carbon:menu"
                    >
                        Menu
                    </Button>
                    <Link href="/portal" className="text-xl font-semibold">
                        StrongStart
                    </Link>
                </div>
                <ProjectSearch />
                <nav className="flex items-center space-x-4">
                    <Link
                        href="/schedule"
                    >
                        <Button icon={"carbon:calendar"} variant="outline">
                            Today's Schedule
                        </Button></Link>
                    <LoginButton />
                </nav>
            </div>
        </header>
    );
};

const LoginButton = () => {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return (
            <div className="text-sm text-gray-400 animate-pulse">
                <Icon icon="akar-icons:circle" className="w-4 h-4" />
            </div>
        );
    }

    if (status === "authenticated") {
        return (
            <DropdownMenu user={session.user} />
        );
    }

    return (
        <button
            onClick={() => signIn("discord")}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-150"
        >
            Login
        </button>
    );
}

export default PortalHeader;