import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
        apiKey: "AIzaSyAL7zh7H-em_QHMYuqEs143WjbrpQy26FY",
        authDomain: "signup-form-a5576.firebaseapp.com",
        projectId: "signup-form-a5576",
        storageBucket: "signup-form-a5576.appspot.com",
        messagingSenderId: "927912731171",
        appId: "1:927912731171:web:128ca287dc2e4ef5054796"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
