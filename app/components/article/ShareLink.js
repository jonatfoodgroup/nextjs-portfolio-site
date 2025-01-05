"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

export default function ShareLink({ title, text, url }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || "Check this out!",
                    text: text || "Here's something interesting I found:",
                    url: url,
                });
                console.log("Content shared successfully!");
            } catch (error) {
                console.error("Error sharing content:", error);
            }
        } else {
            console.log("Sharing is not supported on your browser.");
            // alert("Sharing is not supported on your browser.");
        }
    };

    return (
        <button
            onClick={handleShare}
            className="focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-50 hover:text-primary-500 flex items-center space-x-1"
        >
            <Icon icon="carbon:share" className="text-lg" />
            <span>Share</span>
            
        </button>
    );
}