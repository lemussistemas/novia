import { useEffect, useState } from "react";
import GateForm from "./components/GateForm";
import MusicPlayer from "./components/MusicPlayer";
import Reveal from "./components/Reveal";
import "./App.css";

const UNLOCK_KEY = "silvia-unlocked";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(UNLOCK_KEY) === "1");
    setReady(true);
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem(UNLOCK_KEY, "1");
    setUnlocked(true);
  };

  if (!ready) {
    return <div className="app-loading" aria-hidden />;
  }

  return (
    <div className={`app-shell ${unlocked ? "is-unlocked" : ""}`}>
      <div className="ambient ambient-a" aria-hidden />
      <div className="ambient ambient-b" aria-hidden />
      {unlocked ? <Reveal /> : <GateForm onUnlock={handleUnlock} />}
      <MusicPlayer autoPlay />
    </div>
  );
}
