"use client";
import { useEffect, useState } from "react";
import { decode } from "html-entities";
import ShareLink from "./ShareLink";
import TimeToRead from "./TimeToRead";
import WordCount from "./WordCount";
import SaveLink from "./SaveLink";
import PrintLink from "./PrintLink";

export default function ArticleContent({ article }) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        // Check if running on the client and set the URL
        if (typeof window !== "undefined") {
            setUrl(window.location.href);
        }
    }, []);

    // Add anchor links to headings in article content
    useEffect(() => {
        if (!article) return;
        console.log(article);
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
                    link
                `;
                heading.appendChild(anchor);
            }
        });
    }, [article]);

    const components = [
        { Component: WordCount, props: { content: decode(article.content.rendered) } },
        { Component: TimeToRead, props: { content: decode(article.content.rendered) } },
        {
            Component: ShareLink,
            props: { title: decode(article.title.rendered), text: "Check out this article:", url },
        },
        { Component: SaveLink, props: { article } },
        { Component: PrintLink, props: {} },
    ];

    return (
        <div>
            <div className="container inner-container mx-auto bg-white py-10">
                <h1 className="text-4xl font-bold" data-aos="fade-in">{decode(article.title.rendered)}</h1>
                <div className="text-sm text-gray-500 mt-2 flex items-center">
                    {components.map(({ Component, props }, index) => (
                        <div
                            key={index}
                            data-aos="fade-in"
                            data-aos-delay={index * 100} // Delay increases by 100ms per item
                            className="flex items-center"
                        >
                            <Component {...props} />
                            {index < components.length - 1 && <span className="mx-2">•</span>}
                        </div>
                    ))}
                </div>
                <div
                    data-aos="fade-in"
                    className="text-lg mt-4 article-content"
                    dangerouslySetInnerHTML={{ __html: decode(article.content.rendered) }}
                ></div>
            </div>
        </div>
    );
}