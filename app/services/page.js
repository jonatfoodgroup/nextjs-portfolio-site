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
            <div className="container inner-container mx-auto pt-24">
                <div className="inner-container mx-auto">
                {/* <h1 className="text-4xl font-bold text-text mb-10">Our Services</h1> */}
                <Breadcrumb />

                <ServiceList />
                </div>
            </div>
            <Footer />
        </>
    );
}

const Breadcrumb = ({ service }) => {
    return (
        <nav className="flex items-center space-x-2 text-lg text-text mb-8">
            <Link
                className="underline hover:text-blue-500 transition flex items-center space-x-12"
                href="/">
                Home</Link>
            <span>/</span>
            <span>Services</span>
        </nav>
    );
}