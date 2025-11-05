import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    {/*
      THIS IS THE FIX:
      We are forcing the theme to "light" and removing "enableSystem".
      This ensures your site is ALWAYS in the original light theme,
      which will make your localhost match the lovable.dev preview.
    */}
    <ThemeProvider attribute="class" defaultTheme="light">
      <App />
    </ThemeProvider>
  </HelmetProvider>
);