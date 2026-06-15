import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SpotifyAuthView from "./Views/SpotifyAuthView.tsx";
import AppView from "./Views/AppView.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppView,
  },
  {
    path: "/spotify/auth",
    Component: SpotifyAuthView,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
