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
          <p>{company?.properties?.description || "No description provided."}</p>
        </>
      )}

      {/* Wordpress Company Section */}
      {
        wpCompany ? (
          <>
            {
              wpCompany.acf?.softwares_used ? (
                <div>
                  <h2 className="text-xl font-bold mt-4">Software Used</h2>
                  <ul>
                    {wpCompany.acf?.softwares_used.map((software, index) => (
                      <li key={index}>{software}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            }
          </>
        ) : (
          <p>Loading company details...</p>
        )
      }

    </div>
   </>
  );
}