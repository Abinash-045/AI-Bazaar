import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
 authDomain: "login-ai-bazaar.firebaseapp.com",
  projectId: "login-ai-bazaar",
  storageBucket: "login-ai-bazaar.firebasestorage.app",
  messagingSenderId: "340245517033",
  appId: "1:340245517033:web:f5d1e3592696f73af6d678"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

