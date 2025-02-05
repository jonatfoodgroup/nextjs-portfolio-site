"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CampaignList from "../components/campaigns/CampaignList";


export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("/api/campaigns");
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  if (loading) return <div className="text-center p-6">Loading campaigns...</div>;

  return (
    <div className="w-full mx-auto">
        <CampaignList campaigns={campaigns} />
      <h1 className="text-3xl font-bold mb-4">Campaigns</h1>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
              <div className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer transition">
                <h2 className="text-xl font-semibold">{campaign.name}</h2>
                <p className="text-sm text-gray-600">{campaign.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}