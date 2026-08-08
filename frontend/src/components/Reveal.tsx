import HeartGallery from "./HeartGallery";
import LoveStory from "./LoveStory";
import ProposalFinale from "./ProposalFinale";
import "./Reveal.css";

export default function Reveal() {
  return (
    <main className="reveal">
      <section className="reveal-hero">
        <p className="reveal-brand">Silvia</p>
        <h1 className="reveal-heading">Esto es nuestro</h1>
        <p className="reveal-note">
          Un corazón hecho con pedacitos de nosotros. Gíralo, elige una foto…
          y después baja.
        </p>
        <div className="reveal-scroll-cue" aria-hidden>
          <span />
          baja
        </div>
      </section>

      <section className="reveal-gallery" aria-label="Corazón de fotos">
        <HeartGallery />
      </section>

      <LoveStory />
      <ProposalFinale />
    </main>
  );
}
