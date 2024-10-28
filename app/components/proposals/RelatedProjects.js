"use client";
import React from "react";
import projects from "../../data/projects";
import Item from "./Item";

const RelatedProjects = () => {
    return (
        <section id="RelatedProjects" className="py-16 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:justify-between md:items-start mb-16">
                    <h2 className="text-3xl font-medium mb-2 leading-tight">
                        Related Projects
                    </h2>
                    <div className="mt-8 md:mt-0 w-full">
                        <div className="flex md:flex-row gap-8 flex-col">
                            {/* limit to 2 projects */}
                            {projects.slice(0, 3).map((project, index) => (
                                <Item
                                    key={index}
                                    {...project}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default RelatedProjects;