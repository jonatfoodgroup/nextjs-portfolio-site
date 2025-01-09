"use client";
import { useState, useEffect } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import TranscriptItem from "./TrascriptItem";

const TranscriptList = () => {
    const { transcripts } = useFirebase();
    const [searchTerm, setSearchTerm] = useState("");
    
    const filteredTranscripts = transcripts.filter((transcript) =>
        transcript.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div>
        <input
            type="text"
            placeholder="Search transcripts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded p-1 w-full font-medium text-sm mb-4 border border-gray-300 shadow-sm"
        />
    
        <div className="flex flex-col space-y-2">
            {filteredTranscripts.map((transcript) => (
            <TranscriptItem key={transcript.id} transcript={transcript} />
            ))}
        </div>
        </div>
    );
}

export default TranscriptList;