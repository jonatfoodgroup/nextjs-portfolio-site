"use client";
import React, { useState, useEffect } from "react";
import { useWordpress } from "../../providers/WordpressProvider";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import {decode} from "html-entities";

export default function WhatWeThink() {
    const { posts } = useWordpress();

    return (
        <div className="">
            <div className="container inner-container mx-auto">
                <div className="grid md:grid-cols-4 gap-8 grid-cols-1">
                    {posts.map(post => (
                        <Link key={post.id} className="rounded-md hover:shadow-lg cursor-pointer" href={`/blog/articles/${post.slug}`}>
                            {
                                post.acf.icon &&
                                <div className="flex items-center justify-center bg-black p-4 rounded-t-md">
                                    <Icon icon={post.acf?.icon} className="text-2xl text-white" />
                                </div>
                            }
                            <h2 className="text-xl font-bold text-text mt-4 hover:text-blue-500 mb-1 transition-all leading-tight">
                                {decode(post.title.rendered)}
                            </h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.excerpt.rendered
                                }}
                                className="text-text text-sm mt-2 line-clamp-3"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}