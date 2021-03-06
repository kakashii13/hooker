import { HStack, Icon } from "@chakra-ui/react";
import { AiFillHome, AiOutlineSearch, AiOutlineMail } from "react-icons/ai";

export const NavBar = () => {
  return (
    <HStack
      borderTop="1px solid #38444D"
      w="100%"
      justifyContent="space-between"
      p="15px 16px"
    >
      <Icon as={AiFillHome} h="30px" w="30px" />
      <Icon as={AiOutlineSearch} h="30px" w="30px" />
      <Icon as={AiOutlineMail} h="30px" w="30px" />
    </HStack>
  );
};
