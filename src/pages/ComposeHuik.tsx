import { Button, HStack, Icon, Stack } from "@chakra-ui/react";
import { getDownloadURL, UploadTask, UploadTaskSnapshot } from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AvatarUser } from "../components/AvatarUser";
import { HuikForm } from "../components/HuikForm";
import { useHookerContext } from "../context/HookerContext";
import { uploadImage } from "../firebase/client";
import { useUploadHuik } from "../hooks/useUploadHuik";
import { useUploadImg } from "../hooks/useUploadImg";

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
  const [contentHuik, setContentHuik] = useState("")
  const [imgURL,setImgURL] = useState<string | null>(null)
  const {addToFirebase} = useUploadHuik(contentHuik, imgURL)
  const [drag, setDrag] = useState(DragImageStates.NONE);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [task, setTask] = useState<UploadTask | null>(null);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);
  // const [imgUploadProgress, setImgUploadProgress] = useState<
//   number | undefined
// >(undefined);

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
    setPreviewImg("")
  }

  useEffect(() => {
      if (task) {
        const onProgress = (snapshot: UploadTaskSnapshot) => {
          // const progress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // setImgUploadProgress(progress);
        };
        const onError = () => {};
        const onComplete = () => {
         getDownloadURL(task.snapshot.ref).then((downloadURL) => {
            setImgURL(downloadURL)
            console.log(downloadURL);
          });
          console.log("complete");
        };
  
        task.on(
          "state_changed",
          (snapshot) => onProgress(snapshot),
          onError,
          onComplete
        );
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
          isDisabled={
            !contentHuik.length 
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
        <HuikForm handleChange={handleChange} drag={drag} previewImg={previewImg} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave} handleDragDrop={handleDragDrop} handleDelete={handleDelete} />
      </HStack>
    </Stack>
  );
};
