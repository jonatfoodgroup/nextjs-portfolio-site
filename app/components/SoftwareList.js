"use client";
import React, { useState, useEffect } from "react";
import softwares from "../data/softwares";

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
        <div className="flex flex-col mt-16">
            <div className="flex flex-col md:flex-row justify-between items-top align-top">
                <div className="flex flex-col w-full md:w-1/2">
                    <h2 className="text-3xl font-bold text-text mb-4">A broad range of software strategies for your business</h2>
                    {/* <p className="text-text mb-8">
                        Find the software you need to get the job done.
                    </p> */}
                </div>
                <form className="mb-8 w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search software"
                        className="p-2 border border-border w-full h-16"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {localSoftwares.map((software) => (
                    <div key={software.title} className="p-4 bg-background hover:shadow-xl rounded-lg transition duration-300 cursor-pointer border border-border flex flex-col items-center justify-center">
                        <img 
                            src={`/images/software-logos/${software.title.toLowerCase()}.webp`} 
                            alt={`${software.title} logo`} 
                            className="w-full h-10 object-contain mb-2"
                        />
                        <h2 className="text-sm text-text">{software.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SoftwareList;