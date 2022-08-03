import { Button, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Login = () => {
  const { signWithGithub, signWithGoogle } = useAuth();
  const navigate = useNavigate();

  const loginWithGithub = async () => {
    try {
      await signWithGithub();
      navigate("/home");
    } catch {
      console.log("error");
    }
  };
  const loginWithGoogle = async () => {
    try {
      await signWithGoogle();
      navigate("/home");
    } catch (error) {
      const errortest = await error;
      console.log(errortest);
    }
  };

  return (
    <VStack justifyContent="center" alignItems="center" spacing={5}>
      <Helmet>
        <title>Hooker. Share with Hooker</title>
      </Helmet>
      <Button
        colorScheme="blackAlpha"
        leftIcon={<FaGithub />}
        type="submit"
        onClick={loginWithGithub}
      >
        Login with GitHub
      </Button>
      <Button
        bg="white"
        color="black"
        leftIcon={<FcGoogle />}
        type="submit"
        onClick={loginWithGoogle}
      >
        Login with Google
      </Button>
    </VStack>
  );
};
