import { HStack, Text, VStack } from "@chakra-ui/react";
import { useHookerContext } from "../../context/HookerContext";
import { AvatarUser } from "../AvatarUser";

export const UserData = () => {
  const { currentUser } = useHookerContext();
  return (
    <HStack alignItems="start" spacing={4}>
      <AvatarUser size="md" />
      <VStack alignItems="start">
        <Text fontSize="14px" fontWeight="bold">
          {currentUser?.displayName}
        </Text>
        <Text mt="0!important" color="#8b98a5">{`@${currentUser?.email}`}</Text>
      </VStack>
    </HStack>
  );
};
