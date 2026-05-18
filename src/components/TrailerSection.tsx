import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import trailerVideo from "@/assets/Trailer.MOV";

export function TrailerSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const playTrailer = useCallback((muteForAutoplay = false) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (muteForAutoplay) {
      video.muted = true;
    }

    void video.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;

        if (!video) {
          return;
        }

        if (entry.isIntersecting) {
          playTrailer(true);
          return;
        }

        video.pause();
      },
      { threshold: 0.45 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [playTrailer]);

  const toggleTrailerPlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      playTrailer();
      return;
    }

    video.pause();
  };

  return (
    <section
      ref={sectionRef}
      id="trailer"
      className="relative overflow-hidden px-6 py-28 bg-background"
      onMouseEnter={() => playTrailer(true)}
      onFocus={() => playTrailer(true)}
    >
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
              muted
              playsInline
              preload="metadata"
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
                <Play className="h-10 w-10" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
