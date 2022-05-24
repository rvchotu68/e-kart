// import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {getFirestore,doc,getDoc,setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3IiaSD-S55NCCMX-JstPoWSR760LHtd0",
  authDomain: "e-kart-clothing.firebaseapp.com",
  projectId: "e-kart-clothing",
  storageBucket: "e-kart-clothing.appspot.com",
  messagingSenderId: "982694494762",
  appId: "1:982694494762:web:32251bf4b201f5f45cf953",
};

const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

const provider = new GoogleAuthProvider();

// const githubAuthProvider = new GithubAuthProvider();

provider.getCustomParameters({
    prompt: "select_account"
})

// githubAuthProvider.getCustomParameters({
//     prompt: "select_account"
// })

const db = getFirestore(firebaseApp);

export const createUserDocumentWithAuth = async (userAuth,otherData = {}) =>{

    const userDocRef = doc(db,"users",userAuth.uid);
    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);

    if(!userSnapShot.exists())
    {
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...otherData
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return userDocRef;

}


export const auth = getAuth(firebaseApp);
console.log(auth);

export const signInWithGooglePop = () => signInWithPopup(auth,provider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

export const createUserAuthUsingEmailAndPassword = async (email,password) =>{
   
    if( !email || !password) return;
    
   return  await createUserWithEmailAndPassword(auth,email,password);

}

export const signInAuthUsingEmailAndPassword = async(email,password) =>{

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);

}