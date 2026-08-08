import { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";

const SONG_SRC = "/audio/lasso-pornografia.mp3";

type Props = {
  autoPlay?: boolean;
};

export default function MusicPlayer({ autoPlay = false }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const audio = new Audio(SONG_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.85;
    audioRef.current = audio;

    const onPlay = () => {
      setPlaying(true);
      setNeedsTap(false);
    };
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const tryPlay = () => {
      if (!autoPlay) return;
      void audio
        .play()
        .then(() => setNeedsTap(false))
        .catch(() => setNeedsTap(true));
    };

    // Try as soon as possible, then again when buffered.
    tryPlay();
    audio.addEventListener("canplaythrough", tryPlay, { once: true });

    // If the first tap/click anywhere unlocks audio policies, start then.
    const unlockOnGesture = () => {
      if (!audio.paused) return;
      void audio.play().then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
    };
    window.addEventListener("pointerdown", unlockOnGesture, { once: true });
    window.addEventListener("touchstart", unlockOnGesture, { once: true });
    window.addEventListener("keydown", unlockOnGesture, { once: true });

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplaythrough", tryPlay);
      window.removeEventListener("pointerdown", unlockOnGesture);
      window.removeEventListener("touchstart", unlockOnGesture);
      window.removeEventListener("keydown", unlockOnGesture);
      audioRef.current = null;
    };
  }, [autoPlay]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setNeedsTap(false);
      } catch {
        setNeedsTap(true);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <button
      type="button"
      className={`music-toggle ${playing ? "is-playing" : ""} ${needsTap ? "needs-tap" : ""}`}
      onClick={toggle}
      aria-label={playing ? "Pausar canción" : "Reproducir canción"}
      title={playing ? "Pausar" : "Reproducir"}
    >
      <span className="music-icon" aria-hidden>
        {playing ? "❚❚" : "♪"}
      </span>
      <span className="music-label">
        {playing ? "Pausar" : needsTap ? "Toca para escuchar" : "Música"}
      </span>
    </button>
  );
}
