"use client";

import { useEffect, useState } from 'react';
import ArticleCard from './article/ArticleCard';
export default function ArticleList({ filters = {} }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    let baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";
    useEffect(() => {
        if (articles.length) return;
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams(filters).toString();
                console.log('queryParams', queryParams);
                const response = await fetch(
                    `${baseUrl}/posts?${queryParams}`
                );
                const data = await response.json();
                console.log(data);
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
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}