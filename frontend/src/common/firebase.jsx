// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnu9YmasGdPZ_sMp0KirXb1waoEqEj1RE",
  authDomain: "mern-blog-web-app.firebaseapp.com",
  projectId: "mern-blog-web-app",
  storageBucket: "mern-blog-web-app.appspot.com",
  messagingSenderId: "358129121641",
  appId: "1:358129121641:web:300e1c7d51bd658d9e65f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth()

export const authWithGoogle = async () =>{
    let user = null;
    await signInWithPopup(auth,provider).then((result)=>{user=result?.user}).catch((err)=>console.log(err,'Error while auth'))
    return user
}
