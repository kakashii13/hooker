import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HookerProvider } from "./context/HookerContext";
import { ComposeHuik } from "./pages/ComposeHuik";
import { HuikDetail } from "./pages/HuikDetail";
import { Home } from "./pages/Home";
import { themeChakra } from "./theme";
import { PrivateRoute } from "./components/PrivateRoute";
import { Landing } from "./pages/Landing";
import "@fontsource/roboto";

function App() {
  return (
    <ChakraProvider theme={themeChakra}>
      <HookerProvider>
        <Container p="0" h="100%">
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Landing />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/:user/status/:huikId"
                element={
                  <PrivateRoute>
                    <HuikDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/compose/huik"
                element={
                  <PrivateRoute>
                    <ComposeHuik />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </Container>
      </HookerProvider>
    </ChakraProvider>
  );
}

export default App;
