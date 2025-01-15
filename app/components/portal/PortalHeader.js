"use client";
import Link from "next/link";

const PortalHeader = () => {
    return (
        <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50">
                <div className="flex justify-between items-center">
                    <Link href="/portal" className="text-xl font-semibold">
                        StrongStart
                    </Link>
                    <nav>
                        <a href="/logout" className="text-sm">Logout</a>
                    </nav>
                </div>
            </header>
    )
}

export default PortalHeader;