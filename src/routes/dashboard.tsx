import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { usePrivy, useSignMessage, useWallets } from "@privy-io/react-auth";
import type {
  ConnectedWallet,
  LinkedAccountWithMetadata,
  User as PrivyUser,
} from "@privy-io/react-auth";
import {
  Activity,
  Database,
  ExternalLink,
  Menu,
  RefreshCw,
  Shield,
  Trash2,
  Unplug,
  X,
} from "lucide-react";
import roboLogo from "@/assets/Robo-logo.png";
import heroImg from "@/assets/Background 3.png";
import kultLogo from "@/assets/kult-0G-logo.png";
import documentationPdf from "@/assets/Documentation.pdf";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const zeroGBackendUrl = (import.meta.env.VITE_ZG_BACKEND ?? "").replace(/\/$/, "");
const robowarBackendUrl = (import.meta.env.VITE_ROBOWAR_BACKEND_URL ?? "").replace(/\/$/, "");
const zeroGJwtStoragePrefix = "robowars:zg-jwt:";

type ZeroGLogLevel = "info" | "success" | "error";
type ZeroGLogEntry = {
  id: string;
  time: string;
  level: ZeroGLogLevel;
  message: string;
};
type ZeroGNetworkService = {
  label?: string;
  status?: string;
  latencyMs?: number;
  endpoint?: string;
};
type ZeroGNetworkResponse = {
  overall?: string;
  services?: Record<string, ZeroGNetworkService>;
  contracts?: {
    playerSaveAnchor?: string | null;
    explorerUrl?: string | null;
  };
};
type ZeroGDashboardResponse = {
  wallet?: string;
  summary?: {
    totalSaves?: number;
    finalizedSaves?: number;
    anchoredSaves?: number;
    totalDataStored?: string;
  };
  trustScore?: {
    score?: number;
    label?: string;
    description?: string;
  };
  latestSave?: {
    saveIndex?: number;
    rootHash?: string;
    fileSize?: string;
    createdAt?: string;
  } | null;
};
type ZeroGActivityEvent = {
  id?: string;
  type?: string;
  title?: string;
  description?: string;
  status?: string;
  timestamp?: string;
  explorerUrl?: string | null;
};
type ZeroGActivityResponse = {
  events?: ZeroGActivityEvent[];
};
type ZeroGNonceResponse = {
  nonce?: string;
  message?: string;
};
type ZeroGLoginResponse = {
  token?: string;
  expiresIn?: number;
};
type ZeroGStoredSession = {
  token: string;
  expiresAt: number;
};
type RobowarLoginType = "google" | "email" | "connect_wallet";
type RobowarTransactionHistoryItem = {
  id: string;
  walletAddress: string;
  loginType: RobowarLoginType;
  storageRoot: string;
  storageTransactionHash: string | null;
  indexTransactionHash: string;
  indexBlockNumber: number;
  indexBlockTimestamp: number | null;
  indexedAt: string | null;
  indexExplorerUrl: string | null;
  createdAt: string | null;
};
type RobowarTransactionHistoryResponse = {
  history?: RobowarTransactionHistoryItem[];
  meta?: {
    contractAddress?: string;
    explorerUrl?: string;
  };
};

