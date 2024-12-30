"use client";
import { decode, encode } from "html-entities";

export default function WordCount({ content }) {
    const words = content.split(" ").length;
    return (
        <div className="text-sm text-gray-500">
            {words} words
        </div>
    );
}
