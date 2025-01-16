"use client";
import ProjectSearch from "./ProjectSearch";
import Link from "next/link";

const PortalHeader = () => {
    return (
        <header className="bg-gray-800 text-white px-4 py-2 fixed top-0 left-0 w-full z-50">
                <div className="flex justify-between items-center">
                    <Link href="/portal" className="text-xl font-semibold">
                        StrongStart
                    </Link>
                    <ProjectSearch />
                    <nav>
                        <a href="/logout" className="text-sm">Logout</a>
                    </nav>
                </div>
            </header>
    )
}


export default PortalHeader;