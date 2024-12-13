"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CaseStudyView({ project }) {
    return (
        <div className="container mx-auto py-32">
            <Breadcrumb project={project} />
            <div className="flex mt-8">
                <div className="w-2/3">
                    <h1 className="text-4xl font-bold text-text">{project.title}</h1>
                    <p className="mt-4 text-lg text-text">{project.description}</p>
                </div>
                <div className="w-1/3">
                    <Image
                        src={`/${project.image}`}
                        alt={project.title}
                        width={400}
                        height={400}
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}


const Breadcrumb = ({ project }) => {
    return (
        <nav className="flex items-center space-x-2 text-xs text-text mb-8">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/case-studies">Case Studies</Link>
            <span>/</span>
            <span>{project.title}</span>
        </nav>
    );
}