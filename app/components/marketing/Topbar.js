"use client";
import Link from 'next/link';
import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const Topbar = ({
    content = null
}) => {
    if (!content) null;
    return (
        <div>
            <div className="bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between align-middle py-2">
                        <div>
                            {/* <a href="/" className="text-white font-bold text-xl">Luxor</a> */}
                        </div>
                        {/* <div className='flex items-end align-middle'>
                           {
                            content.nav.map((nav, index) => (
                                <Link key={index} href={nav.url} className="text-gray-500 text-xs hover:text-gray-800 ml-4 font-semibold">
                                        {nav.label()}
                                </Link>
                            ))
                           }
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;