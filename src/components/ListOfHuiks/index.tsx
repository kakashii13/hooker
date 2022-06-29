import { Stack, VStack } from "@chakra-ui/react";
import { useHookerContext } from "../../context/HookerContext";
import { Huik } from "../Huik";

export const ListOfHuiks = () => {
  const { huiks } = useHookerContext();
  return (
    <VStack w="100%" h="100%">
      {huiks?.map(({ text }) => (
        <Huik key={text} text={text} />
      ))}
    </VStack>
  );
};
