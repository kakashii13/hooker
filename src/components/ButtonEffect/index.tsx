import { HStack } from "@chakra-ui/react";

interface ButtonProps {
  children: JSX.Element;
  isBg: boolean;
}

export const ButtonEffect = ({ children, isBg }: ButtonProps) => {
  return (
    <HStack
      justifyContent="space-between"
      borderRadius="9999"
      _hover={{ bg: "gray.700", transition: "0.5s" }}
      cursor="pointer"
      position="absolute"
      left="1"
      top="1"
      mt="0!important"
      bg={isBg ? "blackAlpha.300" : ""}
      p="8px"
    >
      {children}
    </HStack>
  );
};
