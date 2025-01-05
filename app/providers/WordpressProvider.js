"use client";
import { useContext, createContext, useState, useEffect } from "react";

const WordpressContext = createContext();

export const WordpressProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [services, setServices] = useState([]);
    const [pages, setPages] = useState([]);
    const [authorCache, setAuthorCache] = useState({}); // Cac
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

    useEffect(() => {
        // Fetch all authors
        const fetchAllAuthors = async () => {
            try {
                const response = await fetch(`${baseUrl}/users`);
                const data = await response.json();
                // Cache all authors
                const authorCacheMap = data.reduce((cache, author) => {
                    cache[author.id] = author;
                    return cache;
                }, {});
                setAuthorCache(authorCacheMap);
            } catch (error) {
                console.error("Error fetching all authors:", error);
            }
        };
    
        fetchAllAuthors();
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
        // Check if the author is already cached
        if (authorCache[authorId]) {
            return authorCache[authorId];
        }
    
        try {
            const response = await fetch(`${baseUrl}/users/${authorId}`);
            
            if (!response.ok) {
                console.error(`Error fetching author ${authorId}: ${response.statusText}`);
                return null;
            }
            
            const data = await response.json();
    
            // Cache the fetched author
            setAuthorCache((prevCache) => ({
                ...prevCache,
                [authorId]: data,
            }));
    
            return data;
        } catch (error) {
            console.error(`Error fetching author ${authorId}:`, error);
            return null; // Ensure consistent return value
        }
    };
    const fetchPostsByAuthor = async (authorId) => {
        try {
            const response = await fetch(`${baseUrl}/posts?author=${authorId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching posts by author:", error);
        }
    }

    const fetchCompanyByHubspotId = async (hubspotId) => {
        try {
            const response = await fetch(`${baseUrl}/client?hubspotId=${hubspotId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching company by Hubspot ID:", error);
        }
    }

    return (
        <WordpressContext.Provider value={{ posts, services, fetchService, fetchAuthor, fetchPostsByAuthor, pages,fetchCompanyByHubspotId }}>
            {children}
        </WordpressContext.Provider>
    );
};

export const useWordpress = () => {
    return useContext(WordpressContext);
};