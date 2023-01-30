import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase";
import { clearNotesLogout } from "../journal";
import { chekingCredentials, login, logout } from "./"

export const chekingAuthentication = () => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
    const result = await registerUserWithEmailPassword({email, password, displayName});
    if(!result.ok) {
      const { errorMessage } = result;
      return dispatch(logout({errorMessage}));
    }
    dispatch(login(result))
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
    const result = await singInWithGoogle();
    if(!result.ok) {
      const { errorMessage } = result;
      return dispatch(logout({errorMessage}));
    }
    dispatch(login(result))
  }
}

export const startLoginWithEmailPassword = ({email, password}) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
    const result = await loginWithEmailPassword({email, password});
    if(!result.ok) {
      const { errorMessage } = result;
      return dispatch(logout({errorMessage}));
    }
    dispatch(login(result));
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  }
}