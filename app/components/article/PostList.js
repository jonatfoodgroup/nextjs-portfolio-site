"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const PostList = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {posts.map((post, index) => (
                <Link key={index} href={`/blog/articles/${post.slug}`} className="text-black flex flex-col items-center text-start justify-start p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="flex items-center bg-black text-white rounded-full p-2 text-start mb-4">
                        <Icon icon={post.acf.icon} className="text-2xl" />
                    </div>
                    <div className="flex items-center justify-start mb-2">
                        <h3 className="text-xl font-bold">{post.title.rendered}</h3>
                    </div>
                    <p className="text-sm text-darker-gray line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                </Link>
            ))}
        </div>
    );
}

export default PostList;