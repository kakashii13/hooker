import { HStack, Spinner, VStack } from "@chakra-ui/react";
import { ButtonCompose } from "../components/Button";
import { Header } from "../components/Header";
import { ListOfHuiks } from "../components/ListOfHuiks";
import { Helmet } from "react-helmet";
import { useHookerContext } from "../context/HookerContext";
import { NavBar } from "../components/NavBar";

export const Home = () => {
  const { loading } = useHookerContext();

  return (
    <VStack minH="93%">
      <Helmet>
        <title> Home / Hooker</title>
      </Helmet>
      <Header />
      <HStack w="100%" justifyContent="center">
        {loading ? <Spinner /> : <ListOfHuiks />}
        <ButtonCompose />
      </HStack>
      <NavBar />
    </VStack>
  );
};
