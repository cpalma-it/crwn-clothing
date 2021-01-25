import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAxo_99wpIAQfCKn1OC_OlcgILx9aKryQs",
    authDomain: "crown-db-3fae4.firebaseapp.com",
    projectId: "crown-db-3fae4",
    storageBucket: "crown-db-3fae4.appspot.com",
    messagingSenderId: "555089241614",
    appId: "1:555089241614:web:de7adc2aae1b8721b6fe5f",
    measurementId: "G-ZKG59DZD5G"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    console.log("SNAP");
    console.log(snapShot);

    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createAt = new Date();

        try{
            await userRef.set({
               displayName,
               email,
               createAt,
               ...additionalData 
            })
        }catch(error){
            console.log('error createing user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

