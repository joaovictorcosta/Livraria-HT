import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyA4gnps8dir5flf28lUvCMoRF29zvvx73o",
  authDomain: "handtalk-challenge.firebaseapp.com",
  databaseURL: "https://handtalk-challenge.firebaseio.com",
  projectId: "handtalk-challenge",
  storageBucket: "handtalk-challenge.appspot.com",
  appId: "1:881832597979:web:8c35a5a580f860db506ffe"
};

firebase.initializeApp(firebaseConfig);

export const fbFirestore = firebase.firestore();
export const fbStorage = firebase.storage();
