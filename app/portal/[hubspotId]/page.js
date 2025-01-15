"use client";
import React, { useState, useEffect } from "react";
import PortalPage from "../../components/portal/PortalPage";


export default function Page({ params }) {
    const resolvedParams = React.use(params);

    if (!resolvedParams.hubspotId) {
    return <p className="mt-20">No company ID provided.</p>;
  }
  return (
  <>
    <div className="pt-20">
      {
        resolvedParams.hubspotId ? (
          <PortalPage hubspotId={resolvedParams.hubspotId} />
        ) : (
          <p>Loading company details...</p>
        )
      }
    </div>
   </>
  );
}