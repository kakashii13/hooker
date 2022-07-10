import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

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

export const getHuiks = async (collectionName: string) => {
  const docRef = collection(db, collectionName);
  const q = query(docRef, orderBy("createdAt", "desc"));
  const unsub = await getDocs(q);
  return unsub.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    const { createdAt } = data;
    return {
      ...data,
      id,
      createdAt: +createdAt.toDate(),
    };
  });
};

export const getSingleHuik = async (id: string) => {
  const docRef = doc(db, "Huiks", id);
  const docSnap = await getDoc(docRef);
  const response = docSnap.data();
  if (!response) return;
  const { createdAt } = response;

  return { ...response, createdAt: +createdAt.toDate() };
};

export const deleteHuik = async (id: string) => {
  const docSnap = await deleteDoc(doc(db, "Huiks", id));
};

export const uploadImage = (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${file.name}`);
  const task = uploadBytesResumable(storageRef, file);
  return task;
};
