"use client";
import React from 'react';

const Footer = ({
    content = null
}) => {
    if (!content) return null;
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-left pr-20 w-1/2">
                    <h2 className="text-5xl font-regular mb-3" data-aos="fade-in">
                        {content.title}
                    </h2>
                    <p className="mb-10" data-aos="fade-in" data-aos-delay="200">
                        {content.description}
                    </p>
                </div>
                <div className="w-1/2 flex justify-between">
                    {content.links.map((link, index) => (
                        <a key={index} href={link.url} className="hover:text-gray-500" data-aos="fade-in" data-aos-delay={(index + 1) * 100}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer;