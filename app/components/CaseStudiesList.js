"use client";
import React, { useState, useEffect } from "react";
import projects from "../data/projects";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
export default function CaseStudiesList() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {
                projects.map((project) => (
                    <div key={project.slug} className="p-4 shadow rounded-md">
                        <h2 className="text-lg font-semibold text-text">{project.title}</h2>
                        <p className="mt-2 text-text">{project.description}</p>
                        <Link href={`/case-studies/${project.slug}`} className="mt-4 block text-text underline">Read more</Link>
                    </div>
                ))
            }
        </div>
    )
}