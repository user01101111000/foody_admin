import { createRoot } from "react-dom/client";
import "./style/reset/reset.css";
import "./style/index.css";
import "./i18n.js";
import AllProviders from "./helpers/providers.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  <AllProviders>
    <RouterProvider router={router} />
  </AllProviders>
);
