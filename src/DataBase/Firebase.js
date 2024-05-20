import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSsbtnX_-dBSH0A31_ddmY8HG8cfYSkLk",
  authDomain: "mealmentor-ec306.firebaseapp.com",
  projectId: "mealmentor-ec306",
  storageBucket: "mealmentor-ec306.appspot.com",
  messagingSenderId: "429332334542",
  appId: "1:429332334542:web:8f7449116f99f7ffb20d9f",
};

const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);
export const dataBaseStorage = getStorage();
