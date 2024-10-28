import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;
const PASSCODE_TTL = 5 * 60 * 1000; // 5 minutes

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://drone-delivery-f1133-default-rtdb.firebaseio.com',
  });
}

const db = admin.database();

export async function POST(req) {
  const body = await req.json();
  const { userId, passcode } = body;

  if (!userId || !passcode) {
    return NextResponse.json({ success: false, message: 'User ID and passcode are required' }, { status: 400 });
  }

  // Retrieve the passcode data from Firebase
  const passcodeRef = db.ref(`passcodes/${userId}`);
  const snapshot = await passcodeRef.once('value');
  const storedPasscodeData = snapshot.val();

  // Logging for debugging
  console.log(`Stored passcode data for user ${userId}:`, storedPasscodeData);

  if (!storedPasscodeData) {
    return NextResponse.json({ success: false, message: 'Passcode has expired or not found' }, { status: 401 });
  }

  const { passcode: storedPasscode, createdAt } = storedPasscodeData;
  const now = Date.now();

  // Check if the passcode has expired
  if (now - createdAt > PASSCODE_TTL) {
    await passcodeRef.remove(); // Remove the expired passcode
    return NextResponse.json({ success: false, message: 'Passcode has expired' }, { status: 401 });
  }

  // Check if the entered passcode matches the stored passcode
  if (storedPasscode !== passcode) {
    return NextResponse.json({ success: false, message: 'Invalid passcode' }, { status: 401 });
  }

  // Generate JWT token after successful verification
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });

  // Clear the passcode from Firebase after successful login
  await passcodeRef.remove();

  return NextResponse.json({ success: true, token });
}