"use client";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const topics = [
    "Describe your biggest challenge in business right now.",
    "What would success look like in the next 6 months?",
    "What do you wish your clients understood better about your business?"
];

const TranscriptionOverlay = () => {
    const [text, setText] = useState("");
    const [allTranscripts, setAllTranscripts] = useState([]);
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const recognitionRef = useRef(null);

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
        } else {
            console.warn("Speech Recognition API is not supported in this browser.");
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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(allTranscripts.join("\n\n")).then(() => {
            alert("All transcripts copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

    const nextTopic = () => {
        setAllTranscripts([...allTranscripts, `**${topics[currentTopicIndex]}**\n${text}`]);
        setText("");

        if (currentTopicIndex < topics.length - 1) {
            setCurrentTopicIndex(currentTopicIndex + 1);
        } else {
            setIsOverlayOpen(false);
            stopListening();
        }
    };

    return (
        <div>
            {/* Floating Pulsing Mic Button */}
            <button
                onClick={() => setIsOverlayOpen(true)}
                className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 focus:outline-none animate-pulse"
            >
                <Icon icon="akar-icons:microphone" className="w-8 h-8 text-white" />
            </button>

            {/* Full-Screen Overlay */}
            {isOverlayOpen && (
                <div className="fixed inset-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-lg animate-fadeIn" style={{ zIndex: 999 }}>

                    {/* Floating Animated Glow */}
                    <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>

                    {/* Modal Container */}
                    <div className="bg-black/70 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-lg relative border border-gray-700 animate-scaleUp">

                        {/* Topic Display */}
                        <h2 className="text-2xl font-bold text-white text-center mb-6">
                            {topics[currentTopicIndex]}
                        </h2>

                        {/* Glowing Mic & Input */}
                        <div className="flex flex-col items-center">
                            {/* Animated Microphone Icon */}
                            <div className="w-20 h-20 bg-red-500 rounded-full animate-glow flex items-center justify-center shadow-lg mb-6">
                                <Icon icon="akar-icons:microphone" className="w-10 h-10 text-white animate-bounce" />
                            </div>

                            {/* Transcription Textarea */}
                            <textarea
                                className="w-full h-48 p-4 border border-gray-600 rounded-md text-white bg-gray-900 bg-opacity-50 text-lg focus:ring-2 focus:ring-blue-500 transition"
                                value={text}
                                placeholder="Start speaking..."
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-6 justify-center">
                            <button
                                onClick={startListening}
                                disabled={isListening}
                                className="px-5 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition disabled:bg-gray-400"
                            >
                                Start
                            </button>
                            <button
                                onClick={stopListening}
                                disabled={!isListening}
                                className="px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition disabled:bg-gray-400"
                            >
                                Stop
                            </button>
                            <button
                                onClick={nextTopic}
                                className="px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                            >
                                {currentTopicIndex < topics.length - 1 ? "Next Topic" : "Finish"}
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="px-5 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
                            >
                                Copy All
                            </button>
                            <button
                                onClick={() => {
                                    setIsOverlayOpen(false);
                                    stopListening();
                                }}
                                className="px-5 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranscriptionOverlay;