import {Button,HStack,Icon,Stack } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AvatarUser } from "../components/AvatarUser";
import { HuikForm } from "../components/HuikForm";
import { useHookerContext } from "../context/HookerContext";
import { ComposeStatus, DragImageStates } from "../enum";
import { addToFirebase } from "../firebase/client";
import { useUploadImg } from "../hooks/useUploadImg";


export const ComposeHuik = () => {
  const { currentUser } = useHookerContext();
  const [contentHuik, setContentHuik] = useState("");
  const [status, setStatus] = useState(ComposeStatus.NONE)
  const {drag, imgURL} = useUploadImg()
  

 let navigate = useNavigate()

  const handleAddToFirebase = async () => {
    if(!currentUser) return; 
    const {displayName, email, photoURL, uid} = currentUser
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
    await addToFirebase(huik)
    setStatus(ComposeStatus.SUCCESS);
    navigate("/");
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentHuik(e.target.value)
  }

  return (
    <Stack pt="20px" spacing={5} px="16px">
      <HStack justifyContent="space-between">
        <Link to="/">
          <Icon as={AiOutlineArrowLeft} h="20px" w="20px" cursor="pointer" />
        </Link>
        <Button
          colorScheme="primary"
          borderRadius="9999"
          onClick={handleAddToFirebase}
          isDisabled={!contentHuik.length || status === ComposeStatus.LOADING || drag === DragImageStates.UPLOADING?  true : false}
        >
          Huik
        </Button>
      </HStack>
      <HStack alignItems="start" spacing={5}>
        <AvatarUser
          size="md"
          avatar={currentUser ? currentUser.photoURL : ""}
        />
       <HuikForm handleChange={handleChange} />
      </HStack>
    </Stack>
  );
};
