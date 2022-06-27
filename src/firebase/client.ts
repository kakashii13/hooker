import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyBj2Et1mKxi8KLVqsofGiQsryEfILn-M",
  authDomain: "hooker-254b4.firebaseapp.com",
  projectId: "hooker-254b4",
  storageBucket: "hooker-254b4.appspot.com",
  messagingSenderId: "311734022539",
  appId: "1:311734022539:web:5499f9fa5d390aa364bf8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
