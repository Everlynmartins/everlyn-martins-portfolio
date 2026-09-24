"use client";

import { useEffect, useRef, useState } from "react";
import { maintenanceViews } from "../data/maintenance";

export function CinematicShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const view = maintenanceViews[selected];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 820px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.8)));
      section.style.setProperty("--opening", media.matches ? "1" : String(progress));
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    media.addEventListener("change", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <div className="case-workbench" ref={sectionRef}>
      <div className="workbench-device">
        <div className="workbench-lid">
          <div className="workbench-camera" aria-hidden="true" />
          <div className="workbench-screen" id="application-view" role="region" aria-label={view.title}>
            <img src={playing && view.animation ? view.animation : view.image} alt={view.alt} loading="lazy" />
          </div>
        </div>
        <div className="workbench-base" aria-hidden="true"><i /></div>
      </div>
      <div className="workbench-controls">
        <p className="section-index">Dentro da aplicação</p>
        <div className="workbench-tabs" aria-label="Capturas da aplicação">
          {maintenanceViews.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={selected === index} aria-controls="application-view"
              onClick={() => { setSelected(index); setPlaying(false); }}>{item.label}</button>
          ))}
        </div>
        <h3>{view.title}</h3>
        <p>{view.description}</p>
        <div className="workbench-actions">
          {view.animation && <button type="button" onClick={() => setPlaying(!playing)} aria-pressed={playing}>{playing ? "Pausar demonstração" : "Reproduzir demonstração"}</button>}
          <a href={view.image} target="_blank" rel="noreferrer">Ampliar captura ↗</a>
        </div>
        <small>Capturas reais do demonstrador local.</small>
      </div>
    </div>
  );
}
