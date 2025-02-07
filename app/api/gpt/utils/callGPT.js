// /app/utils/callGPT.js

/**
 * Calls the GPT API using the given assistant ID from OpenAI.
 *
 * @param {Object} options - Options for the GPT call.
 * @param {string} options.assistantId - The OpenAI assistant model identifier (e.g., "gpt-3.5-turbo").
 * @param {string} options.prompt - The base prompt to send to GPT.
 * @param {Object} options.parameters - Additional parameters for the GPT API.
 * @returns {Promise<Object>} - The result from the GPT API.
 */
export async function callGPT({ assistantId, prompt, parameters = {} }) {
  const API_URL = process.env.GPT_API_URL;
  const API_KEY = process.env.GPT_API_KEY;

  // Build the request body using the provided assistantId as the model identifier
  const requestBody = {
    model: assistantId,
    prompt,
    ...parameters,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`GPT API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in callGPT:", error);
    throw error;
  }
}