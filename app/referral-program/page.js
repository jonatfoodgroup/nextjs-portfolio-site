"use client";
import Header from "../components/Header";
import Footer from "../components/marketing/Footer";
import LogoWall from "../components/LogoWall";
import { Icon } from "@iconify/react/dist/iconify.js";

let state = {
    "title": "Become a Refferal Partner and Earn",
    "description": "Our referral program is designed to help you earn money by referring clients to us. Whether you're a small business owner, a marketing professional, or a web developer, we have the tools and expertise to help you succeed.",
}

export default function Home() {
    return (
        <>
            <Header />
            <div className="bg-background pt-24 flex items-center justify-center">
                <div className="container mx-auto">
                    <div className="flex flex-col">
                        <div className="flex align-top mt-8 space-x-16">
                            <div className="w-2/3">
                                <h1 className="text-6xl font-bold text-text mt-8 leading-tighter">
                                    {state.title}
                                </h1>
                                <p className="text-xl text-text mt-4">
                                    {state.description}
                                </p>
                            </div>
                            <div className="w-1/3">
                                <form className="bg-white p-8 rounded-lg shadow-lg">
                                    <div className="mt-4">
                                        <label className="block text-sm text-text">Name</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2" placeholder="Bruce Wayne" />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-text">Email</label>
                                        <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2" placeholder="bruce.wayne@gothamventures.com" />
                                    </div>
                                    {/* phone */}
                                    <div className="mt-4">
                                        <label className="block text-sm text-text">Phone</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2" placeholder="123-456-7890" />
                                    </div>
                                    <button className="bg-black text-white text-sm font-bold px-8 py-4 mt-4 flex items-center hover:shadow-xl transition-all duration-300">
                                        
                                        Next
                                        <Icon icon="grommet-icons:link-next" className="ml-2" />
                                        </button>
                                        
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-16">
            <LogoWall />
        </div>
            <Footer />
        </>
    );
}