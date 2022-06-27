import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/client";

export const useAuth = () => {
  const signWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return signWithGithub;
};
