import { NextResponse } from 'next/server';
import webPush from 'web-push';
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

// Set VAPID details using your environment variables
webPush.setVapidDetails(
  'mailto:thetwosents@icloud.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,   // Public key from your .env file
  process.env.VAPID_PRIVATE_KEY   // Private key from your .env file
);

export async function POST(request) {
  try {
    // Extract data from the request
    const { subscription, userId } = await request.json();

    // Validate userId and subscription
    if (!userId || !subscription || !subscription.endpoint) {
      return NextResponse.json({ success: false, message: 'Invalid userId or subscription' }, { status: 400 });
    }

    // Reference to user's subscriptions in Firebase
    const subscriptionsRef = db.ref(`customers/${userId}/subscriptions`);

    // Check if the subscription already exists (to avoid duplicates)
    const existingSubscriptions = await subscriptionsRef.orderByChild('endpoint').equalTo(subscription.endpoint).once('value');
    
    if (existingSubscriptions.exists()) {
      console.log('Subscription already exists for this device');
    } else {
      // Save the subscription to the database
      await subscriptionsRef.push(subscription);
      console.log('New subscription saved:', subscription);
    }

    // Send an initial test push notification
    const payload = JSON.stringify({ title: 'Welcome!', body: 'You are subscribed.' });
    await webPush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true, message: 'Notification sent' });

  } catch (error) {
    console.error('Error handling subscription:', error);
    return NextResponse.json({ success: false, message: 'Failed to handle subscription' }, { status: 500 });
  }
}