import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";



onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        console.log(uid);

    } else {
        window.location = 'login.html'
    }
});


const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('signout succses fil');
        window.location = 'index.html'
    }).catch((error) => {
        console.log('error ===>',  error);

    })

});