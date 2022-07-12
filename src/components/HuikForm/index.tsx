import { HStack, Icon, Image, Stack, Textarea, VStack } from "@chakra-ui/react";
import { ChangeEvent} from "react";
import { RiCloseFill } from "react-icons/ri";
import { useUploadImg } from "../../hooks/useUploadImg";
enum DragImageStates {
  ERROR = -1,
  NONE = 0,
  DRAG_OVER = 1,
  UPLOADING = 2,
  COMPLETE = 3,
}

interface HuikFormProps {
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  FUCK YOU TYPESCRIPTTTTTTTT
}




export const HuikForm = ({handleChange}: HuikFormProps    )  => {
  
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
            <Icon as={RiCloseFill} h="17px" w="17px" onClick={handleDelete}/>
          </HStack>
        </Stack>
      )}
    </VStack>
  );
};
