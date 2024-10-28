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
  const { userId, title, body } = await request.json();

  try {
    // Lookup user and get the subscriptions
    const ref = db.ref(`customers/${userId}/subscriptions`);
    const snapshot = await ref.once('value');
    const subscriptions = snapshot.val();

    if (!subscriptions) {
      console.error('No subscriptions found for user:', userId);
      return NextResponse.error(new Error('No subscriptions found'));
    }

    // Loop over each subscription and send notification
    const failedSubscriptions = [];
    const payload = JSON.stringify({ title: title, body: body });

    // Send notifications asynchronously
    const sendNotifications = Object.entries(subscriptions).map(async ([key, subscription]) => {
      try {
        await webPush.sendNotification(subscription, payload);
        console.log(`Notification sent to subscription: ${key}`);
      } catch (error) {
        console.error(`Failed to send notification to subscription: ${key}`, error);

        // Check if error is due to an invalid subscription and mark for deletion
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.log(`Subscription no longer valid, removing subscription: ${key}`);
          failedSubscriptions.push(key); // Collect failed subscription keys for deletion
        }
      }
    });

    // Wait for all notifications to be sent
    await Promise.all(sendNotifications);

    // Remove invalid subscriptions from Firebase
    if (failedSubscriptions.length > 0) {
      console.log(`Cleaning up invalid subscriptions: ${failedSubscriptions.join(', ')}`);
      for (const subKey of failedSubscriptions) {
        await ref.child(subKey).remove();
      }
    }

    return NextResponse.json({ message: 'Notifications processed' });

  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.error(new Error('Failed to send notifications'));
  }
}