import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const form = document.querySelector('.form')
const title = document.querySelector('.title')
const discrption = document.querySelector('.discription')
const card = document.querySelector('.card')
const data = document.querySelector('.data')


// user login or logout function
onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        console.log(uid);

    } else {
        window.location = 'login.html'
    }
});

// signout function
const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('signout succses fil');
        window.location = 'index.html'
    }).catch((error) => {
        console.log('error ===>', error);

    })

});


//  get data from firestone

const arr = [];
data.addEventListener('click', async function getDataFromFirestore() {
    arr.length = 0;
    const q = query(collection(db, "posts"), orderBy('postDate', 'desc'));
    const querySnapshot = await getDocs(q);
    // const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data())
    });
    console.log(arr);
    arr.map((items) => {
        card.innerHTML += `
            <div class="bg-white my-[10px] mx-[400px] rounded-lg">
                <div class="px-5 py-4">
                    <p><span class="h4">Title:</span>${items.Title}</p>
                    <p><span class="h4">Description:</span>${items.Description}</p>
                </div>

            </div>`


    })
})
// async function getDataFromFirestore() {
//     arr.length = 0;
//     const q = query(collection(db, "posts"), orderBy('postDate', 'desc'));
//     const querySnapshot = await getDocs(q);
//     // const querySnapshot = await getDocs(collection(db, "posts"));
//     querySnapshot.forEach((doc) => {
//         arr.push(doc.data())
//     });
//     console.log(arr);
//     arr.map((items) => {
//         card.innerHTML += `
//             <div class="card mt-2 ">
//                 <div class="card-body">
//                     <p><span class="h4">Title:</span>${items.Title}</p>
//                     <p><span class="h4">Description:</span>${items.Description}</p>
//                 </div>
//             </div>`


//     })
// }
// getDataFromFirestore()

// data post on firestone

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    card.innerHTML = ''
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            Title: title.value,
            Description: discrption.value,
            Uid: auth.currentUser.uid,
            postDate: Timestamp.fromDate(new Date()),
        });
        console.log("Document written with ID: ", docRef.id);
        getDataFromFirestore()
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    title.value = ''
    discrption.value = ''
})

