"use client";
import articles from '../data/articles';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ArticleList({
    items = articles,
}) {
    return (
        <div className="grid md:grid-cols-4 gap-8 mt-8 grid-cols-1">
            {items.map(article => (
                <Article key={article.id} article={article} />
            ))}
        </div>
    );
}

function Article({ article }) {
    return (
        <Link
            href={`/article/${article.slug}`}
            className="p-4 shadow rounded-md hover:shadow-lg cursor-pointer">
            {
                article.icon &&
                <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
                    <Icon icon={article.icon} className="text-3xl text-white" />
                </div>
            }
            <h2 className="text-2xl font-bold text-text mt-4 hover:text-blue-500 mb-1 transition-all leading-tight">
                <Link href={`/articles/${article.slug}`}>
                    {article.title}
                </Link>
            </h2>
            <p className="text-text text-lg mt-4"
            >{article.description}</p>
        </Link>
    );
}