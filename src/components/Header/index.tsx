import { Avatar, Heading, HStack } from "@chakra-ui/react";

export const Header = () => {
  return (
    <HStack spacing={5} position="sticky" w="100%">
      <Avatar size="sm" />
      <Heading fontSize="17px">Home</Heading>
    </HStack>
  );
};
