// script.js
// Initialize Firebase using the config provided
const firebaseConfig = {
  apiKey: "AIzaSyCPGhwa3eBO5DlWWIe14YGYCPdw9tZ2NIQ",
  authDomain: "prueba-6cfd1.firebaseapp.com",
  databaseURL: "https://prueba-6cfd1-default-rtdb.firebaseio.com",
  projectId: "prueba-6cfd1",
  storageBucket: "prueba-6cfd1.appspot.com",
  messagingSenderId: "69158231501",
  appId: "1:69158231501:web:58e2adb020fa509c197884",
  measurementId: "G-Y9GLTWEMXK",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
