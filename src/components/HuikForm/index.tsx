import { HStack, Icon, Image, Stack, Textarea, VStack } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { UploadTask, UploadTaskSnapshot } from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useHookerContext } from "../../context/HookerContext";

enum DragImageStates {
  ERROR = -1,
  NONE = 0,
  DRAG_OVER = 1,
  UPLOADING = 2,
  COMPLETE = 3,
}

export const HuikForm = () => {
  const [drag, setDrag] = useState(DragImageStates.NONE);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [task, setTask] = useState<UploadTask | null>(null);

  const { currentUser } = useHookerContext();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentHuik(e.target.value);
  };

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

  useEffect(() => {
    if (task) {
      const onProgress = (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(progress);
      };
      const onError = () => {};
      const onComplete = () => {
        console.log("onComplete");
        // leer el link de firebase para mostrar la imagen antes de "publicar"
      };

      task.on(
        "state_changed",
        (snapshot) => onProgress(snapshot),
        onError,
        onComplete
      );
    }
  }, [task]);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (!e.target) return;
        const { result } = e.target;
        if (result) {
          setImgURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  return (
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
      {imgURL && (
        <Stack position="relative">
          <Image borderRadius="15px" src={imgURL} />
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
            <Icon as={RiCloseFill} h="17px" w="17px" />
          </HStack>
        </Stack>
      )}
    </VStack>
  );
};
