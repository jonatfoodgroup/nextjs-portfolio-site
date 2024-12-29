"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import NewIdeaDrawer from "../../components/ideas/IdeaDrawer";
import IdeaList from "../../components/ideas/IdeaList";

export default function Page({ params }) {
  const { hubspotId } = params;

  const [company, setCompany] = useState(null);
  const [loadingCompany, setLoadingCompany] = useState(true);

  useEffect(() => {
    if (!hubspotId) return;
    if (company) return
    // Fetch company details
    fetch(`/api/hubspot/get-companies/${hubspotId}`)
      .then((res) => res.json())
      .then((data) => setCompany(data.company))
      .finally(() => setLoadingCompany(false));

  }, [hubspotId]);


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

    </div>
   </>
  );
}