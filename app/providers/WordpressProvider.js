"use client";
import { useContext, createContext, useState, useEffect } from "react";

const WordpressContext = createContext();

export const WordpressProvider = ({ children }) => {
    let baseUrl = "http://localhost:10043";
    let path = "/wp-json/wp/v2/posts";

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}${path}`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            });
    }, []);

    return (
        <WordpressContext.Provider value={{ posts }}>
            {children}
        </WordpressContext.Provider>
    );

};

export const useWordpress = () => {
    return useContext(WordpressContext);
}