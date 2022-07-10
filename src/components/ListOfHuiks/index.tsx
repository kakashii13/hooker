import { VStack } from "@chakra-ui/react";
import { useHookerContext } from "../../context/HookerContext";
import { Huik } from "../Huik";
import { HuikLink } from "../HuikLink";

export const ListOfHuiks = () => {
  const { huiks } = useHookerContext();
  return (
    <VStack w="100%" minH="100vh">
      {huiks?.map(
        ({
          avatar,
          content,
          createdAt,
          idUser,
          likesCount,
          sharedCount,
          userName,
          id,
          name,
        }) => (
          <HuikLink id={id} userName={userName} key={id}>
            <Huik
              name={name}
              avatar={avatar}
              content={content}
              createdAt={createdAt}
              idUser={idUser}
              likesCount={likesCount}
              sharedCount={sharedCount}
              userName={userName}
              id={id}
            />
          </HuikLink>
        )
      )}
    </VStack>
  );
};
