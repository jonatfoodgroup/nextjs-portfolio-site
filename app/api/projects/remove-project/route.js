import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import axios from "axios";

const DISCORD_API_BASE = "https://discord.com/api/v10";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

async function archiveDiscordChannel(channelId, title) {
    try {
        const response = await axios.patch(
            `${DISCORD_API_BASE}/channels/${channelId}`,
            {
                parent_id: "1328550940395044976", // ID of the ARCHIVES category
                name: `archived-${title}`, // Optional: Rename the channel to indicate it's archived
            },
            {
                headers: {
                    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(`Discord channel moved to ARCHIVES: ${channelId}`);
        return response.data;
    } catch (error) {
        console.error("Error archiving Discord channel:", error.response?.data || error.message);
        throw new Error("Failed to archive Discord channel");
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { projectId, discordChannelId, title } = body;

        if (!projectId) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        // Step 1: Archive the Discord channel
        if (discordChannelId) {
            await archiveDiscordChannel(discordChannelId,title);
        }

        // Step 2: Remove the project from Firestore
        const projectRef = doc(firestore, "projects", projectId);
        await deleteDoc(projectRef);

        console.log(`Project ${projectId} removed successfully.`);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error removing project:", error.message);
        return NextResponse.json({ error: "Failed to remove project" }, { status: 500 });
    }
}