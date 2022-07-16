import { HStack, Icon, Image, Stack, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { DragImageStates } from "../../enum";
import { useUploadImg } from "../../hooks/useUploadImg";

interface HuikFormProps {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  drag: number;
  setDrag: any;
  setImgURL: any;
}

export const HuikForm = ({
  handleChange,
  drag,
  setDrag,
  setImgURL,
}: HuikFormProps) => {
  const {
    handleDelete,
    handleDragDrop,
    handleDragEnter,
    handleDragLeave,
    previewImg,
  } = useUploadImg(setDrag, setImgURL);

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
            <Icon as={RiCloseFill} h="17px" w="17px" onClick={handleDelete} />
          </HStack>
        </Stack>
      )}
    </VStack>
  );
};
