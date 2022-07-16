import { Spinner, Stack, VStack } from "@chakra-ui/react";
import { ButtonCompose } from "../components/Button";
import { Header } from "../components/Header";
import { ListOfHuiks } from "../components/ListOfHuiks";
import { Helmet } from "react-helmet";
import { useHookerContext } from "../context/HookerContext";

export const Home = () => {
  const { loading } = useHookerContext();

  return (
    <VStack minH="93%">
      <Helmet>
        <title> Home / Hooker</title>
      </Helmet>
      <Header />
      <Stack>
        {loading ? <Spinner /> : <ListOfHuiks />}
        <ButtonCompose />
      </Stack>
    </VStack>
  );
};
