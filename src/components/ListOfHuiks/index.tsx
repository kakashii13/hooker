import { VStack } from "@chakra-ui/react";
import { useHookerContext } from "../../context/HookerContext";
import { Huik } from "../Huik";

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
          <Huik
            key={id}
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
        )
      )}
    </VStack>
  );
};
