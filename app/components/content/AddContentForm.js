"use client";

import React, { useState } from "react";
import { useContent } from "../../providers/ContentProvider";

const AddContentForm = ({ onClose }) => {
    const { addContent } = useContent(); // Access the addContent function from ContentProvider
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "blogPost", // Default content type
        stage: "idea", // Default stage
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.description) {
            alert("Title and description are required.");
            return;
        }

        try {
            // Add content via the ContentProvider
            await addContent({
                ...formData,
                createdAt: new Date().toISOString(), // Add timestamp
                updatedAt: new Date().toISOString(),
            });
            onClose(); // Close the form after successful submission
        } catch (error) {
            console.error("Error adding content:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg shadow-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-400 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-400 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                    rows="3"
                    required
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-400 mb-1">
                    Type
                </label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                >
                    <option value="article">Blog Post</option>
                    <option value="email">Email</option>
                    <option value="social">Social Post</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="stage" className="block text-gray-400 mb-1">
                    Stage
                </label>
                <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                >
                    <option value="idea">Idea</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="publish">Publish</option>
                </select>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="mr-2 px-4 py-2 bg-gray-600 text-gray-200 rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-gray-200 rounded-md"
                >
                    Add Content
                </button>
            </div>
        </form>
    );
};

export default AddContentForm;