import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Swords, ChevronDown, Zap, Shield, Flame } from "lucide-react";
import { RobotScene } from "@/components/RobotScene";
import { BackgroundScene } from "@/components/BackgroundScene";
import { TrailerSection } from "@/components/TrailerSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global animated 3D background */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-60">
        <BackgroundScene />
      </div>
      {/* Top frame accents */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 backdrop-blur-md bg-background/40 border-b border-primary/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
              <Swords className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-black tracking-[0.25em] text-lg">ROBOT WARS</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-3 pl-3 border-l border-primary/30 text-[10px] tracking-[0.3em] text-muted-foreground font-display">
              A <span className="text-accent font-black">KULT</span><span className="text-foreground/80">GAMES</span> TITLE
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-display tracking-widest text-muted-foreground">
            <a href="#features" className="hover:text-primary transition">ARENAS</a>
            <a href="#trailer" className="hover:text-primary transition">TRAILER</a>
            <a href="#manual" className="hover:text-primary transition">MANUAL</a>
            <a href="https://www.kult.games/" target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 border border-accent/40 text-accent text-xs hover:bg-accent/10 transition clip-blade">
              KULT GAMES ↗
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen pt-24 bg-hero">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-arena pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="inline-block text-accent text-xs tracking-[0.4em] font-display border border-accent/40 px-3 py-1 mb-6">
              // SEASON 07 // LIVE NOW
            </span>
            <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-glow">
              ENTER<br />
              THE <span className="text-primary">ARENA</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Forge a war machine of fury and steel. Pit it against ruthless AI champions in arenas built to destroy.
              Only one rolls out. <span className="text-foreground">Will it be yours?</span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#play"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest clip-blade shadow-glow"
              >
                <Swords className="w-5 h-5" />
                PLAY GAME
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#manual"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent/60 text-accent font-display font-bold tracking-widest clip-blade hover:bg-accent/10 transition shadow-cyan"
              >
                <BookOpen className="w-5 h-5" />
                GAME MANUAL
              </motion.a>
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
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

          {/* 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
            <RobotScene />
          </motion.div>
        </div>

        <a
          href="#features"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition flex flex-col items-center gap-1"
        >
          <span className="text-[10px] tracking-[0.3em] font-display">SCROLL</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent text-sm tracking-[0.3em] font-display">// COMBAT FEATURES</span>
            <h2 className="text-5xl md:text-6xl font-display font-black mt-3">
              BUILT FOR <span className="text-primary">CARNAGE</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "FLYWHEEL FURY", desc: "High-speed spinning blades that turn metal into shrapnel." },
              { icon: Flame, title: "CRUSHING PIT", desc: "Fire vents and shredders. Stay still and you're scrap." },
              { icon: Shield, title: "CUSTOM ARMOR", desc: "Tune speed, power, paint. Make the machine yours." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 bg-card backdrop-blur border border-primary/20 clip-blade hover:border-primary transition-all hover:shadow-glow"
              >
                <div className="absolute top-0 right-0 w-1 h-12 bg-primary" />
                <f.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-2xl font-black tracking-wider">{f.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAILER */}
      <TrailerSection />

      {/* MANUAL / CTA */}
      <section id="manual" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-arena blur-3xl opacity-50 pointer-events-none" />
          <h2 className="relative text-5xl md:text-7xl font-display font-black text-glow">
            READY TO <span className="text-primary">FIGHT?</span>
          </h2>
          <p className="relative mt-4 text-muted-foreground max-w-xl mx-auto">
            Read the manual. Pick your weapon. Step into the pit.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4" id="play">
            <a href="#manual" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent/60 text-accent font-display font-bold tracking-widest clip-blade hover:bg-accent/10 transition">
              <BookOpen className="w-5 h-5" /> GAME MANUAL
            </a>
            <a href="#play" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest clip-blade shadow-glow">
              <Swords className="w-5 h-5" /> PLAY GAME
            </a>
          </div>
        </div>
      </section>

      {/* KULT ECOSYSTEM */}
      <section className="relative py-20 px-6 border-t border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent text-xs tracking-[0.4em] font-display">// POWERED BY</span>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl tracking-wider">
              <span className="text-primary">KULT</span>
              <span className="text-foreground">GAMES</span>
              <span className="text-muted-foreground"> ECOSYSTEM</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              An ecosystem <span className="text-accent">FOR GAMERS BY GAMERS</span>. A visionary Play &amp; Earn &amp; Engage
              universe with SocialFi and multichain interoperability — Robowars joins the Kult roster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { tag: "FLAGSHIP", name: "ROBOWARS", desc: "Combat arena. Build, battle, dominate.", href: "#play", live: true },
              { tag: "PARTNER", name: "ZERO G POOL", desc: "Your favorite 8-ball with a cosmic twist.", href: "https://zerogpool.xyz/" },
              { tag: "PARTNER", name: "GUESS THE AI", desc: "Challenge your mind. Beat the AI.", href: "https://guesstheai.xyz/" },
            ].map((g) => (
              <a
                key={g.name}
                href={g.href}
                target={g.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative p-6 bg-card backdrop-blur border border-accent/20 clip-blade hover:border-accent transition-all hover:shadow-cyan block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.3em] text-accent font-display">{g.tag}</span>
                  {g.live && (
                    <span className="flex items-center gap-1.5 text-[10px] tracking-widest text-primary font-display">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> LIVE
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl font-black tracking-wider mt-3">{g.name}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{g.desc}</p>
                <div className="mt-4 text-xs font-display tracking-widest text-accent group-hover:translate-x-1 transition-transform">
                  ENTER →
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[10px] tracking-[0.3em] font-display text-muted-foreground">
            <span>PLAY</span><span className="text-primary">◆</span>
            <span>EARN</span><span className="text-primary">◆</span>
            <span>ENGAGE</span><span className="text-primary">◆</span>
            <span>SOCIALFI</span><span className="text-primary">◆</span>
            <span>MULTICHAIN</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary/20 py-8 px-6 flex flex-col md:flex-row items-center justify-center gap-3 text-center text-xs tracking-[0.3em] font-display text-muted-foreground">
        <span>© ROBOT WARS — ALL SYSTEMS ARMED</span>
        <span className="hidden md:inline text-primary">|</span>
        <a href="https://www.kult.games/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
          A <span className="text-accent">KULT</span>GAMES PRODUCTION ↗
        </a>
      </footer>
    </main>
  );
}
