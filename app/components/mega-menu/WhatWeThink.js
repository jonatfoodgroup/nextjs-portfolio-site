"use client";
import React from "react";
import { useWordpress } from "../../providers/WordpressProvider";
import ArticleCard from "../article/ArticleCard";

export default function WhatWeThink() {
    const { posts } = useWordpress();

    return (
        <div className="container mx-auto h-screen overflow-y-auto p-4">
            <div className="grid md:grid-cols-4 gap-8 grid-cols-1">
                {posts.map((article, index) => (
                    <div data-aos="fade-up" data-aos-delay={index * 100} key={article.id}>
                        <ArticleCard key={article.id} article={article} />
                    </div>
                ))}
            </div>
        </div>
    );
}