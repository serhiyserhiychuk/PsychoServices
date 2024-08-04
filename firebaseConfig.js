import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBh2sV-xoKDVfLKcFBr1703AvG_pqp9K9U",
  authDomain: "psychoservices-2425f.firebaseapp.com",
  projectId: "psychoservices-2425f",
  storageBucket: "psychoservices-2425f.appspot.com",
  messagingSenderId: "456372329674",
  appId: "1:456372329674:web:3afcdba80e031d1d192833",
  measurementId: "G-938XFZBCLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
