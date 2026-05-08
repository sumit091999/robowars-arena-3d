import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { PrivyProvider } from "@privy-io/react-auth";
import { getRouter } from "./router";
import robowarLogo from "./assets/RoboWar_logo.png";
import "./styles.css";

const router = getRouter();
const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PrivyProvider
    appId={privyAppId}
    config={{
      appearance: {
        theme: "#160912",
        accentColor: "#06d9ff",
        logo: robowarLogo,
        landingHeader: "CONNECT WALLET",
        loginMessage: "Choose a wallet to enter the arena.",
        walletList: ["detected_ethereum_wallets", "coinbase_wallet", "wallet_connect"],
      },
      loginMethods: ["email", "google", "wallet"],
      embeddedWallets: {
        ethereum: {
          createOnLogin: "users-without-wallets",
        },
      },
    }}
  >
    <RouterProvider router={router} />
  </PrivyProvider>,
);
