"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ServiceList from "../ServicesList";
import Image from "next/image";
import GetStartedBanner from "../GetStarted";
import Footer from "../marketing/Footer";
import ArticleList from "../ArticleList";
import Callout from "../marketing/Callout";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogoWall from "../LogoWall";
import services from "../../data/services";


export default function ServiceView({ service }) {
    return (
        <>
            

            <div className="container inner-container mx-auto py-8">
            <Breadcrumb service={service} />
                <div className="flex mt-16 flex-col md:flex-row">
                    <div className="w-full md:w-2/3">
                        {/* <h2 className="text-xl md:text-xl font-bold text-text mt-0 mb-4">{service.title} </h2> */}

                        <h1 className="text-4xl md:text-7xl font-bold text-dark-blue mt-12">{service.tagline}</h1>
                        <p className="mt-4 text-md md:text-2xl leading-relaxed text-text">{(service.content) ? service.content[0] : service.description}</p>
                        <div className="inline-flex items-center space-x-8 p-6 border-2 border-gray-200 text-text mt-8">
                            <h3 className="text-xl font-medium">Already know what you need?</h3>
                            <Link href="/contact-us" className="px-4 py-2 text-md font-medium bg-black text-white">
                                Chat With Us
                            </Link>
                        </div>
                    </div>
                    <div className="w-1/3 hidden md:block">
                        <Image
                            src={`/${service.image}`}
                            alt={service.title}
                            width={300}
                            height={300}
                            className="object-cover"
                        />
                    </div>
                </div>

                
                <div className="bg-blue-300 p-8 mt-24">
                    {
                        service.services &&
                        <div className="bg-blue-200 inner-container mx-auto">
                            {/* <h2 className="text-3xl font-bold text-text">Service alignment</h2> */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-8">
                                {service.services.map((service, index) => (
                                    <div key={index} className="flex items-start flex-col my-4 px-6 py-8 bg-gray-100 rounded-md">
                                        <div className="flex flex-col items-start bg-gray-100 rounded-md">
                                            <div className=" bg-black flex items-center justify-center rounded-md mb-4">
                                                <Icon icon={service.icon} className="text-2xl text-white w-16 h-16 p-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h4 className="text-xl font-bold text-text">{service.title}</h4>
                                                <p className="text-text text-lg mt-1">{service.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        // </div>
                    }
                </div>
                {
                    service.sections &&
                    service.sections.map((section, index) => (
                        <div key={index} className="mt-16">
                            <h2 className="text-3xl font-bold text-text">{section.title}</h2>
                            <p className="mt-4 text-lg text-text">{section.description}</p>
                        </div>
                    ))
                }

                <LogoWall />
                <Callout
                    content={{
                        title: service.tagline,
                        description: "Let's help you achieve your business goals with our top-notch services.",
                        bg_image: "/images/cta-bg.jpg",
                        cta: {
                            label: "Get Started",
                            url: "/contact-us"
                        }
                    }}
                />




                <div className="mt-24">
                    {/* <h2 className="text-2xl font-bold text-text">Latest Articles</h2> */}
                    <ArticleList items={service.articles} />
                </div>
                <div className="mt-24">
                    {/* <h2 className="text-2xl font-bold text-text">Other Services</h2> */}
                    <ServiceList />
                </div>
            </div>
            <Footer />
        </>
    );
}


const Breadcrumb = ({ service }) => {
    return (
        <nav className="flex items-center space-x-2 text-lg text-text mt-20 mx-auto">
            <Link
                className="underline hover:text-blue-500 transition flex items-center space-x-1"
                href="/">
                Home</Link>
            <span>/</span>
            <Link
                className="underline hover:text-blue-500 transition"
                href="/services">Services</Link>
            <span>/</span>
            <span>{service.title}</span>
        </nav>
    );
}