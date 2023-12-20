import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDewBi7MR-GW5fKRWAQij5nVTSOFdnHrv8",
  authDomain: "fir-firebase-615a4.firebaseapp.com",
  projectId: "fir-firebase-615a4",
  storageBucket: "fir-firebase-615a4.appspot.com",
  messagingSenderId: "665407819169",
  appId: "1:665407819169:web:766d32dbdab2a218994fe0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const database = getFirestore(app);
export const auth = getAuth(app);