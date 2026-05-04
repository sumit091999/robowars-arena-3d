import { Play } from "lucide-react";
import { motion } from "framer-motion";
import trailerBg from "@/assets/ChatGPT Image May 4, 2026, 10_29_48 PM.png";

export function TrailerSection() {
  return (
    <section
      id="trailer"
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-24"
      style={{ backgroundImage: `url(${trailerBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/68 to-background/90 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.22 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm tracking-[0.3em] font-display">OFFICIAL REVEAL</span>
          <h2 className="text-5xl md:text-7xl font-display font-black mt-3 text-glow">
            WATCH THE <span className="text-primary">TRAILER</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Steel against steel. Sparks against the void. See what awaits in the arena.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.22 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative aspect-video clip-blade border-2 border-primary/40 shadow-glow overflow-hidden bg-card/80 backdrop-blur-sm"
        >
          <div className="relative w-full h-full bg-arena flex items-center justify-center">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute inset-0 scanline" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <Play className="w-10 h-10 text-primary-foreground fill-current ml-1" />
              </div>
              <span className="mt-6 font-display tracking-[0.3em] text-sm text-foreground/80 uppercase">Coming Soon</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
