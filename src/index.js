import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StyledEngineProvider injectFirst>
    <StrictMode>
      <App />
    </StrictMode>
  </StyledEngineProvider>
);
