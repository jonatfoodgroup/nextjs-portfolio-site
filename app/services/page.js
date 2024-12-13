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
            <div className="container mx-auto pt-24">
                <Breadcrumb />
                <h1 className="text-4xl font-bold text-text mb-10">Our Services</h1>
                <ServiceList />

            </div>
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
                <Icon icon="mingcute:command-line" className="w-4 h-4 mr-1" />
                Home</Link>
            <span>/</span>
            <span>Services</span>
        </nav>
    );
}