"use client";
import { decode, encode } from "html-entities";
export default function ArticleContent({ article }) {
    return (
        <div>
            <div className="container inner-container mx-auto">
                <h1 className="text-4xl font-bold mt-20">{decode(article.title.rendered)}</h1>
                <div className="text-lg mt-4" dangerouslySetInnerHTML={{ __html: decode(article.content.rendered) }}></div>
            </div>
        </div>
    );
}

