import { Button, HStack, Icon, Stack, Textarea } from "@chakra-ui/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AvatarUser } from "../components/AvatarUser";
import { useHookerContext } from "../context/HookerContext";
import { db } from "../firebase/client";

export const ComposeHuik = () => {
  const [huik, sethuik] = useState("");
  const { handleAddHuik } = useHookerContext();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    sethuik(e.target.value);
  };

  const addToFirebase = async () => {
    // const docRef = (db, "Huiks");
    await addDoc(collection(db, "Huiks"), {
      // armar el obj del huik, dataUser, avatar, text ...
      text: huik,
    });
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
          onClick={addToFirebase}
          isDisabled={huik.length === 0 ? true : false}
        >
          Tweet
        </Button>
      </HStack>
      <HStack alignItems="start" spacing={5}>
        <AvatarUser size="md" />
        <Textarea
          fontSize="20px"
          placeholder="What's happening?"
          variant="unstyled"
          resize="none"
          minH="150px"
          autoFocus={true}
          onChange={(e) => handleChange(e)}
        />
      </HStack>
    </Stack>
  );
};
