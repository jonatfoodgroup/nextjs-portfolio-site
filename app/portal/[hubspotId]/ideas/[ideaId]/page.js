"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NewIdeaDrawer from "../../../../components/ideas/IdeaDrawer";
import IdeaList from "../../../../components/ideas/IdeaList";

export default function IdeaDetailPage({ params }) {
  const { hubspotId, ideaId } = params;
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!ideaId); // Open automatically if ideaId exists
  const [selectedIdeaId, setSelectedIdeaId] = useState(ideaId); // Track current ideaId
  const router = useRouter();

  const handleSave = async (title,content, currentIdeaId) => {
    const endpoint = currentIdeaId
      ? `/api/ideas/${hubspotId}/${currentIdeaId}` // Update existing idea
      : `/api/ideas/${hubspotId}`; // Create new idea if no ID is provided

    await fetch(endpoint, {
      method: currentIdeaId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content, title: title }),
    });
  };

  const handleNewIdea = () => {
    setSelectedIdeaId(null); // Ensure we're not editing
    setIsDrawerOpen(true); // Open the drawer for a new idea
  };

  return (
    <div className="relative p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ideas</h1>
        <button
          onClick={handleNewIdea}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + New Idea
        </button>
      </div>

      {/* Render the Idea List */}
      <IdeaList
        hubspotId={hubspotId} // Pass hubspotId to fetch ideas
        onAdd={handleNewIdea} // Reuse the "New Idea" logic
      />

      {/* Render the Idea Drawer */}
      {isDrawerOpen && (
        <NewIdeaDrawer
          hubspotId={hubspotId}
          ideaId={selectedIdeaId} // Pass selected ideaId (null for new idea)
          onClose={() => {
            setIsDrawerOpen(false);
            router.push(`/portal/${hubspotId}`); // Go back on close
          }}
          onSave={handleSave} // Handle save logic
        />
      )}
    </div>
  );
}