function nowLogTime() {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function truncateHash(value?: string | null, head = 8, tail = 6) {
  if (!value) return "Pending";
  if (value.length <= head + tail + 3) return value;
  return `${value.slice(0, head)}...${value.slice(-tail)}`;
}

function formatHistoryDate(value?: string | null) {
  if (!value) return "Pending";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatHistoryTime(value?: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getZeroGExplorerUrl(explorerUrl?: string) {
  return (explorerUrl || "https://chainscan.0g.ai").replace(/\/$/, "");
}

function getZeroGAddressUrl(address?: string, explorerUrl?: string) {
  return address ? `${getZeroGExplorerUrl(explorerUrl)}/address/${address}` : null;
}

function getZeroGTransactionUrl(hash?: string | null, explorerUrl?: string) {
  return hash ? `${getZeroGExplorerUrl(explorerUrl)}/tx/${hash}` : null;
}

function zeroGSessionKey(walletAddress: string) {
  return `${zeroGJwtStoragePrefix}${walletAddress.toLowerCase()}`;
}

function getStoredZeroGSession(walletAddress: string) {
  try {
    const stored = window.localStorage.getItem(zeroGSessionKey(walletAddress));
    if (!stored) return null;

    const session = JSON.parse(stored) as ZeroGStoredSession;
    if (!session.token || session.expiresAt < Date.now() + 60_000) {
      window.localStorage.removeItem(zeroGSessionKey(walletAddress));
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function storeZeroGSession(walletAddress: string, token: string, expiresIn = 7 * 24 * 60 * 60) {
  const session: ZeroGStoredSession = {
    token,
    expiresAt: Date.now() + expiresIn * 1000,
  };

  window.localStorage.setItem(zeroGSessionKey(walletAddress), JSON.stringify(session));
}

function resolveRobowarWalletAddress(user: PrivyUser) {
  const linkedWallet = user.linkedAccounts.find(
    (account): account is Extract<LinkedAccountWithMetadata, { type: "wallet" }> =>
      account.type === "wallet",
  );

  return user.wallet?.address ?? linkedWallet?.address ?? null;
}

function getZeroGWallet(wallets: ConnectedWallet[], walletAddress?: string | null) {
  const normalizedWallet = walletAddress?.toLowerCase();

  if (normalizedWallet) {
    const matchedWallet = wallets.find(
      (wallet) => wallet.address.toLowerCase() === normalizedWallet,
    );
    if (matchedWallet) return matchedWallet;
  }

  return wallets[0] ?? null;
}

async function fetchZeroGJson<T>(path: string, token?: string) {
  if (!zeroGBackendUrl) throw new Error("VITE_ZG_BACKEND is not configured.");

  const response = await fetch(`${zeroGBackendUrl}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  const data = (await response.json().catch(() => null)) as T | null;

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String(data.error)
        : response.statusText;
    throw new Error(message || `0G request failed with status ${response.status}`);
  }

  return data as T;
}

async function authenticateZeroGWallet({
  walletAddress,
  connectedWallet,
  signEmbeddedMessage,
  addLog,
}: {
  walletAddress: string;
  connectedWallet?: ConnectedWallet | null;
  signEmbeddedMessage: (message: string) => Promise<string>;
  addLog: (level: ZeroGLogLevel, message: string) => void;
}) {
  const storedSession = getStoredZeroGSession(walletAddress);
  if (storedSession) {
    addLog("success", "Using cached ZeroDash JWT.");
    return storedSession.token;
  }

  addLog("info", `Requesting nonce for ${truncateHash(walletAddress, 10, 6)}`);
  const nonceResponse = await fetchZeroGJson<ZeroGNonceResponse>(
    `/auth/nonce?wallet=${encodeURIComponent(walletAddress)}`,
  );

  if (!nonceResponse?.nonce || !nonceResponse.message) {
    throw new Error("Nonce response was missing signing data.");
  }

  addLog("success", "Nonce received from backend.");
  addLog("info", "Signing message with wallet...");
  const signature = connectedWallet
    ? await connectedWallet.sign(nonceResponse.message)
    : await signEmbeddedMessage(nonceResponse.message);

  addLog("info", "Signature obtained. Exchanging for JWT...");
  const loginResponse = await fetch(`${zeroGBackendUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      wallet: walletAddress,
      nonce: nonceResponse.nonce,
      signature,
    }),
  });
  const loginData = (await loginResponse.json().catch(() => null)) as ZeroGLoginResponse | null;

  if (!loginResponse.ok || !loginData?.token) {
    throw new Error(`0G login failed with status ${loginResponse.status}`);
  }

  storeZeroGSession(walletAddress, loginData.token, loginData.expiresIn);
  addLog("success", "Authentication complete. JWT valid for 7 days.");

  return loginData.token;
}

async function fetchRobowarTransactionHistory(user: PrivyUser) {
  if (!robowarBackendUrl) return { history: [] } satisfies RobowarTransactionHistoryResponse;

  const walletAddress = resolveRobowarWalletAddress(user);
  const params = new URLSearchParams({ privyUserId: user.id, limit: "100" });

  if (walletAddress) params.set("walletAddress", walletAddress);

  const response = await fetch(`${robowarBackendUrl}/api/users/history?${params.toString()}`);
  const result = (await response
    .json()
    .catch(() => null)) as RobowarTransactionHistoryResponse | null;

  if (!response.ok) {
    throw new Error(`Robowar transaction history failed with status ${response.status}`);
  }

  return result ?? { history: [] };
}

function DisconnectButton({ onComplete }: { onComplete?: () => void }) {
  const { ready, authenticated, logout } = usePrivy();

  if (!authenticated) {
    return null;
  }

  return (
    <button
      type="button"
      disabled={!ready}
      aria-label="Disconnect"
      title="Disconnect"
      onClick={() => {
        logout();
        onComplete?.();
      }}
      className="grid h-9 w-9 place-items-center rounded-full border border-accent/50 bg-secondary/70 text-accent shadow-[0_0_14px_oklch(0.78_0.18_200_/_0.18)] transition hover:border-primary hover:bg-primary/15 hover:text-foreground hover:shadow-[0_0_18px_oklch(0.65_0.27_5_/_0.32)] disabled:pointer-events-none disabled:opacity-50"
    >
      <Unplug className="h-4 w-4" />
    </button>
  );
}

function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 backdrop-blur-md bg-background/40 border-b border-primary/20">
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="flex items-center gap-3 justify-self-start">
          <img src={roboLogo} alt="Robowars Logo" className="h-8 w-auto object-contain" />
        </Link>
        <nav className="hidden items-center gap-8 justify-self-center text-sm font-display tracking-widest text-muted-foreground md:flex">
          <Link to="/dashboard" className="hover:text-primary transition">
            DASHBOARD
          </Link>
          <a href="/#trailer" className="hover:text-primary transition">
            TRAILER
          </a>
          <a
            href={documentationPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            MANUAL
          </a>
        </nav>
        <div className="hidden items-center gap-5 justify-self-end md:flex">
          <img src={kultLogo} alt="Kult Games" className="h-8 w-auto object-contain opacity-80" />
          <DisconnectButton />
        </div>

        <button
          className="justify-self-end text-foreground transition hover:text-primary md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-primary/20 p-6 flex flex-col gap-6 shadow-2xl z-50">
          <Link
            to="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-display tracking-widest text-foreground hover:text-primary transition"
          >
            DASHBOARD
          </Link>
          <a
            href="/#trailer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-display tracking-widest text-foreground hover:text-primary transition"
          >
            TRAILER
          </a>
          <a
            href={documentationPdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-display tracking-widest text-foreground hover:text-primary transition"
          >
            MANUAL
          </a>
          <div className="mt-1">
            <DisconnectButton onComplete={() => setIsMobileMenuOpen(false)} />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <img src={kultLogo} alt="Kult Games" className="h-8 w-auto object-contain opacity-80" />
          </div>
        </div>
      )}
    </header>
  );
}

function Dashboard() {
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const { signMessage } = useSignMessage();
  const walletsRef = useRef<ConnectedWallet[]>([]);
  const [network, setNetwork] = useState<ZeroGNetworkResponse | null>(null);
  const [dashboard, setDashboard] = useState<ZeroGDashboardResponse | null>(null);
  const [activity, setActivity] = useState<ZeroGActivityEvent[]>([]);
  const [history, setHistory] = useState<RobowarTransactionHistoryItem[]>([]);
  const [historyMeta, setHistoryMeta] = useState<RobowarTransactionHistoryResponse["meta"]>();
  const [logs, setLogs] = useState<ZeroGLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    walletsRef.current = wallets;
  }, [wallets]);

  const addLog = useCallback((level: ZeroGLogLevel, message: string) => {
    setLogs((currentLogs) => [
      { id: `${Date.now()}-${currentLogs.length}`, time: nowLogTime(), level, message },
      ...currentLogs,
    ]);
  }, []);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const networkData = await fetchZeroGJson<ZeroGNetworkResponse>("/0g/network");
      setNetwork(networkData);

      if (!authenticated || !user) {
        setDashboard(null);
        setActivity([]);
        setHistory([]);
        return;
      }

      const walletAddress = resolveRobowarWalletAddress(user);
      if (!walletAddress) throw new Error("Connect a wallet to load protected dashboard data.");

      const connectedWallet = getZeroGWallet(walletsRef.current, walletAddress);
      const token = await authenticateZeroGWallet({
        walletAddress,
        connectedWallet,
        addLog,
        signEmbeddedMessage: async (message) => {
          const result = await signMessage({ message }, { address: walletAddress });
          return result.signature;
        },
      });

      addLog("info", "Fetching dashboard data...");
      const [dashboardData, activityData, historyData] = await Promise.all([
        fetchZeroGJson<ZeroGDashboardResponse>("/0g/dashboard", token),
        fetchZeroGJson<ZeroGActivityResponse>("/0g/activity?limit=20", token),
        fetchRobowarTransactionHistory(user),
      ]);

      setDashboard(dashboardData);
      setActivity(activityData.events ?? []);
      setHistory(historyData.history ?? []);
      setHistoryMeta(historyData.meta);
      addLog("success", "Dashboard data loaded.");
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : "Could not load dashboard.";
      console.warn("Could not load Robowars dashboard", loadError);
      setError(message);
      addLog("error", message);
    } finally {
      setIsLoading(false);
    }
  }, [addLog, authenticated, signMessage, user]);

  useEffect(() => {
    if (!ready) return;
    void loadDashboard();
  }, [loadDashboard, ready]);

  const services = Object.values(network?.services ?? {});
  const walletAddress = user ? resolveRobowarWalletAddress(user) : null;
  const trustScore = dashboard?.trustScore;
  const summary = dashboard?.summary;
  const summaryCards = [
    { label: "Total Saves", value: summary?.totalSaves ?? 0 },
    { label: "DA Finalized", value: summary?.finalizedSaves ?? 0 },
    { label: "Anchored", value: summary?.anchoredSaves ?? 0 },
    { label: "Data Stored", value: summary?.totalDataStored ?? "0 B" },
  ];
  const latestHistory = history[0];
  const explorerUrl = historyMeta?.explorerUrl;
  const contractUrl =
    getZeroGAddressUrl(historyMeta?.contractAddress, explorerUrl) ??
    network?.contracts?.explorerUrl ??
    null;
  const latestTransactionUrl =
    latestHistory?.indexExplorerUrl ||
    getZeroGTransactionUrl(latestHistory?.indexTransactionHash, explorerUrl);
  const latestRecordedAt = latestHistory?.indexedAt ?? latestHistory?.createdAt;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/80 via-background/95 to-background" />
      <div className="fixed inset-0 -z-10 bg-grid opacity-25" />

      <div className="fixed top-0 left-0 right-0 h-1 bg-primary/15 z-50" />
      <DashboardHeader />

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-display tracking-[0.3em] text-accent">
              <Database className="h-4 w-4" />
              ROBOWARS 0G DASHBOARD
            </span>
            <h1 className="mt-3 font-display text-5xl font-black leading-none md:text-7xl">
              PLAYER DATA,
              <br />
              <span className="text-primary">LIVE VERIFICATION</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {contractUrl && (
              <a
                href={contractUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-accent/55 bg-accent/10 px-5 py-3 font-display text-sm font-black text-accent transition hover:bg-accent/15"
              >
                Contract <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {latestTransactionUrl && (
              <a
                href={latestTransactionUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-foreground/25 bg-foreground/5 px-5 py-3 font-display text-sm font-black text-muted-foreground transition hover:border-accent/45 hover:text-accent"
              >
                My Activity <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-8 rounded-md border border-primary/40 bg-primary/10 p-4 font-display text-sm font-black text-primary">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.1rem] border border-accent/35 bg-background/70 p-5">
            <p className="font-display text-sm font-black uppercase tracking-[0.16em] text-muted-foreground">
              Sessions
            </p>
            <p className="mt-3 font-display text-4xl font-black text-foreground">
              {history.length || "-"}
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-accent/35 bg-background/70 p-5">
            <p className="font-display text-sm font-black uppercase tracking-[0.16em] text-muted-foreground">
              Recorded
            </p>
            <p className="mt-3 font-display text-2xl font-black text-foreground">
              {formatHistoryDate(latestRecordedAt)}
            </p>
            <p className="font-display text-sm font-black tracking-[0.16em] text-muted-foreground">
              {formatHistoryTime(latestRecordedAt)}
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-accent/35 bg-background/70 p-5">
            <p className="font-display text-sm font-black uppercase tracking-[0.16em] text-muted-foreground">
              Wallet
            </p>
            <p className="mt-3 font-display text-xl font-black text-foreground">
              {truncateHash(dashboard?.wallet ?? walletAddress, 10, 6)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <section className="rounded-[1.25rem] border border-accent/45 bg-background/70 p-5 shadow-cyan backdrop-blur md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-sm font-black uppercase tracking-[0.26em] text-muted-foreground">
                  Network Status
                </h2>
                <p className="mt-2 font-display text-sm font-black uppercase tracking-[0.16em] text-accent">
                  Overall: {network?.overall ?? (isLoading ? "loading" : "unknown")}
                </p>
              </div>
              <Activity className="h-5 w-5 text-accent" />
            </div>
            <div className="mt-5 space-y-3">
              {services.length === 0 &&
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-12 animate-pulse rounded-md border border-foreground/15 bg-muted/50"
                  />
                ))}
              {services.map((service) => (
                <div
                  key={`${service.label}-${service.endpoint}`}
                  className="grid gap-2 rounded-md border border-foreground/15 bg-muted/45 p-3 sm:grid-cols-[1fr_auto_auto]"
                >
                  <span className="font-display text-xs font-black uppercase tracking-[0.14em] text-foreground">
                    {service.label ?? "0G Service"}
                  </span>
                  <span className="font-display text-xs font-black text-accent">
                    {service.status ?? "unknown"}
                  </span>
                  <span className="font-display text-xs font-black text-muted-foreground">
                    {typeof service.latencyMs === "number" ? `${service.latencyMs}ms` : ""}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.25rem] border border-accent/45 bg-background/70 p-5 shadow-cyan backdrop-blur md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-sm font-black uppercase tracking-[0.26em] text-muted-foreground">
                Trust Score
              </h2>
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-[8rem_1fr]">
              <div className="rounded-[1.1rem] bg-muted/75 p-5 text-center">
                <p className="font-display text-5xl font-black text-foreground">
                  {trustScore?.score ?? 0}
                </p>
                <p className="mt-2 font-display text-xs font-black uppercase tracking-[0.16em] text-accent">
                  {trustScore?.label ?? "UNVERIFIED"}
                </p>
              </div>
              <div className="rounded-[1.1rem] bg-muted/55 p-5">
                <p className="text-sm font-semibold leading-relaxed text-muted-foreground">
                  {trustScore?.description ?? "No saves found on 0G yet."}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {summaryCards.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-md border border-foreground/15 bg-background/45 p-3"
                    >
                      <p className="font-display text-2xl font-black text-foreground">
                        {item.value}
                      </p>
                      <p className="mt-1 font-display text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <section className="rounded-[1.25rem] border border-accent/45 bg-background/70 p-5 backdrop-blur md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-sm font-black uppercase tracking-[0.26em] text-muted-foreground">
                0G Activity
              </h2>
              <span className="font-display text-sm font-black tracking-[0.16em] text-accent">
                {activity.length} events
              </span>
            </div>
            <div className="mt-5 max-h-80 space-y-3 overflow-y-auto pr-1">
              {!authenticated && (
                <div className="rounded-md border border-foreground/20 bg-muted/50 p-4 font-display text-sm font-black text-muted-foreground">
                  Login to load your 0G activity.
                </div>
              )}
              {authenticated && !isLoading && activity.length === 0 && (
                <div className="rounded-md border border-foreground/20 bg-muted/50 p-4 font-display text-sm font-black text-muted-foreground">
                  No 0G activity yet.
                </div>
              )}
              {activity.map((event, index) => {
                const content = (
                  <>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-black text-foreground">
                        {event.title ?? event.type ?? "0G event"}
                      </p>
                      <p className="mt-1 text-xs font-semibold leading-relaxed text-muted-foreground">
                        {event.description ?? event.status ?? "Updated on 0G."}
                      </p>
                    </div>
                    <span className="font-display text-xs font-black text-accent">
                      {formatHistoryTime(event.timestamp)}
                    </span>
                  </>
                );

                if (event.explorerUrl) {
                  return (
                    <a
                      key={event.id ?? `${event.title}-${index}`}
                      href={event.explorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="grid gap-3 rounded-md border border-foreground/15 bg-muted/45 p-4 transition hover:border-accent/45 hover:bg-accent/10 sm:grid-cols-[1fr_auto]"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div
                    key={event.id ?? `${event.title}-${index}`}
                    className="grid gap-3 rounded-md border border-foreground/15 bg-muted/45 p-4 sm:grid-cols-[1fr_auto]"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-[1.25rem] border border-accent/45 bg-background/70 p-5 backdrop-blur md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-sm font-black uppercase tracking-[0.26em] text-muted-foreground">
                Log Output
              </h2>
              <button
                type="button"
                onClick={() => setLogs([])}
                aria-label="Clear log output"
                title="Clear"
                className="grid h-10 w-10 place-items-center rounded-md border border-foreground/25 bg-foreground/5 text-muted-foreground transition hover:border-primary/45 hover:text-primary"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 max-h-80 space-y-2 overflow-y-auto rounded-md border border-foreground/15 bg-black/45 p-3 font-mono text-xs">
              {logs.length === 0 && (
                <p className="font-display text-sm font-black text-muted-foreground">
                  Waiting for 0G requests.
                </p>
              )}
              {logs.map((entry) => (
                <div key={entry.id} className="grid grid-cols-[5.5rem_5rem_1fr] gap-2">
                  <span className="text-muted-foreground">[{entry.time}]</span>
                  <span
                    className={
                      entry.level === "success"
                        ? "text-accent"
                        : entry.level === "error"
                          ? "text-primary"
                          : "text-muted-foreground"
                    }
                  >
                    [{entry.level.toUpperCase().padEnd(7, " ")}]
                  </span>
                  <span className="min-w-0 text-foreground">{entry.message}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-[1.25rem] border border-accent/45 bg-background/70 p-5 backdrop-blur md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-sm font-black uppercase tracking-[0.26em] text-muted-foreground">
              On-chain login history · 0G EVM
            </h2>
            <span className="font-display text-sm font-black tracking-[0.16em] text-accent">
              {isLoading ? "loading" : `${history.length} sessions`}
            </span>
          </div>

          <div className="mt-6 max-h-[42rem] space-y-4 overflow-y-auto pr-1">
            {!authenticated && (
              <div className="rounded-[1.1rem] border border-foreground/20 bg-muted/50 p-5 font-display text-sm font-black text-muted-foreground">
                Login to load your 0G transaction history.
              </div>
            )}
            {isLoading &&
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-28 animate-pulse rounded-[1.1rem] border border-foreground/20 bg-muted/55"
                />
              ))}
            {!isLoading && authenticated && history.length === 0 && (
              <div className="rounded-[1.1rem] border border-foreground/20 bg-muted/50 p-5 font-display text-sm font-black text-muted-foreground">
                No on-chain login history yet.
              </div>
            )}
            {!isLoading &&
              history.map((item, index) => {
                const transactionUrl =
                  item.indexExplorerUrl ||
                  getZeroGTransactionUrl(item.indexTransactionHash, explorerUrl);
                const recordedAt = item.indexedAt ?? item.createdAt;
                const historyKey =
                  item.indexTransactionHash ||
                  item.storageTransactionHash ||
                  `${item.walletAddress}-${recordedAt}-${index}`;

                return (
                  <a
                    key={historyKey}
                    href={transactionUrl ?? "#"}
                    target={transactionUrl ? "_blank" : undefined}
                    rel={transactionUrl ? "noreferrer" : undefined}
                    className="grid gap-4 rounded-[1.1rem] border border-foreground/20 bg-muted/60 p-5 transition hover:border-accent/50 hover:bg-accent/10 sm:grid-cols-[5rem_1fr_auto]"
                  >
                    <div>
                      <p className="font-display text-3xl font-black text-foreground">
                        #{history.length - index}
                      </p>
                      <p className="mt-1 font-display text-xs font-black text-muted-foreground">
                        {formatHistoryDate(recordedAt).replace(/, \d{4}$/, "")}
                      </p>
                      <p className="font-display text-xs font-black text-muted-foreground">
                        {formatHistoryTime(recordedAt)}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-black tracking-[0.08em] text-muted-foreground">
                        {truncateHash(item.indexTransactionHash, 10, 6)}
                      </p>
                      <p className="mt-3 text-sm font-bold text-muted-foreground">
                        {item.loginType.replace("_", " ")} login · block {item.indexBlockNumber}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-muted-foreground/75">
                        root {truncateHash(item.storageRoot, 10, 6)}
                      </p>
                    </div>
                    <span className="grid h-12 w-12 place-items-center self-center rounded-md border border-accent/40 bg-accent/10 text-accent">
                      <ExternalLink className="h-5 w-5" />
                    </span>
                  </a>
                );
              })}
          </div>
        </section>
      </section>
    </main>
  );
}
