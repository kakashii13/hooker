import { Icon, Image, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import { RiCloseFill, RiImageAddLine } from "react-icons/ri";
import { DragImageStates } from "../../enum";
import { useUploadImg } from "../../hooks/useUploadImg";
import { HuikFormProps } from "../../types";
import { ButtonEffect } from "../ButtonEffect";

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
    handleInput,
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
          <ButtonEffect isBg={true} isPosition={true}>
            <Icon as={RiCloseFill} h="17px" w="17px" onClick={handleDelete} />
          </ButtonEffect>
        </Stack>
      )}
      <Stack
        borderTop="1px solid #38444d"
        w="100%"
        pt="10px"
        position="relative"
      >
        <Input
          type="file"
          id="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => handleInput(e)}
        />
        <label htmlFor="file">
          <ButtonEffect isBg={false} isPosition={true}>
            <Icon as={RiImageAddLine} color="purple.500" h="20px" w="20px" />
          </ButtonEffect>
        </label>
      </Stack>
    </VStack>
  );
};
