"use client";

export default function ShareLink({ title, text, url }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || "Check this out!",
                    text: text || "Here's something interesting I found:",
                    url: url || window.location.href,
                });
                console.log("Content shared successfully!");
            } catch (error) {
                console.error("Error sharing content:", error);
            }
        } else {
            // alert("Sharing is not supported on your browser.");
        }
    };

    return (
        <button
            onClick={handleShare}
            className="focus:outline-none focus:ring"
        >
            Share
        </button>
    );
}