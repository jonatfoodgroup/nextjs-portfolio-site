"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="py-4 absolute top-0 w-full" style={{zIndex:9}}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl text-white font-bold" data-aos="fade-in">
                    <Link href="/"><img src="/images/logo.png" alt="Belfort" className="h-20 w-auto" /></Link>
                </div>
                {/* <nav className="space-x-6">
                    <Link href="#" className="text-white hover:text-white border px-2 py-1 rounded-full border-white">Home</Link>
                    <Link href="#" className="text-white hover:text-white">Who We Are</Link>
                    <Link href="#" className="text-white hover:text-white">What We Do</Link>
                    <Link href="#" className="text-white hover:text-white">Trends & Insights</Link>
                </nav> */}
                <div className="text-white" data-aos="fade-in">
                    <button className="bg-white text-black px-4 py-2 rounded-full">Let's Talk</button>
                </div>
            </div>
        </header>
    )
}

export default Header;