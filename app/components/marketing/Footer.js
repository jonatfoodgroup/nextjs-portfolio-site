"use client";
import React from 'react';
import GetStarted from '../GetStarted';
import Logo from '../Logo';
import Link from 'next/link';
import services from '../../data/services';

const Footer = () => {
    services.sort((a, b) => a.title.localeCompare(b.title));
    return (
        <footer className="bg-background text-black py-10">
            <GetStarted />
            <div className="container mx-auto">
                <div className="flex md:space-x-8 md:flex-row flex-col space-y-8 md:space-y-0">
                    <div className="w-full md:w-1/4">
                        <Logo />
                        <p className="mt-4 text-text">
                            We are a team of designers, developers, and marketers who are excited to help you grow your business.
                        </p>
                    </div>
                    <div className="w-full md:w-2/4">
                        <h3 className="text-lg font-bold text-text">Services</h3>
                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                            {services.map((service, index) => (
                                <Link key={index} href={`/services/${service.slug}`}  className="text-text underline">{service.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-bold text-text">Contact</h3>
                        <p className="mt-4 text-text">123 Main Street</p>
                        <p className="text-text">New York, NY 10001</p>
                        <p className="text-text">
                            <a href="tel:555-555-5555">555-555-5555</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;