"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useContent } from "../../providers/ContentProvider";
import TagsInput from "./TagsInput";

const ContentDetails = ({ item }) => {
    const { deleteContent, updateContent } = useContent();

    // Initialize state
    const [contentData, setContentData] = useState({
        title: "",
        stage: "Unassigned",
        type: "Article",
        description: "",
        content: "",
        tags: []
    });

    // Update state when `item` changes
    useEffect(() => {
        if (item) {
            setContentData({
                title: item.title || "",
                stage: item.stage || "Unassigned",
                type: item.type || "Article",
                description: item.description || "",
                content: item.content || "",
                tags: item.tags || []
            });
            console.log('Item loaded:', item);
        }
    }, [item]);

    // Handler for input changes
    const handleChange = (field) => (e) => {
        setContentData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    // Save handler
    const handleSave = useCallback(() => {
        if (!item?.id) return;
        console.log("Saving:", item.id, contentData);
        updateContent(item.id, contentData);
    }, [item, contentData, updateContent]);

    // Delete handler
    const handleDelete = useCallback(() => {
        if (typeof window !== "undefined" && window.confirm("Are you sure you want to delete this item?")) {
            deleteContent(item.id);
        }
    }, [item, deleteContent]);

    return (
        <div className="bg-gray-800 rounded-lg shadow-md w-full p-4">
            {/* Title Input */}
            <InputField
                id="title"
                label="Title"
                value={contentData.title}
                onChange={handleChange("title")}
                placeholder="Starting is the hardest part..."
            />

            {/* Description Input */}
            <TextAreaField
                id="description"
                label="Description"
                value={contentData.description}
                onChange={handleChange("description")}
                placeholder="Briefly describe your idea..."
                rows={3}
            />

            {/* Content Input */}
            <TextAreaField
                id="content"
                label="Details or Content"
                value={contentData.content}
                onChange={handleChange("content")}
                placeholder="Write your content here..."
                rows={6}
            />

            {/* Tags Input */}
            <TagsInput tags={contentData.tags} onTagsChange={(tags) => setContentData((prev) => ({ ...prev, tags }))} />

            {/* Dropdowns */}
            <SelectField
                id="stage"
                label="Stage"
                value={contentData.stage}
                onChange={handleChange("stage")}
                options={[
                    { value: "idea", label: "Idea" },
                    { value: "draft", label: "Draft" },
                    { value: "review", label: "Review" },
                    { value: "published", label: "Published" }
                ]}
            />

            <SelectField
                id="type"
                label="Type"
                value={contentData.type}
                onChange={handleChange("type")}
                options={[
                    { value: "Article", label: "Article" },
                    { value: "Video", label: "Video" },
                    { value: "Podcast", label: "Podcast" },
                    { value: "Email", label: "Email" },
                    { value: "Social", label: "Social" }
                ]}
            />

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4">
                <button onClick={handleDelete} className="text-red-500 hover:text-red-400 transition">
                    Delete
                </button>
                <button
                    onClick={handleSave}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

// Reusable Input Component
const InputField = ({ id, label, value, onChange, placeholder }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-gray-400 mb-2">{label}</label>
        <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-gray-700 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
        />
    </div>
);

// Reusable TextArea Component
const TextAreaField = ({ id, label, value, onChange, placeholder, rows }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-gray-400 mb-2">{label}</label>
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full bg-gray-700 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500 resize-none"
        ></textarea>
    </div>
);

// Reusable Select Component
const SelectField = ({ id, label, value, onChange, options }) => (
    <div className="flex justify-between items-center mb-4">
        <label htmlFor={id} className="text-gray-400">{label}</label>
        <select
            id={id}
            value={value}
            onChange={onChange}
            className="bg-gray-700 text-gray-200 rounded-md px-3 py-2"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default ContentDetails;