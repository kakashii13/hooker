import { Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";

export const Login = () => {
  return (
    <VStack justifyContent="center" alignItems="center" h="100%">
      <Heading>Hooker</Heading>
      <Button colorScheme="whiteAlpha">Login with GitHub</Button>
    </VStack>
  );
};
