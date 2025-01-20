import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { folderName, parentFolderId } = await request.json();

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON),
            scopes: ["https://www.googleapis.com/auth/drive"],
        });

        console.log('Creating folder:', folderName, 'in parent folder:', parentFolderId);
        

        const drive = google.drive({ version: "v3", auth });

        const folderMetadata = {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            parents: [parentFolderId], // Specify the parent folder
        };

        const folder = await drive.files.create({
            resource: folderMetadata,
            fields: "id",
        });

        return NextResponse.json({ folderId: folder.data.id });
    } catch (error) {
        console.error("Error creating Google Drive folder:", error);
        return NextResponse.json(
            { error: "Failed to create folder" },
            { status: 500 }
        );
    }
}