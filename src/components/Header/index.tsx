import { Heading, HStack } from "@chakra-ui/react";
import { useHookerContext } from "../../context/HookerContext";
import { AvatarUser } from "../AvatarUser";

export const Header = () => {
  const { currentUser } = useHookerContext();
  return (
    <HStack minH="32px" w="100%" px="16px">
      <HStack spacing={5} h="52px">
        <AvatarUser
          size="sm"
          avatar={currentUser ? currentUser?.photoURL : ""}
        />
        <Heading fontSize="17px">Home</Heading>
      </HStack>
    </HStack>
  );
};
