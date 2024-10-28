"use client";
import { useState } from "react";

export default function SendNotificationForm({
    customerId = null,
}) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/send-notification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: customerId, title, body }),
            });

            if (response.ok) {
                alert("Notification sent!");
            } else {
                alert("Failed to send notification");
            }
        } catch (error) {
            console.error("Error sending notification:", error);
            alert("Failed to send notification");
        }
    }

    if (!customerId) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border border-gray-200 rounded">
            <h2 className="text-lg font-semibold">Send Notification</h2>
            <label className="block">
                Title:
                <input
                    className="block w-full mt-1 border border-gray-200 py-2 px-2"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="block mt-4">
                Body:
                <input
                    className="block w-full mt-1 border border-gray-200 py-2 px-2"
                    type="text" value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
            <button 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            type="submit">Send Notification</button>
        </form>
    );
}