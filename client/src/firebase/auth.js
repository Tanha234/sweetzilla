// src/firebase/auth.js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./firebase"; // Firebase initialization
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth();

export const registerUser = async (email, password, name, phone) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      phone: phone,
      isBanned: false, // or any other initial field
    });

    console.log("User registered and data saved to Firestore");

  } catch (error) {
    console.error("Error registering user:", error.message);
  }
};
