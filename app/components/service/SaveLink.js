"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const SaveLink = ({ service }) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Check if the service is saved
        const savedServices = JSON.parse(localStorage.getItem("savedServices")) || [];
        const isSaved = savedServices.some((savedService) => savedService.id === service.id);

        setIsSaved(isSaved);
    }, [service]);


    const handleSave = () => {
        // Get saved services from localStorage
        const savedServices = JSON.parse(localStorage.getItem("savedServices")) || [];

        // Check if the service is already saved
        const isSaved = savedServices.some((savedService) => savedService.id === service.id);

        // If the service is saved, remove it from the saved list
        if (isSaved) {
            const updatedSavedServices = savedServices.filter((savedService) => savedService.id !== service.id);
            localStorage.setItem("savedServices", JSON.stringify(updatedSavedServices));
            setIsSaved(false);
        } else {
            // Otherwise, add the service to the saved list
            const updatedSavedServices = [...savedServices, service];
            localStorage.setItem("savedServices", JSON.stringify(updatedSavedServices));
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