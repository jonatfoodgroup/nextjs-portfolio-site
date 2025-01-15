import axios from "axios";

const DISCORD_API_BASE = "https://discord.com/api/v10";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;

/**
 * Create a Discord channel for a specific Job ID under a category.
 * @param {string} jobId - The unique Job ID (e.g., "2025-0001").
 * @param {string} discord_category_id - The Discord category ID to assign as parent.
 * @returns {Promise<string>} - The created Discord channel's ID.
 */
export async function createDiscordChannel(jobId, discord_category_id) {
  try {
    const response = await axios.post(
      `${DISCORD_API_BASE}/guilds/${DISCORD_GUILD_ID}/channels`,
      {
        name: jobId, // Use the Job ID as the channel name
        type: 0, // Text channel
        parent_id: discord_category_id, // Assign to the specified category
        topic: `Discussion for Job ID: ${jobId}`,
      },
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Discord channel created: ${response.data.name}`);
    return response.data.id; // Return the channel ID
  } catch (error) {
    console.error("Error creating Discord channel:", error.response?.data || error.message);
    throw new Error("Failed to create Discord channel");
  }
}