import { Stack, Text } from "@chakra-ui/react";
import { UserData } from "../UserData";

interface PropsHuik {
  text: string;
}

export const Huik = ({ text }: PropsHuik) => {
  return (
    <Stack borderY="1px solid #38444d" mt="0!important" py="12px">
      <UserData />
      <Text>{text}</Text>
    </Stack>
  );
};
