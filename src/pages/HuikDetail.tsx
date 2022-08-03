import { Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { Huik } from "../components/Huik";
import { useSingleHuik } from "../hooks/useSingleHuik";
import { BsArrowLeftShort } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { useHookerContext } from "../context/HookerContext";

export const HuikDetail = () => {
  const { huikId = "" } = useParams();
  const { currentUser } = useHookerContext();
  const { huik } = useSingleHuik(huikId);

  return (
    <VStack minH="93%">
      <Helmet>
        <title>{`${currentUser?.displayName} on Hooker`}</title>
      </Helmet>
      <HStack p="16px" w="100%" spacing={6}>
        <Link to="/home">
          <Icon as={BsArrowLeftShort} w="30px" h="30px" />
        </Link>
        <Heading as="h2" fontSize="20px">
          Huik
        </Heading>
      </HStack>
      {huik && (
        <Huik
          name={huik.name}
          avatar={huik.avatar}
          content={huik.content}
          createdAt={huik.createdAt}
          idUser={huik.idUser}
          likesCount={huik.likesCount}
          sharedCount={huik.sharedCount}
          userName={huik.userName}
          id={huik.id}
          contentImg={huik.contentImg}
          isDetail={true}
        />
      )}
    </VStack>
  );
};
