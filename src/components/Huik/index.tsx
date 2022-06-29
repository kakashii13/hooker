import {
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { UserData } from "../UserData";
import { RiMoreLine, RiDeleteBin6Line } from "react-icons/ri";

interface PropsHuik {
  text: string;
}

export const Huik = ({ text }: PropsHuik) => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="start"
      borderY="1px solid #38444d"
      mt="0!important"
      py="12px"
      px="5px"
      w="100%"
    >
      <Stack>
        <UserData />
        <Text>{text}</Text>
      </Stack>
      <Popover>
        <PopoverTrigger>
          <Stack
            p="10px"
            borderRadius="9999"
            _hover={{ bg: "gray.700", transition: "0.5s" }}
            cursor="pointer"
          >
            <Icon as={RiMoreLine} />
          </Stack>
        </PopoverTrigger>
        <PopoverContent bg="gray.700" borderColor="gray.800">
          <PopoverArrow bg="gray.700" />
          <HStack justifyContent="space-between" p="10px">
            <Text>Delete</Text>
            <Icon as={RiDeleteBin6Line} color="red.500" />
          </HStack>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};
