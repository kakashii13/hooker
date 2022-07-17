import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { HuikProp } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyAyBj2Et1mKxi8KLVqsofGiQsryEfILn-M",
  authDomain: "hooker-254b4.firebaseapp.com",
  projectId: "hooker-254b4",
  storageBucket: "hooker-254b4.appspot.com",
  messagingSenderId: "311734022539",
  appId: "1:311734022539:web:5499f9fa5d390aa364bf8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const getHuiks = (callback: any) => {
  const docRef = collection(db, "Huiks");
  const q = query(docRef, orderBy("createdAt", "desc"));
  onSnapshot(q, ({ docs }) => {
    const newHuiks = docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;
      return {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      };
    });
    callback(newHuiks, false);
  });
};

export const getSingleHuik = (idHuik: string, callback: any) => {
  const docRef = doc(db, "Huiks", idHuik);
  onSnapshot(docRef, (doc) => {
    const docSnap = () => {
      const response = doc.data();
      if (!response) return;
      const { createdAt } = response;
      const { id } = doc;
      return { ...response, id, createdAt: +createdAt.toDate() };
    };
    callback(docSnap);
  });
};

export const deleteHuik = async (id: string) => {
  await deleteDoc(doc(db, "Huiks", id));
};

export const uploadImage = (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${file.name}`);
  const task = uploadBytesResumable(storageRef, file);
  return task;
};

export const addToFirebase = (huik: HuikProp) => {
  return addDoc(collection(db, "Huiks"), huik);
};
