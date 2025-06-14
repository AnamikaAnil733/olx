import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API,
    authDomain: "olx-clone-91105.firebaseapp.com",
    projectId: "olx-clone-91105",
    storageBucket: "olx-clone-91105.firebasestorage.app",
    messagingSenderId: "771006174706",
    appId: "1:771006174706:web:20a916bcfeb82f2bc0076b",
    measurementId: "G-4RWR2BLDLL"
  };

 export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app); 