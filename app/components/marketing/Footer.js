"use client";
import React from 'react';
import GetStarted from '../GetStarted';
import Logo from '../Logo';
import Link from 'next/link';
import services from '../../data/services';

const Footer = () => {
    services.sort((a, b) => a.title.localeCompare(b.title));
    return (
        <footer className=" text-white py-10">
            <GetStarted />
            <div className="bg-dark-blue py-8">
            <div className="container mx-auto">
                <div className="flex md:space-x-8 md:flex-row flex-col space-y-8 md:space-y-0">
                <div className="w-full md:w-1/3">
                        <Logo color='white' />
                        <p className="mt-4 text-white text-xl mb-8">
                            We are a team of designers, developers, and marketers who are excited to help you grow your business.
                        </p>
                        {/* <h3 className="text-lg font-bold text-text">Contact</h3> */}
                        <p className="text-white">
                            <a href="tel:+12144780989">214-478-0989</a>
                        </p>
                        {/* <p className="mt-4 text-text">123 Main Street, New York, NY 10001</p> */}
                       
                    </div>
                    <div className="w-full md:w-3/4">
                        <h3 className="text-lg font-light text-white">Services</h3>
                        <div className="grid grid-cols-3 gap-4 mt-4 md:grid-cols-4">
                            {services.map((service, index) => (
                                <Link key={index} href={`/services/${service.slug}`}  className="text-white font-normal underline text-md">{service.title}
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