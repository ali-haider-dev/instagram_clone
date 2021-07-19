import firebase from "firebase"

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAv0hS1qdL04r87bAK3SYxSKrLP92_QPGM",
    authDomain: "instagram-clone-react-89346.firebaseapp.com",
    projectId: "instagram-clone-react-89346",
    storageBucket: "instagram-clone-react-89346.appspot.com",
    messagingSenderId: "372213125265",
    appId: "1:372213125265:web:f723d6602dbdc9b5982f30",
    measurementId: "G-9GWQPHB9T6"
});
// Initialize Firebase


const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export {
    db,
    auth, storage
}


