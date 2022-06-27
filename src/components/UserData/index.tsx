import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";

export const UserData = () => {
  return (
    <HStack alignItems="start" spacing={4}>
      <Avatar />
      <VStack alignItems="start">
        <Text fontSize="14px" fontWeight="bold">
          Name User
        </Text>
        <Text mt="0!important">@user</Text>
      </VStack>
    </HStack>
  );
};
