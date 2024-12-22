"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay, Scrollbar } from "swiper/modules";
import articles from "../data/articles";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LatestArticles = () => {
    const [localArticles, setLocalArticles] = useState([]);

    useEffect(() => {
        setLocalArticles(articles);
    }, []);

    return (
        <div className="flex items-center justify-center md:pt-20 -mt-48">
            <div className="container mx-auto inner-container">
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
                        {articles.map((article) => (
                            <SwiperSlide key={article.id} className="pb-8 cursor-pointer">
                                <Link className="bg-white shadow-lg rounded-lg p-8 flex flex-col h-full" href={`/articles/${article.slug}`}>
                                    {/* <Icon icon="akar-icons:arrow-right" className="text-dark-blue mb-4" /> */}
                                    <h2 className="text-xl font-bold text-dark-blue mb-2">
                                        {article.title}
                                    </h2>
                                    <p className="text-md text-dark-blue mt-2 line-clamp-2">
                                        {article.description}
                                    </p>
                                    <div className="mt-auto">
                                        <div
                                            
                                            className="bg-light-blue text-dark-blue text-xl font-bold px-8 py-4 mt-4 flex items-center hover:shadow-xl transition-all duration-300"
                                        >
                                            Read More                                            <Icon icon="akar-icons:arrow-right" className="mr-2" />

                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default LatestArticles;