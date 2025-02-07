// /app/api/gpt/generate-headline.js
import { callGPT } from '..utils/utils/callGPT';

export async function POST(req) {
  try {
    const { prompt, parameters } = await req.json();
    // Specify 'headline' as the assistant type
    const result = await callGPT({ assistantId: '123', prompt, parameters });
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error generating headline:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}