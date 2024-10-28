"use client";
import { useContext, createContext, useState, useEffect } from "react";

const WordpressContext = createContext();

export const WordpressProvider = ({ children }) => {
    let baseUrl = "https://jonsenterfitt.com";
    let paths = [
        "/wp-json/wp/v2/posts",
        "/wp-json/wp/v2/pages",
        "/wp-json/wp/v2/project",
    ];

    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            let postPromises = paths.map(async (path) => {
                let response = await fetch(baseUrl + path);
                return response.json();
            });

            let postResults = await Promise.all(postPromises);

            setPosts(postResults[0]);
            setPages(postResults[1]);
            setProjects(postResults[2]);
        };

        fetchPosts();
    }, []);

    return (
        <WordpressContext.Provider value={{ posts, pages, projects }}>
            {children}
        </WordpressContext.Provider>
    );

};

export const useWordpress = () => {
    return useContext(WordpressContext);
}