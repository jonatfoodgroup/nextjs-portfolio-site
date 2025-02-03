import { NextResponse } from "next/server";
import admin from "firebase-admin";

// Ensure Firebase Admin is only initialized once
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://drone-delivery-f1133-default-rtdb.firebaseio.com",
  });
}

// Firestore Reference
const db = admin.firestore();

/**
 * Handles POST requests to create a new transcript request.
 */
export async function POST(req) {
  try {
    const { prompts, clientId, topic } = await req.json();

    if (!prompts || !clientId) {
      return NextResponse.json({ error: "Missing prompts or clientId" }, { status: 400 });
    }

    // Add request to Firestore
    const docRef = await db.collection("requests").add({
      client: clientId, // HubSpot ID
      prompts,
      topic,
      responses: [],
      status: "pending",
      createdAt: new Date().toISOString(), // Basic timestamp
    });

    return NextResponse.json({ id: docRef.id, message: "Request created", url: `https://strongstart.digital/requests/${docRef.id}` }, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
  }
}