import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/client";

export const useAuth = () => {
  const signWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const mapUser = (user: any) => {
    const { email, displayName, photoURL, uid } = user;
    return { email, displayName, photoURL, uid };
  };

  return { signWithGithub, mapUser };
};
