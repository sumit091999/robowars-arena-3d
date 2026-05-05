import { useState, useEffect, useLayoutEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLoginWithEmail, useLoginWithOAuth, usePrivy } from "@privy-io/react-auth";
import { motion, Variants, useScroll, useSpring } from "framer-motion";
import {
  BookOpen,
  Swords,
  ChevronDown,
  Download,
  Zap,
  Shield,
  Flame,
  Menu,
  X,
  Unplug,
  Mail,
  Wallet,
} from "lucide-react";
import { RobotScene } from "@/components/RobotScene";
import { BackgroundScene } from "@/components/BackgroundScene";
import { FooterVoidScene } from "@/components/FooterVoidScene";
import { HeroEnergyScene } from "@/components/HeroEnergyScene";
import { TrailerSection } from "@/components/TrailerSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import documentationPdf from "@/assets/Documentation.pdf";

import gameImg1 from "@/assets/ChatGPT Image May 4, 2026, 07_03_40 PM.png";
import gameImg2 from "@/assets/ChatGPT Image May 4, 2026, 06_49_39 PM.png";
import gameImg3 from "@/assets/ChatGPT Image May 4, 2026, 06_51_51 PM.png";
import heroImg from "@/assets/Background 3.png";
import kultLogo from "@/assets/kult-0G-logo.png";
import roboLogo from "@/assets/Robo-logo.png";
import robowarlogo from "@/assets/RoboWar_logo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const revealViewport = { once: false, amount: 0.22 };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
const staggerGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const footerSocialLinks = [
  { label: "X (Twitter)", href: "https://x.com/_KultGames", icon: "x" },
  { label: "Discord", href: "https://discord.com/invite/Cge7rrCyUB", icon: "discord" },
  { label: "Telegram", href: "https://t.me/KultGamesOfficial", icon: "telegram" },
];
const combatFeed = [
  "BOT-07 ELIMINATED",
  "ARENA CORE ACTIVE",
  "NEW CHALLENGER DETECTED",
  "SPINNER DAMAGE CRITICAL",
  "PIT HAZARDS ARMED",
];
const downloadOptions = [
  {
    label: "Download for Mac",
    href: "https://github.com/sumit091999/robowars-arena-3d/releases/latest/download/Robowars-mac.dmg",
  },
  {
    label: "Download for Windows",
    href: "https://github.com/sumit091999/robowars-arena-3d/releases/latest/download/Robowars-windows.exe",
  },
];
const platformDownloadLinks = [
  {
    label: "WINDOWS",
    href: downloadOptions[1].href,
    platform: "windows",
  },
  {
    label: "MAC",
    href: downloadOptions[0].href,
    platform: "mac",
  },
];

function FooterSocialIcon({ icon }: { icon: string }) {
  if (icon === "discord") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M19.62 5.26a15.7 15.7 0 0 0-3.87-1.2.08.08 0 0 0-.09.04c-.17.3-.36.7-.49 1.02a14.56 14.56 0 0 0-4.34 0c-.13-.33-.32-.72-.5-1.02a.08.08 0 0 0-.09-.04 15.65 15.65 0 0 0-3.87 1.2.07.07 0 0 0-.03.03C3.9 8.92 3.23 12.46 3.56 15.95c0 .02.01.04.03.05a15.8 15.8 0 0 0 4.75 2.4.08.08 0 0 0 .1-.03c.36-.5.69-1.02.97-1.57a.08.08 0 0 0-.04-.11 10.4 10.4 0 0 1-1.48-.7.08.08 0 0 1 0-.13l.29-.22a.07.07 0 0 1 .08 0c3.12 1.42 6.48 1.42 9.56 0a.07.07 0 0 1 .08 0l.29.22a.08.08 0 0 1 0 .13c-.47.27-.96.51-1.48.7a.08.08 0 0 0-.04.11c.29.55.61 1.07.97 1.57a.08.08 0 0 0 .1.03 15.76 15.76 0 0 0 4.76-2.4.08.08 0 0 0 .03-.05c.39-4.03-.66-7.55-2.82-10.66a.06.06 0 0 0-.04-.03ZM9.69 13.82c-.94 0-1.71-.86-1.71-1.91s.75-1.91 1.71-1.91c.97 0 1.73.86 1.71 1.91 0 1.05-.75 1.91-1.71 1.91Zm4.64 0c-.94 0-1.71-.86-1.71-1.91s.75-1.91 1.71-1.91c.97 0 1.73.86 1.71 1.91 0 1.05-.75 1.91-1.71 1.91Z" />
      </svg>
    );
  }

  if (icon === "telegram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M21.94 4.66a1.53 1.53 0 0 0-1.64-.24L3.57 10.84c-.73.29-1.2.86-1.17 1.48.04.62.57 1.12 1.34 1.33l4.17 1.13 1.6 5.05c.2.63.64 1.03 1.17 1.08.52.05.99-.25 1.31-.8l2.2-3.64 4.14 3.04c.53.39 1.1.48 1.57.25.47-.23.78-.73.87-1.39l2.17-12.29c.12-.68-.09-1.22-.5-1.48Zm-3.38 3.04-7.2 6.59a.74.74 0 0 0-.23.43l-.43 2.65-.95-3.02 8.8-6.65Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M13.92 10.47 21.41 2h-1.78l-6.5 7.35L7.94 2H1.95l7.86 11.12L1.95 22h1.78l6.87-7.76L16.08 22h5.99l-8.15-11.53Zm-2.43 2.75-.8-1.1L4.36 3.3h2.73l5.1 7.1.8 1.1 6.65 9.26h-2.73l-5.42-7.54Z" />
    </svg>
  );
}

function PlayGameAuthButton({ className }: { className: string }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { ready, authenticated } = usePrivy();

  if (authenticated) {
    return (
      <motion.a
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        href="#play"
        className={className}
      >
        <Swords className="w-5 h-5" />
        PLAY GAME
      </motion.a>
    );
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: ready ? 1.04 : 1 }}
        whileTap={{ scale: ready ? 0.97 : 1 }}
        type="button"
        disabled={!ready}
        onClick={() => setIsLoginOpen(true)}
        className={`${className} disabled:pointer-events-none disabled:opacity-50`}
      >
        <Swords className="w-5 h-5" />
        {ready ? "LOGIN" : "LOADING"}
      </motion.button>
      <RobowarsLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

function DownloadGameButton({ className }: { className: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className={className}
        >
          <Download className="w-5 h-5" />
          DOWNLOAD
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="min-w-56 border-primary/35 bg-background/95 p-2 font-display shadow-glow backdrop-blur"
      >
        {downloadOptions.map((option) => (
          <DropdownMenuItem key={option.label} asChild>
            <a
              href={option.href}
              download
              className="cursor-pointer gap-3 rounded-sm px-3 py-3 text-xs font-bold tracking-[0.18em] text-foreground focus:text-primary"
            >
              <Download className="h-4 w-4 text-primary" />
              {option.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M3 4.4 10.8 3v8.3H3V4.4Zm9.2-1.6L21 1.2v10.1h-8.8V2.8ZM3 12.7h7.8V21L3 19.6v-6.9Zm9.2 0H21v10.1l-8.8-1.6v-8.5Z"
      />
    </svg>
  );
}

function MacLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M15.66 2c.12 1.02-.28 2.03-.89 2.76-.65.77-1.75 1.37-2.75 1.3-.15-.98.34-2.03.93-2.7C13.64 2.58 14.78 2.05 15.66 2Zm4.26 15.32c-.47 1.07-.69 1.55-1.3 2.5-.85 1.31-2.04 2.95-3.52 2.97-.76.01-1.28-.21-1.82-.43-.57-.24-1.16-.48-2.09-.48-.98 0-1.6.25-2.19.49-.52.21-1.03.42-1.73.45-1.4.05-2.47-1.42-3.32-2.72-1.86-2.84-3.29-8.02-1.38-11.53.95-1.74 2.64-2.84 4.48-2.87.81-.02 1.58.27 2.26.52.52.19.98.36 1.34.36.32 0 .77-.17 1.29-.37.82-.31 1.82-.69 2.85-.59.7.03 2.68.28 3.94 2.15-.1.06-2.36 1.38-2.34 4.11.03 3.25 2.82 4.32 2.85 4.34-.02.07-.08.26-.32.8Z"
      />
    </svg>
  );
}

function PlatformDownloadIcons() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-8 max-w-xs mx-auto min-[860px]:mx-0">
      {platformDownloadLinks.map((platform) => (
        <motion.a
          key={platform.label}
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.98 }}
          href={platform.href}
          download
          aria-label={`Download Robowars for ${platform.label.toLowerCase()}`}
          className="group/platform flex items-center gap-4 border-l-2 border-primary pl-4 text-primary transition hover:text-accent"
        >
          {platform.platform === "windows" ? (
            <WindowsLogo className="h-11 w-11 drop-shadow-[0_0_14px_var(--primary)]" />
          ) : (
            <MacLogo className="h-11 w-11 drop-shadow-[0_0_14px_var(--primary)]" />
          )}
          <span className="font-display text-[10px] font-bold tracking-[0.3em] text-muted-foreground transition group-hover/platform:text-accent">
            {platform.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-8 w-8">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}

function RobowarsLoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { login } = usePrivy();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState<"email" | "code" | "wallet" | "google" | null>(null);
  const { sendCode, loginWithCode } = useLoginWithEmail({
    onComplete: onClose,
    onError: () => {
      setPending(null);
      setError("Login failed. Try again.");
    },
  });
  const { initOAuth, loading: googleLoading } = useLoginWithOAuth({
    onComplete: onClose,
    onError: () => {
      setPending(null);
      setError("Google login failed. Try again.");
    },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setCode("");
      setCodeSent(false);
      setError("");
      setPending(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (codeSent) {
      if (code.trim().length < 4) {
        setError("Enter the code from your email.");
        return;
      }

      try {
        setPending("code");
        await loginWithCode({ code: code.trim() });
      } catch {
        setPending(null);
        setError("That code did not work. Check it and try again.");
      }
      return;
    }

    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }

    try {
      setPending("email");
      await sendCode({ email: email.trim() });
      setCodeSent(true);
      setPending(null);
    } catch {
      setPending(null);
      setError("Could not send the code. Try again.");
    }
  };

  const handleWalletLogin = () => {
    setPending("wallet");
    onClose();
    login({
      loginMethods: ["wallet"],
      walletChainType: "ethereum-only",
    });
  };

  const handleGoogleLogin = async () => {
    setError("");
    setPending("google");

    try {
      await initOAuth({ provider: "google" });
    } catch {
      setPending(null);
      setError("Could not start Google login. Try again.");
    }
  };

  const isBusy = pending !== null || googleLoading;

  return (
    <div className="robowars-login-shell" role="presentation">
      <button
        className="robowars-login-backdrop"
        type="button"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="robowars-login-title"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="robowars-login-panel"
      >
        <button className="robowars-login-close" type="button" aria-label="Close" onClick={onClose}>
          <X className="h-6 w-6" />
        </button>

        <div className="robowars-login-logo">
          <img src={robowarlogo} alt="Robowars" />
        </div>

        <h2 id="robowars-login-title" className="robowars-login-title">
          SIGN IN
        </h2>
        <p className="robowars-login-subtitle">Email, Google, wallet, or Intraverse.</p>

        <form onSubmit={handleEmailSubmit} className="robowars-login-form">
          <label htmlFor="robowars-email" className="robowars-login-label">
            {codeSent ? "Verification code" : "Email address"}
          </label>
          <div className="robowars-login-input-row">
            <Mail className="h-6 w-6" />
            <input
              id="robowars-email"
              type={codeSent ? "text" : "email"}
              inputMode={codeSent ? "numeric" : "email"}
              autoComplete={codeSent ? "one-time-code" : "email"}
              value={codeSent ? code : email}
              onChange={(event) =>
                codeSent ? setCode(event.target.value) : setEmail(event.target.value)
              }
              placeholder={codeSent ? "123456" : "you@example.com"}
            />
          </div>
          <button className="robowars-login-primary" type="submit" disabled={isBusy}>
            {pending === "email"
              ? "Sending..."
              : pending === "code"
                ? "Verifying..."
                : codeSent
                  ? "Verify code"
                  : "Send code"}
          </button>
        </form>

        <div className="robowars-login-divider">
          <span>OR</span>
        </div>

        <button
          className="robowars-login-primary robowars-login-wallet"
          type="button"
          disabled={isBusy}
          onClick={handleWalletLogin}
        >
          <Wallet className="h-5 w-5" />
          {pending === "wallet" ? "Opening wallet..." : "CONNECT WALLET"}
        </button>

        <button
          className="robowars-login-google"
          type="button"
          disabled={isBusy}
          onClick={handleGoogleLogin}
        >
          <span className="robowars-login-google-mark">
            <GoogleMark />
          </span>
          <span>{pending === "google" || googleLoading ? "OPENING GOOGLE..." : "GOOGLE"}</span>
        </button>

        {error && <p className="robowars-login-error">{error}</p>}
      </motion.div>
    </div>
  );
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

function Index() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { authenticated } = usePrivy();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);

    // Clear hash if present to prevent browser jumping
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Global animated 3D background */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-60">
        <BackgroundScene />
      </div>
      {/* Top frame accents */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary/15 z-50" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 backdrop-blur-md bg-background/40 border-b border-primary/20">
        <div className="max-w-7xl mx-auto grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-3 justify-self-start">
            {/* <img src={robowarlogo} alt="Robowars Logo" className="h-12 w-auto object-contain" /> */}
            <img src={roboLogo} alt="Robowars Logo" className="h-8 w-auto object-contain" />
            {/* <span className="hidden sm:inline-flex items-center gap-1.5 ml-3 pl-3 border-l border-primary/30">
              <img src={kultLogo} alt="Kult Games" className="h-8 w-auto object-contain opacity-80" />
            </span> */}
          </div>
          <nav className="hidden items-center gap-8 justify-self-center text-sm font-display tracking-widest text-muted-foreground md:flex">
            <a href="#features" className="hover:text-primary transition">
              ARENAS
            </a>
            <a href="#trailer" className="hover:text-primary transition">
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

          {/* Hamburger Icon */}
          <button
            className="justify-self-end text-foreground transition hover:text-primary md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-primary/20 p-6 flex flex-col gap-6 shadow-2xl z-50">
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-display tracking-widest text-foreground hover:text-primary transition"
            >
              ARENAS
            </a>
            <a
              href="#trailer"
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
              <img
                src={kultLogo}
                alt="Kult Games"
                className="h-8 w-auto object-contain opacity-80"
              />
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen pt-24 bg-black overflow-hidden">
        {/* Background Image Container */}
        <div
          className="absolute inset-y-0 -right-[25%] lg:-right-[35%] w-[150%] h-full bg-no-repeat bg-[position:right_center] bg-cover lg:bg-[length:auto_100%]"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-70 mix-blend-screen">
          <HeroEnergyScene />
        </div>

        {/* Dark overlay so text stays readable and blends the left edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="hero-ambient-glow" />

        <div className="relative max-w-7xl mx-auto px-6 grid min-[860px]:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center min-[860px]:text-left"
          >
            <span
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-accent/10 border border-accent/40 backdrop-blur-sm"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
            >
              <span className="hud-status-dot" />
              <span className="text-accent text-[10px] tracking-[0.4em] font-display font-bold">
                LIVE NOW
              </span>
            </span>
            <h1 className="font-display font-black text-6xl md:text-7xl min-[860px]:text-8xl leading-[0.9] text-glow">
              ENTER
              <br />
              THE <span className="text-primary">ARENA</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto min-[860px]:mx-0">
              Forge a war machine of fury and steel. Pit it against ruthless AI champions in arenas
              built to destroy. Only one rolls out.{" "}
              <span className="text-foreground">Will it be yours?</span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center min-[860px]:justify-start">
              <DownloadGameButton className="button-energy group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest clip-blade shadow-glow" />
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href={documentationPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="button-energy inline-flex items-center gap-3 overflow-hidden px-8 py-4 border-2 border-accent/60 text-accent font-display font-bold tracking-widest clip-blade hover:bg-accent/10 transition shadow-cyan"
              >
                <BookOpen className="w-5 h-5" />
                GAME MANUAL
              </motion.a>
            </div>
            <PlatformDownloadIcons />
          </motion.div>
        </div>

        <a
          href="#features"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-accent transition hover:text-primary flex flex-col items-center gap-1 drop-shadow-[0_0_12px_var(--accent)]"
        >
          <ChevronDown className="w-6 h-6 animate-bounce stroke-[3]" />
        </a>
      </section>

      {/* LIVE COMBAT TICKER */}
      <section className="relative overflow-hidden border-y border-primary/20 bg-background/95 py-1.5">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="ticker-track relative flex w-max items-center gap-4 whitespace-nowrap font-display text-[10px] font-bold tracking-[0.22em] text-muted-foreground">
          {[...combatFeed, ...combatFeed, ...combatFeed].map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-4">
              <span>{item}</span>
              <img
                src={robowarlogo}
                alt="Robowars icon"
                className="h-4 w-4 object-contain opacity-85"
              />
              <img
                src={roboLogo}
                alt="ROBOWARS"
                className="h-3.5 w-auto object-contain opacity-85"
              />
              <img
                src={kultLogo}
                alt="KULT GAMES"
                className="h-3.5 w-auto object-contain opacity-75"
              />
              <span className="text-primary">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative py-24 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gameImg1})` }}
      >
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm tracking-[0.3em] font-display">
              COMBAT FEATURES
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-black mt-3">
              BUILT FOR <span className="text-primary">CARNAGE</span>
            </h2>
          </motion.div>
          <motion.div
            variants={staggerGroup}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Zap,
                title: "FLYWHEEL FURY",
                desc: "High-speed spinning blades that turn metal into shrapnel.",
              },
              {
                icon: Flame,
                title: "CRUSHING PIT",
                desc: "Fire vents and shredders. Stay still and you're scrap.",
              },
              {
                icon: Shield,
                title: "CUSTOM ARMOR",
                desc: "Tune speed, power, paint. Make the machine yours.",
              },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="carnage-card-orbit group relative overflow-hidden p-[2px] clip-blade transition-all hover:shadow-glow"
              >
                <div className="relative z-10 h-full bg-card p-8 backdrop-blur border border-primary/20 clip-blade transition-all group-hover:border-primary">
                  <div className="absolute top-0 right-0 w-1 h-12 bg-primary" />
                  <f.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-display text-2xl font-black tracking-wider">{f.title}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRAILER */}
      <TrailerSection />

      {/* MANUAL / CTA */}
      <section
        id="manual"
        className="relative py-24 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gameImg2})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background/85 pointer-events-none" />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-4xl mx-auto text-center relative"
        >
          <div className="absolute inset-0 bg-arena blur-3xl opacity-50 pointer-events-none" />
          <h2 className="relative text-5xl md:text-7xl font-display font-black text-glow">
            READY TO <span className="text-primary">FIGHT?</span>
          </h2>
          <p className="relative mt-4 text-muted-foreground max-w-xl mx-auto">
            Read the manual. Pick your weapon. Step into the pit.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4" id="play">
            <a
              href={documentationPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="button-energy inline-flex items-center gap-3 overflow-hidden px-8 py-4 border-2 border-accent/60 text-accent font-display font-bold tracking-widest clip-blade hover:bg-accent/10 transition"
            >
              <BookOpen className="w-5 h-5" /> GAME MANUAL
            </a>
            <DownloadGameButton className="button-energy inline-flex items-center gap-3 overflow-hidden px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest clip-blade shadow-glow" />
          </div>
        </motion.div>
      </section>

      {/* KULT ECOSYSTEM */}
      <section
        className="relative py-20 px-6 border-t border-primary/20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gameImg3})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/88 via-background/70 to-background/88 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center justify-center gap-2 text-accent text-xs tracking-[0.4em] font-display">
              <span className="hud-status-dot" />
              POWERED BY
            </span>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl tracking-wider">
              <span className="text-primary">KULT</span>
              <span className="text-foreground">GAMES</span>
              <span className="text-muted-foreground"> ECOSYSTEM</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              An ecosystem <span className="text-accent">FOR GAMERS BY GAMERS</span>. A visionary
              Play &amp; Earn &amp; Engage universe with SocialFi and multichain interoperability —
              Robowars joins the Kult roster.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[10px] tracking-[0.3em] font-display text-muted-foreground"
          >
            <span>PLAY</span>
            <span className="text-primary">◆</span>
            <span>EARN</span>
            <span className="text-primary">◆</span>
            <span>ENGAGE</span>
            <span className="text-primary">◆</span>
            {/* <span>SOCIALFI</span><span className="text-primary">◆</span> */}
            <span>MULTICHAIN</span>
          </motion.div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-primary/20 bg-background px-6 py-12">
        <div className="absolute inset-0 pointer-events-none opacity-90">
          <FooterVoidScene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-background/85 pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent pointer-events-none" />
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="relative mx-auto grid max-w-6xl gap-10 text-center md:grid-cols-[1.45fr_1fr_1fr_1fr] md:text-left"
        >
          <motion.div variants={fadeUp}>
            <img
              src={roboLogo}
              alt="ROBOWARS"
              className="mx-auto h-8 w-auto object-contain md:mx-0"
            />
            <p className="mx-auto mt-5 max-w-sm text-md leading-relaxed text-muted-foreground md:mx-0">
              Build your machine, enter the arena, and fight through a neon battleground powered by
              Kult Games.
            </p>
            <nav className="mt-5 flex items-center justify-center gap-2.5 md:justify-start">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group grid h-8 w-8 place-items-center rounded-full border border-primary/60 bg-secondary/70 text-accent shadow-[0_0_0_1px_oklch(0.65_0.27_5_/_0.24),inset_0_0_14px_oklch(0.65_0.27_5_/_0.16)] transition-all duration-300 hover:border-accent hover:bg-primary/15 hover:text-foreground hover:shadow-[0_0_12px_oklch(0.78_0.18_200_/_0.38),inset_0_0_18px_oklch(0.78_0.18_200_/_0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <FooterSocialIcon icon={social.icon} />
                </a>
              ))}
            </nav>
            {/* <img src={kultLogo} alt="KULT GAMES" className="mt-6 h-7 w-auto object-contain opacity-80" /> */}
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-display text-sm font-black uppercase tracking-[0.25em] text-foreground">
              Game
            </h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {authenticated && (
                <a href="#play" className="transition hover:text-primary">
                  Play Game
                </a>
              )}
              <a href="#features" className="transition hover:text-primary">
                Arenas
              </a>
              <a href="#trailer" className="transition hover:text-primary">
                Trailer
              </a>
            </nav>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-display text-sm font-black uppercase tracking-[0.25em] text-foreground">
              Resources
            </h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href={documentationPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-primary"
              >
                Game Manual
              </a>
              <a href="#manual" className="transition hover:text-primary">
                Fight Brief
              </a>
              <a href="#" className="transition hover:text-primary">
                Home
              </a>
            </nav>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-display text-sm font-black uppercase tracking-[0.25em] text-foreground">
              Follow
            </h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:text-accent hover:[text-shadow:0_0_14px_var(--accent)]"
                >
                  {social.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="relative mx-auto mt-10 flex max-w-6xl flex-col items-center gap-3 border-t border-primary/15 pt-6 text-center text-xs text-muted-foreground md:flex-row md:justify-between md:text-left"
        >
          <span className="font-display tracking-[0.25em]">
            © 2026 Robo Wars — All Systems Armed
          </span>
          <img src={kultLogo} alt="KULT GAMES" className="h-8 w-auto object-contain opacity-85" />
        </motion.div>
      </footer>
    </main>
  );
}
