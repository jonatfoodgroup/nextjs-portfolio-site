import admin from "firebase-admin";

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://drone-delivery-f1133-default-rtdb.firebaseio.com",
  });
}

// Reference to Firestore
const db = admin.firestore();

// --------------------- CREATE NEW IDEA ---------------------
export async function POST(req) {
    const { title,content } = await req.json();
  
    try {
      const newIdeaRef = db.collection("ideas").doc(); // Auto-generate ID
  
      await newIdeaRef.set({
        title,
        content,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      return Response.json({ message: "New idea created!", id: newIdeaRef.id }, { status: 201 });
    } catch (error) {
      console.error("Error creating idea:", error);
      return Response.json({ error: "Failed to create idea" }, { status: 500 });
    }
  }