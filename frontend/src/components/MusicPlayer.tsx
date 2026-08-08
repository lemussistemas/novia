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

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!autoPlay || !audioRef.current) return;
    const audio = audioRef.current;
    void audio
      .play()
      .then(() => setNeedsTap(false))
      .catch(() => setNeedsTap(true));
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
