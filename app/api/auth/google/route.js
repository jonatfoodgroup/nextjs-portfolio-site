import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const scopes = process.env.GOOGLE_SCOPES.split(" ");

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // Ensures refresh token is provided
    scope: scopes,
  });

  // Redirect the user to Google's OAuth page
  return NextResponse.redirect(authUrl);
}