// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBytYvZkXRTv3lVetEt96GklhmJmflxP2E',
    authDomain: 'houseandjobs-b4394.firebaseapp.com',
    projectId: 'houseandjobs-b4394',
    storageBucket: 'houseandjobs-b4394.appspot.com',
    messagingSenderId: '647074392233',
    appId: '1:647074392233:web:cd05184251ca9e612861b8',
    measurementId: 'G-VSSZNLVV07',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const database = getFirestore(app)

export default database
