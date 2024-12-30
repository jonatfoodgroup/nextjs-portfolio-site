"use client";
import { decode, encode } from "html-entities";
import WordCount from "./WordCount";
import TimeToRead from "./TimeToRead";
import ShareLink from "./ShareLink";
export default function ArticleContent({ article }) {
    return (
        <div>
            <div className="container inner-container mx-auto">
                <h1 className="text-4xl font-bold mt-8 md:mt-20">{decode(article.title.rendered)}</h1>
                <div className="text-sm text-gray-500 mt-2 flex items-center">
                    <WordCount content={decode(article.content.rendered)} />
                    <span className="mx-2">•</span>
                    <TimeToRead content={decode(article.content.rendered)} />
                    <span className="mx-2">•</span>
                    <ShareLink title={decode(article.title.rendered)} text="Check out this article:" url={window.location.href} />
                </div>
                <div className="text-lg mt-4" dangerouslySetInnerHTML={{ __html: decode(article.content.rendered) }}></div>
            </div>
        </div>
    );
}


