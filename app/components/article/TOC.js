"use client";
import { useEffect, useState } from "react";

const TableOfContents = ({ article }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState(null);

    // Helper to generate URL-friendly IDs
    const makeTmpId = (text) => {
        return text.toLowerCase().replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    };

    useEffect(() => {
        if (!article) return;

        const observer = new MutationObserver(() => {
            const tmpHeadings = document.querySelectorAll(
                ".article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6"
            );

            const headingsArray = Array.from(tmpHeadings).map((heading, index) => {
                // Generate ID and apply it to the heading
                const id = makeTmpId(heading.innerText);

                if (!heading.id) {
                    heading.id = id;
                }

                return {
                    title: heading.innerText,
                    level: parseInt(heading.tagName.charAt(1)),
                    id,
                };
            });

            setHeadings(headingsArray);
        });

        // Observe changes to the `.article-content` to ensure headings are detected
        const articleContent = document.querySelector(".article-content");
        if (articleContent) {
            observer.observe(articleContent, { childList: true, subtree: true });
        }

        return () => {
            observer.disconnect();
        };
    }, [article]);

    // Track active heading in the viewport
    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // Use the viewport as the root
            rootMargin: "0px 0px -70% 0px", // Trigger earlier as the heading approaches the top
            threshold: 1.0, // Fully visible heading triggers the highlight
        });

        const observedHeadings = document.querySelectorAll(
            ".article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6"
        );

        observedHeadings.forEach((heading) => observer.observe(heading));

        return () => {
            observedHeadings.forEach((heading) => observer.unobserve(heading));
        };
    }, [headings]);

    return (
        <div className="table-of-contents">
            <h2 className="font-bold text-lg mb-4">In this article</h2>
            <ul className="list-none space-y-2">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`ml-${heading.level * 2} text-sm mb-0 ${
                            activeId === heading.id ? "font-bold text-blue-500" : ""
                        }`}
                    >
                        <a href={`#${heading.id}`}>{heading.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;