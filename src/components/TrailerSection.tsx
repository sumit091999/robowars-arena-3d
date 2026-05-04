import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export function TrailerSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="trailer" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          viewport={{ once: true }}
          className="relative aspect-video clip-blade border-2 border-primary/40 shadow-glow overflow-hidden bg-card"
        >
          {playing ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Robowars Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group relative w-full h-full bg-arena flex items-center justify-center"
              aria-label="Play trailer"
            >
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute inset-0 scanline" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-primary-foreground fill-current ml-1" />
                </div>
                <span className="mt-6 font-display tracking-[0.3em] text-sm text-foreground/80">PLAY TRAILER</span>
              </div>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
