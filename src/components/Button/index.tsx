import { Button, Icon } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export const ButtonCompose = () => {
  return (
    <Link to="/compose/huik">
      <Button
        colorScheme={"primary"}
        position="relative"
        borderRadius="9999px"
        h="56px"
        w="56px"
        left="180px"
        bottom="20px"
      >
        <Icon as={AiOutlinePlus} h="24px" w="24px" />
      </Button>
    </Link>
  );
};
