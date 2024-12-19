// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { App } from "./App";
import {ThemeProvider as NextThemesProvider} from "next-themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <App />
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>
);
