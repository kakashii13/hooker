import { Heading, Image, VStack } from "@chakra-ui/react";
import logo from "../logo.png";
import { Login } from "../Login";

export const Landing = () => {
  return (
    <VStack justifyContent="center" h="100vh" spacing={10} textAlign="center">
      <Image src={logo} w="100px" />
      <Heading fontSize="50px">Share with Hooker</Heading>
      <Heading as="h2">Join now.</Heading>
      <Login />
    </VStack>
  );
};
