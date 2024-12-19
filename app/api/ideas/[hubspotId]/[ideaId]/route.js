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

// --------------------- GET: Fetch a Specific Idea ---------------------
export async function GET(req, { params }) {
  const { hubspotId, ideaId } = params; // Extract IDs from the route

  try {
    const ideaRef = db
      .collection("companies")
      .doc(hubspotId)
      .collection("ideas")
      .doc(ideaId);

    const ideaSnap = await ideaRef.get();

    if (!ideaSnap.exists) {
      return Response.json({ error: "Idea not found" }, { status: 404 });
    }

    return Response.json({ id: ideaSnap.id, ...ideaSnap.data() }, { status: 200 });
  } catch (error) {
    console.error("Error fetching idea:", error);
    return Response.json({ error: "Failed to fetch idea" }, { status: 500 });
  }
}

// --------------------- PUT: Update a Specific Idea ---------------------
export async function PUT(req, { params }) {
  const { hubspotId, ideaId } = params;
  const { content,title } = await req.json();

  if (!content || !title) {
    return Response.json({ error: "Content is required." }, { status: 400 });
  }

  try {
    const ideaRef = db
      .collection("companies")
      .doc(hubspotId)
      .collection("ideas")
      .doc(ideaId);

    await ideaRef.update({
      title,
      content,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return Response.json({ message: "Idea updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating idea:", error);
    return Response.json({ error: "Failed to update idea" }, { status: 500 });
  }
}