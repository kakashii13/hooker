import { Avatar } from "@chakra-ui/react";
import { useHookerContext } from "../../context/HookerContext";

interface AvatarProp {
  size: string;
}

export const AvatarUser = ({ size }: AvatarProp) => {
  const { currentUser } = useHookerContext();
  return <Avatar size={size} src={currentUser?.photoURL} />;
};
