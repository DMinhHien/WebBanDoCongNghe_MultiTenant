import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEnQxAyFT6vBVYiOrnSxRZhDudHDXeXpU",
  authDomain: "webbandocongnghe-ad282.firebaseapp.com",
  databaseURL: "https://webbandocongnghe-ad282-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webbandocongnghe-ad282",
  storageBucket: "webbandocongnghe-ad282.firebasestorage.app",
  messagingSenderId: "128230412321",
  appId: "1:128230412321:web:44d577849ca91986bad360",
  measurementId: "G-HVR5S3JH05"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);