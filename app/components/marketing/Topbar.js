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
            <div className="bg-light-gray">
                <div className="container mx-auto px-4">
                    <div className='flex justify-end items-center py-2'>
                        <Link href="/contact" className="text-sm font-semibold text-gray-700 hover:text-black">
                            Partner Login
                        </Link>
                        <Link href="/contact" className="text-sm font-semibold text-gray-700 hover:text-black flex items-center ml-4">
                            <Icon icon="akar-icons:phone" className="text-xl" /> (888) 555-5555
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;