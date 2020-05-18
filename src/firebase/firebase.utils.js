import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCAyAPDwC1EDyJC-VCixyCGVPJjhCVoRlY",
  authDomain: "e-commerce-487e3.firebaseapp.com",
  databaseURL: "https://e-commerce-487e3.firebaseio.com",
  projectId: "e-commerce-487e3",
  storageBucket: "e-commerce-487e3.appspot.com",
  messagingSenderId: "746299275016",
  appId: "1:746299275016:web:b0b35e4e3f02f59c4c5ebd",
  measurementId: "G-ZYX0MEMQTW"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
