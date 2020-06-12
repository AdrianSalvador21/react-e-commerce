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
  // const collectionRef = firestore.collection('users');

  // console.log(collectionRef);

  const snapShot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get();

  // get data of all docs from collection
  // console.log({collection: collectionSnapshot.docs.map(doc => doc.data())});

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // if pass argument in doc, that will be id document
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  return batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  console.log(transformedCollections);
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    console.log(accumulator);
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
