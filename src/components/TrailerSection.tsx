import { Play } from "lucide-react";
import trailerBg from "@/assets/ChatGPT Image May 4, 2026, 10_29_48 PM.png";

export function TrailerSection() {
  return (
    <section id="trailer" className="relative overflow-hidden px-6 py-28 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="text-accent text-sm tracking-[0.3em] font-display">OFFICIAL REVEAL</span>
          <h2 className="text-5xl md:text-7xl font-display font-black mt-3">
            WATCH THE <span className="text-primary">TRAILER</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Steel against steel. Sparks against the void. See what awaits in the arena.
          </p>
        </div>

        <div className="trailer-border-orbit relative aspect-video overflow-hidden p-[2px] clip-blade shadow-glow">
          <div
            className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden bg-card/40 bg-cover bg-center clip-blade"
            style={{ backgroundImage: `url(${trailerBg})` }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                <Play className="w-10 h-10 text-primary-foreground fill-current ml-1" />
              </div>
              <span className="mt-6 font-display tracking-[0.3em] text-sm text-foreground/80 uppercase">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
