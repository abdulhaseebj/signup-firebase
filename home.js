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
async function getDataFromFirestore() {
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
            <div class="card mt-2 ">
                <div class="card-body">
                    <p><span class="h4">Title:</span>${items.Title}</p>
                    <p><span class="h4">Description:</span>${items.Description}</p>
                    <button type="button" id="delete" class="btn btn-danger">Delete</button>
                    <button type="button" id="update" class="btn btn-info">Edit</button>
                </div>
            </div>`

        const del = document.querySelectorAll('#delete')
        const upd = document.querySelectorAll('.#update')


        del.forEach((btn) => {
            console.log(btn);
        })


    })
}
getDataFromFirestore()

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

//  import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// import { auth, db } from "./config.js";
// import { collection, addDoc, getDocs, Timestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


// const form = document.querySelector('#form');
// const title = document.querySelector('#title');
// const description = document.querySelector('#description');
// const card = document.querySelector('#card');


// //user login or logout function

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const uid = user.uid;
//         console.log(uid);
//     } else {
//         window.location = 'index.html'
//     }
// });


// //logout function

// const logout = document.querySelector('#logout-btn');

// logout.addEventListener('click', () => {
//     signOut(auth).then(() => {
//         console.log('logout successfully');
//         window.location = 'index.html'
//     }).catch((error) => {
//         console.log(error);
//     });
// })



// //get data from firestore

// let arr = []
// async function getDataFromFirestore() {
//     arr.length = 0;
//     const q = query(collection(db, "posts"), orderBy('postDate', 'desc'));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         arr.push({ ...doc.data(), docId: doc.id });
//     });
//     console.log(arr);
//     arr.map((item) => {
//         card.innerHTML += `
//         <div class="card mt-2">
//         <div class="card-body">
//             <p><span class="h4">Title:</span>${item.title}</p>
//             <p><span class="h4">Description:</span>${item.description}</p>
//             <button type="button" id="delete" class="btn btn-danger">Delete</button>
//             <button type="button" id="update" class="btn btn-info">Edit</button>
//         </div>
//     </div>`
//     })

//     const del = document.querySelectorAll('#delete');
//     const upd = document.querySelectorAll('#update');

//     del.forEach((btn , index) => {
//         btn.addEventListener('click', () => {
//             console.log('delete called' , arr[index]);
//         })
//     })
//     upd.forEach((btn , index) => {
//         btn.addEventListener('click', () => {
//             console.log('update called' , arr[index]);
//         })
//     })


// }
// getDataFromFirestore()


// //post data on firestore

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     card.innerHTML = ''
//     try {
//         const docRef = await addDoc(collection(db, "posts"), {
//             title: title.value,
//             description: description.value,
//             uid: auth.currentUser.uid,
//             postDate: Timestamp.fromDate(new Date()),
//             like: false
//         });
//         console.log("Document written with ID: ", docRef.id);
//         getDataFromFirestore()
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })
