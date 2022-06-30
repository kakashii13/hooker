import { Button, HStack, Icon, Stack, Textarea } from "@chakra-ui/react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AvatarUser } from "../components/AvatarUser";
import { useHookerContext } from "../context/HookerContext";
import { db } from "../firebase/client";

export const ComposeHuik = () => {
  const [huik, sethuik] = useState("");
  const { currentUser } = useHookerContext();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    sethuik(e.target.value);
  };

  const addToFirebase = async () => {
    const huikObj = {
      name: currentUser?.displayName,
      userName: currentUser?.email,
      content: huik,
      avatar: currentUser?.photoURL,
      idUser: currentUser?.uid,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
    };
    await addDoc(collection(db, "Huiks"), huikObj);
    navigate("/");
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
