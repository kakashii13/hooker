import { HStack, Spinner, VStack } from "@chakra-ui/react";
import { ButtonCompose } from "../components/Button";
import { Header } from "../components/Header";
import { ListOfHuiks } from "../components/ListOfHuiks";
import { Helmet } from "react-helmet";
import { useHookerContext } from "../context/HookerContext";

export const Home = () => {
  const { loading } = useHookerContext();

  return (
    <VStack pb="20px" minH="100vh" position="relative">
      <Helmet>
        <title> Home / Hooker</title>
      </Helmet>
      <Header />
      <HStack w="100%" minH="100%" justifyContent="center">
        {loading ? <Spinner /> : <ListOfHuiks />}
      </HStack>
      <ButtonCompose />
    </VStack>
  );
};
