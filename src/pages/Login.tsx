import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { useHookerContext } from "../context/HookerContext";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { currentUser } = useHookerContext();
  const signWithGithub = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      signWithGithub();
    } catch {
      console.log("error");
    }
  };

  return (
    <VStack justifyContent="center" alignItems="center" h="100%">
      <Heading>Hooker</Heading>
      <form onSubmit={(e) => handleLogin(e)}>
        <Button colorScheme="whiteAlpha" type="submit">
          Login with GitHub
        </Button>
      </form>
      <Text>{currentUser}</Text>
    </VStack>
  );
};
