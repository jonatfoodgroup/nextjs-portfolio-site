"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function PointsCount() {
    const [points, setPoints] = useState(100);
    return (
        <div className="flex items-center space-x-2">
            <Icon icon="akar-icons:coin" className="w-6 h-6" />
            <span className="text-sm">{points}</span>
        </div>
    );
}