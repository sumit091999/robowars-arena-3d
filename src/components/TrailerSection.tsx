import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import trailerBg from "@/assets/ChatGPT Image May 4, 2026, 10_29_48 PM.png";
import trailerVideo from "@/assets/Trailer.MOV";

export function TrailerSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const toggleTrailerPlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      return;
    }

    video.pause();
  };

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
          <div className="relative z-10 h-full w-full overflow-hidden bg-card/40 clip-blade">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={trailerBg}
              onPlay={() => {
                setHasStarted(true);
                setIsPlaying(true);
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={trailerVideo} type="video/quicktime" />
              <source src={trailerVideo} type="video/mp4" />
            </video>
            {!isPlaying && (
              <button
                type="button"
                aria-label={hasStarted ? "Resume trailer" : "Play trailer"}
                onClick={toggleTrailerPlayback}
                className="trailer-center-control"
              >
                {hasStarted ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
