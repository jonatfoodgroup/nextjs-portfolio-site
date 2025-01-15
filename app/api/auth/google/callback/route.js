import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code"); // Get the authorization code from the query params

  try {
    // Exchange the authorization code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Log or securely store the tokens
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);

    // Optionally, store tokens in a database for future use
    // ...

    return NextResponse.json({
      message: "Successfully authenticated!",
      tokens,
    });
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.json(
      { error: "Failed to exchange authorization code for tokens." },
      { status: 500 }
    );
  }
}