import { VStack } from "@chakra-ui/react";
import { ButtonCompose } from "../components/Button";
import { Header } from "../components/Header";
import { ListOfHuiks } from "../components/ListOfHuiks";
import { NavBar } from "../components/NavBar";

export const Home = () => {
  return (
    <VStack justifyContent="space-between" h="100%" pt="20px">
      <Header />
      <ListOfHuiks />
      <ButtonCompose />
      <NavBar />
    </VStack>
  );
};
