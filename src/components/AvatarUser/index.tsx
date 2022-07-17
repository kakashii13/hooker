import { Avatar } from "@chakra-ui/react";
import { AvatarProp } from "../../types";

export const AvatarUser = ({ size, avatar }: AvatarProp) => {
  return <Avatar size={size} src={avatar} />;
};
