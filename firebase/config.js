// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_PUBLIC_DATABASE_URL,
  projectId: process.env.FIREBASE_PUBLIC_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_PUBLIC_APP_ID,
  measurementId: process.env.FIREBASE_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
