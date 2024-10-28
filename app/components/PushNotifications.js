"use client";
import React from "react";
import { subscribeUserToPush } from "../utils/push-client";
import SendNotifcationForm from "./SendNotificationForm";

const PushNotifications = () => {
    const handleSubscribe = async () => {
        try {
          const subscription = await subscribeUserToPush();
      
          if (subscription) {
            // Only show the success message if subscription is successful
            console.log('You are subscribed to push notifications!');
            // alert('You are subscribed to push notifications!');
          } else {
            throw new Error('Subscription object is null or undefined');
          }
        } catch (error) {
          console.error('Subscription failed:', error);
          // alert('Subscription failed. Check console for details.');
        }
      };
    return (
        <div>
            <h1>Push Notifications</h1>
            <button onClick={handleSubscribe}>Enable Push Notifications</button>

            <SendNotifcationForm />
        </div>
    );
}

export default PushNotifications;