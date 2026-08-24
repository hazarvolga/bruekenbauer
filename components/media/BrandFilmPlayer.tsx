"use client";

// Client boundary is required to start media only after explicit user interaction.
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FilmState = "idle" | "loading" | "playing" | "error" | "empty";

type BrandFilmLabels = {
  video: string;
  play: string;
  loading: string;
  error: string;
  retry: string;
  unavailable: string;
};

type BrandFilmPlayerProps = {
  src: string;
  poster: string;
  labels: BrandFilmLabels;
};

export function BrandFilmPlayer({ src, poster, labels }: BrandFilmPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [filmState, setFilmState] = useState<FilmState>("idle");
  const [hasStarted, setHasStarted] = useState(false);
  const hasMedia = Boolean(src.trim() && poster.trim());
  const state: FilmState = hasMedia ? filmState : "empty";

  const startPlayback = async () => {
    const video = videoRef.current;

    if (!video || !hasMedia) {
      setFilmState("empty");
      return;
    }

    setFilmState("loading");

    try {
      if (video.error) {
        video.load();
      }
      await video.play();
    } catch {
      setFilmState("error");
    }
  };

  const resetPlayback = () => {
    const video = videoRef.current;

    if (video) {
      video.currentTime = 0;
      video.load();
    }

    setHasStarted(false);
    setFilmState("idle");
  };

  const handlePlaybackError = () => {
    setHasStarted(false);
    setFilmState("error");
  };

  const handlePlaying = () => {
    setHasStarted(true);
    setFilmState("playing");
  };

  return (
    <div
      className={cn(
        "reticle-corners relative aspect-video overflow-hidden border bg-surface-container-lowest",
        {
          "border-graphite-muted": state === "idle" || state === "playing",
          "border-data-orange": state === "loading",
          "border-warning-red": state === "error",
          "border-outline-variant opacity-60": state === "empty",
        }
      )}
      data-film-state={state}
    >
      {hasMedia ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full bg-surface-container-lowest object-contain",
            {
              "opacity-40": state === "error",
            }
          )}
          aria-label={labels.video}
          controls={hasStarted}
          poster={poster}
          preload="none"
          playsInline
          onEnded={resetPlayback}
          onError={handlePlaybackError}
          onPlaying={handlePlaying}
          onWaiting={() => setFilmState("loading")}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}

      {!hasStarted && state !== "playing" ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/20 to-transparent p-6">
          {state === "error" ? (
            <div className="grid max-w-lg gap-4 border border-warning-red bg-surface-container-lowest/95 p-6 text-center">
              <p
                className="font-mono text-data-sm uppercase leading-relaxed text-industrial-silver"
                role="alert"
              >
                {labels.error}
              </p>
              <button
                type="button"
                className="min-h-11 border border-warning-red bg-warning-red px-6 py-3 font-mono text-label-xs uppercase tracking-widest text-primary-container transition-colors hover:bg-transparent hover:text-warning-red active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                onClick={startPlayback}
              >
                {labels.retry}
              </button>
            </div>
          ) : null}

          {state === "empty" ? (
            <p className="border border-outline-variant bg-surface-container-lowest/95 p-6 font-mono text-data-sm uppercase text-on-surface-variant">
              {labels.unavailable}
            </p>
          ) : null}

          {state === "idle" || state === "loading" ? (
            <button
              type="button"
              className={cn(
                "group inline-flex min-h-16 items-center gap-4 border px-6 py-4 font-mono text-label-xs uppercase tracking-widest transition-[border-color,background-color,color,transform] duration-200 ease-out active:scale-[0.98] disabled:cursor-wait disabled:opacity-80",
                {
                  "border-industrial-silver bg-surface-container-lowest/90 text-industrial-silver hover:border-warning-red hover:bg-warning-red hover:text-primary-container":
                    state === "idle",
                  "border-data-orange bg-surface-container-lowest/95 text-data-orange":
                    state === "loading",
                }
              )}
              aria-busy={state === "loading"}
              aria-label={state === "loading" ? labels.loading : labels.play}
              disabled={state === "loading"}
              onClick={startPlayback}
            >
              <span
                className={cn("h-3 w-3 bg-warning-red transition-transform duration-200", {
                  "group-hover:scale-150": state === "idle",
                  "animate-pulse bg-data-orange": state === "loading",
                })}
                aria-hidden="true"
              />
              {state === "loading" ? labels.loading : labels.play}
            </button>
          ) : null}
        </div>
      ) : null}

      {hasStarted && state === "loading" ? (
        <div
          className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-3 border border-data-orange bg-surface-container-lowest/90 px-4 py-3 font-mono text-label-xs uppercase tracking-widest text-data-orange"
          aria-live="polite"
        >
          <span className="h-2 w-2 animate-pulse bg-data-orange" aria-hidden="true" />
          {labels.loading}
        </div>
      ) : null}
    </div>
  );
}
