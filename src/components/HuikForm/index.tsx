import { HStack, Icon, Image, Stack, Textarea, VStack } from "@chakra-ui/react";
import { ChangeEvent } from "react";
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
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const HuikForm = ({ handleChange }: HuikFormProps) => {};
