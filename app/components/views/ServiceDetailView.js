"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ServiceList from "../ServicesList";
import Image from "next/image";
import Footer from "../marketing/Footer";
import ArticleList from "../ArticleList";
import Callout from "../marketing/Callout";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogoWall from "../LogoWall";
import { decode } from "html-entities";
import FeaturedImage from "../FeaturedImage";
import SaveLink from "../service/SaveLink";

export default function ServiceView({ service, children }) {
    return (
        <>
            <div className="relative bg-white">
                <Breadcrumb service={service} />
                <div className="container inner-container  mx-auto">
                    <div className="flex mt-0 md:mt-8 flex-col md:flex-row">
                        <div className="w-full pr-0 md:pr-20 text-center max-w-4xl mx-auto">
                            <h1 className="text-6xl md:text-5xl font-bold text-black mt-12">{service.acf.masthead?.masthead_title}</h1>
                            <p className="mt-4 text-md md:text-xl leading-relaxed text-darker-gray font-regular">{(service.acf.masthead?.masthead_content) ? decode(service.acf.masthead.masthead_content) : decode(service.acf.masthead.masthead_title)}</p>
                            <Link href="/contact-us" className="inline-flex mt-8"
                                data-aos="fade-in" data-aos-delay="400">
                                <div className="px-8 py-4 text-lg font-bold bg-orange text-white flex items-center space-x-2 shiny-button">
                                    <Icon icon="bx:bx-chat" className="text-white w-6 h-6 mr-2" />
                                    Chat With Us
                                    <span className="shiny-effect"></span>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
                <PinStyleList children={children} />
                <div className="container inner-container mx-auto">
                    <div className="my-24" id="articles">
                        <h2 className="text-2xl font-bold text-text">Latest Articles in {decode(service.title.rendered)}</h2>
                        <ArticleList filters={{ service_relationship: service.id }} />
                    </div>
                </div>
                <div className="container inner-container mx-auto">
                    <Callout
                        content={{
                            title: service.acf.masthead?.masthead_title,
                            description: "Let's help you achieve your business goals with our top-notch services.",
                            bg_image: "/images/cta-bg.jpg",
                            cta: {
                                label: "Get Started",
                                url: "/contact-us"
                            }
                        }}
                    />
                </div>

                <div className="container inner-container mx-auto my-8">
                    <LogoWall />
                </div>




            </div >

            <div className="bg-light-orange py-20 my-20">
                <ServiceList />
            </div>


            <Footer />
        </>
    );
}

const PinStyleList = ({ children }) => {
    return (
        <div className="bg-black py-4 my-10" id="process">
            <div className="my-10 mx-auto container">
                {children && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-[minmax(200px, auto)]">
                        {children.map((child, index) => (
                            <Link
                                href={`/services/${child.slug}`}
                                key={index}
                                // data-aos="fade-in"
                                // data-aos-delay={index * 50}
                                className="relative bg-black border-2 border-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer rounded-md overflow-hidden p-6 flex flex-col justify-between shiny-button"
                            >
                                {/* Background Icon */}
                                <div
                                    className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain"
                                    style={{
                                        backgroundImage: `url(${child.acf.icon})`
                                    }}
                                ></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h2 className="text-xl font-semibold text-white transition-colors duration-300">
                                        {decode(child.acf.masthead.masthead_title)}
                                    </h2>
                                    <p className="text-gray-400 mt-2 text-sm">
                                        {decode(child.acf.masthead.masthead_content)}
                                    </p>
                                </div>

                                {/* Bottom Section */}
                                <div className="relative z-10 flex items-center justify-between mt-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-white border border-black p-3 rounded-full">
                                            <Icon
                                                icon={child.acf.icon}
                                                className="text-black w-6 h-6"
                                            />
                                        </div>
                                        <h4 className="text-md font-semibold text-white hover:text-orange-500 transition-colors duration-300">
                                            {decode(child.title.rendered)}
                                        </h4>
                                    </div>
                                    <Icon
                                        icon="bx:bx-right-arrow-alt"
                                        className="text-xl text-black"
                                    />
                                </div>
                                <div className="shiny-effect"></div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const BreadcrumbSubNav = () => {
    const subNavItems = [
        { label: "Articles", href: "#articles" },
        { label: "Process", href: "#process" },
        // { label: "Features", href: "#features" },
        // { label: "Get Started", href: "#get-started" },
    ];

    return (
        <div className="flex space-x-6">
            {subNavItems.map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-orange-500 transition font-bold">
                    {item.label}
                </a>
            ))}
        </div>
    );
};

const Breadcrumb = ({ service }) => {
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";
    const [parentService, setParentService] = useState(null);

    useEffect(() => {
        if (service.parent) {
            fetch(`${baseUrl}/service/${service.parent}`)
                .then(response => response.json())
                .then(data => setParentService(data));
        }
    }, [service]);

    return (
        <div className="bg-white py-4 pt-14">
            <div className="container mx-auto flex justify-between items-center md:flex" data-aos="fade-in" data-aos-delay="200">
                {/* Left: Breadcrumb Navigation */}
                <nav className="flex items-center space-x-1 text-sm text-darker-gray">
                    <Link
                        className="underline transition flex items-center space-x-1"
                        href="/">
                        Home
                    </Link>
                    <span>/</span>
                    <Link
                        className="underline transition"
                        href="/services">
                        Hub
                    </Link>

                    {parentService && (
                        <>
                            <span>/</span>
                            <Link
                                className="underline transition flex items-center space-x-1"
                                href={`/services/${parentService.slug}`}>
                                <Icon icon={parentService.acf.icon} className="text-orange w-4 h-4 mr-1" />
                                {decode(parentService.title.rendered)}
                            </Link>
                        </>
                    )}
                    <span>/</span>
                    <span className="font-bold flex items-center text-black space-x-1">
                        <Icon icon={service.acf.icon} className="text-orange w-4 h-4 mr-1" />
                        {decode(service.title.rendered)}
                    </span>
                    <span>/</span>
                    <EditPageLink service={service} />
                    <span>/</span>
                    <SaveLink service={service} />
                </nav>

                {/* Right: Sub-Navigation */}
                <BreadcrumbSubNav />
            </div>
        </div>
    );
};

const EditPageLink = ({ service }) => {
    return (
        <Link
            target="_blank"
            href={`https://jonsenterfitt.com/wp-admin/post.php?post=${service.id}&action=edit`} className="text-xs text-gray-500 hover:text-gray-700">
            Edit Page
        </Link>
    );
}