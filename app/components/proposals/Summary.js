"use client";
import React from "react";
import Item from "./Item";

const Summary = () => {
    return (
        <section id="Summary" className="py-16 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
                    <div className="md:w-1/4 mt-8 md:mt-0">
                        <h2 className="text-3xl font-medium mb-2 leading-tight text-foreground">
                            Summary
                        </h2>
                    </div>
                    <div className="md:w-3/4 mt-8 md:mt-0">
                        <p className="text-2xl text-foreground leading-relaxed max-w-4xl">
                            KwikLok is embarking on a refinement journey for their current
                            site and processes surrounding the site. With a sitemap spanning
                            37 pages, the content and structure of the content is wonderful.
                            With intentional changes in UX interactions and restructuring of
                            the sitemap to better align with the intention of the
                            experience, we believe Kwiklok could win with what they already
                            have while having the option to expand the content program and
                            e-commerce offering when ready without a major overhaul.
                        </p>

                        <div className="flex flex-col mt-8">
                            <div className="flex md:flex-row md:space-x-4 flex-col">
                                <Item
                                    title="Redesign site"
                                    description="Redesign the site"
                                />
                                <Item
                                    title="Improve site performance"
                                    description="Improve site performance"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Summary;