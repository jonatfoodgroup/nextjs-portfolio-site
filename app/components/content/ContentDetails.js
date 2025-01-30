"use client";
import React, { useEffect, useState } from "react";
import { useContent } from "../../providers/ContentProvider";
import TagsInput from "./TagsInput"; // Import the TagsInput component

const ContentDetails = ({ item }) => {
    const { deleteContent, updateContent } = useContent();
    const [title, setTitle] = useState(item?.title || "");
    const [stage, setStage] = useState(item?.stage || "Unassigned");
    const [type, setType] = useState(item?.type || "Article");
    const [description, setDescription] = useState(item?.description || "");
    const [content, setContent] = useState(item?.content || "");
    const [tags, setTags] = useState(item?.tags || []); // Added tags state

    const handleSave = () => {
        console.log('handleSave', item.id, title, stage, type, description, content, tags);
        updateContent(item.id, {
            title,
            stage,
            type,
            description,
            content,
            tags, // Pass tags to update content
        });

        console.log('post save', item.id, title, stage, type, description, content, tags);
    };

    const handleDelete = () => {
        typeof window !== 'undefined' && window.confirm("Are you sure you want to delete this item?") && deleteContent(item.id);
    };

    // Update state when the `item` prop changes
    useEffect(() => {
        if (!item) return;
        if (title) return;
        if (item) {
            console.log('item loaded', item);
            setTitle(item.title || "");
            setDescription(item.description || "");
            setStage(item.stage || "Unassigned");
            setType(item.type || "Article");
            setContent(item.content || "");
            setTags(item.tags || []); // Update tags when the item prop changes
        }
    }, [item]);

    return (
        <div className="bg-gray-800 rounded-lg shadow-md w-full">
            {/* Title Input */}
            <div className="mb-4">
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Starting is the hardest part..."
                    className="w-full bg-gray-700 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                />
            </div>

            {/* Textarea for description (brief) */}
            <div className="mb-4">
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe your idea..."
                    rows={3}
                    className="w-full bg-gray-700 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500 resize-none"
                ></textarea>
            </div>

            {/* Textarea for Content */}
            <div className="mb-4">
                <label htmlFor="content" className="block text-gray-400 mb-2">
                    Add details or content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your content here..."
                    rows={6}
                    className="w-full bg-gray-700 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500 resize-none"
                ></textarea>
            </div>

            {/* Tags Input */}
            <TagsInput tags={tags} onTagsChange={setTags} />

            {/* Stage Dropdown */}
            <div className="flex justify-between items-center mb-4">
                <label htmlFor="stage" className="text-gray-400">Stage</label>
                <select
                    id="stage"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="bg-gray-700 text-gray-200 rounded-md px-3 py-2"
                >
                    <option value="idea">Idea</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="published">Published</option>
                </select>
            </div>

            {/* Type Dropdown */}
            <div className="flex justify-between items-center mb-4">
                <label htmlFor="type" className="text-gray-400">Type</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-gray-700 text-gray-200 rounded-md px-3 py-2"
                >
                    <option value="Article">Article</option>
                    <option value="Video">Email</option>
                    <option value="Podcast">Social</option>
                </select>
            </div>

            {/* Delete Button */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-400 transition"
                >
                    Delete
                </button>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
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

export default ContentDetails;