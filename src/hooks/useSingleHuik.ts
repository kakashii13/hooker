import { useEffect } from "react";
import { useState } from "react";
import { getSingleHuik } from "../firebase/client";
import { Huik } from "../types";

export const useSingleHuik = (id: string) => {
  const [huik, setHuik] = useState<Huik>();

  useEffect(() => {
    getSingleHuik(id).then((response) => setHuik(response as Huik));
  }, [id]);

  return { huik };
};
