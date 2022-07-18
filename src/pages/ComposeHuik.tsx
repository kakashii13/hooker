import { Button, HStack, Icon, Stack } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AvatarUser } from "../components/AvatarUser";
import { useHookerContext } from "../context/HookerContext";
import { ComposeStatus, DragImageStates } from "../enum";
import { addToFirebase } from "../firebase/client";
import { HuikForm } from "../components/HuikForm";
import { Helmet } from "react-helmet";
import { ButtonEffect } from "../components/ButtonEffect";

export const ComposeHuik = () => {
  const { currentUser } = useHookerContext();
  const [contentHuik, setContentHuik] = useState("");
  const [status, setStatus] = useState(ComposeStatus.NONE);
  const [drag, setDrag] = useState(DragImageStates.NONE);
  const [imgURL, setImgURL] = useState<string | null>(null);

  let navigate = useNavigate();

  const handleAddToFirebase = async () => {
    if (!currentUser) return;
    const { displayName, email, photoURL, uid } = currentUser;
    const huik = {
      name: displayName,
      userName: email,
      content: contentHuik,
      contentImg: imgURL,
      avatar: photoURL,
      idUser: uid,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
    };
    setStatus(ComposeStatus.LOADING);
    await addToFirebase(huik);
    setStatus(ComposeStatus.SUCCESS);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentHuik(e.target.value);
  };

  return (
    <Stack pt="20px" spacing={5} px="16px" minH="93%">
      <Helmet>
        <title>Compose new Huik / Hooker</title>
      </Helmet>
      <HStack justifyContent="space-between">
        <Link to="/">
      <ButtonEffect>
      <Icon as={BsArrowLeftShort} h="30px" w="30px" cursor="pointer" />
      </ButtonEffect>
        </Link>
        <Button
          colorScheme="primary"
          borderRadius="9999"
          onClick={handleAddToFirebase}
          isDisabled={
            (!contentHuik.length && imgURL === null) ||
            (contentHuik.length > 0 && drag === DragImageStates.UPLOADING) ||
            status === ComposeStatus.LOADING
              ? true
              : false
          }
          isLoading={
            drag === DragImageStates.UPLOADING ||
            status === ComposeStatus.LOADING
              ? true
              : false
          }
        >
          Huik
        </Button>
      </HStack>
      <HStack alignItems="start" spacing={5}>
        <AvatarUser
          size="md"
          avatar={currentUser ? currentUser.photoURL : ""}
        />
        <HuikForm
          handleChange={handleChange}
          drag={drag}
          setDrag={setDrag}
          setImgURL={setImgURL}
        />
      </HStack>
    </Stack>
  );
};
