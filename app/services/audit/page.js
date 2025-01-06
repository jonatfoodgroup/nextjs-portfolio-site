"use client";
import Header from "../../components/Header";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProcessSteps from "../../components/ProcessSteps";
import LogoWall from "../../components/LogoWall";
import Footer from "../../components/marketing/Footer";

export default function Page() {
    return (
        <>
            <Header />
            <div className="bg-light-orange py-24 flex items-center justify-center ">
                <div className="container mx-auto inner-container">
                    <div className="flex flex-col">
                        <div className="flex align-top mt-8 space-x-16">
                            <div className="w-2/3">
                                <h1 className="text-6xl font-bold text-text mt-8 leading-tight">
                                    If you don't know what's wrong, how can you improve?
                                </h1>
                                <p className="text-xl text-text mt-4 leading-relaxed">
                                    Our audit services are designed to help you understand your current state, identify areas of improvement, and develop a roadmap to success. Whether you're looking to improve your website, marketing strategy, or internal processes, we have the tools and expertise to help you succeed.
                                </p>
                                <div className="inline-flex mt-8 flex-col p-8 border border-gray-200 rounded-lg shadow-md bg-white">
                                    <h3 className="text-2xl font-bold text-text">What to expect:</h3>
                                    <ul className="text-text mt-4 space-y-2">
                                        <li className="flex items-center">
                                            <Icon icon="carbon:checkmark" className="text-green-500 mr-2" />
                                            <span>Comprehensive review of your current state</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Icon icon="carbon:checkmark" className="text-green-500 mr-2" />
                                            <span>Identification of areas of improvement</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Icon icon="carbon:checkmark" className="text-green-500 mr-2" />
                                            <span>Development of a roadmap to success</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <form className="bg-white p-8 rounded-lg shadow-lg">
                                    {/* name, email, company name, website next button */}
                                    <h2 className="text-xl font-bold text-text">Schedule an Audit</h2>
                                    <p className="text-text mt-2">Fill out the form below to schedule an audit with one of our experts.</p>
                                    <div className="mt-4">
                                        <label className="block text-sm text-text">Name</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2" placeholder="Bruce Wayne" />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-text">Email</label>
                                        <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2" placeholder="bruce.wayne@gothamventures.com" />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-text">Company Name</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2" placeholder="Gotham Ventures" />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-text">Website</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2" placeholder="https://gothamventures.com" />
                                    </div>
                                    <div className="mt-4 flex items-center justify-end">
                                    <button className="shiny-button bg-orange text-white text-sm font-bold px-8 py-4 mt-4 flex items-center hover:shadow-xl transition-all duration-300">
                                        
                                        Next
                                        <Icon icon="grommet-icons:link-next" className="ml-2" />
                                        <span className="shiny-effect"></span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LogoWall />
            <ProcessSteps />
            <Footer />
        </>
    );
}

const Breadcrumb = ({ service }) => {
    return (
        <nav className="flex items-center space-x-2 text-xs text-text mb-8">
            <Link
                className="underline hover:text-blue-500 transition flex items-center space-x-1"
                href="/">
                <Icon icon="mynaui:home" className="w-4 h-4 mr-1" />
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