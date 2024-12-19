import admin from "firebase-admin";

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://drone-delivery-f1133-default-rtdb.firebaseio.com",
  });
}

const db = admin.firestore();

// --------------------- GET: Fetch All Ideas for a HubSpot ID ---------------------
export async function GET(req, { params }) {
  const { hubspotId } = params; // Extract HubSpot ID from the route

  try {
    const ideasSnapshot = await db
      .collection("companies")
      .doc(hubspotId)
      .collection("ideas")
      .orderBy("createdAt", "desc") // Optional: Order by newest first
      .get();

    const ideas = ideasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json({ ideas }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return Response.json({ error: "Failed to fetch ideas" }, { status: 500 });
  }
}

// --------------------- POST: Add a New Idea ---------------------
export async function POST(req, { params }) {
  const { hubspotId } = params; // Extract HubSpot ID from the route
  const { content,title } = await req.json();

  if (!content || !title) {
    return Response.json({ error: "Content is required." }, { status: 400 });
  }

  try {
    const ideasRef = db
      .collection("companies")
      .doc(hubspotId)
      .collection("ideas");

    const newIdeaRef = await ideasRef.add({
      title,
      content,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return Response.json(
      { message: "Idea created successfully!", id: newIdeaRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating idea:", error);
    return Response.json({ error: "Failed to create idea" }, { status: 500 });
  }
}