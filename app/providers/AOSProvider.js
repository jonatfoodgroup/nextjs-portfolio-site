"use client";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";


const AOSProvider = ({ children }) => {
    useEffect(() => {
        AOS.init({
            duration: 750,
            once: true,
        });
        AOS.refresh();
    }, []);
    return (
        <div>{children}</div>
    );
}

export default AOSProvider;