import { Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HuikLinkProps } from "../../types";

export const HuikLink = ({ children, userName, id }: HuikLinkProps) => {
  return (
    <Stack
      w="100%"
      _hover={{ bg: "#232e39" }}
      borderBottom="1px solid #38444d"
      mt="0!important"
      cursor="pointer"
      position="relative"
    >
      <Link to={`/${userName}/status/${id}`}>{children}</Link>
    </Stack>
  );
};
