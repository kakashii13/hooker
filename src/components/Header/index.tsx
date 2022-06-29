import { Heading, HStack } from "@chakra-ui/react";
import { AvatarUser } from "../AvatarUser";

export const Header = () => {
  return (
    <HStack minH="32px" w="100%">
      <HStack spacing={5} h="52px">
        <AvatarUser size="sm" />
        <Heading fontSize="17px">Home</Heading>
      </HStack>
    </HStack>
  );
};
