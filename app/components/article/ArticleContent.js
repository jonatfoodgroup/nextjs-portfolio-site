"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function ArticleContent ({ article }) {
    return (
        <div className="container mx-auto px-4 pt-24">
            <Link href="/articles" className="text-blue-500">Back to articles
            </Link>
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <p className="text-lg mt-4">{article.description}</p>
            <div className="mt-8">
                <img src={article.image} alt={article.title} className="w-full rounded-lg shadow-lg" />
            </div>
        </div>
    );
}
