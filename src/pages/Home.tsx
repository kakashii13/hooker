import { VStack } from "@chakra-ui/react";
import { ButtonCompose } from "../components/Button";
import { Header } from "../components/Header";
import { ListOfHuiks } from "../components/ListOfHuiks";
import { NavBar } from "../components/NavBar";

export const Home = () => {
  return (
    <VStack h="100%" justifyContent="space-between">
      <Header />
      <ListOfHuiks />
      <ButtonCompose />
      <NavBar />
    </VStack>
  );
};
