import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCeH3X7vgqnajRZ7SUIP4uS7jf68EYzdOY",
    authDomain: "frames-clothing-db.firebaseapp.com",
    projectId: "frames-clothing-db",
    storageBucket: "frames-clothing-db.appspot.com",
    messagingSenderId: "227932282077",
    appId: "1:227932282077:web:dfa3da8b80c155e01a0f34"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth =  async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists())
    {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {displayName, email, createdAt});


        }catch(error){
            console.log('error creating the user', error.message)

        }
    }
    return userDocRef;
}
  