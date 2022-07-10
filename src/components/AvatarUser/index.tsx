import { Avatar } from "@chakra-ui/react";

interface AvatarProp {
  size: string;
  avatar: string;
}

export const AvatarUser = ({ size, avatar }: AvatarProp) => {
  return <Avatar size={size} src={avatar} />;
};
