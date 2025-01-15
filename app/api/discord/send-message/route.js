import axios from "axios";

const DISCORD_API_BASE = "https://discord.com/api/v10";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

export async function POST(req) {
  try {
    const { channelId, message } = await req.json();

    if (!channelId || !message) {
      return new Response(
        JSON.stringify({ error: "channelId and message are required" }),
        { status: 400 }
      );
    }

    // Send the message to the Discord channel
    const response = await axios.post(
      `${DISCORD_API_BASE}/channels/${channelId}/messages`,
      { content: message },
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(
      JSON.stringify({ success: true, data: response.data }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending Discord message:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({ error: "Failed to send Discord message" }),
      { status: 500 }
    );
  }
}