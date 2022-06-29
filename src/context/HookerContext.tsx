import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";
import { useAuth } from "../hooks/useAuth";

interface PropsChildren {
  children: JSX.Element | JSX.Element[];
}

interface Huiks {
  text: string;
}

interface ContextProps {
  huiks: Huiks[];
  currentUser: User | undefined;
  handleAddHuik: (text: string) => void;
}
type User = {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
};

const hookerContext = createContext({} as ContextProps);

export const useHookerContext = () => useContext(hookerContext);

export const HookerProvider = ({ children }: PropsChildren) => {
  const [huiks, setHuiks] = useState<Huiks[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const { mapUser } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const normalizeUser = mapUser(user);
        setCurrentUser(normalizeUser);
      }
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
