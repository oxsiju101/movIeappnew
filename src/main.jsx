import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GenreProvider } from "./Context/GenreContext.jsx";

createRoot(document.getElementById("root")).render(
  <GenreProvider>
    <App />
  </GenreProvider>
);
