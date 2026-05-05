import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { PrivyProvider } from "@privy-io/react-auth";
import { getRouter } from "./router";
import robowarLogo from "./assets/RoboWar_logo.png";
import "./styles.css";

const router = getRouter();
const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          theme: "#160912",
          accentColor: "#06d9ff",
          logo: <img src={robowarLogo} alt="Robowars" />,
          landingHeader: "CONNECT WALLET",
          loginMessage: "Choose a wallet to enter the arena.",
          walletList: ["detected_ethereum_wallets", "coinbase_wallet", "wallet_connect"],
        },
        loginMethods: ["wallet"],
      }}
    >
      <RouterProvider router={router} />
    </PrivyProvider>
  </React.StrictMode>,
);
