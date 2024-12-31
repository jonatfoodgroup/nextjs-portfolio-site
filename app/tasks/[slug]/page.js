export const revalidate = 60; // Revalidate every 60 seconds\
import React from 'react';
import { decode } from 'html-entities';
import TurndownService from 'turndown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../../components/Header';

export async function generateStaticParams() {
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

    try {
        const response = await fetch(`${baseUrl}/pages`); // Fetch parent services
        if (!response.ok) {
            throw new Error(`Error fetching services: ${response.statusText}`);
        }
        const pages = await response.json();

        // Log the fetched slugs for debugging
        console.log("Static paths being generated:", pages.map(s => s.slug));

        return pages.map((page) => ({
            slug: page.slug,
        }));
    } catch (error) {
        console.error("Error fetching services for static params:", error);
        return [];
    }
}

export async function generateStaticPaths() {
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

    try {
        const response = await fetch(`${baseUrl}/pages`); // Fetch parent services
        if (!response.ok) {
            throw new Error(`Error fetching services: ${response.statusText}`);
        }
        const services = await response.json();

        // Map services to the required params structure
        return services.map((service) => ({
            params: {
                slug: service.slug,
            },
        }));
    } catch (error) {
        console.error("Error fetching services for static paths:", error);
        return [];
    }
}

export default async function Page({ params }) {
    const { slug } = params;
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

    try {
        const response = await fetch(`${baseUrl}/pages?slug=${slug}`);
        if (!response.ok) {
            return <h1>Service Not Found</h1>;
        }

        const service = await response.json();
        if (!service || service.length === 0) {
            return <h1>Service Not Found</h1>;
        }

        const taskData = service[0];

        return (
            <div>
                <Header />
                <div className="task-content container mx-auto px-4 inner-container">
                    <h1 className="pt-24 font-bold">{decode(taskData.title.rendered)}</h1>
                    <div dangerouslySetInnerHTML={{ __html: taskData.content.rendered }} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching service data:", error);
        return <h1>Service Not Found</h1>;
    }
}