"use client";
import React from 'react';
import SmallerName from './SmallerName';
import LogoVisualization from './LogoVisualization';

const Logo = () => {
    return (
        <div className="flex items-center justify-center">
            {/* <LogoVisualization color={"black"} /> */}
            <SmallerName />
        </div>
    )
}

export default Logo;