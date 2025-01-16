import axios from "axios";

const DISCORD_API_BASE = "https://discord.com/api/v10";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

export async function POST(req) {
  try {
    const { channelId, title, description, url, buttonLabel, color } = await req.json();

    if (!channelId || !title || !description || !url || !buttonLabel || !color) {
      return new Response(
        JSON.stringify({
          error: "channelId, title, description, url, and buttonLabel are required",
        }),
        { status: 400 }
      );
    }

    // Construct the payload for an embed and a button
    const payload = {
      embeds: [
        {
          title: title,
          description: description,
          color: color,
          footer: {
            text: "Project Update",
          },
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 2, // Button
              style: 5, // Link button
              label: buttonLabel,
              url: url,
            },
          ],
        },
      ],
    };

    // Send the embed message to the Discord channel
    const response = await axios.post(
      `${DISCORD_API_BASE}/channels/${channelId}/messages`,
      payload,
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
      JSON.stringify({ error: "Failed to send Discord card-style message" }),
      { status: 500 }
    );
  }
}