// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1T5rwau2XOz8rJ9uV0HUxKgmWwNYKc7w",
  authDomain: "himalayan-recipes.firebaseapp.com",
  projectId: "himalayan-recipes",
  storageBucket: "himalayan-recipes.appspot.com",
  messagingSenderId: "120387756716",
  appId: "1:120387756716:web:e852c849ef56c96164f509",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
