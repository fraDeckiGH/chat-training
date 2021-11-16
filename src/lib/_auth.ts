
// ? insiration
// https://github.com/CaptainCodeman/sveltekit-example/blob/master/src/lib/auth.ts

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

export {
  createUser,
}

function createUser(form: any) {
  console.log(`form`, form)
  
  const auth = getAuth(firebaseApp)
  
  createUserWithEmailAndPassword(auth, form.email, form.password)
  .then((userCredential) => {
    console.log(`userCredential`, userCredential)

    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    console.error(`error`, error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  })
  
  
}










