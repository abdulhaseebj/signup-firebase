// // const sign = document.querySelector('.signs')
// // const log = document.querySelector('.log')

// // sign.addEventListener('click', () => {
// //     window.location = './signup.html'
// // })
// // log.addEventListener('click', () => {
// //     window.location = './login.html'
// // })


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


import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const btn = document.querySelector('.btn');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, show the logout button
        btn.style.display = 'block';
        const uid = user.uid;
        console.log(uid);
    } else {
        // No user is signed in, hide the logout button
        btn.style.display = 'none';
        window.location = 'login.html';
    }
});

const sign = document.querySelector('.signs');
const log = document.querySelector('.log');

sign.addEventListener('click', () => {
    window.location = './signup.html';
});

log.addEventListener('click', () => {
    window.location = './login.html';
});

btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('signout successful');
        window.location = 'login.html';
    }).catch((error) => {
        console.log('error ===>', error);
    });
});




