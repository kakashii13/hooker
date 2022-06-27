import { HStack, Icon } from "@chakra-ui/react";
import React from "react";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineMail,
} from "react-icons/ai";

// const ARRAY_ICONS = [AiFillHome, AiOutlineSearch, AiOutlineBell, AiOutlineMail];

export const NavBar = () => {
  return (
    <HStack
      borderTop="1px solid #38444D"
      w="100%"
      justifyContent="space-between"
      p="10px 16px"
    >
      <Icon as={AiFillHome} h="30px" w="30px" />
      <Icon as={AiOutlineSearch} h="30px" w="30px" />
      <Icon as={AiOutlineBell} h="30px" w="30px" />
      <Icon as={AiOutlineMail} h="30px" w="30px" />
    </HStack>
  );
};
