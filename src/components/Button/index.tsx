import { Button, Icon } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export const ButtonCompose = () => {
  return (
    <Link to="/compose/huik">
      <Button
        colorScheme={"primary"}
        position="absolute"
        borderRadius="9999px"
        h="56px"
        w="56px"
        right="10px"
        bottom="10%"
      >
        <Icon as={AiOutlinePlus} h="24px" w="24px" />
      </Button>
    </Link>
  );
};
