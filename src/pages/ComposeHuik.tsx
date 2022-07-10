import { Button, HStack, Icon, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AvatarUser } from "../components/AvatarUser";
import { HuikForm } from "../components/HuikForm";
import { useHookerContext } from "../context/HookerContext";

enum ComposeStatus {
  LOADING = 1,
  SUCCESS = 2,
  ERROR = -1,
}

export const ComposeHuik = () => {
  const [contentHuik, setContentHuik] = useState("");
  const [status, setStatus] = useState<number>();
  const [imgUploadProgress, setImgUploadProgress] = useState<
    number | undefined
  >(undefined);
  const [imgURL, setImgURL] = useState<string | ArrayBuffer | undefined>(
    undefined
  );
  const { currentUser } = useHookerContext();

  return (
    <Stack pt="20px" spacing={5} px="16px">
      {/* {drag === DragImageStates.UPLOADING && (
        <Progress
          value={imgUploadProgress}
          size="xs"
          borderRadius="999"
          colorScheme="primary"
        />
      )} */}
      <HStack justifyContent="space-between">
        <Link to="/">
          <Icon as={AiOutlineArrowLeft} h="20px" w="20px" cursor="pointer" />
        </Link>
        <Button
          colorScheme="primary"
          borderRadius="9999"
          onClick={addToFirebase}
          isDisabled={
            !contentHuik.length || !imgURL || status === ComposeStatus.LOADING
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
        <HuikForm />
      </HStack>
    </Stack>
  );
};
