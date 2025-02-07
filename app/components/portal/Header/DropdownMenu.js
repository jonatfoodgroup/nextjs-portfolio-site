"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import PointsCount from "./PointsCount";

const DropdownMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    let links = [
        {
            title: "Admin Console",
            onClick: () => alert("Go to Admin Console"),
            icon: "carbon:user",
        },
        {
            title: "Invite to StrongStart",
            onClick: () => alert("Invite to StrongStart"),
            icon: "carbon:send-alt",
        },
        {
            title: "Profile",
            onClick: () => alert("View Profile"),
            icon: "carbon:user",
        },
        {
            title: "Settings",
            onClick: () => alert("Settings"),
            icon: "carbon:gears",
        },
        {
            title: "Log Out",
            onClick: () => alert("Log Out"),
            icon: "carbon:logout",
        }
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative inline-block text-left" ref={ref}>
            {/* Trigger Button */}
            <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 bg-transparent rounded-full px-2 py-1 shadow hover:bg-gray-900 focus:outline-none transition duration-150"
            >
                <img
                    src={user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold text-sm">{user.username}</span>
                <PointsCount />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-black border border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="px-4 py-2 border-b text-gray-800 border-gray-700">
                        <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full" />
                        <p className="font-semibold mt-2 text-white">{user.name}
                            <span className="w-2 h-2 inline-block bg-green-500 rounded-full ml-1"></span>
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <ul className="py-2">
                        {links.map((link, index) => (
                            <li key={index} className="text-gray-800">
                                <button
                                    onClick={link.onClick}
                                    className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-700 hover:text-white focus:outline-none text-gray-400"
                                >
                                    <Icon icon={link.icon} className="w-5 h-5" />
                                    <span
                                        className="font-semibold text-xs"
                                    >{link.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;