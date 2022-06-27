import { createContext, useContext, useState } from "react";

interface PropsChildren {
  children: JSX.Element | JSX.Element[];
}

interface Huiks {
  text: string;
}

interface ContextProps {
  huiks: Huiks[];
  handleAddHuik: (text: string) => void;
}

const hookerContext = createContext({} as ContextProps);

export const useHookerContext = () => useContext(hookerContext);

export const HookerProvider = ({ children }: PropsChildren) => {
  const [huiks, setHuiks] = useState<Huiks[]>([]);

  const handleAddHuik = (text: string) => {
    const huiksCopy = [...huiks];
    huiksCopy.push({ text });
    setHuiks(huiksCopy);
  };

  return (
    <hookerContext.Provider value={{ huiks, handleAddHuik }}>
      {children}
    </hookerContext.Provider>
  );
};
