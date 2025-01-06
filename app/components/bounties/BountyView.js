"use client";
import React, { useEffect} from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { decode } from "html-entities";

export default function BountyView({ bounty }) {
    useEffect(() => {
            if (!bounty) return;
            // Helper to make URL-friendly IDs
            const makeId = (text) => {
                return text.toLowerCase().replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
            };
    
            // Find all headings in the article content
            const headings = document.querySelectorAll(
                ".article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6"
            );
    
            headings.forEach((heading) => {
                // Generate and set an ID for the heading
                const id = makeId(heading.innerText);
                if (!heading.id) {
                    heading.id = id;
                }
    
                // Add anchor link only if not already added
                if (!heading.querySelector(".anchor-link")) {
                    const anchor = document.createElement("a");
                    anchor.href = `#${id}`;
                    anchor.className = "anchor-link ml-2 text-gray-500 hover:text-black";
                    anchor.innerHTML = `
                    `;
                    heading.appendChild(anchor);
                }
            });
        }, [bounty]);
    
    return (
        <div>
            <div className="container inner-container mx-auto">
                {/* Render the title */}
                <h1 className="text-5xl font-bold mt-8 leading-tight">
                    {decode(bounty.title.rendered)}
                </h1>

                {/* Reward amount */}
                <div className="text-xl mt-4">
                    <span className="font-bold">Reward:</span> ${bounty.acf.reward}
                </div>

                {/* Render the content using react-markdown */}
                <div className="text-lg mt-4 article-content">
                    <ReactMarkdown>{bounty.content.rendered}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}