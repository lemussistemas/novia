import { useEffect, useRef, useState } from "react";
import { LOVE_MESSAGES, SCROLL_TEASES } from "../data/photos";
import DigitalRoses from "./DigitalRoses";
import "./LoveStory.css";

const FLOWERS_AFTER = "No te detengas ahora";

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function StoryBlock({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`story-block ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${Math.min(index * 40, 180)}ms` }}
    >
      <p className="story-index">{String(index + 1).padStart(2, "0")}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

function TeaseLine({ text, index }: { text: string; index: number }) {
  const { ref, visible } = useInView<HTMLParagraphElement>(0.45);

  return (
    <p
      ref={ref}
      className={`tease-line ${visible ? "is-visible" : ""} tease-tone-${index % 3}`}
    >
      {text}
    </p>
  );
}

export default function LoveStory() {
  const insertAt = SCROLL_TEASES.indexOf(FLOWERS_AFTER);
  const before =
    insertAt >= 0 ? SCROLL_TEASES.slice(0, insertAt + 1) : SCROLL_TEASES;
  const after = insertAt >= 0 ? SCROLL_TEASES.slice(insertAt + 1) : [];

  return (
    <section className="love-story" aria-label="Mensajes para Silvia">
      <p className="story-lead">Baja despacio… esto es para ti</p>
      {LOVE_MESSAGES.map((msg, i) => (
        <StoryBlock key={msg.title} title={msg.title} text={msg.text} index={i} />
      ))}

      <div className="scroll-tease" aria-label="Sigue bajando">
        {before.map((line, i) => (
          <TeaseLine key={`${line}-${i}`} text={line} index={i} />
        ))}

        <DigitalRoses />

        {after.map((line, i) => (
          <TeaseLine
            key={`${line}-after-${i}`}
            text={line}
            index={before.length + i}
          />
        ))}
      </div>
    </section>
  );
}
