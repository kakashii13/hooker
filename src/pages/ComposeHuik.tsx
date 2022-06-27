import {
  Avatar,
  Button,
  HStack,
  Icon,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useHookerContext } from "../context/HookerContext";

export const ComposeHuik = () => {
  const [huik, sethuik] = useState("");
  const { handleAddHuik } = useHookerContext();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    sethuik(e.target.value);
  };

  const handleCompose = () => {
    handleAddHuik(huik);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Stack pt="20px" spacing={5}>
      <HStack justifyContent="space-between">
        <Link to="/">
          <Icon as={AiOutlineArrowLeft} h="20px" w="20px" cursor="pointer" />
        </Link>
        <Button
          colorScheme="primary"
          borderRadius="9999"
          onClick={handleCompose}
        >
          Tweet
        </Button>
      </HStack>
      <HStack alignItems="start" spacing={5}>
        <Avatar />
        <Textarea
          fontSize="20px"
          placeholder="What's happening?"
          variant="unstyled"
          resize="none"
          onChange={(e) => handleChange(e)}
        />
      </HStack>
    </Stack>
  );
};
