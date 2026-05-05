import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { PrivyProvider } from "@privy-io/react-auth";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();
const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider appId={privyAppId}>
      <RouterProvider router={router} />
    </PrivyProvider>
  </React.StrictMode>,
);
