import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signInUser = (email, password) => {
    const auth = getAuth();
   return signInWithEmailAndPassword(auth, email, password)
}