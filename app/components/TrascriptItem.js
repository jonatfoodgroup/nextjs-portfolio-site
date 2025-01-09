"use client";

import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFirebase } from "../providers/FirebaseProvider";

const TranscriptItem = ({ transcript }) => {
    const { deleteTranscript } = useFirebase();
    const [showContent, setShowContent] = useState(false);

    const copyTranscriptToClipboard = () => {
        navigator.clipboard
            .writeText(transcript.content)
            .then(() => alert("Transcript copied to clipboard!"))
            .catch(() => alert("Failed to copy transcript to clipboard."));
    };

    return (
        <div className="flex flex-col w-full border p-4 rounded-lg shadow-sm bg-white">
            {/* Title */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                    {transcript.title || "Untitled Transcript"}
                </h3>
                <button
                    onClick={copyTranscriptToClipboard}
                    className="text-blue-500 hover:text-blue-700"
                    title="Copy transcript to clipboard"
                >
                    <Icon icon="akar-icons:copy" className="w-5 h-5" />
                </button>
            </div>

            {/* Summary */}
            {transcript.summary && (
                <p className="text-gray-600 text-sm mb-4">
                    <strong>Summary:</strong> {transcript.summary}
                </p>
            )}

            {/* Full Transcript */}
            <p className="text-gray-600 text-sm mb-4">
                <strong>Transcript:</strong>{" "}
                {showContent
                    ? transcript.content
                    : `${transcript.content.slice(0, 100)}...`}
                <button
                    onClick={() => setShowContent(!showContent)}
                    className="text-orange-500 hover:text-orange-700 text-xs mt-2 flex flex-col"
                >
                    {showContent ? "Show less" : "Show more"}
                </button>
            </p>

            {/* Timestamp */}
            <p className="text-gray-500 text-xs mb-4">
                <strong>Timestamp:</strong>{" "}
                {new Date(transcript.timestamp).toLocaleString()}
            </p>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
                <button
                    onClick={() => deleteTranscript(transcript.id)}
                    className="text-red-300 hover:text-red-700"
                >
                    <Icon icon="akar-icons:trash-can" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default TranscriptItem;