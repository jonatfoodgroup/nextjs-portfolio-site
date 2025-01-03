"use client";
import { useContext, createContext, useState, useEffect } from "react";

const WordpressContext = createContext();

export const WordpressProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [services, setServices] = useState([]);
    const [pages, setPages] = useState([]);
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2"; // REST API base URL

    useEffect(() => {
        // Fetch posts
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${baseUrl}/posts`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        // Fetch parent services
        const fetchServices = async () => {
            try {
                const response = await fetch(`${baseUrl}/service?parent=0`);
                const data = await response.json();
                // sort services by title
                data.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };


        fetchServices();
    }, []);

    useEffect(() => {
        // fetch pages
        const fetchPages = async () => {
            try {
                const response = await fetch(`${baseUrl}/pages`);
                const data = await response.json();
                setPages(data);
            } catch (error) {
                console.error("Error fetching pages:", error);
            }
        };

        fetchPages();
    }, []);

    const fetchService = async (slug) => {
        try {
            const response = await fetch(`${baseUrl}/service?slug=${slug}`);
            const data = await response.json();
            return data[0];
        } catch (error) {
            console.error("Error fetching service:", error);
        }
    }

    const fetchAuthor = async (authorId) => {
        try {
            const response = await fetch(`${baseUrl}/users/${authorId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching author:", error);
        }
    }

    const fetchPostsByAuthor = async (authorId) => {
        try {
            const response = await fetch(`${baseUrl}/posts?author=${authorId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching posts by author:", error);
        }
    }

    return (
        <WordpressContext.Provider value={{ posts, services, fetchService,fetchAuthor, fetchPostsByAuthor, pages }}>
            {children}
        </WordpressContext.Provider>
    );
};

export const useWordpress = () => {
    return useContext(WordpressContext);
};