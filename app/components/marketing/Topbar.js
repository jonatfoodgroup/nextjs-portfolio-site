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
            <div className="bg-white h-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            {/* <a href="/" className="text-white font-bold text-xl">Luxor</a> */}
                        </div>
                        <div className='flex items-end pt-2'>
                            <Link href="tel:+14158248888" className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-2">
                                <Icon icon="line-md:phone-call-loop" className="text-lg" />
                            <span>415.824.8888</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;