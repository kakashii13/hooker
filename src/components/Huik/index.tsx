import { HStack, Icon, Image, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useHookerContext } from "../../context/HookerContext";
import { deleteHuik } from "../../firebase/client";
import { useAlert } from "../../hooks/useAlert";
import { useTimeago } from "../../hooks/useTimeAgo";
import { HuikProp } from "../../types";
import { AvatarUser } from "../AvatarUser";

export const Huik = ({
  content,
  name,
  userName,
  id,
  createdAt,
  avatar,
  idUser,
  contentImg,
}: HuikProp) => {
  const { currentUser } = useHookerContext();
  const timeago = useTimeago(createdAt) 
  
  const createAlert = useAlert();
  let navigate = useNavigate() 

  const indexOf = userName.lastIndexOf("@");
  const userNameNormalize = userName.slice(0, indexOf);

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    deleteHuik(id);
    createAlert();
  };

  const handleLink = () => {
    navigate(`/${userName}/status/${id}`)
  }

  return (
    <Stack w="100%"
    _hover={{ bg: "#232e39" }}
    borderBottom="1px solid #38444d"
    mt="0!important"
    cursor="pointer"
    position="relative"
    px="16px"
    onClick={handleLink}
    >
      <HStack
        justifyContent="space-between"
        alignItems="start"
        mt="0!important"
        p="12px 5px" 
      >
        <Stack spacing={3}>
          <HStack alignItems="start" spacing={4}>
            <AvatarUser size="md" avatar={avatar} />
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
                <Text>{`@${userNameNormalize} `}</Text>
                <span>
                ·
                </span>
    <Link to={`/${userName}/status/${id}`}>
    <Stack _hover={{
      textDecoration: "underline"
    }}>
    <time>{`${timeago}`}</time>
    </Stack>
    </Link>
              </HStack>
            </VStack>
          </HStack>
          <Text>{content}</Text>
          <Stack>
            <Image src={contentImg} borderRadius="10px" />
          </Stack>
        </Stack>
      </HStack>
      {idUser === currentUser?.uid && (
        <HStack
          justifyContent="space-between"
          p="10px"
          borderRadius="9999"
          _hover={{ bg: "gray.700", transition: "0.5s" }}
          cursor="pointer"
          position="absolute"
          zIndex="1000"
          right="5"
          onClick={(e) => handleDelete(e)}
        >
          <Icon as={RiDeleteBin6Line} color="red.500" />
        </HStack>
      )}
    </Stack>
  );
};
