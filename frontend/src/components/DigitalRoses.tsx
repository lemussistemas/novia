import { useEffect, useRef, useState } from "react";
import "./DigitalRoses.css";

function LilacRose({ delay = 0, size = 1 }: { delay?: number; size?: number }) {
  const gid = `rose${Math.round(delay * 100)}${Math.round(size * 100)}`;

  return (
    <svg
      className="lilac-rose"
      viewBox="0 0 120 150"
      width={88 * size}
      height={110 * size}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${gid}-center`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#f6e8ff" />
          <stop offset="45%" stopColor="#d4a8ef" />
          <stop offset="100%" stopColor="#8a5aad" />
        </radialGradient>
      </defs>

      <path
        d="M60 148 C57 118 63 104 58 84"
        fill="none"
        stroke="#4f7a52"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M58 112 C42 104 34 112 38 122 C46 118 52 118 58 112Z"
        fill="#5f8f63"
      />
      <path
        d="M60 104 C76 96 84 104 80 114 C72 110 66 108 60 104Z"
        fill="#6a9a6e"
      />

      <g className="rose-head">
        <ellipse cx="60" cy="62" rx="30" ry="28" fill={`url(#${gid}-center)`} />
        <path
          d="M60 34 C72 34 84 44 84 58 C84 74 72 84 60 84 C48 84 36 74 36 58 C36 44 48 34 60 34Z"
          fill="#c9a0e4"
          opacity="0.95"
        />
        <path
          d="M60 40 C70 40 79 48 79 58 C79 70 70 78 60 78 C50 78 41 70 41 58 C41 48 50 40 60 40Z"
          fill="#e2c4f5"
        />
        <path
          d="M52 48 C58 42 68 44 70 54 C68 64 58 68 50 62 C46 56 48 50 52 48Z"
          fill="#f3e4ff"
        />
        <path
          d="M60 50 C65 50 69 54 68 59 C66 64 60 66 56 62 C54 58 56 52 60 50Z"
          fill="#8f5fb4"
        />
        <circle cx="62" cy="56" r="3.2" fill="#6d3f8f" />
      </g>
    </svg>
  );
}

export default function DigitalRoses() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`digital-roses ${visible ? "is-visible" : ""}`}
      aria-label="Flores digitales"
    >
      <div className="roses-bouquet" aria-hidden>
        <span className="rose-wrap rose-a">
          <LilacRose delay={0.05} size={0.92} />
        </span>
        <span className="rose-wrap rose-b">
          <LilacRose delay={0.18} size={1.15} />
        </span>
        <span className="rose-wrap rose-c">
          <LilacRose delay={0.3} size={0.95} />
        </span>
        <span className="rose-wrap rose-d">
          <LilacRose delay={0.42} size={0.85} />
        </span>
        <span className="rose-wrap rose-e">
          <LilacRose delay={0.55} size={1} />
        </span>
      </div>

      <h2 className="roses-title">Te regalo flores digitales</h2>
      <p className="roses-text">porque sé que las reales no te faltan.</p>
    </section>
  );
}
