import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
);
