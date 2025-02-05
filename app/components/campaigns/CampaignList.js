import React, { useState } from "react";
import CampaignCard from "./CampaignCard";
import CampaignModal from "./CampaignModal";
import campaignsData from "../../data/campaigns/campaignsData";

const CampaignList = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // export all campaigns to json in clipboard on click
  const exportCampaigns = () => {
    navigator.clipboard.writeText(JSON.stringify(campaignsData, null, 2));
    alert("Campaigns exported to clipboard");
  }

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Campaigns</h1>
      <div className="flex justify-center mb-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        onClick={exportCampaigns}
      >
        Export Campaigns
      </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignsData.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} onClick={() => setSelectedCampaign(campaign)} />
        ))}
      </div>

      {selectedCampaign && (
        <CampaignModal campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
      )}
    </div>
  );
};

export default CampaignList;