"use client";
import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

const Logo = ({
    color = 'black',
    size = 'md'
}) => {
    if (color !== 'black') {
        return (
            <Link href="/" className="flex items-start text-md font-semibold space-x-2">
                <div className='flex items-center justify-center w-12 h-12 bg-white rounded-full'>
                    <Icon icon="carbon:infinity-symbol" className="text-4xl text-orange" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold flex items-center pt-1 text-white">strongstart</h2>
            </Link>
        )
    }
    return (
        <Link href="/" className="flex items-start font-semibold space-x-1 align-middle">
            <div className='flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-orange rounded-full'>
                <Icon icon="carbon:infinity-symbol" className="text-4xl text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold flex items-center pt-1 text-orange">strongstart</h2>
        </Link>
    )
}

export default Logo;