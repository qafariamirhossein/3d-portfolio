import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { initGA } from "./utils/analytics";

// Initialize Google Analytics
initGA();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
