"use client";
import ArticleCard from "./ArticleCard";
const PostList = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {posts.map((article, index) => (
                <ArticleCard key={index} article={article} />
            ))}
        </div>
    );
}

export default PostList;