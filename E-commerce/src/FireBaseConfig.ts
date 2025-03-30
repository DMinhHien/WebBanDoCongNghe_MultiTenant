import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_-expS6SNBxaFEn15BIt64hp6az1Oa9c",
  authDomain: "le-gallerie.firebaseapp.com",
  projectId: "le-gallerie",
  storageBucket: "le-gallerie.appspot.com",
  messagingSenderId: "807957578621",
  appId: "1:807957578621:web:48159df5e465565d3f0214",
  measurementId: "G-1ZKGW4LES5"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);