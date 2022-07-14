import { Timestamp } from "firebase/firestore";

export interface HuikProp {
  userName: string;
  content: string;
  avatar: string;
  idUser: string;
  createdAt: number | Timestamp;
  likesCount: number;
  sharedCount: number;
  id?: string;
  name: string;
  contentImg?: string | null
}

export interface PropsChildren {
  children: JSX.Element | JSX.Element[];
}

export interface ContextProps {
  huiks: HuikProp[];
  currentUser: User | undefined | null;
}
export interface User {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
}

export interface RouteProps {
  children: JSX.Element;
}

export interface HuikLinkProps {
  children: JSX.Element;
  id: string;
  userName: string;
}
