import { Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { signWithGithub, signWithGoogle } = useAuth();
  const navigate = useNavigate();

  const loginWithGithub = async () => {
    try {
      await signWithGithub();
      navigate("/");
    } catch {
      console.log("error");
    }
  };
  const loginWithGoogle = async () => {
    try {
      await signWithGoogle();
      navigate("/");
    } catch (error) {
      const errortest = await error;
      console.log(errortest);
    }
  };

  return (
    <VStack justifyContent="center" alignItems="center" h="100vh" spacing={5}>
      <Heading>Hooker</Heading>
      <Button colorScheme="whiteAlpha" type="submit" onClick={loginWithGithub}>
        Login with GitHub
      </Button>
      <Button colorScheme="blackAlpha" type="submit" onClick={loginWithGoogle}>
        Login with Google
      </Button>
    </VStack>
  );
};
