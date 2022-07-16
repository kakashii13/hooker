import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HookerProvider } from "./context/HookerContext";
import { ComposeHuik } from "./pages/ComposeHuik";
import { HuikDetail } from "./pages/HuikDetail";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { themeChakra } from "./theme";
import "@fontsource/roboto";
import { PrivateRoute } from "./components/PrivateRoute";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <ChakraProvider theme={themeChakra}>
      <HookerProvider>
        <Container p="0" h="100%" borderX="1px solid #38444d">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
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
          <NavBar />
        </Container>
      </HookerProvider>
    </ChakraProvider>
  );
}

export default App;
