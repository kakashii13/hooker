import { Heading, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { Huik } from "../components/Huik";
import { useSingleHuik } from "../hooks/useSingleHuik";
import { BsArrowLeftShort } from "react-icons/bs";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export const HuikDetail = () => {
  const [date, setDate] = useState("");
  const { huikId = "" } = useParams();
  const { huik } = useSingleHuik(huikId);

  useEffect(() => {
    const getDate = () => {
      if (huik) {
        const { createdAt } = huik;
        const date = new Date(createdAt);
        const dateFormat = format(date, "k:mm a · MMM d, yyyy");
        setDate(dateFormat);
      }
    };

    getDate();
  }, [huikId, huik]);

  return (
    <VStack>
      <HStack p="16px" w="100%" spacing={6}>
        <Link to="/">
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
        />
      )}
      <Text
        borderBottom="1px solid #38444d"
        px="16px"
        fontSize="15px"
        color="#8b98a5"
        w="100%"
      >
        {date}
      </Text>
      <HStack></HStack>
    </VStack>
  );
};
