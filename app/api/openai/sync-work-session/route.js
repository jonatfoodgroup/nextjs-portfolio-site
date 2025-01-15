import { google } from "googleapis";
import admin from "firebase-admin";

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Initialize Google Calendar API client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // Use a refresh token for server-side API calls
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

// Helper: Calculate total task duration
const calculateTotalDuration = (tasks) => {
  const defaultDuration = 30; // Default to 30 minutes for tasks without a duration
  return tasks.reduce((total, task) => {
    const duration = task.estimatedDuration || defaultDuration;
    return total + duration;
  }, 0);
};

// Helper: Format task descriptions
const createWorkSessionDescription = (tasks) => {
  return tasks
    .map(
      (task, index) =>
        `${index + 1}. ${task.task} (${task.priority || "Low priority"})`
    )
    .join("\n");
};

// API Route: Sync Work Session
export async function POST(req) {
  try {
    const db = admin.firestore();
    const tasksRef = db.collection("tasks");

    // Fetch tasks labeled "Today"
    const todayTasksSnapshot = await tasksRef
      .where("timeframe", "==", "Today")
      .get();

    if (todayTasksSnapshot.empty) {
      return new Response(
        JSON.stringify({ message: "No tasks labeled 'Today'." }),
        { status: 400 }
      );
    }

    const todayTasks = todayTasksSnapshot.docs.map((doc) => doc.data());

    // Calculate total duration
    const totalDuration = calculateTotalDuration(todayTasks);

    // Set event start and end times
    const now = new Date();
    const endTime = new Date(now.getTime() + totalDuration * 60000);

    // Create calendar event
    const event = {
      summary: "Work Session",
      description: createWorkSessionDescription(todayTasks),
      start: {
        dateTime: now.toISOString(),
        timeZone: "America/New_York",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "America/New_York",
      },
    };

    const calendarEvent = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    return new Response(
      JSON.stringify({
        message: "Work session synced successfully!",
        eventId: calendarEvent.data.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error syncing work session:", error);
    return new Response(
      JSON.stringify({ message: "Failed to sync work session.", error }),
      { status: 500 }
    );
  }
}