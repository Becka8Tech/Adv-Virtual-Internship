import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'

const provider = new GoogleAuthProvider();

export const login = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
