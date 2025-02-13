"use client";
import Link from "next/link";
import AuthorCard from "./AuthorCard";
import { Icon } from "@iconify/react/dist/iconify.js";

const ArticleCard = ({ article }) => {
    if (!article) {
        return null;
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between h-[300px] text-start group hover:-translate-y-2 hover:shadow-xl transition-transform duration-300">
            <div>
                <Link href={`/blog/articles/${article.slug}`}>
                    {/* <Icon icon={article.acf?.icon} className="text-6xl text-orange mb-4 bg-light-orange p-2 rounded-md" /> */}
                    <h2 className="text-xl text-start font-bold text-dark-blue mb-2 group-hover:text-orange-500 transition-colors duration-300">
                        {article.title.rendered}
                    </h2>
                    <p
                        className="text-sm text-dark-blue mt-0 line-clamp-3 leading-normal"
                        dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                    ></p>
                </Link>
            </div>
            <div className="mt-auto">
                <AuthorCard authorId={article.author} />
            </div>
        </div>
    );
};

export default ArticleCard;