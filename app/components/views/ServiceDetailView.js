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
                        <div className="w-full md:w-1/2 pr-0 md:pr-20">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-black mt-12">{service.acf.masthead?.masthead_title}</h1>
                            <p className="mt-4 text-md md:text-lg leading-relaxed text-darker-gray font-regular">{(service.acf.masthead?.masthead_content) ? decode(service.acf.masthead.masthead_content) : decode(service.acf.masthead.masthead_title)}</p>
                            <Link href="/contact-us" className="inline-flex mt-8"
                                data-aos="fade-in" data-aos-delay="400">
                                <div className="px-8 py-4 text-lg font-bold bg-orange text-white flex items-center space-x-2 shiny-button">
                                    <Icon icon="bx:bx-chat" className="text-white w-6 h-6 mr-2" />
                                    Chat With Us
                                    <span className="shiny-effect"></span>
                                </div>
                            </Link>
                        </div>
                        <div className="w-1/2 hidden md:block" data-aos="fade-in" data-aos-delay="200">
                            <div className="w-full h-96 bg-light-gray mt-8 rounded-md border-2 border-light-gray shadow-md">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container inner-container mx-auto">
                    <div className="my-16">
                        {children && (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    {children.map((child, index) => (
                                        <div
                                            data-aos="fade-in"
                                            data-aos-delay={index * 50}
                                            key={index}>
                                            <Link
                                                href={`/services/${child.slug}`}
                                                className="flex items-center flex-col md:my-4 px-8 py-8 rounded-md bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer min-h-[120px]"

                                            >
                                                <div className="flex flex-col items-center rounded-md">
                                                    <div
                                                        className={`gradient-${index + 1} flex items-center justify-center rounded-full mb-4 -mt-16`}
                                                    >
                                                        <Icon
                                                            icon={child.acf.icon}
                                                            className="text-2xl text-white w-16 h-16 p-4"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col items-center text-center">
                                                        <h4 className="text-md font-extrabold text-black hover:text-orange-500 transition-colors duration-300">
                                                            {decode(child.title.rendered)}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                </div>
                <BackAndForth children={children} />
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

const BackAndForth = ({ children }) => {
    return (
        <div className="bg-light-orange py-4" id="process">
            <div className="my-16 container inner-container mx-auto">
                {children && (
                    <div className="grid grid-cols-1 gap-4">
                        {children.map((child, index) => (
                            <div
                                data-aos="fade-in"
                                data-aos-delay={index * 50}
                                key={index}
                                className="flex justify-center items-center">
                            <Link
                                href={`/services/${child.slug}`}
                                className={`flex flex-col md:flex-row ${index % 2 === 0 ? "" : "md:flex-row-reverse"
                                    } items-center justify-center space-x-8 p-8 py-16 bg-white rounded-md shadow-md group  my-4 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
                                
                            >
                                {/* Content Section */}
                                <div
                                    className={`w-full md:w-1/2 ${index % 2 === 0
                                        ? "md:pr-20"
                                        : "md:pl-10"
                                        } md:p-8 p-2 bg-white rounded-md`}
                                >
                                    <h2 className="text-xl md:text-4xl font-bold text-gray-900 transition-colors duration-300">
                                        {decode(child.acf.masthead.masthead_title)}
                                    </h2>
                                    <p className="text-gray-700 mt-4">
                                        {decode(child.acf.masthead.masthead_content)}
                                    </p>
                                    <div className="flex flex-row items-center space-x-2 mt-8">
                                        <div
                                            className={`flex justify-center items-center gradient-${index + 1
                                                } w-12 h-12 rounded-md`}
                                        >
                                            <Icon
                                                icon={child.acf.icon}
                                                className="text-white w-8 h-8"
                                            />
                                        </div>
                                        <h4 className="text-xl font-semibold text-gray-900 hover:text-orange-500 transition-colors duration-300 mt-4 mb-4 md:pl-2 cursor-pointer">
                                            {decode(child.title.rendered)}
                                        </h4>
                                        <Icon
                                            icon="bx:bx-right-arrow-alt"
                                            className="text-2xl text-black"
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`w-full relative md:w-1/2 flex justify-center items-center p-8 gradient-${index + 1
                                        } rounded-md h-64 md:h-96`}
                                >
                                    <Icon
                                        icon={child.acf.icon}
                                        className="text-white h-48 w-48 md:h-64 md:w-64 transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                            </Link>
                            </div>
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
        <div className="bg-light-orange py-4 pt-24">
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
                        Services
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
                    {/* <span>/</span>
                    <span className="font-bold flex items-center text-black space-x-1">
                        <Icon icon={service.acf.icon} className="text-orange w-4 h-4 mr-1" />
                        {decode(service.title.rendered)}
                    </span> */}
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