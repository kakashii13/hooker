import {
  Button,
  HStack,
  Icon,
  Image,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  getDownloadURL,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AvatarUser } from "../components/AvatarUser";
import { useHookerContext } from "../context/HookerContext";
import { uploadImage } from "../firebase/client";
import { useUploadHuik } from "../hooks/useUploadHuik";

enum ComposeStatus {
  LOADING = 1,
  SUCCESS = 2,
  ERROR = -1,
}

enum DragImageStates {
  ERROR = -1,
  NONE = 0,
  DRAG_OVER = 1,
  UPLOADING = 2,
  COMPLETE = 3,
}

export const ComposeHuik = () => {
  const { currentUser } = useHookerContext();
  const [contentHuik, setContentHuik] = useState("");
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [drag, setDrag] = useState(DragImageStates.NONE);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [task, setTask] = useState<UploadTask | null>(null);
  const [previewImg, setPreviewImg] = useState<
    string | ArrayBuffer | undefined
  >(undefined);

  const { addToFirebase } = useUploadHuik(contentHuik, imgURL);

  const handleDragEnter = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDrag(DragImageStates.DRAG_OVER);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDrag(DragImageStates.NONE);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDrag(DragImageStates.UPLOADING);
    const file = e.dataTransfer.files[0];
    setFile(file);
    const taskTest = uploadImage(file);
    setTask(taskTest);
  };

  const handleDelete = () => {
    setPreviewImg("");
  };

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then((downloadImg) => {
          setImgURL(downloadImg);
        });
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  // show preview img
  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (!e.target) return;
        const { result } = e.target;
        if (result) {
          setPreviewImg(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentHuik(e.target.value);
  };

  return (
    <Stack pt="20px" spacing={5} px="16px">
      <HStack justifyContent="space-between">
        <Link to="/">
          <Icon as={AiOutlineArrowLeft} h="20px" w="20px" cursor="pointer" />
        </Link>
        <Button
          colorScheme="primary"
          borderRadius="9999"
          onClick={addToFirebase}
          isDisabled={!contentHuik.length ? true : false}
        >
          Huik
        </Button>
      </HStack>
      <HStack alignItems="start" spacing={5}>
        <AvatarUser
          size="md"
          avatar={currentUser ? currentUser.photoURL : ""}
        />
        <VStack w="100%">
          <Textarea
            border={
              drag === DragImageStates.DRAG_OVER
                ? "2px dashed #805AD5"
                : "2px dashed transparent"
            }
            fontSize="20px"
            placeholder="What's happening?"
            variant="unstyled"
            resize="none"
            // minH="150px"
            autoFocus={true}
            onChange={(e) => handleChange(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDragDrop(e)}
          />
          {previewImg && (
            <Stack position="relative">
              <Image borderRadius="15px" src={previewImg} />
              <HStack
                justifyContent="space-between"
                borderRadius="9999"
                _hover={{ bg: "#23282c", transition: "0.5s" }}
                cursor="pointer"
                position="absolute"
                left="1"
                top="1"
                mt="0!important"
                bg="blackAlpha.300"
                p="8px"
              >
                <Icon
                  as={RiCloseFill}
                  h="17px"
                  w="17px"
                  onClick={handleDelete}
                />
              </HStack>
            </Stack>
          )}
        </VStack>
      </HStack>
    </Stack>
  );
};
