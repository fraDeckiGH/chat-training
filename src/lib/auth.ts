
// ? initial inspiration
// https://github.com/CaptainCodeman/sveltekit-example/blob/master/src/lib/auth.ts

// * user authentication
// import this module only if the app is running in the browser

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp } from "./firebase";

export {
  create,
}
export type {
  Auth,
}

type Unsubscribe = ReturnType<typeof onAuthStateChanged>

function create() {
  const instance = new Auth()
  return instance
}

class Auth {
  
  auth = getAuth(firebaseApp)
  form = {
    email: "",
    password: "",
    // email: "yijis76139@incoware.com",
    // password: "12345678",
  }
  // listening_onAuthStateChanged?: boolean
  private _unsub_onAuthStateChanged!: Unsubscribe | null
  
  // * accessor
  
  public get unsub_onAuthStateChanged(): Unsubscribe | null {
    return this._unsub_onAuthStateChanged
  }
  public set unsub_onAuthStateChanged(value: Unsubscribe | null) {
    // ? https://stackoverflow.com/questions/42762443/how-can-i-unsubscribe-to-onauthstatechanged
    this._unsub_onAuthStateChanged?.()
    this._unsub_onAuthStateChanged = value
  }
  
  // * constructor
  
  constructor() {
    /* ;(async () => {
      this.listening_onAuthStateChanged = 
        await this.onAuthStateChanged()
    })() */
    this.unsub_onAuthStateChanged = this.onAuthStateChanged()
  }
  
  // * method
  
  async createUserWithEmailAndPassword() {
    if (!this.unsub_onAuthStateChanged) {
      console.log(`return: !this.unsub_onAuthStateChanged`, this.unsub_onAuthStateChanged)
      return
    }
    
    try {
      const userCredential = 
      await createUserWithEmailAndPassword(
        this.auth, this.form.email, this.form.password
      )
      console.log(`userCredential`, userCredential)
  
      // Signed in 
      const user = userCredential.user
      
      // ? await is needed for the catch to do its job
      // await this.sendEmailVerification()
      
    } catch (error: any) {
      console.error(`error`, error)
      // https://firebase.google.com/docs/reference/js/auth?authuser=0#autherrorcodes
      // const errorCode = error.code;
      // const errorMessage = error.message;
      
      switch (error.code) {
        case "auth/email-already-in-use":
          await this.signInWithEmailAndPassword()
          break
      
        default:
          
      }
    }
    
  }
  
  onAuthStateChanged() {
    // return new Promise<void>((resolve) => {
    // return new Promise<boolean>((resolve) => {
    
    const ret = 
      onAuthStateChanged(this.auth, (user) => {
        console.log(`nextOrObserver user`, user)
        // resolve(true)
        
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      }/* , (error) => {
        // ? realistically when do we go here?
        console.error(`error`, error)
        // resolve(false)
      } */)
      
    return ret
    
    // })
  }
  
  async sendEmailVerification() {
    if (!this.auth.currentUser) {
      console.log(`return: !this.auth.currentUser`, this.auth.currentUser)
      return
    }
    
    try {
      await sendEmailVerification(this.auth.currentUser)
      console.log(`Email verification sent`, )
    } catch (e) {
      console.error(`e`, e)
    }
    
  }
  
  /**
   * login
   */
  async signInWithEmailAndPassword() {
    if (!this.unsub_onAuthStateChanged) {
      console.log(`return: !this.unsub_onAuthStateChanged`, this.unsub_onAuthStateChanged)
      return
    }
    
    try {
      const userCredential = 
      await signInWithEmailAndPassword(
        this.auth, this.form.email, this.form.password
      )
      console.log(`userCredential`, userCredential)
      
      // Signed in 
      const user = userCredential.user
      
    } catch (error: any) {
      console.error(`error`, error)
      // https://firebase.google.com/docs/reference/js/auth?authuser=0#autherrorcodes
      // const errorCode = error.code;
      // const errorMessage = error.message;
      
      switch (error.code) {
        case "auth/user-not-found":
          await this.createUserWithEmailAndPassword()
          break
      
        default:
          
      }
    }
    
  }
  
  signOut() {
    if (!this.unsub_onAuthStateChanged) {
      console.log(`return: !this.unsub_onAuthStateChanged`, this.unsub_onAuthStateChanged)
      return
    }
    
    // ? https://firebase.google.com/docs/auth/web/password-auth?authuser=0#next_steps
    signOut(this.auth).then(() => {
      // Sign-out successful.
      console.log(`Sign-out successful`, )
    }).catch((error) => {
      // An error happened.
      console.error(`error`, error)
    })
  }
  
  
}




