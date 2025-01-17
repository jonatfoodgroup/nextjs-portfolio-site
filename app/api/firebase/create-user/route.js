import admin from 'firebase-admin';
import { NextResponse } from "next/server";

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-firebase-database-url',
  });
}

const db = admin.firestore();

export async function POST(req) {
  try {
    const { id, username, avatar, email } = await req.json();

    if (!id || !username) {
      return NextResponse.json({ error: "Invalid request. 'id' and 'username' are required." }, { status: 400 });
    }

    // Upsert user into the Firestore database
    await db.collection('users').doc(id).set(
      {
        id,
        username,
        avatar,
        email,
        updatedAt: new Date().toISOString(),
      },
      { merge: true } // Merge to avoid overwriting existing fields
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}