"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import { decode } from 'html-entities';

export default function ArticleList({ filters = {} }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams(filters).toString();
                console.log('queryParams', queryParams);
                const response = await fetch(
                    `https://jonsenterfitt.com/wp-json/wp/v2/posts?${queryParams}`
                );
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [filters]);

    if (loading) return <p>Loading articles...</p>;

    if (!articles.length) return <p>No articles found.</p>;

    return (
        <div className="grid md:grid-cols-4 gap-8 mt-8 grid-cols-1">
            {articles.map(article => (
                <Article key={article.id} article={article} />
            ))}
        </div>
    );
}

function Article({ article }) {
    return (
        <Link
            href={`/blog/articles/${article.slug}`}
            className="p-4 shadow rounded-md hover:shadow-lg cursor-pointer">
            {article.acf?.icon && (
                <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
                    <Icon icon={article.acf.icon} className="text-3xl text-white" />
                </div>
            )}
            <h2 className="text-xl font-bold text-text mt-4 hover:text-blue-500 mb-1 transition-all leading-tight">
                {decode(article.title.rendered)}
            </h2>
            <div className="text-text text-md mt-4 line-clamp-3 
            " dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
        </Link>
    );
}