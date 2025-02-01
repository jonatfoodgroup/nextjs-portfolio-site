"use client";
import React, { useState } from "react";

const TaskComments = () => {
    const [comments, setComments] = useState([
        { id: 1, user: "Megan Kelesihan", text: "Created this task", timestamp: "10 days ago", type: "system" },
        { id: 2, user: "Jon Senterfitt", text: "I think this design looks good. Thoughts?", timestamp: "9 days ago", type: "comment" },
        { id: 3, user: "Megan Kelesihan", text: "Sorry this isn't exactly what I meant. Let me clarify how the copy could flow...", timestamp: "9 days ago", type: "comment" },
    ]);
    const [newComment, setNewComment] = useState("");

    // Handle sending a comment
    const sendComment = () => {
        if (!newComment.trim()) return;

        const newCommentData = {
            id: comments.length + 1,
            user: "You",
            text: newComment,
            timestamp: "Just now",
            type: "comment",
        };

        setComments([...comments, newCommentData]);
        setNewComment("");
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 pb-2">
                <button className="text-sm px-4 py-2 font-medium text-white border-b-2 border-green-500">
                    Comments
                </button>
                <button className="text-sm px-4 py-2 font-medium text-gray-400 hover:text-white transition">
                    All activity
                </button>
            </div>

            {/* Comment List */}
            <div className="mt-4 space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                        {/* User Avatar (Placeholder) */}
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {comment.user.charAt(0)}
                        </div>

                        {/* Comment Content */}
                        <div className="flex-1">
                            <p className="text-white font-medium">{comment.user} 
                                <span className="text-gray-400 text-xs ml-2">{comment.timestamp}</span>
                            </p>
                            <p className="text-gray-300 text-sm">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comment Input */}
            <div className="mt-4 flex items-center space-x-2 border-t border-gray-700 pt-3">
                <input
                    type="text"
                    className="flex-1 p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-white"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendComment()}
                />
                <button 
                    onClick={sendComment} 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export default TaskComments;