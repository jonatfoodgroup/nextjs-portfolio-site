"use client";
import Header from "../components/Header";
import Footer from "../components/marketing/Footer";
import ServiceList from "../components/ServicesList";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Home() {
    return (
        <>
            <Header />
            <div className="pt-20">
                <Breadcrumb />
                <div className="inner-container mx-auto py-8">
                    {/* <h1 className="text-4xl font-bold text-text mb-10">Our Services</h1> */}


                    <ServiceList />
                </div>
            </div>
            <Footer />
        </>
    );
}

const Breadcrumb = ({ service }) => {
    return (
        <div className="bg-light-blue">
            <div className="container mx-auto">
                <nav className="flex items-center space-x-2 text-lg p-4 text-text">
                    <Link
                        className="underline hover:text-blue-500 transition flex items-center space-x-12"
                        href="/">
                        Home</Link>
                    <span>/</span>
                    <span>Services</span>
                </nav>
            </div>
        </div>
    );
}