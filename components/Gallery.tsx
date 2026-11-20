"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { WORKS, img, type Work } from "@/lib/site";
import { Arrow, Close } from "./Icons";
import { Reveal, SplitHeading } from "./Reveal";
import { scrollToId } from "./Chrome";

const FILTERS = ["All", "Families", "Solo", "Pets", "Scenes"] as const;

function Tile({ w, onOpen, i }: { w: Work; onOpen: () => void; i: number }) {
  const [t, setT] = useState({ rx: 0, ry: 0 });
  return (
    <motion.button
      className="tile"
      onClick={onOpen}
      aria-label={`Open ${w.title}`}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.2, 0.9, 0.2, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setT({ ry: ((e.clientX - r.left) / r.width - 0.5) * 8, rx: -((e.clientY - r.top) / r.height - 0.5) * 8 });
      }}
      onPointerLeave={() => setT({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transition: "transform .25s ease-out" }}
    >
      <motion.img layoutId={`img-${w.slug}`} src={img(w.toon, "sm")} srcSet={`${img(w.toon, "sm")} 720w, ${img(w.toon)} 1800w`}
        sizes="(max-width: 700px) 100vw, 33vw" alt={w.alt} width={w.w} height={w.h} loading="lazy" decoding="async" />
      {w.refs && <span className="has-ref">From photo</span>}
      <span className="meta">
        <strong>{w.title}</strong>
        <small>{w.category}</small>
      </span>
    </motion.button>
  );
}

function Lightbox({ list, index, onClose, onNav }: { list: Work[]; index: number; onClose: () => void; onNav: (d: number) => void }) {
  const w = list[index];
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={w.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="lightbox-bg" onClick={onClose} />
      <motion.div className="lightbox-card" initial={{ y: 40, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }} data-lenis-prevent>
        <div className="lightbox-img">
          <AnimatePresence mode="wait">
            <motion.img key={w.slug} layoutId={`img-${w.slug}`} src={img(w.toon)} alt={w.alt} width={w.w} height={w.h}
              initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </AnimatePresence>
        </div>
        <aside className="lightbox-side">
          <span className="chip" style={{ justifySelf: "start", width: "fit-content", background: "var(--yellow)" }}>{w.category}</span>
          <h3>{w.title}</h3>
          <p>{w.blurb}</p>
          <div className="chips">{w.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
          {w.refs && (
            <>
              <strong style={{ marginTop: 8 }}>Made from:</strong>
              <div className="ref-thumbs">
                {w.refs.map((r, i) => (
                  <motion.figure key={r.file} initial={{ rotate: 0, y: 20, opacity: 0 }} animate={{ rotate: i % 2 ? 4 : -4, y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
                    <img src={img(r.file, "sm")} alt={`Reference photo: ${r.label}`} />
                    <figcaption>{r.label}</figcaption>
                  </motion.figure>
                ))}
              </div>
            </>
          )}
          <a className="btn pink" style={{ marginTop: "auto", justifyContent: "center" }} href="#contact"
            onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => scrollToId("contact"), 250); }}>
            I want one like this <Arrow />
          </a>
        </aside>
        <button className="lb-close" onClick={onClose} aria-label="Close"><Close width={20} /></button>
        {list.length > 1 && (
          <>
            <button className="lb-nav prev" onClick={() => onNav(-1)} aria-label="Previous"><Arrow width={22} style={{ transform: "scaleX(-1)" }} /></button>
            <button className="lb-nav next" onClick={() => onNav(1)} aria-label="Next"><Arrow width={22} /></button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => (filter === "All" ? WORKS : WORKS.filter((w) => w.category === filter)), [filter]);
  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)), [list.length]);

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section-head" style={{ gridTemplateColumns: "1fr auto", alignItems: "end" }}>
          <div style={{ display: "grid", gap: 18 }}>
            <Reveal><span className="eyebrow"><i /> The gallery</span></Reveal>
            <SplitHeading id="gallery-title" className="h2" text="Every toon tells a story." />
            <Reveal delay={0.1}><p className="lead">Families, friends, furry sidekicks and full-blown fantasy scenes. Tap any piece to take a closer look.</p></Reveal>
          </div>
        </div>

        <Reveal>
          <LayoutGroup id="filters">
            <div className="filters" role="tablist" aria-label="Filter gallery" style={{ marginBottom: 36 }}>
              {FILTERS.map((f) => (
                <button key={f} role="tab" aria-selected={filter === f} className={`filter ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                  {filter === f && <motion.span layoutId="pill" className="pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  {f}
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        <div className="masonry">
          <AnimatePresence mode="popLayout">
            {list.map((w, i) => (
              <Tile key={w.slug} w={w} i={i} onOpen={() => setOpen(i)} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox list={list} index={open} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  );
}
