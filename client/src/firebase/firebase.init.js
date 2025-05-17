import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu6BriNkHqY2ZwucWEGh2o7Ju_-ORan1k",
  authDomain: "cakezilla-86e16.firebaseapp.com",
  projectId: "cakezilla-86e16",
  storageBucket: "cakezilla-86e16.appspot.com",  // Corrected this line
  messagingSenderId: "181224100644",
  appId: "1:181224100644:web:d538d3a54a99bcf4dc99b1",
  measurementId: "G-MPE94CDE0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export { db };  
