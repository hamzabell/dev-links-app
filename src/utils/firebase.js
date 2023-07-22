// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseConfig from '../assets/firebase.json';


const firebase = initializeApp({
    ...firebaseConfig
})



export default firebase;



