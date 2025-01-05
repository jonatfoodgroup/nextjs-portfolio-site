"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const SaveLink = ({ article }) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Check if the article is saved
        const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
        const isSaved = savedArticles.some((savedArticle) => savedArticle.id === article.id);

        setIsSaved(isSaved);
    }, [article]);

    const handleSave = () => {
        // Get saved articles from localStorage
        const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

        // Check if the article is already saved
        const isSaved = savedArticles.some((savedArticle) => savedArticle.id === article.id);

        // If the article is saved, remove it from the saved list
        if (isSaved) {
            const updatedSavedArticles = savedArticles.filter((savedArticle) => savedArticle.id !== article.id);
            localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));
            setIsSaved(false);
        } else {
            // Otherwise, add the article to the saved list
            const updatedSavedArticles = [...savedArticles, article];
            localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));
            setIsSaved(true);
        }
    };

    return (
        <button
            onClick={handleSave}
            className={`flex items-center space-x-1 text-xs font-semibold text-gray-500 hover:text-gray-700`}
        >
            
            {
                isSaved ?
                    <Icon icon="carbon:checkmark-filled" className="text-xl text-orange-500" />
                    :
                    <Icon icon="carbon-save" className="text-xl" />

            }
           <span> {isSaved ? "Saved" : "Save"}</span>
        </button>
    );
}

export default SaveLink;