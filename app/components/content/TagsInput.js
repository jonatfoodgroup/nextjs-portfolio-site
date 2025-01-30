import React, { useState } from "react";

const TagsInput = ({ tags, onTagsChange }) => {
    const [tagInput, setTagInput] = useState("");

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            onTagsChange([...tags, tagInput]);
        }
        setTagInput(""); // Clear input field
    };

    const handleRemoveTag = (tagToRemove) => {
        onTagsChange(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="Enter tags..."
                    className="w-full bg-gray-700 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                />
                <button
                    onClick={handleAddTag}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                >
                    Add
                </button>
            </div>

            <div className="flex flex-wrap space-x-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-600 text-gray-200 rounded-full px-3 py-1"
                    >
                        {tag}
                        <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-red-400 hover:text-red-500"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagsInput;