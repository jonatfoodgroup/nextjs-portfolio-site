"use client";
import { useEffect, useState } from "react";
import { decode } from "html-entities";
import ShareLink from "./ShareLink";
import TimeToRead from "./TimeToRead";
import WordCount from "./WordCount";


export default function ArticleContent({ article }) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        // Check if running on the client and set the URL
        if (typeof window !== "undefined") {
            setUrl(window.location.href);
        }
    }, []);

    return (
        <div>
            <div className="container inner-container mx-auto">
                <h1 className="text-4xl font-bold mt-8 md:mt-20">{decode(article.title.rendered)}</h1>
                <div className="text-sm text-gray-500 mt-2 flex items-center">
                    <WordCount content={decode(article.content.rendered)} />
                    <span className="mx-2">•</span>
                    <TimeToRead content={decode(article.content.rendered)} />
                    <span className="mx-2">•</span>
                    {url && (
                        <ShareLink
                            title={decode(article.title.rendered)}
                            text="Check out this article:"
                            url={url}
                        />
                    )}
                </div>
                <div
                    className="text-lg mt-4"
                    dangerouslySetInnerHTML={{ __html: decode(article.content.rendered) }}
                ></div>
            </div>
        </div>
    );
}