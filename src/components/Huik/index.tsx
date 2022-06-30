import { HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { UserData } from "../UserData";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

interface PropsHuik {
  text: string;
}

export const Huik = ({ text }: PropsHuik) => {
  return (
    <Stack w="100%" _hover={{ bg: "#232e39" }}>
      <Link to="">
        <HStack
          justifyContent="space-between"
          alignItems="start"
          borderY="1px solid #38444d"
          mt="0!important"
          py="12px"
          px="5px"
        >
          <Stack spacing={5}>
            <UserData />
            <Text>{text}</Text>
          </Stack>

          <HStack
            justifyContent="space-between"
            p="10px"
            borderRadius="9999"
            _hover={{ bg: "gray.700", transition: "0.5s" }}
            cursor="pointer"
          >
            <Icon as={RiDeleteBin6Line} color="red.500" />
          </HStack>
        </HStack>
      </Link>
    </Stack>
  );
};
