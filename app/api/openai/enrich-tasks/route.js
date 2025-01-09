import admin from 'firebase-admin';
import openai from 'openai';
import { NextResponse } from 'next/server';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://drone-delivery-f1133-default-rtdb.firebaseio.com',
  });
}

// Initialize OpenAI client
const client = new openai.OpenAI({
    apiKey:process.env.OPEN_AI_API_KEY
});


async function categorizeTask(description) {
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a task categorization assistant.' },
        { role: 'user', content: `Categorize the following task into one of these categories: Research, Execution, Planning, Creation, or Automation/Development. Return only the category name as a single word.\n\nTask: ${description}` },
      ],
      max_tokens: 10,
    });
  
    return response.choices[0].message.content.trim();
  }

  async function assignPriority(description) {
    if (description.toLowerCase().includes("i need")) {
      return "high";
    } else if (description.toLowerCase().includes("i want")) {
      return "medium";
    }
    return "low";
  }

export async function GET() {
    try {
      const db = admin.firestore();
      const tasksRef = db.collection('tasks');
      const snapshot = await tasksRef.get();
  
      // Filter for uncategorized tasks (missing or null category)
      const uncategorizedTasks = snapshot.docs.filter((doc) => !doc.data().priority);
  
      if (uncategorizedTasks.length === 0) {
        return NextResponse.json({
          message: 'No uncategorized tasks found.',
          processedTasks: 0,
        });
      }
  
      const tasksToUpdate = [];
      const failedTasks = [];
  
      for (const doc of uncategorizedTasks) {
        try {
          const task = doc.data();
          const category = await categorizeTask(task.task); // Assuming 'task' contains the description
          const priority = await assignPriority(task.task);
          tasksToUpdate.push({ id: doc.id, category, priority });

          console.log(`Task categorized: ${task.task} -> ${category}`);
        } catch (taskError) {
          failedTasks.push({ id: doc.id, error: taskError.message });
        }
      }
  
      if (tasksToUpdate.length > 0) {
        const batch = db.batch();
        tasksToUpdate.forEach((task) => {
          const taskRef = tasksRef.doc(task.id);
          batch.update(taskRef, { category: task.category, priority: task.priority });
        });
        await batch.commit();
      }
  
      return NextResponse.json({
        message: failedTasks.length
          ? 'Partial success: Some tasks enriched, but errors occurred.'
          : 'Tasks enriched successfully!',
        processedTasks: tasksToUpdate.length,
        failedTasks: failedTasks.length ? failedTasks : null,
      });
    } catch (error) {
      console.error('Error enriching tasks:', error);
      return NextResponse.json(
        { error: 'Error enriching tasks.', details: error.message },
        { status: 500 }
      );
    }
  }