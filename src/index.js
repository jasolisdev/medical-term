import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./styles/theme";
import App from "./App";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
);
