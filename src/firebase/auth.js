import { createUserWithEmailAndPassword , GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import { auth } from "./firebase";

export  function doSignup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
export function doSignin(email,password){
    return signInWithEmailAndPassword(auth,email,password)
}
export async function doGoolesignIn(){
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth ,provider)
    return result;
}

export function signOut(){
    return auth.signOut( )
}
