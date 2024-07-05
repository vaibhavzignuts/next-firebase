// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCH31aXP0SJqF5nRcF8UEw_du5vot-zkcs",
    authDomain: "expense-tracker-acc25.firebaseapp.com",
    projectId: "expense-tracker-acc25",
    storageBucket: "expense-tracker-acc25.appspot.com",
    messagingSenderId: "330948549986",
    appId: "1:330948549986:web:911967eaa0e72bb6ef603b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db } 