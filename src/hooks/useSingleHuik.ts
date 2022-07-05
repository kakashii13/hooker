import { useEffect } from "react";
import { useState } from "react";
import { getSingleHuik } from "../firebase/client";
import { HuikProp } from "../types";

export const useSingleHuik = (id: string) => {
  const [huik, setHuik] = useState<HuikProp>();

  useEffect(() => {
    getSingleHuik(id).then((response) => setHuik(response as HuikProp));
  }, [id]);

  return { huik };
};
