import admin from 'firebase-admin';
import { NextResponse } from 'next/server';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://drone-delivery-f1133-default-rtdb.firebaseio.com',
  });
}

// Firestore database reference
const db = admin.firestore();

// POST handler for adding a goal
export async function POST(req) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { description, deadline, hubspotId } = body;

    // Validate required fields
    if (!description || !hubspotId) {
      return NextResponse.json(
        { error: 'Missing required fields: description or hubspotId' },
        { status: 400 }
      );
    }

    // Construct new goal object
    const newGoal = {
      description,
      deadline: deadline || null, // Optional
      hubspotId,
      createdAt: admin.firestore.Timestamp.now(),
    };

    // Save to Firestore
    const docRef = await db.collection('goals').add(newGoal);

    // Return the created goal
    return NextResponse.json({ id: docRef.id, ...newGoal }, { status: 201 });
  } catch (error) {
    console.error('Error adding goal:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}