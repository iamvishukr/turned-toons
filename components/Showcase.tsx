"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";
import { WORKS, img } from "@/lib/site";
import { Reveal, SplitHeading } from "./Reveal";

const PAIRS = WORKS.filter((w) => w.refs?.length);

function Compare({ index }: { index: number }) {
  const work = PAIRS[index];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const pos = useMotionValue(50);
  const clip = useMotionTemplate`inset(0 ${useTransform(pos, (v) => 100 - v)}% 0 0)`;
  const left = useMotionTemplate`${pos}%`;
  const [touched, setTouched] = useState(false);
  const dragging = useRef(false);

  // little "demo" sweep the first time it scrolls into view & on project change
  useEffect(() => {
    if (!inView) return;
    const c = animate(pos, [pos.get(), 82, 18, 50], { duration: 2.4, ease: "easeInOut", delay: 0.3 });
    return () => c.stop();
  }, [inView, index, pos]);

  const setFromEvent = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    pos.set(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  const ratio = work.w / work.h;

  return (
    <div style={{ maxWidth: `calc(72svh * ${ratio})`, marginInline: "auto" }}>
      <div
        ref={ref}
        className="compare"
        style={{ aspectRatio: `${work.w}/${work.h}` }}
        role="slider"
        tabIndex={0}
        aria-label={`Compare original photo and toon for ${work.title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos.get())}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - 5));
          if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + 5));
        }}
        onPointerDown={(e) => {
          dragging.current = true;
          setTouched(true);
          pos.stop();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setFromEvent(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromEvent(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={work.slug} style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}>
            <div className="layer">
              <img className="full" src={img(work.toon)} alt={work.alt} width={work.w} height={work.h} loading="lazy" decoding="async" />
            </div>
            <motion.div className="layer photo-layer" style={{ clipPath: clip }}>
              <div className="blur" style={{ backgroundImage: `url(${img(work.refs![0].file, "sm")})` }} />
              <div className="refs">
                {work.refs!.map((r) => (
                  <img key={r.file} src={img(r.file)} alt={`Original reference photo: ${r.label}`} width={r.w} height={r.h} loading="lazy"
                    style={{ aspectRatio: `${r.w}/${r.h}`, maxWidth: `${(100 / work.refs!.length) - 2}%`, flex: "0 1 auto" }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <span className="tag l">The photo</span>
        <span className="tag r">The toon</span>

        <motion.div className="handle" style={{ left }}>
          <div className="knob" aria-hidden>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </div>
        </motion.div>
        <AnimatePresence>
          {!touched && (
            <motion.div className="drag-hint" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              ← Drag to compare →
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Showcase() {
  const [i, setI] = useState(0);
  const work = PAIRS[i];

  return (
    <section className="section" id="showcase" aria-labelledby="showcase-title">
      <div className="wrap">
        <div className="section-head">
          <Reveal><span className="eyebrow"><i /> Before &amp; after</span></Reveal>
          <SplitHeading id="showcase-title" className="h2" text="From camera roll to cartoon world." />
          <Reveal delay={0.15}>
            <p className="lead">
              Every toon starts with a real photo. Drag the slider to see how each client&apos;s reference turned into their own illustrated adventure.
            </p>
          </Reveal>
        </div>

        <div className="show-grid">
          <Reveal y={60}>
            <Compare index={i} />
            <AnimatePresence mode="wait">
              <motion.div key={work.slug} className="show-info" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                <h3>{work.title}</h3>
                <p>{work.blurb}</p>
                <div className="chips">
                  {work.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                  <span className="chip" style={{ background: "var(--yellow)" }}>{work.refs!.length} reference photo{work.refs!.length > 1 ? "s" : ""}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <div className="show-list" role="tablist" aria-label="Choose a project">
            {PAIRS.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 0.07} y={24}>
                <button className="show-tab" role="tab" aria-selected={idx === i} onClick={() => setI(idx)} style={{ width: "100%" }}>
                  <img src={img(p.toon, "sm")} alt="" width={64} height={64} loading="lazy" />
                  <div>
                    <strong>{p.title}</strong>
                    <span>{p.category} · {p.refs!.length} photo{p.refs!.length > 1 ? "s" : ""}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
