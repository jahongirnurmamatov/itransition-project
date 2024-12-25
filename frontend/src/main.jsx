import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/themeprovider/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
