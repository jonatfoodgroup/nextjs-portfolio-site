"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const PrintLink = ({ article }) => {

    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    }

    return (
        <button
            onClick={handlePrint}
            className={`flex items-center space-x-1 text-xs font-semibold text-gray-500 hover:text-gray-700`}
        >
            <Icon icon="carbon:printer" className="text-xl" />
            <span> Print</span>
        </button>
    );
}

export default PrintLink;