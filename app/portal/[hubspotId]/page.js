"use client";
import React, { useState, useEffect } from "react";
import { useWordpress } from "../../providers/WordpressProvider";

export default function Page({ params }) {
  const [hubspotId, setHubspotId] = useState(null);
  const { fetchCompanyByHubspotId } = useWordpress();
  const [company, setCompany] = useState(null);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [wpCompany, setWpCompany] = useState(null);

  const resolvedParams = React.use(params);

  useEffect(() => {
    // Fetch company details
    fetch(`/api/hubspot/get-companies/${resolvedParams.hubspotId}`)
      .then((res) => res.json())
      .then((data) => setCompany(data.company))
      .finally(() => setLoadingCompany(false));    
  }, [resolvedParams]);

  useEffect(() => {
    fetchCompanyByHubspotId(resolvedParams.hubspotId)
      .then((data) => setWpCompany(data[0]))
  }, [resolvedParams]);


  if (!resolvedParams.hubspotId) {
    return <p>No company ID provided.</p>;
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
        </>
      )}
    </div>
   </>
  );
}