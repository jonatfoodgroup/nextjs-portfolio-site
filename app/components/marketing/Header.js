"use client";
import React from "react";
import Link from "next/link";

const Header = ({
    content = null
}) => {
    return (
        <header className="py-4 absolute top-12 w-full" style={{ zIndex: 9 }}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl text-white font-bold" data-aos="fade-in">
                    {
                        content.logo_url !== "" &&
                        <Link href="/"><img src={content.logo_url} alt={content.company_name} className="h-20 w-auto" /></Link>
                    }
                    {
                        content.logo_url === "" &&
                        <Link href="/"><span className="text-2xl uppercase"
                        >{content.company_name}</span></Link>
                    }
                </div>
                <nav className="space-x-6">
                    {
                        content.nav.map((item, index) => (
                            <Link key={index} href={item.url} 
                                data-aos="fade-in"
                                data-aos-delay={(index + 1) * 100}
                            className="text-white hover:text-white">{item.label}</Link>
                        ))
                    }
                </nav>
                <div className="text-white" data-aos="fade-in" data-aos-delay="400">
                    <Link

                        href={content.cta.url}
                        className="bg-white text-black px-4 py-2 rounded-full">
                        {content.cta.label}
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;