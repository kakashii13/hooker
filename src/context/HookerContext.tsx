import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, getHuiks } from "../firebase/client";
import { useAuth } from "../hooks/useAuth";
import { ContextProps, HuikProp, PropsChildren, User } from "../types";

const hookerContext = createContext({} as ContextProps);

export const useHookerContext = () => useContext(hookerContext);

export const HookerProvider = ({ children }: PropsChildren) => {
  const [huiks, setHuiks] = useState<HuikProp[]>([]);
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(undefined);
  const { mapUser } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const normalizeUser = mapUser(user);
        setCurrentUser(normalizeUser);
      } else {
        setCurrentUser(user)
      }
    });
  }, []);

  useEffect(() => {
    getHuiks("Huiks").then((huik) => setHuiks(huik as HuikProp[]));
  }, []);

  return (
    <hookerContext.Provider value={{ huiks, currentUser }}>
      {children}
    </hookerContext.Provider>
  );
};
