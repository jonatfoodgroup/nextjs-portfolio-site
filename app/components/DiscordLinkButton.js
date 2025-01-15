import React from "react";

const DiscordLinkButton = ({ discordChannelId }) => {
  if (!discordChannelId) {
    return (
      <div className="text-sm text-gray-500 italic">
        Discord channel not linked.
      </div>
    );
  }

  // Construct the Discord channel URL
  const discordAppUrl = `discord://discord.com/channels/${process.env.NEXT_PUBLIC_DISCORD_GUILD_ID}/${discordChannelId}`;
  return (
    <button
      onClick={() => window.open(discordAppUrl, "_blank")}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Go to Discord Channel
    </button>
  );
};

export default DiscordLinkButton;