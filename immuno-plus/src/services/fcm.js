// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDj5c5jUJ0iMh4q3oTytLJii1ujM40tP0",
  authDomain: "immunoplus-40703.firebaseapp.com",
  projectId: "immunoplus-40703",
  storageBucket: "immunoplus-40703.firebasestorage.app",
  messagingSenderId: "575892805565",
  appId: "1:575892805565:web:a08e3545eb6c42d4b864d4",
  measurementId: "G-KNFWL14W70"
};

// Initialize Firebase
let app = null;
let analytics = null;

const initFirebase = () => {
  if (!app || !analytics) {
    try {
      app = app || initializeApp(firebaseConfig);
      analytics = getAnalytics(app);           
    } catch (error) {
      console.warn("Failed to load firebase: ", error);
    }
  }
};

// 1. Trigger immediately if the user loads the app while already online
if (navigator.onLine) {
  initFirebase();
}

// 2. Trigger if the user starts offline and later regains connection
window.addEventListener("online", () => {
  console.log("Internet connection restored.");
  initFirebase();
});

// 3. Nullify analytics immediately when connection drops to prevent errors
window.addEventListener("offline", () => {
  console.log("Internet connection lost. Disabling analytics.");
  analytics = null;
});

export default analytics;
