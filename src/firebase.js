// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEZINBqO3qcp4nvOsIfYkxMQjr7NANrGQ",
  authDomain: "tmdb-website.firebaseapp.com",
  projectId: "tmdb-website",
  storageBucket: "tmdb-website.appspot.com",
  messagingSenderId: "866445488826",
  appId: "1:866445488826:web:600c51b13d668824904883",
  measurementId: "G-EW6D4E330J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const analytics = getAnalytics(app);

export {app,auth,analytics}