// a recently viewed article component that uses localStorage and saves the IDs of the last 5 articles viewed. The component displays the last 5 articles viewed in a list. The component is used in the Sidebar component of the article page. The RecentlyViewed component is as follows:

import { useState, useEffect } from "react";
import Link from "next/link";
import { decode, encode } from "html-entities";

export default function RecentlyViewed() {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        const recentlyViewedIds = JSON.parse(localStorage.getItem("ssRecentlyViewed")) || [];
        setRecentlyViewed(recentlyViewedIds);
    }, []);

    if (recentlyViewed.length === 0) {
        return null;
    }
    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-2">Recently Viewed</h2>
            <ul className="space-y-2">
                {recentlyViewed.map((id, index) => (
                    <li key={index}>
                        <Link href={`/blog/articles/${id}`} className="hover:underline text-blue-600">
                            <span>{decode(localStorage.getItem(`article-${id}`))}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}