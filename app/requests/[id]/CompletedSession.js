"use client";
import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";

const CompletedSession = ({ id,requestData, setIsStarted, setAllTranscripts, setCurrentTopicIndex, setText }) => {
    console.log("CompletedSession.js: requestData", requestData);
    const restartSession = async () => {
        if (!requestData || !id) {
            console.error("Error: requestData is undefined or missing id");
            return;
        }
    
        try {
            const docRef = doc(firestore, "requests", id);
    
            // Reset session status but keep responses for modification
            await updateDoc(docRef, { status: "in_progress" });
    
            setAllTranscripts(requestData.responses || []); // Pre-fill previous responses
            setCurrentTopicIndex(0); // Start from first question
            setText(requestData.responses[0] || ""); // Load first response if exists
            setIsStarted(true); // Restart the session
        } catch (error) {
            console.error("Error restarting session:", error);
        }
    };
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg p-6">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 opacity-50 blur-3xl"></div>

            {/* Glassmorphic Container */}
            <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-xl shadow-xl border border-gray-600 max-w-3xl w-full text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Session Completed</h1>
                
                {/* Topic */}
                <h2 className="text-2xl font-semibold text-blue-400 mb-6">
                    {requestData.topic}
                </h2>

                <p className="text-gray-300 mb-6 text-lg">
                    Thank you for completing the session. Below are your recorded responses.
                </p>

                {/* Prompt Responses Container - Scrollable */}
                <div className="max-h-[60vh] overflow-y-auto scrollbar-hide bg-black/30 p-6 rounded-lg border border-gray-600">
                    {requestData.prompts.map((prompt, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold text-blue-400">{prompt}</h3>
                            <p className="text-gray-300">{requestData.responses[index] || "No response recorded"}</p>
                        </div>
                    ))}
                </div>

                {/* Actions: Restart or Exit */}
                <div className="mt-6 flex gap-4 justify-center">
                    {/* Restart Button */}
                    <button
                        onClick={restartSession}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold tracking-wide hover:bg-blue-600 transition-all"
                    >
                        Restart Session
                    </button>

                    {/* Back to Dashboard */}
                    <button
                        onClick={() => window.location.href = "/"}
                        className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold tracking-wide border border-gray-500 hover:bg-white/20 transition-all"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompletedSession;