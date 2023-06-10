import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAi-7BqI8-9N6T4cBEBOVdyliCJRta9kaM",
  authDomain: "codingninjasbusybuy.firebaseapp.com",
  projectId: "codingninjasbusybuy",
  storageBucket: "codingninjasbusybuy.appspot.com",
  messagingSenderId: "121465374378",
  appId: "1:121465374378:web:0dccd28b2457fa5b6472d3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
