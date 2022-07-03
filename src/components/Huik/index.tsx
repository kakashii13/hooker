import { HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useTimeago } from "../../hooks/useTimeago";
import { HuikProp } from "../../types";
import { AvatarUser } from "../AvatarUser";

export const Huik = ({ content, name, userName, id, createdAt }: HuikProp) => {
  const timeago = useTimeago(createdAt);

  const indexOf = userName.lastIndexOf("@");
  const userNameNormalize = userName.slice(0, indexOf);

  const handleClick = () => {
    console.log("hello!!!!");
  };

  return (
    <Stack
      w="100%"
      _hover={{ bg: "#232e39" }}
      mt="0!important"
      px="16px"
      borderBottom="1px solid #38444d"
      cursor="pointer"
    >
      <Link to={`/${userName}/status/${id}`}>
        <HStack
          justifyContent="space-between"
          alignItems="start"
          mt="0!important"
          p="12px 5px"
        >
          <Stack spacing={5}>
            <HStack alignItems="start" spacing={4}>
              <AvatarUser size="md" />
              <VStack alignItems="start">
                <Text fontWeight="bold" fontSize="14px">
                  {name}
                </Text>
                <HStack
                  alignItems="center"
                  fontSize="14px"
                  color="#8b98a5"
                  mt="0!important"
                >
                  <Text>{`@${userNameNormalize}`}</Text>
                  <Text>{`· ${timeago}`}</Text>
                </HStack>
              </VStack>
            </HStack>
            <Text>{content}</Text>
          </Stack>
          <HStack
            justifyContent="space-between"
            p="10px"
            borderRadius="9999"
            _hover={{ bg: "gray.700", transition: "0.5s" }}
            cursor="pointer"
            onClick={handleClick}
          >
            <Icon as={RiDeleteBin6Line} color="red.500" />
          </HStack>
          /
        </HStack>
      </Link>
    </Stack>
  );
};
