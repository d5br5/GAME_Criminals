import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDJctgDgrULqYlGdO7QHJAGR3BgrauPYsA",
    authDomain: "team6-4b53d.firebaseapp.com",
    projectId: "team6-4b53d",
    storageBucket: "team6-4b53d.appspot.com",
    messagingSenderId: "679952358247",
    appId: "1:679952358247:web:3f2a0345b8436997a2edc2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
export const storageService = firebase.storage();
export default authService;