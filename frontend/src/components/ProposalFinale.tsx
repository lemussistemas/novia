import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./ProposalFinale.css";

type Stage =
  | "ready"
  | "forming"
  | "envelope"
  | "letter"
  | "confirm"
  | "celebration";

const LETTER_SOURCE = "Y sabes que  Para Silvia  con amor  abre esto";

function scatter(seed: number) {
  const x = ((seed * 47) % 100) - 50;
  const y = ((seed * 29) % 100) - 50;
  const r = ((seed * 13) % 60) - 30;
  return { x, y, r };
}

export default function ProposalFinale() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<Stage>("ready");

  const chars = useMemo(
    () =>
      LETTER_SOURCE.split("").map((ch, i) => ({
        ch: ch === " " ? "\u00A0" : ch,
        ...scatter(i + 3),
        delay: (i % 12) * 0.03,
      })),
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // forming -> envelope
  useEffect(() => {
    if (stage !== "forming") return;
    const id = window.setTimeout(() => setStage("envelope"), 1600);
    return () => window.clearTimeout(id);
  }, [stage]);

  // envelope -> letter (open + show question)
  useEffect(() => {
    if (stage !== "envelope") return;
    const id = window.setTimeout(() => setStage("letter"), 1400);
    return () => window.clearTimeout(id);
  }, [stage]);

  return (
    <section
      ref={ref}
      className={`proposal ${visible ? "is-visible" : ""} stage-${stage}`}
      aria-label="La pregunta"
    >
      {stage === "ready" && (
        <div className="proposal-ready">
          <p className="proposal-eyebrow">Y sabes qué…</p>
          <p className="proposal-ready-hint">Hay algo esperándote aquí.</p>
          <button
            type="button"
            className="proposal-press"
            onClick={() => setStage("forming")}
          >
            Presione aquí…
          </button>
        </div>
      )}

      {(stage === "forming" || stage === "envelope") && (
        <div className="letter-stage">
          <div className={`glyph-cloud ${stage}`}>
            {chars.map((item, i) => (
              <span
                key={`${item.ch}-${i}`}
                className="glyph"
                style={
                  {
                    "--sx": `${item.x}vw`,
                    "--sy": `${item.y}vh`,
                    "--sr": `${item.r}deg`,
                    "--d": `${item.delay}s`,
                  } as CSSProperties
                }
              >
                {item.ch}
              </span>
            ))}
          </div>

          <div
            className={`envelope ${stage === "envelope" ? "is-formed is-opening" : ""}`}
          >
            <div className={`envelope-flap ${stage === "envelope" ? "is-open" : ""}`} />
            <div className="envelope-body" />
            <div className="envelope-seal" />
          </div>
          <p className="envelope-wait">Abriendo tu carta…</p>
        </div>
      )}

      {stage === "letter" && (
        <div className="love-letter-wrap">
          <div className="envelope is-open" aria-hidden>
            <div className="envelope-flap is-open" />
            <div className="envelope-body" />
          </div>

          <article className="love-letter" role="dialog" aria-label="Carta de amor">
            <p className="love-letter-from">Para Silvia</p>
            <h2 className="love-letter-question">¿Quieres ser mi novia?</h2>
            <p className="love-letter-body">
              Con todo lo que somos, con lo que ya vivimos y con lo que quiero
              construir a tu lado…
            </p>
            <button
              type="button"
              className="proposal-yes"
              onClick={() => setStage("confirm")}
            >
              Sí, quiero
            </button>
          </article>
        </div>
      )}

      {stage === "confirm" && (
        <div className="proposal-confirm">
          <p className="confirm-dots">…</p>
          <h2 className="confirm-title">
            ¿Estás segura? ¿Sabes a lo que te metes?
          </h2>
          <p className="confirm-sub">¿Segura que quieres?</p>
          <button
            type="button"
            className="proposal-yes"
            onClick={() => setStage("celebration")}
          >
            Sí, quiero
          </button>
        </div>
      )}

      {stage === "celebration" && (
        <div className="proposal-celebration" role="status">
          <p className="cele-eyebrow">Oficialmente…</p>
          <h2 className="cele-title">Felicidades, tienes novio</h2>
          <p className="cele-line">Adiós soltería</p>
          <p className="cele-punch">Eres loba domesticada</p>
          <p className="cele-soft">Te elijo, Silvia.</p>
        </div>
      )}
    </section>
  );
}
