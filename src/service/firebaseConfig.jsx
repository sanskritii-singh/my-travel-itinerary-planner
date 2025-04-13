// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "itnify-b53c8.firebaseapp.com",
  projectId: "itnify-b53c8",
  storageBucket: "itnify-b53c8.firebasestorage.app",
  messagingSenderId: "361035491078",
  appId: "1:361035491078:web:f04f0e0e6b5df888972087"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);