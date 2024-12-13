import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://drone-delivery-f1133-default-rtdb.firebaseio.com',
  });
}

const db = admin.firestore();

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, client, blocks } = body;

    // Validate request
    if (!title || !client || !blocks) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    // Create a new proposal in Firestore
    const proposalRef = await db.collection("proposals").add({
      title,
      client,
      blocks,
      status: "Draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ id: proposalRef.id, message: "Proposal created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating proposal:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}