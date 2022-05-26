// import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3IiaSD-S55NCCMX-JstPoWSR760LHtd0",
  authDomain: "e-kart-clothing.firebaseapp.com",
  projectId: "e-kart-clothing",
  storageBucket: "e-kart-clothing.appspot.com",
  messagingSenderId: "982694494762",
  appId: "1:982694494762:web:32251bf4b201f5f45cf953",
};

const firebaseApp = initializeApp(firebaseConfig);
// console.log(firebaseApp);

const provider = new GoogleAuthProvider();

const db = getFirestore(firebaseApp);

provider.getCustomParameters({
  prompt: "select_account",
});

export const addCollectionAndDocuments = async (collName, jsonData) => {
  const collectionRef = await collection(db, collName);
  const batch = writeBatch(db);
  jsonData.forEach((data) => {
    const docRef = doc(collectionRef, data.title.toLowerCase());
    batch.set(docRef, data);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = await collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.docs);
  const categoryMap = querySnapshot.docs.reduce((preVale, docSnap) => {
    const { title, items } = docSnap.data();
    preVale[title.toLowerCase()] = items;
    return preVale;
  }, {});

  return categoryMap;
};

export const createUserDocumentWithAuth = async (userAuth, otherData = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  // console.log(userSnapShot);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...otherData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userDocRef;
};

export const auth = getAuth(firebaseApp);
// console.log(auth);

export const signInWithGooglePop = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const createUserAuthUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedHandler = (callback) => {
  onAuthStateChanged(auth, callback);
};
export const signOutHandler = async () => {
  await signOut(auth);
};
