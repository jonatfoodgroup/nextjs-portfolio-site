import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    >
      <Icon icon="akar-icons:discord-fill" />
    </button>
  );
};

export default DiscordLinkButton;