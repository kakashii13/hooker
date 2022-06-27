import { Stack } from "@chakra-ui/react";
import { useHookerContext } from "../../context/HookerContext";
import { Huik } from "../Huik";

export const ListOfHuiks = () => {
  const { huiks } = useHookerContext();
  return (
    <Stack h="100%" w="100%">
      {huiks?.map(({ text }) => (
        <Huik key={text} text={text} />
      ))}
    </Stack>
  );
};
