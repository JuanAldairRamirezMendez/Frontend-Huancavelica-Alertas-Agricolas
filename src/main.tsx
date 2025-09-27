

  import { createRoot } from "react-dom/client";
  import App from "./App";
  import { BrowserRouter as Router } from "react-router-dom";
  import { LanguageProvider } from "./context/LanguageContext";
  import "./index.css";

  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(
      <LanguageProvider>
        <Router>
          <App />
        </Router>
      </LanguageProvider>
    );
  }
  