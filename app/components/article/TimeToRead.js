"use client";
import { decode } from "html-entities";

export default function TimeToRead({ content }) {
    // Decode any HTML entities in the content
    const decodedContent = decode(content);

    // Split the content into words and count them
    const words = decodedContent.split(/\s+/).filter(word => word.length > 0).length;

    // Calculate the reading time (assuming an average of 200 words per minute)
    const time = Math.max(1, Math.round(words / 200)); // Ensures at least 1 minute is displayed

    return (
        <div className="text-sm text-gray-500">
            {time} minute{time > 1 ? "s" : ""} to read
        </div>
    );
}