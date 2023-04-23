import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import { getDatabase } from "firebase/database";
export const firebaseConfig = {
  apiKey: "AIzaSyAGQxIkenIWB0vGyRzCoGdss0VOlP9B7x4",
  authDomain: "login-signup-69dda.firebaseapp.com",
  databaseURL: "https://login-signup-69dda-default-rtdb.firebaseio.com",
  projectId: "login-signup-69dda",
  storageBucket: "login-signup-69dda.appspot.com",
  messagingSenderId: "181279657320",
  appId: "1:181279657320:web:4c50759607aec738b79add",
};
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export const db = getDatabase();

export default firebase;
