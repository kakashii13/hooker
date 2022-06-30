import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/client";
import { useAuth } from "../hooks/useAuth";

interface PropsChildren {
  children: JSX.Element | JSX.Element[];
}

interface Huik {
  userName: string;
  content: string;
  avatar: string;
  idUser: string;
  createdAt: Date;
  likesCount: number;
  sharedCount: number;
  id: string;
}

interface Huiks {
  huiks: Huik[];
}

interface ContextProps {
  huiks: Huik[];
  currentUser: User | undefined;
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
  const [huiks, setHuiks] = useState<Huik[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const { mapUser } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const normalizeUser = mapUser(user);
        setCurrentUser(normalizeUser);
      }
    });
  }, []);

  useEffect(() => {
    const getHuiks = async () => {
      const docRef = collection(db, "Huiks");
      const unsub = await getDocs(docRef);
      const huiksdb = unsub.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const test = {
          id,
          ...data,
        };
        return test;
      });
      console.log(huiksdb);
      // setHuiks([...huiks])
    };

    getHuiks();
  }, []);

  return (
    <hookerContext.Provider value={{ huiks, currentUser }}>
      {children}
    </hookerContext.Provider>
  );
};
