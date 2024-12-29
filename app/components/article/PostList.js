"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const PostList = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post, index) => (
                <Link key={index} href={`/blog/articles/${post.slug}`} className="hover:underline text-blue-600 flex items-center justify-start">
                    <Icon icon={post.acf?.icon} className="inline-block mr-2" />
                    <span>{post.title.rendered}</span>
                </Link>
            ))}
        </div>
    );
}

export default PostList;