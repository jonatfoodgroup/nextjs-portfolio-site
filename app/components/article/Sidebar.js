"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { decode, encode } from "html-entities";
import ServiceItem from "../ServiceItem";
import SoftwareCard from "../SoftwareCard";
import { useWordpress } from "../../providers/WordpressProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import AuthorCard from "./AuthorCard";
import MoreFromAuthor from "./MoreFromAuthor";

export default function Sidebar({ article }) {
    const { posts } = useWordpress();
    return (
        <div className="md:block">
            <div className="sticky top-20 pt-20">
                <AuthorCard authorId={article.author} />
                {
                    article.author &&
                    <MoreFromAuthor authorId={article.author} />
                }
                {
                    posts &&
                    <div className="my-8">
                        <h2 className="text-2xl font-bold mb-2">Latest Articles</h2>
                        <ul className="space-y-2">
                            {posts.slice(0, 5).map((post, index) => (
                                <li key={index}>
                                    <Link href={`/blog/articles/${post.slug}`}  className="hover:underline text-blue-600 flex items-center justify-start
                                    "><Icon icon={post.acf?.icon} className="inline-block mr-2" />
                                    <span>{decode(post.title.rendered)}</span>
                                        
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            {
                    article.acf?.service_relationships &&
                    <div className="my-8">
                        <h2 className="text-2xl font-bold mb-2">Related Services</h2>
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
                            {article.acf.service_relationships.map((serviceId, index) => (
                                <ServiceItem key={index} serviceId={serviceId} />
                            ))}
                        {/* </div> */}
                    </div>
                }
                {
                    article.acf?.software_relationship &&
                    <div className="my-8">
                        <h2 className="text-2xl font-bold">Related Software</h2>
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
                            {article.acf.software_relationship.map((softwareId, index) => (
                                <SoftwareCard key={index} softwareId={softwareId} />
                            ))}
                        {/* </div> */}
                    </div>
                }
            </div>
        </div>
    );
}