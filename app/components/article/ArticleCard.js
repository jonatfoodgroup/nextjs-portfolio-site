"use client";
import Link from "next/link";
import AuthorCard from "./AuthorCard";

const ArticleCard = ({ article }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col h-full text-start group hover:-translate-y-2 hover:shadow-xl transition-transform duration-300">
            <Link href={`/blog/articles/${article.slug}`}>
                <h2 className="text-xl text-start font-bold text-dark-blue mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {article.title.rendered}
                </h2>
                <p
                    className="text-md text-dark-blue mt-0 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                ></p>
            </Link>
            <AuthorCard authorId={article.author} />
        </div>
    );
};

export default ArticleCard;