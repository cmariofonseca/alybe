import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRL9xkq_MePdvCDsEazxlVqGHOCRfA_4Q",
  appId: "1:981983808421:web:a513925c673b835bc6764c",
  authDomain: "alybe-9c315.firebaseapp.com",
  measurementId: "G-VS4Q8M7FSH",
  messagingSenderId: "981983808421",
  projectId: "alybe-9c315",
  storageBucket: "alybe-9c315.firebasestorage.app",
};

console.log(getApps());

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
