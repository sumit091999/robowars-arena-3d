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
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-display tracking-widest text-muted-foreground">
            <a href="#features" className="hover:text-primary transition">ARENAS</a>
            <a href="#trailer" className="hover:text-primary transition">TRAILER</a>
            <a href="#manual" className="hover:text-primary transition">MANUAL</a>
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

      <footer className="border-t border-primary/20 py-8 px-6 text-center text-xs tracking-[0.3em] font-display text-muted-foreground">
        © ROBOT WARS — ALL SYSTEMS ARMED
      </footer>
    </main>
  );
}
