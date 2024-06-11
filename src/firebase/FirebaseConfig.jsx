import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCemyG9R502R_a8PjZmYV1w1b-ElsMqivk",
    authDomain: "ecommerce-93f12.firebaseapp.com",
    projectId: "ecommerce-93f12",
    storageBucket: "ecommerce-93f12.appspot.com",
    messagingSenderId: "143230884129",
    appId: "1:143230884129:web:ac78515dba5e9e8d3dc660"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage();
export {fireDb,auth, storage } ;