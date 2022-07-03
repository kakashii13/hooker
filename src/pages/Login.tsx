import { Button, Heading, VStack } from "@chakra-ui/react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { signWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signWithGithub();
      navigate("/");
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
    </VStack>
  );
};
