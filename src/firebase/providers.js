import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const resp = await signInWithPopup(FirebaseAuth, googleProvider);
    const {displayName, email, photoURL, uid} = resp.user;

    return{
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }

  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    }
  }
}



export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, {displayName});

    return{
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }

  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    }
  }
}

export const loginWithEmailPassword = async ({email, password}) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const {displayName, photoURL, uid} = resp.user;

    return{
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }

  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}