import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector('.form')
const email = document.querySelector('.email')
const password = document.querySelector('.password')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(email.value);
    console.log(password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((res) => {
    // Signed in 
    const user = res.user;
    console.log(user);
    window.location = './home.html'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

    
})



















// // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// // import { auth } from "./config.js";



// // onAuthStateChanged(auth, (user) => {
// //     if (user) {

// //         const uid = user.uid;
// //         console.log(uid);

// //     } else {
// //         window.location = 'login.html'
// //     }
// // });


// // const btn = document.querySelector('.btn')

// // btn.addEventListener('click', () => {
// //     signOut(auth).then(() => {
// //         console.log('signout succses fil');
// //         window.location = 'login.html'
// //     }).catch((error) => {
// //         console.log('error ===>',  error);

//     })

// });





