import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    {/* This forces the dark theme and removes the system check */}
    <ThemeProvider attribute="class" defaultTheme="dark">
      <App />
    </ThemeProvider>
  </HelmetProvider>
);