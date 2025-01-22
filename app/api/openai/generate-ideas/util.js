import admin from 'firebase-admin';
import { OpenAI } from 'openai';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://drone-delivery-f1133-default-rtdb.firebaseio.com',
    });
    
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error.message);
    throw new Error('Failed to initialize Firebase Admin.');
  }
}

// Initialize OpenAI Client
let openAIClient;
try {
  openAIClient = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });
  console.log('OpenAI client initialized successfully.');
} catch (error) {
  console.error('Error initializing OpenAI client:', error.message);
  throw new Error('Failed to initialize OpenAI client.');
}

export { admin, openAIClient };