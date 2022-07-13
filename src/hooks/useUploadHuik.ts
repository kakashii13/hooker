import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useHookerContext } from "../context/HookerContext";
import { db } from "../firebase/client";

enum ComposeStatus {
  LOADING = 1,
  SUCCESS = 2,
  ERROR = -1,
}

export const useUploadHuik = (contentHuik: string, imgURL: string | null) => {
  const { currentUser } = useHookerContext();
  const [status, setStatus] = useState<number>();
  const navigate = useNavigate();

  const addToFirebase = async () => {
    if (!currentUser) return;
    const { displayName, email, photoURL, uid } = currentUser;
    const huikObj = {
      name: displayName,
      userName: email,
      content: contentHuik,
      contentImg: imgURL,
      avatar: photoURL,
      idUser: uid,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
    };
    setStatus(ComposeStatus.LOADING);
    await addDoc(collection(db, "Huiks"), huikObj);
    setStatus(ComposeStatus.SUCCESS);
    navigate("/");
  };

  return { addToFirebase, status };
};
