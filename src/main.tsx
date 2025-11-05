import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    {/* This restores your original theme setup (light by default) */}
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </HelmetProvider>
);