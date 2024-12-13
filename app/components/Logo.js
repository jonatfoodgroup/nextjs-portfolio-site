"use client";
import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

const Logo = () => {
    return (
        <Link href="/" className="flex items-start gap-x-1 text-md font-semibold leading-6 text-white">
            <h2 className="text-2xl font-bold text-text flex items-center gap-x-1"><Icon icon="mingcute:command-line" className="h-6 w-6" />strongstart</h2>
        </Link>
    )
}

export default Logo;