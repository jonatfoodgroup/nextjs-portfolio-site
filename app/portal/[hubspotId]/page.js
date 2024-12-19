"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import NewIdeaDrawer from "../../components/ideas/IdeaDrawer";
import IdeaList from "../../components/ideas/IdeaList";

export default function Page({ params }) {
  const { hubspotId } = params;

  const [company, setCompany] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Fetch company details
    fetch(`/api/hubspot/get-companies/${hubspotId}`)
      .then((res) => res.json())
      .then((data) => setCompany(data.company))
      .finally(() => setLoadingCompany(false));

    // Fetch ideas for the company
    fetch(`/api/ideas/${hubspotId}`)
      .then((res) => res.json())
      .then((data) => setIdeas(data.ideas))
      .finally(() => setLoadingIdeas(false));
  }, [hubspotId]);

  const handleSave = async (content) => {
    await fetch(`/api/ideas/${hubspotId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    setIsDrawerOpen(false);
    setIdeas((prevIdeas) => [...prevIdeas, { content }]);
  }

  return (
  <>
    <div className="p-4">
      {/* Company Section */}
      {loadingCompany ? (
        <p>Loading company details...</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">
            {company?.properties?.name || "Company Name"}
          </h1>
          <p>{company?.properties?.description || "No description provided."}</p>
        </>
      )}

      {/* New Idea Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="mt-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + New Idea
      </button>

        <IdeaList hubspotId={hubspotId} />
    </div>
       {/* Render the Idea Drawer */}
    {isDrawerOpen && (
      <NewIdeaDrawer
        hubspotId={hubspotId}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSave}
      />
    )}
   </>
  );
}