"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const SaveLink = ({ bounty }) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Check if the bounty is saved
        const savedBounties = JSON.parse(localStorage.getItem("savedBounties")) || [];
        const isSaved = savedBounties.some((savedArticle) => savedArticle.id === bounty.id);

        setIsSaved(isSaved);
    }, [bounty]);


    const handleSave = () => {
        // Get saved bounties from localStorage
        const savedBounties = JSON.parse(localStorage.getItem("savedBounties")) || [];

        // Check if the bounty is already saved
        const isSaved = savedBounties.some((savedArticle) => savedArticle.id === bounty.id);

        // If the bounty is saved, remove it from the saved list
        if (isSaved) {
            const updatedSavedBounties = savedBounties.filter((savedArticle) => savedArticle.id !== bounty.id);
            localStorage.setItem("savedBounties", JSON.stringify(updatedSavedBounties));
            setIsSaved(false);
        } else {
            // Otherwise, add the bounty to the saved list
            const updatedSavedBounties = [...savedBounties, bounty];
            localStorage.setItem("savedBounties", JSON.stringify(updatedSavedBounties));
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
           <span> {isSaved ? "Saved" : "Save"} Bounty</span>
        </button>
    );
}

export default SaveLink;