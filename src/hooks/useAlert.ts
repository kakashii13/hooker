import { useToast } from "@chakra-ui/react";

export const useAlert = () => {
  const toast = useToast();

  const createAlert = () => {
    toast({
      title: "Your Huik was deleted.",
      // description: "We've created your account for you.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return createAlert;
};
