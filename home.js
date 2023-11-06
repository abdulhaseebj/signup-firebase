import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



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
        console.log('error ===>', error);

    })

});

const form = document.querySelector('.form')
const title = document.querySelector('.title')
const discrption = document.querySelector('.discription')
const card = document.querySelector('.card')
const data = document.querySelector('.data')



const arr = [];
data.addEventListener('click', async function getDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data())
    });
    arr.map((items) => {
        card.innerHTML += `
        <div class="">
        <div class="">
            <p><span class="h4">Title:</span>${items.Title}</p>
            <p><span class="h4">Description:</span>${items.Description}</p>
        </div>
    </div>`

    })


})
// async function getDataFromFirestore() {
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     querySnapshot.forEach((doc) => {
//         arr.push(doc.data())
//     });
//     arr.map((items) => {
//         card.innerHTML += `
//         <div class="">
//         <div class="">
//             <p><span class="h4">Title:</span>${items.Title}</p>
//             <p><span class="h4">Description:</span>${items.Description}</p>
//         </div>
//     </div>`

//     })


// }
// getDataFromFirestore()

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    card.innerHTML = ''
    // console.log(title.value);
    // console.log(discrption.value);
    // console.log(auth.currentUser.uid);
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            Title: title.value,
            Description: discrption.value,
            Uid: auth.currentUser.uid
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    title.value = ''
    discrption.value = ''


})