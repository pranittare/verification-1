import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const createUser = (email, password) => {
    const auth = getAuth();
   return createUserWithEmailAndPassword(auth, email, password)
      // .then((userCredential) => {
      //   // Signed in 
      //   const user = userCredential.user;
      //   console.log('user', user)
      //   return user
      //   // return alert(`User Created with id ${user}`)
      //   // ...
      // })
      // .catch((error) => {
      //   //   return error.message
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   return errorMessage
      //   // ..
      // });

}
