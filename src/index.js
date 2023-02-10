// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, collection, getDocs, getDoc } from 'firebase/firestore';


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);




//Detect auth state:
onAuthStateChanged (auth, user => {
    if(user == null) {
        console.log('logged in!');

    }else {
        console.log('No user');
    }
});
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.fire_base_apikey,
  authDomain: "cineme-76729.firebaseapp.com",
  projectId: "cineme-76729",
  storageBucket: "cineme-76729.appspot.com",
  messagingSenderId: "618740383335",
  appId: "1:618740383335:web:08591ae87e3fac16bb5ec2",
  measurementId: "G-8K9SD7NWHD"
};

