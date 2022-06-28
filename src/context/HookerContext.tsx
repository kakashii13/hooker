import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";

interface PropsChildren {
  children: JSX.Element | JSX.Element[];
}

interface Huiks {
  text: string;
}

interface ContextProps {
  huiks: Huiks[];
  currentUser: string | null | undefined;
  handleAddHuik: (text: string) => void;
}

const hookerContext = createContext({} as ContextProps);

export const useHookerContext = () => useContext(hookerContext);

export const HookerProvider = ({ children }: PropsChildren) => {
  const [huiks, setHuiks] = useState<Huiks[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null | undefined>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      setCurrentUser(user?.displayName);
    });
  }, []);

  const handleAddHuik = (text: string) => {
    const huiksCopy = [...huiks];
    huiksCopy.push({ text });
    setHuiks(huiksCopy);
  };

  return (
    <hookerContext.Provider value={{ huiks, currentUser, handleAddHuik }}>
      {children}
    </hookerContext.Provider>
  );
};
