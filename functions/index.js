// Import necessary Firebase Functions v2 modules
const { logger } = require("firebase-functions");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const OpenAI = require('openai');
const functions = require("firebase-functions");

initializeApp();


// Firestore trigger to generate summary and title for a new transcript
exports.generateMetadata = onDocumentCreated({
    document: "transcripts/{docId}",
    secrets: ["OPENAI_API_KEY"], // Declare the secret
}, async (event) => {
    // Create OpenAI client with environment-secure API key
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,  // Using environment config for security
    });


    const snap = event.data; // The new document data
    const transcriptText = snap.data().content; // Ensure your Firestore doc has a 'content' field

    logger.info("Generating summary and title for transcript", { transcriptText });

    if (!transcriptText) {
        logger.error("Transcript content is missing. Cannot generate summary and title.");
        return;
    }

    try {
        // Call OpenAI API for summary and title generation
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Or the model you want to use
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant summarizing transcripts. Return a JSON object with 'title' and 'summary'.",
                },
                {
                    role: "user",
                    content: `Transcript: ${transcriptText}. Please provide a concise title and summary in JSON format like { "title": "Generated Title", "summary": "Generated summary of the transcript" }`,
                },
            ],
        });

        // Parse the JSON string returned from OpenAI
        const responseContent = completion.choices[0].message.content;

        // Try to parse the returned content as JSON
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(responseContent);
        } catch (jsonError) {
            logger.error("Error parsing the JSON response", jsonError);
            return;
        }

        // Ensure parsed response contains title and summary
        const { title, summary } = parsedResponse;
        if (!title || !summary) {
            logger.error("Invalid JSON structure returned. 'title' or 'summary' is missing.");
            return;
        }

        logger.info("Generated title and summary", { title, summary });
        logger.info("Updating Firestore with generated title and summary...");
        // Update Firestore with the generated title and summary
        await snap.ref.update({
            title: title,
            summary: summary,
        });

        logger.info("Successfully generated and updated transcript with title and summary.");
    } catch (error) {
        logger.error("Error generating summary and title", error);
    }
});