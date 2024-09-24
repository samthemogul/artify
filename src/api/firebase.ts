
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb4zcJjRputLeD3anbSjIr0Xn5_qPcjUE",
  authDomain: "artify-b41fe.firebaseapp.com",
  projectId: "artify-b41fe",
  storageBucket: "artify-b41fe.appspot.com",
  messagingSenderId: "400952453429",
  appId: "1:400952453429:web:5f0e343b5dd50e3f49847c"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)