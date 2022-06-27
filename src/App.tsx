import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HookerProvider } from "./context/HookerContext";
import { ComposeHuik } from "./pages/ComposeHuik";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { themeChakra } from "./theme";

function App() {
  return (
    <ChakraProvider theme={themeChakra}>
      <HookerProvider>
        <Container h="100%">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/compose/huik" element={<ComposeHuik />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </HookerProvider>
    </ChakraProvider>
  );
}

export default App;
