"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { firestore } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const RequestPage = () => {
    const { id } = useParams();
    const [requestData, setRequestData] = useState(null);
    const [text, setText] = useState("");
    const [allTranscripts, setAllTranscripts] = useState([]);
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [isStarted, setIsStarted] = useState(false); // NEW: Tracks intro screen
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (id) {
            const fetchRequest = async () => {
                const docRef = doc(firestore, "requests", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRequestData(docSnap.data());
                    setAllTranscripts(docSnap.data().responses || []);
                }
            };
            fetchRequest();
        }
    }, [id]);

    useEffect(() => {
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = (event) => {
                let interimTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        setText((prev) => prev + " " + transcript);
                    } else {
                        interimTranscript += transcript;
                    }
                }
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setText("");
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const saveResponse = async () => {
        const updatedResponses = [...allTranscripts];
        updatedResponses[currentTopicIndex] = text;

        setAllTranscripts(updatedResponses);
        const docRef = doc(firestore, "requests", id);
        await updateDoc(docRef, { responses: updatedResponses, status: "complete", respondedAt: new Date().toISOString() });

        if (currentTopicIndex < requestData.prompts.length - 1) {
            setText("");
            setCurrentTopicIndex(currentTopicIndex + 1);
        } else {
            alert("All responses recorded!");
            stopListening();
        }
    };

    return (
        !isStarted ? (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6">
                {/* Elegant Gradient Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black opacity-40 blur-3xl"></div>
                 {/* Floating Animated Glow */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
                {/* Glassmorphic Welcome Container */}
                <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-xl shadow-xl border border-gray-600 max-w-2xl w-full text-center">
                    <h3 className="text-lg text-gray-400 font-semibold mb-4">Request Session</h3>
                    <h1 className="text-4xl font-bold text-white tracking-wide mb-6">
                        {requestData?.topic || "Request Session"}
                    </h1>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                        This session is designed to gather your insights asynchronously. 
                        Please take your time and respond thoughtfully.
                    </p>
                    <ul className="text-gray-400 mb-8 text-left space-y-2 px-4">
                        <li>✔ Answer at your own pace</li>
                        <li>✔ Responses are saved automatically</li>
                        <li>✔ Don't worry about mistakes - AI will clean up</li>
                    </ul>
                    <button
                        onClick={() => setIsStarted(true)}
                        className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold tracking-wide border border-gray-500 hover:bg-white/20 transition-all"
                    >
                        Start Session
                    </button>
                </div>
            </div>
        ) : (
            // 🎤 Transcription Screen
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg p-6">
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 opacity-50 blur-3xl"></div>
    
                {/* Glassmorphic Container for the Session */}
                <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-xl shadow-xl border border-gray-600 max-w-2xl w-full text-center">
    {/* Current Question */}
    <h2 className="text-2xl font-semibold text-white mb-6">
        {requestData.prompts[currentTopicIndex]}
    </h2>

    {/* Microphone Button */}
    <button
        onClick={isListening ? stopListening : startListening}
        className={`w-16 h-16 flex items-center justify-center rounded-full border-2 ${
            isListening ? "bg-red-600 border-red-400 shadow-lg shadow-red-500" : "bg-white/10 border-gray-500"
        } text-white transition-all hover:bg-white/20`}
    >
        <Icon icon="ph:microphone-fill" className="w-8 h-8" />
    </button>

    {/* Transcription Input */}
    <textarea
        className="w-full h-40 p-4 mt-6 border border-gray-500 rounded-md text-white bg-black/30 text-lg focus:ring-2 focus:ring-gray-400 transition"
        value={text}
        placeholder="Your response will appear here..."
        onChange={(e) => setText(e.target.value)}
    />

    {/* Navigation Buttons */}
    <div className="flex justify-between mt-6">
    {/* Back Button - Loads previous response when going back */}
    <button
        onClick={() => {
            if (currentTopicIndex > 0) {
                const updatedResponses = [...allTranscripts];
                updatedResponses[currentTopicIndex] = text; // Save current response
                setAllTranscripts(updatedResponses);

                setCurrentTopicIndex((prevIndex) => prevIndex - 1);
                setText(updatedResponses[currentTopicIndex - 1] || ""); // Load previous response
            }
        }}
        disabled={currentTopicIndex === 0}
        className={`px-6 py-3 rounded-lg font-semibold tracking-wide border transition-all ${
            currentTopicIndex === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-white/10 text-white border-gray-500 hover:bg-white/20"
        }`}
    >
        Back
    </button>

    {/* Next Button - Saves response before moving forward */}
    <button
        onClick={() => {
            const updatedResponses = [...allTranscripts];
            updatedResponses[currentTopicIndex] = text; // Save current response
            setAllTranscripts(updatedResponses);

            if (currentTopicIndex < requestData.prompts.length - 1) {
                setText(updatedResponses[currentTopicIndex + 1] || ""); // Load next response if exists
                setCurrentTopicIndex((prevIndex) => prevIndex + 1);
            } else {
                saveResponse(); // Final submission
            }
        }}
        className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold tracking-wide border border-gray-500 hover:bg-white/20 transition-all"
    >
        {currentTopicIndex < requestData.prompts.length - 1 ? "Next Question" : "Finish"}
    </button>
</div>
</div>            </div>
        )
    );
};

export default RequestPage;