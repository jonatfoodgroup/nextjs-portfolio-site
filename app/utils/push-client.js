"use client";
import jwt from 'jsonwebtoken';

export async function subscribeUserToPush() {
  try {
    const token = localStorage.getItem("local_token");
    if (!token) {
      console.error('User is not authenticated');
      return;
    }


    const userId = jwt.decode(token).sub;
    // Check if service workers and push are supported by the browser
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.error('Push messaging is not supported');
      return;
    }

    // Request notification permission
    const permissionResult = await Notification.requestPermission();
    if (permissionResult !== 'granted') {
      console.error('User denied push notification permission');
      return;
    }

    // Get service worker registration
    const registration = await navigator.serviceWorker.ready;

    // Subscribe the user to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true, // Always display notifications
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
    });

    console.log('User is subscribed:', subscription);

    // Send the subscription details to your server
    await sendSubscriptionToServer(subscription, userId);
  } catch (error) {
    console.error('Failed to subscribe the user: ', error);
  }
}

// Convert VAPID key from Base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function sendSubscriptionToServer(subscription, userId) {
  // Send subscription to your backend for storing or processing
  const response = await fetch('/api/save-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscription,
      userId,
    }),
  });

  if (!response.ok) {
    console.error('Failed to send subscription to server');
  }
}
