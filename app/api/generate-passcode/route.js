import { NextResponse } from 'next/server';
import crypto from 'crypto';
import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://drone-delivery-f1133-default-rtdb.firebaseio.com',
  });
}

const db = admin.database();
const PASSCODE_TTL = 5 * 60 * 1000; // 5 minutes

export async function POST(req) {
  const body = await req.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
  }

  // Generate the passcode
  const passcode = crypto.randomInt(100000, 999999).toString();

  // Store passcode with a createdAt timestamp in Firebase Realtime Database
  const passcodeRef = db.ref(`passcodes/${userId}`);
  await passcodeRef.set({
    passcode: passcode,
    createdAt: admin.database.ServerValue.TIMESTAMP,
  });

  // Logging the passcode stored
  console.log(`Passcode stored in Firebase for user ${userId}: ${passcode}`);

  // Simulate push notification
  await sendPushNotification(userId, passcode);

  return NextResponse.json({ success: true, message: 'Passcode generated and sent' });
}

async function sendPushNotification(userId, passcode) {
  // Your push notification logic here
  console.log(`Simulated sending passcode ${passcode} to user ${userId}`);
}