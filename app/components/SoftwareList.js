"use client";
import React, { useState, useEffect } from "react";
import softwares from "../data/softwares";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const SoftwareList = () => {
    const [localSoftwares, setLocalSoftwares] = useState([]);
    const [search, setSearch] = useState("");
    // sort softwares by title
    softwares.sort((a, b) => a.title.localeCompare(b.title));

    useEffect(() => {
        setLocalSoftwares(softwares);
    }, []);

    useEffect(() => {
        if (search === "") {
            setLocalSoftwares(softwares);
        } else {
            setLocalSoftwares(
                softwares.filter((software) =>
                    software.title.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search]);
    return (
        <div className="container mx-auto inner-container">
        <div className="flex flex-col mt-16">
            <div className="flex flex-col md:flex-row justify-between items-top align-top">
                <div className="flex flex-col w-full md:w-1/2">
                    <h2 className="text-4xl font-bold text-text mb-4">A broad range of software strategies for your business</h2>
                    {/* <p className="text-text mb-8">
                        Find the software you need to get the job done.
                    </p> */}
                </div>
                {/* <form className="mb-8 w-full md:w-1/2 flex items-center">
                    
                    <input
                        type="text"
                        placeholder="Search software"
                        className="p-2 border border-border w-full h-16 px-6"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Icon icon="mdi:magnify" className="text-2xl ml-2" />
                </form> */}
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 md:gap-4 gap-2 mt-4">
                {localSoftwares.map((software) => (
                    <Link 
    key={software.title} 
    className="p-4 bg-white hover:shadow-xl hover:-translate-y-2 rounded-lg transition-transform duration-300 cursor-pointer border border-gray-200 flex flex-col items-center justify-center" 
    href={`/softwares/${software.slug}`}
>                        <img 
                            src={`/images/software-logos/${software.title.toLowerCase()}.webp`} 
                            alt={`${software.title} logo`} 
                            className="w-full md:h-20 object-contain mb-2"
                        />
                        <h2 className="text-sm text-text font-semibold">{software.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    </div>
    );
}

export default SoftwareList;