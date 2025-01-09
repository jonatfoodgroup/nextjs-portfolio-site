import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAaoXdPdJIaAsCyBi7xghfYE4u9PgQ85w",
  authDomain: "drone-delivery-f1133.firebaseapp.com",
  databaseURL: "https://drone-delivery-f1133-default-rtdb.firebaseio.com",
  projectId: "drone-delivery-f1133",
  storageBucket: "drone-delivery-f1133.appspot.com",
  messagingSenderId: "98687407299",
  appId: "1:98687407299:web:14915a356ed83dd4297e76",
  measurementId: "G-EKDD9ZHN0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestore = getFirestore(app);

export { db, firestore }; 