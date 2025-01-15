"use client";
import React, { useState, useEffect } from "react";
import { useHubspot } from "../../providers/HubspotProvider";
import Link from "next/link";

export default function Breadcrumb({ hubspotId }) {
    const { fetchCompanyById } = useHubspot();

    const [company, setCompany] = useState(null);

    useEffect(() => {
        if (!hubspotId) {
            return;
        }

        fetchCompanyById(hubspotId).then((company) => setCompany(company));
    }, [hubspotId]);

    return (
        <nav className="flex items-center space-x-2 text-gray-500 mt-12">
            <Link href="/portal">Portal</Link>
            <span>/</span>
            <Link 
                href={`/portal/${hubspotId}`}
            >
            {company ? <span>{company.properties.name}</span> : <span>Loading...</span>}
            </Link>
        </nav>
    );
}