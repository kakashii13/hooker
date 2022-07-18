import { Heading, HStack, Icon } from "@chakra-ui/react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useHookerContext } from "../../context/HookerContext";
import { useAuth } from "../../hooks/useAuth";
import { AvatarUser } from "../AvatarUser";
import { ButtonEffect } from "../ButtonEffect";

export const Header = () => {
  const { currentUser } = useHookerContext();
  const {logout} = useAuth()
  let navigate = useNavigate()

  const handleLogout = async() => {
    await logout()
    navigate("/login")
  }


  return (
    <HStack
      minH="32px"
      w="100%"
      px="16px"
      pt="10px"
      borderBottom="1px solid #38444d"
      justifyContent="space-between"
    >
      <HStack spacing={5} h="52px">
        <AvatarUser
          size="sm"
          avatar={currentUser ? currentUser?.photoURL : ""}
        />
        <Heading fontSize="17px">Home</Heading>
      </HStack>
    <ButtonEffect isPosition={false}>
    <Icon as={RiLogoutCircleRLine} onClick={handleLogout}/>
    </ButtonEffect>
    </HStack>
  );
};
