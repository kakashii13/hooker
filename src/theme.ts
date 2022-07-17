import { extendTheme, theme } from "@chakra-ui/react";

export const themeChakra = extendTheme({
  colors: {
    primary: theme.colors.purple,
  },
  fonts: {
    body: `"Roboto", sans-serif`,
  },
  styles: {
    global: {
      "html, body, #root": {
        height: "100vh",
        bg: "gray.800",
        color: "white",
      },
      // svg: {
      //   cursor: "pointer",
      // },
    },
  },
});
