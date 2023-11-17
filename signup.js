import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const form = document.querySelector('.form');
const name = document.querySelector('.userName');
const email = document.querySelector('.email');
const password = document.querySelector('.password');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(email.value);
    // console.log(password.value);
    // console.log(name.value);
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((res) => {
            const user = res.user;
            console.log(user);
            addDoc(collection(db, "users"), {
                name: name.value,
                email: email.value,
                uid: user.uid,
            }).then((res) => {
                console.log(res);
                window.location = './home.html'
            }).catch((err) => {
                console.log(err);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})