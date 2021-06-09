import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAenqDIgQ7lK6GU0n8oVHqkMwdZX3yAyf4",
    authDomain: "team6-ce590.firebaseapp.com",
    projectId: "team6-ce590",
    storageBucket: "team6-ce590.appspot.com",
    messagingSenderId: "394547411819",
    appId: "1:394547411819:web:4450cab46dfb2c3006ea2e",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);