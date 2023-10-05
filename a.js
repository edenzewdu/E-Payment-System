// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8mItXSr5tNsGnwwyXNX6T3dR_fs0KE1M",
  authDomain: "epayment-system.firebaseapp.com",
  projectId: "epayment-system",
  storageBucket: "epayment-system.appspot.com",
  messagingSenderId: "1047370312222",
  appId: "1:1047370312222:web:b7107d6bcb51fac60cdc0f",
  measurementId: "G-6FFTTEJHGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);