"use client";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { decode } from 'html-entities';


const ArticleCard = ({ article }) => {
    return (
        <Link
            href={`/blog/articles/${article.slug}`}
            className="p-4 shadow rounded-md hover:shadow-lg cursor-pointer">
            {article.acf?.icon && (
                <div className="flex items-center justify-center w-12 h-12 bg-light-orange rounded-full">
                    <Icon icon={article.acf.icon} className="text-3xl text-orange" />
                </div>
            )}
            <h2 className="text-xl text-start font-bold text-text mt-4 hover:text-orange-500 mb-1 transition-all leading-tight">
                {decode(article.title.rendered)}
            </h2>
            <div className="text-text text-start text-md mt-4 line-clamp-3 
                    " dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
        </Link>
    )
}

export default ArticleCard;