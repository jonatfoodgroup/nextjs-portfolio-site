import articles from '../data/articles';
import Link from 'next/link';
import Image from 'next/image';

export default function ArticleList({
    items = articles,
}) {
    return (
        <div className="grid md:grid-cols-3 gap-4 mt-8 grid-cols-1">
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
            {/* <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={150}
            /> */}
            <h2 className="text-lg font-semibold text-text mt-4 hover:text-blue-500 mb-1">
                <Link href={`/article/${article.slug}`}>
                    {article.title}
                </Link>
            </h2>
            <p className="text-text text-sm"
            >{article.description}</p>
            <Link
                href={`/article/${article.slug}`}
                className="mt-2 block text-text underline text-sm">
                Read more
            </Link>
        </Link>
    );
}