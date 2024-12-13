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
    const { name, industry, email, phone, address, contacts } = body;

    // Validate input
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400 }
      );
    }

    // Create client document in Firestore
    const clientRef = await db.collection("clients").add({
      name,
      industry,
      email,
      phone,
      address,
      contacts: contacts || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ id: clientRef.id, message: "Client created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating client:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}