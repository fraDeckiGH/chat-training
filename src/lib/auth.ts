
// ? inspiration
// https://github.com/CaptainCodeman/sveltekit-example/blob/master/src/lib/auth.ts

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "./firebase";

export {
  createAuth,
}
export type {
  Auth,
}

function createAuth() {
  const instance = new Auth()
  return instance
}

class Auth {
  
  auth = getAuth(firebaseApp)
  form = {
    email: "",
    password: "",
  }
  listening_onAuthStateChanged?: boolean
  
  constructor() {
    ;(async () => {
      this.listening_onAuthStateChanged = await this.onAuthStateChanged()
    })()
  }
  
  createUserWithEmailAndPassword() {
    if (!this.listening_onAuthStateChanged) {
      console.log(`return: !listening_onAuthStateChanged`, )
      return
    }
    
    // console.log(`createUserWithEmailAndPassword() form`, this.form)
    createUserWithEmailAndPassword(
      this.auth, this.form.email, this.form.password
    )
    .then((userCredential) => {
      console.log(`userCredential`, userCredential)
  
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.error(`error`, error)
      // https://firebase.google.com/docs/reference/js/auth?authuser=0#autherrorcodes
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    })
  }
  
  onAuthStateChanged() {
    // return new Promise<void>((resolve) => {
    return new Promise<boolean>((resolve) => {
      
      onAuthStateChanged(this.auth, (user) => {
        console.log(`nextOrObserver user`, user)
        resolve(true)
        
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      }, (error) => {
        // ? realistically when do we go here?
        console.error(`error`, error)
        resolve(false)
      })
      
    })
  }
  
  signInWithEmailAndPassword() {
    if (!this.listening_onAuthStateChanged) {
      console.log(`return: !listening_onAuthStateChanged`, )
      return
    }
    
    signInWithEmailAndPassword(
      this.auth, this.form.email, this.form.password
    )
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.error(`error`, error)
      // https://firebase.google.com/docs/reference/js/auth?authuser=0#autherrorcodes
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }
  
  
}




