"use client";
import React, { useState, useEffect } from "react";
import { useWordpress } from "../../providers/WordpressProvider";
import ArticleCard from "../article/ArticleCard";

export default function WhatWeThink() {
    const { posts } = useWordpress();

    return (
        <div className="">
            <div className="container inner-container mx-auto">
                <div className="grid md:grid-cols-3 gap-8 grid-cols-1">
                    {posts.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
}