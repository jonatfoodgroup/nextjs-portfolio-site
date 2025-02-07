// /app/api/gpt/[gptId].js

import { callGPT } from '../utils/callGPT';

export async function POST(req, { params }) {
  const { gptId } = params; // gptId is the dynamic parameter (e.g., "headline", "social_post")
  
  try {
    const { prompt, parameters } = await req.json();
    const result = await callGPT({ assistantId: gptId, prompt, parameters });
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error with GPT assistant ${gptId}:`, error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}