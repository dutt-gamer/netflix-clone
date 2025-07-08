// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHXpjqFdt-xmJxwumJYfa0UhPIszn45kg",
  authDomain: "netflixgpt-7d118.firebaseapp.com",
  projectId: "netflixgpt-7d118",
  storageBucket: "netflixgpt-7d118.firebasestorage.app",
  messagingSenderId: "929801606924",
  appId: "1:929801606924:web:0376af9185f2dbcbd61b29",
  measurementId: "G-W2J9THSBWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth();