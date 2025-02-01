"use client";
import React from 'react';
import GetStarted from '../GetStarted';
import Logo from '../Logo/index.js';
import Link from 'next/link';
import { useWordpress } from '../../providers/WordpressProvider';
import { decode } from 'html-entities';
import { Icon } from '@iconify/react/dist/iconify.js';

const Footer = () => {
    const { services } = useWordpress();

    return (
        <footer className="bg-white text-white">
            <GetStarted />
            <div className="bg-black py-8">
            <div className="container mx-auto">
                <div className="flex md:space-x-8 md:flex-row flex-col space-y-8 md:space-y-0">
                <div className="w-full md:w-1/4">
                        <Logo color='white' />
                        <p className="mt-4 text-white text-md mb-8">
                            We are a team of designers, developers, and marketers who are excited to help you grow your business.
                        </p>
                        {/* <h3 className="text-lg font-bold text-text">Contact</h3> */}
                        <p className="text-white">
                            <a href="tel:+12144780989">214-478-0989</a>
                        </p>
                        {/* <p className="mt-4 text-text">123 Main Street, New York, NY 10001</p> */}
                       
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
                        <div className="flex flex-col space-y-2">
                            {services.map((service, index) => (
                                <Link key={index} href={`/services/${service.slug}`}  className="text-white font-normal  text-sm items-center justify-start hover:underline hover:text-orange-500">
                                    {/* <Icon icon={service.acf.icon} className="text-2xl text-white w-16 h-16 p-4 md:mx-auto" /> */}
                                    <span>{decode(service.title?.rendered)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer;