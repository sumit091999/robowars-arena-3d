import { useState, useEffect, useLayoutEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, Variants, useScroll, useSpring } from "framer-motion";
import { BookOpen, Swords, ChevronDown, Zap, Shield, Flame, Menu, X } from "lucide-react";
import { RobotScene } from "@/components/RobotScene";
import { BackgroundScene } from "@/components/BackgroundScene";
import { FooterVoidScene } from "@/components/FooterVoidScene";
import { HeroEnergyScene } from "@/components/HeroEnergyScene";
import { TrailerSection } from "@/components/TrailerSection";
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
const hudStatuses = ["SYSTEM ONLINE", "ARENA LIVE", "MATCHMAKING READY"];
const combatFeed = [
  "BOT-07 ELIMINATED",
  "ARENA CORE ACTIVE",
  "NEW CHALLENGER DETECTED",
  "SPINNER DAMAGE CRITICAL",
  "PIT HAZARDS ARMED",
];

function Index() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <img src={robowarlogo} alt="Robowars Logo" className="h-12 w-auto object-contain" /> */}
            <img src={roboLogo} alt="Robowars Logo" className="h-8 w-auto object-contain" />
            {/* <span className="hidden sm:inline-flex items-center gap-1.5 ml-3 pl-3 border-l border-primary/30">
              <img src={kultLogo} alt="Kult Games" className="h-8 w-auto object-contain opacity-80" />
            </span> */}
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-display tracking-widest text-muted-foreground">
            <a href="#features" className="hover:text-primary transition">ARENAS</a>
            <a href="#trailer" className="hover:text-primary transition">TRAILER</a>
            <a href={documentationPdf} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">MANUAL</a>
            <div className="hidden lg:block">
              <img src={kultLogo} alt="Kult Games" className="h-8 w-auto object-contain opacity-80" />
            </div>
          </nav>

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-foreground hover:text-primary transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-primary/20 p-6 flex flex-col gap-6 shadow-2xl z-50">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-display tracking-widest text-foreground hover:text-primary transition">ARENAS</a>
            <a href="#trailer" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-display tracking-widest text-foreground hover:text-primary transition">TRAILER</a>
            <a href={documentationPdf} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-display tracking-widest text-foreground hover:text-primary transition">MANUAL</a>
            <div className="flex items-center gap-2 mt-2">
              <img src={kultLogo} alt="Kult Games" className="h-8 w-auto object-contain opacity-80" />
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

        <div className="relative max-w-7xl mx-auto px-6 grid min-[860px]:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center min-[860px]:text-left"
          >
            <span className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-accent/10 border border-accent/40 backdrop-blur-sm" style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
              <span className="hud-status-dot" />
              <span className="text-accent text-[10px] tracking-[0.4em] font-display font-bold">LIVE NOW</span>
            </span>
            <h1 className="font-display font-black text-6xl md:text-7xl min-[860px]:text-8xl leading-[0.9] text-glow">
              ENTER<br />
              THE <span className="text-primary">ARENA</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto min-[860px]:mx-0">
              Forge a war machine of fury and steel. Pit it against ruthless AI champions in arenas built to destroy.
              Only one rolls out. <span className="text-foreground">Will it be yours?</span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center min-[860px]:justify-start">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#play"
                className="button-energy group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest clip-blade shadow-glow"
              >
                <Swords className="w-5 h-5" />
                PLAY GAME
              </motion.a>
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

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto min-[860px]:mx-0">
              {[
                { v: "24+", l: "ROBOTS" },
                { v: "8", l: "ARENAS" },
                { v: "4M+", l: "PLAYERS" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-primary pl-3">
                  <div className="font-display text-3xl font-black text-primary">{s.v}</div>
                  <div className="text-[10px] tracking-[0.3em] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
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
              <img src={robowarlogo} alt="Robowars icon" className="h-4 w-4 object-contain opacity-85" />
              <img src={roboLogo} alt="ROBOWARS" className="h-3.5 w-auto object-contain opacity-85" />
              <img src={kultLogo} alt="KULT GAMES" className="h-3.5 w-auto object-contain opacity-75" />
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
            <span className="text-accent text-sm tracking-[0.3em] font-display">COMBAT FEATURES</span>
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
              { icon: Zap, title: "FLYWHEEL FURY", desc: "High-speed spinning blades that turn metal into shrapnel." },
              { icon: Flame, title: "CRUSHING PIT", desc: "Fire vents and shredders. Stay still and you're scrap." },
              { icon: Shield, title: "CUSTOM ARMOR", desc: "Tune speed, power, paint. Make the machine yours." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group relative p-8 bg-card backdrop-blur border border-primary/20 clip-blade hover:border-primary transition-all hover:shadow-glow"
              >
                <div className="absolute top-0 right-0 w-1 h-12 bg-primary" />
                <f.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-2xl font-black tracking-wider">{f.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{f.desc}</p>
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
            <a href={documentationPdf} target="_blank" rel="noopener noreferrer" className="button-energy inline-flex items-center gap-3 overflow-hidden px-8 py-4 border-2 border-accent/60 text-accent font-display font-bold tracking-widest clip-blade hover:bg-accent/10 transition">
              <BookOpen className="w-5 h-5" /> GAME MANUAL
            </a>
            <a href="#play" className="button-energy inline-flex items-center gap-3 overflow-hidden px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest clip-blade shadow-glow">
              <Swords className="w-5 h-5" /> PLAY GAME
            </a>
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
              An ecosystem <span className="text-accent">FOR GAMERS BY GAMERS</span>. A visionary Play &amp; Earn &amp; Engage
              universe with SocialFi and multichain interoperability — Robowars joins the Kult roster.
            </p>
          </motion.div>


          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[10px] tracking-[0.3em] font-display text-muted-foreground"
          >
            <span>PLAY</span><span className="text-primary">◆</span>
            <span>EARN</span><span className="text-primary">◆</span>
            <span>ENGAGE</span><span className="text-primary">◆</span>
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
            <img src={roboLogo} alt="ROBOWARS" className="mx-auto h-8 w-auto object-contain md:mx-0" />
            <p className="mx-auto mt-5 max-w-sm text-md leading-relaxed text-muted-foreground md:mx-0">
              Build your machine, enter the arena, and fight through a neon battleground powered by Kult Games.
            </p>
            <div className="mt-6 flex flex-col items-center gap-2 md:items-start">
              {hudStatuses.map((status) => (
                <span key={status} className="inline-flex items-center gap-2 font-display text-[10px] tracking-[0.28em] text-accent">
                  <span className="hud-status-dot" />
                  {status}
                </span>
              ))}
            </div>
            {/* <img src={kultLogo} alt="KULT GAMES" className="mt-6 h-7 w-auto object-contain opacity-80" /> */}
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-display text-sm font-black uppercase tracking-[0.25em] text-foreground">Game</h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="#play" className="transition hover:text-primary">Play Game</a>
              <a href="#features" className="transition hover:text-primary">Arenas</a>
              <a href="#trailer" className="transition hover:text-primary">Trailer</a>
            </nav>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-display text-sm font-black uppercase tracking-[0.25em] text-foreground">Resources</h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <a href={documentationPdf} target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">Game Manual</a>
              <a href="#manual" className="transition hover:text-primary">Fight Brief</a>
              <a href="https://www.kult.games/" target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">Kult Games</a>
            </nav>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-display text-sm font-black uppercase tracking-[0.25em] text-foreground">Follow</h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {["X (Twitter)", "Discord", "Telegram"].map((social) => (
                <span
                  key={social}
                  className="transition-all duration-300 hover:text-accent hover:[text-shadow:0_0_14px_var(--accent)]"
                >
                  {social}
                </span>
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
          <span className="font-display tracking-[0.25em]">© ROBOWARS — ALL SYSTEMS ARMED</span>
          <img src={kultLogo} alt="KULT GAMES" className="h-7 w-auto object-contain opacity-80" />
        </motion.div>
      </footer>
    </main>
  );
}
