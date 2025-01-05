"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay, Scrollbar } from "swiper/modules";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useWordpress } from "../providers/WordpressProvider";
import { decode, encode } from 'html-entities';
import AuthorCard from "./article/AuthorCard";
import ArticleCard from "./article/ArticleCard";

const LatestArticles = () => {
    const [localArticles, setLocalArticles] = useState([]);
    const { posts } = useWordpress();

    useEffect(() => {
        setLocalArticles(posts);
    }, [posts]);

    if (localArticles.length === 0) {
        return null;
    }
    return (
        <div className="flex items-center justify-center md:pt-20">
            <div className="container mx-auto">
                <div className="w-full max-w-8xl mx-auto text-start items-center justify-center">
                    <h2 className="text-xl font-bold mb-8 mt-10">Latest Articles</h2>
                    <Swiper
                        modules={[Navigation, Pagination, A11y, Autoplay, Scrollbar]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={true}
                        loop
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="py-8"
                    >
                        {localArticles.map((article) => (
                            <SwiperSlide key={article.id} className="pb-8 cursor-pointer">
                                <ArticleCard article={article} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default LatestArticles;