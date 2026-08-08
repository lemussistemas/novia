import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { COUPLE_PHOTOS } from "../data/photos";
import "./HeartGallery.css";

type Point = { x: number; y: number; z: number };

function heartPoint(t: number): Point {
  const x = 16 * Math.sin(t) ** 3;
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  const z = Math.cos(t) * 22 + Math.sin(t * 3) * 8;
  return { x, y, z };
}

function heartPositions(count: number): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const t = Math.PI - (i / count) * Math.PI * 2;
    return heartPoint(t);
  });
}

export default function HeartGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [rotation, setRotation] = useState(-18);
  const dragging = useRef(false);
  const moved = useRef(false);
  const lastX = useRef(0);
  const auto = useRef(true);
  const frame = useRef(0);
  const selectedRef = useRef<number | null>(null);

  const points = useMemo(() => heartPositions(COUPLE_PHOTOS.length), []);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const tick = () => {
      if (auto.current && selectedRef.current === null && !dragging.current) {
        setRotation((r) => r + 0.22);
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    moved.current = false;
    auto.current = false;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    if (Math.abs(dx) > 2) moved.current = true;
    lastX.current = e.clientX;
    setRotation((r) => r + dx * 0.4);
  };

  const onPointerUp = () => {
    dragging.current = false;
    window.setTimeout(() => {
      if (selectedRef.current === null) auto.current = true;
    }, 1400);
  };

  const scale = 9.6;

  return (
    <div className="heart-gallery">
      <p className="heart-hint">Arrastra para girar · toca una foto para acercarla</p>

      <div
        className={`heart-stage ${selected !== null ? "has-selection" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="heart-glow" aria-hidden />
        <div
          className="heart-world"
          style={{ transform: `rotateX(8deg) rotateY(${rotation}deg)` }}
        >
          {COUPLE_PHOTOS.map((photo, i) => {
            const p = points[i];
            const isSelected = selected === photo.id;
            const baseX = p.x * scale;
            const baseY = -p.y * scale + 12;
            const baseZ = p.z * 1.4;

            const transform = isSelected
              ? `translate3d(0px, 12px, 260px) rotateY(${-rotation}deg) rotateX(-8deg) scale(1.6)`
              : `translate3d(${baseX}px, ${baseY}px, ${baseZ}px) rotateY(${-rotation}deg) rotateX(-8deg)`;

            return (
              <button
                key={photo.id}
                type="button"
                className={`heart-photo ${isSelected ? "is-selected" : ""}`}
                style={{ transform, zIndex: isSelected ? 20 : 1 + Math.round((baseZ + 40) / 4) }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (moved.current) return;
                  setSelected((prev) => (prev === photo.id ? null : photo.id));
                  auto.current = false;
                }}
                aria-label={photo.alt}
              >
                <img src={photo.src} alt={photo.alt} draggable={false} />
              </button>
            );
          })}
        </div>
      </div>

      {selected !== null ? (
        <button
          type="button"
          className="heart-reset"
          onClick={() => {
            setSelected(null);
            auto.current = true;
          }}
        >
          Volver al corazón
        </button>
      ) : (
        <p className="heart-caption">Nuestro corazón, hecho de momentos</p>
      )}
    </div>
  );
}
