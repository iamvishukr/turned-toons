"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

let lenisRef: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef) lenisRef.scrollTo(el, { offset: -80, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef = null;
    };
  }, []);
  return null;
}

const LINKS = [
  ["showcase", "Before & After"],
  ["gallery", "Gallery"],
  ["process", "How it works"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
] as const;

function NavLink({ id, label, onClick }: { id: string; label: string; onClick?: () => void }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        scrollToId(id);
      }}
    >
      {label}
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} aria-hidden />
      <motion.header
        className="nav"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1], delay: 0.15 }}
      >
        <div className="wrap nav-inner">
          <a
            href="#top"
            className="logo"
            aria-label="TurnedToons home"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              scrollToId("top");
            }}
          >
            <img className="logo-badge" src="logo.webp" alt="" width={44} height={44} />
            <span>
              Turned<b>Toons</b>
            </span>
          </a>
          <nav aria-label="Main">
            <ul className="nav-links">
              {LINKS.map(([id, label]) => (
                <li key={id}>
                  <NavLink id={id} label={label} />
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn desk" href="#contact" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>
            Get your toon
          </a>
          <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            {LINKS.map(([id, label], i) => (
              <motion.div key={id} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.06 }}>
                <NavLink id={id} label={label} onClick={() => setOpen(false)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
