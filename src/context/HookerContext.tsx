import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, getHuiks } from "../firebase/client";
import { useAuth } from "../hooks/useAuth";
import { ContextProps, HuikProp, PropsChildren, User } from "../types";

const hookerContext = createContext({} as ContextProps);

export const useHookerContext = () => useContext(hookerContext);

export const HookerProvider = ({ children }: PropsChildren) => {
  const [huiks, setHuiks] = useState<HuikProp[]>([]);
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const { mapUser } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const normalizeUser = mapUser(user);
        setCurrentUser(normalizeUser);
      } else {
        setCurrentUser(user);
      }
    });
  }, []);

  useEffect(() => {
    let isSubscribe = true;

    const handleTest = (huiks: HuikProp[], loading: boolean) => {
      setHuiks(huiks);
      setLoading(loading);
    };

    if (isSubscribe) {
      setLoading(true);
      getHuiks(handleTest);
    }

    () => (isSubscribe = false);
  }, []);

  return (
    <hookerContext.Provider value={{ huiks, currentUser, loading }}>
      {children}
    </hookerContext.Provider>
  );
};
