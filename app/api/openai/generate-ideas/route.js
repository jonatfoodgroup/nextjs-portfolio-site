import { admin, openAIClient } from './util.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse the request body
        const { company_context, platforms, hubspotId } = await req.json();

        // Validate input
        if (!company_context) {
            return NextResponse.json(
                { error: 'Company context is required.' },
                { status: 400 }
            );
        }

        if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
            return NextResponse.json(
                { error: 'At least one platform is required.' },
                { status: 400 }
            );
        }

        if (!hubspotId) {
            return NextResponse.json(
                { error: 'HubSpot company ID is required.' },
                { status: 400 }
            );
        }

        // Define the desired structure using OpenAI's functions
        const functions = [
            {
                name: 'generate_campaign_proposal',
                description: 'Generate a marketing campaign proposal for a company.',
                parameters: {
                    type: 'object',
                    properties: {
                        blogs: {
                            type: 'array',
                            description: 'Three blog post ideas with brief descriptions.',
                            items: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string', description: 'Title of the blog post.' },
                                    description: { type: 'string', description: 'Brief description of the blog post.' },
                                },
                                required: ['title', 'description'],
                            },
                        },
                        socialPosts: {
                            type: 'array',
                            description: 'Five social media post ideas, including platforms.',
                            items: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string', description: 'Title of the post.' },
                                    description: { type: 'string', description: 'Description of the post.' },
                                    platform: { type: 'string', description: 'Social media platform for the post.', enum: platforms },
                                },
                                required: ['title', 'description', 'platform'],
                            },
                        },
                        emailCampaign: {
                            type: 'object',
                            description: 'An email campaign outline based on the context.',
                            properties: {
                                title: { type: 'string', description: 'Title of the email campaign.' },
                                description: { type: 'string', description: 'Description of the email and its benefits for the objectives.' },
                            },
                            required: ['title', 'description'],
                        },
                    },
                    required: ['blogs', 'socialPosts', 'emailCampaign'],
                },
            },
        ];

        // Call OpenAI API
        const openAIResponse = await openAIClient.chat.completions.create({
            model: 'gpt-4-0613', // Use GPT-4 with functions capability
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI assistant specializing in marketing strategies.',
                },
                {
                    role: 'user',
                    content: `Based on the following company context, generate a campaign proposal:\n\n${company_context} for ${platforms.join(', ')}.`,
                },
            ],
            functions,
            function_call: { name: 'generate_campaign_proposal' }, // Explicitly call the function
        });

        // Extract the structured response
        const structuredResponse = openAIResponse.choices[0]?.message?.function_call?.arguments;

        if (!structuredResponse) {
            return NextResponse.json(
                { error: 'Failed to generate structured ideas from OpenAI.' },
                { status: 500 }
            );
        }

        // Parse structured response
        const ideas = JSON.parse(structuredResponse);

        // Save ideas to Firestore
        const db = admin.firestore();
        const contentCollection = db.collection('content');

        // Flatten and save each idea
        const contentPromises = [];

        // Save blogs
        if (ideas.blogs) {
            ideas.blogs.forEach((blog) => {
                contentPromises.push(
                    contentCollection.add({
                        hubspotId,
                        type: 'article',
                        stage: 'idea',
                        title: blog.title,
                        description: blog.description,
                        createdAt: new Date().toISOString(),
                    })
                );
            });
        }

        // Save social posts
        if (ideas.socialPosts) {
            ideas.socialPosts.forEach((post) => {
                contentPromises.push(
                    contentCollection.add({
                        hubspotId,
                        type: 'social',
                        stage: 'idea',
                        title: post.title,
                        description: post.description,
                        platform: post.platform,
                        createdAt: new Date().toISOString(),
                    })
                );
            });
        }

        // Save email campaign
        if (ideas.emailCampaign) {
            contentPromises.push(
                contentCollection.add({
                    hubspotId,
                    type: 'email',
                    stage: 'idea',
                    title: ideas.emailCampaign.title,
                    description: ideas.emailCampaign.description,
                    createdAt: new Date().toISOString(),
                })
            );
        }

        // Wait for all writes to complete
        await Promise.all(contentPromises);

        // Return structured ideas and save status
        return NextResponse.json({ ideas, message: 'Content saved successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error in POST /generate-ideas:', error.message);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}