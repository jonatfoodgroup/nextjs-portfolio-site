"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IdeaList({ hubspotId, onItemSelect }) {
  const [ideas, setIdeas] = useState([]); // List of ideas
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const router = useRouter();

  // Fetch ideas based on hubspotId
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/ideas/${hubspotId}`)
      .then((res) => res.json())
      .then((data) => setIdeas(data.ideas || []))
      .catch((err) => console.error("Failed to fetch ideas:", err))
      .finally(() => setIsLoading(false));
  }, [hubspotId]);

  // Handle idea click
  const handleItemClick = (ideaId) => {
    if (onItemSelect) {
      onItemSelect(ideaId); // Custom callback
    } else {
      // Default: navigate to the idea page
      router.push(`/portal/${hubspotId}/ideas/${ideaId}`);
    }
  };

  return (
    <div className="space-y-2">
      {isLoading ? (
        <p>Loading ideas...</p>
      ) : ideas.length > 0 ? (
        <ul className="list-disc pl-5">
          {ideas.map((idea) => (
            <li key={idea.id} className="cursor-pointer">
              <button
                onClick={() => handleItemClick(idea.id)}
                className="text-blue-600 hover:underline"
              >
                {idea.title || "Untitled Idea"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ideas have been submitted yet.</p>
      )}
    </div>
  );
}