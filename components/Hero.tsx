"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { img } from "@/lib/site";
import { Arrow, Spark } from "./Icons";
import { scrollToId } from "./Chrome";

const ease = [0.2, 0.9, 0.2, 1] as const;

function Parallax({ mx, my, depth, children, style, className }: {
  mx: MotionValue<number>; my: MotionValue<number>; depth: number; children: React.ReactNode; style?: React.CSSProperties; className?: string;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section className="hero" id="top" onPointerMove={onMove} aria-labelledby="hero-title">
      {/* decorative background shapes */}
      <motion.div className="float-shape halftone" aria-hidden
        style={{ width: 260, height: 260, borderRadius: "50%", top: "8%", left: "-80px", opacity: 0.12 }}
        animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} />
      <motion.div className="float-shape" aria-hidden style={{ bottom: "10%", left: "44%", color: "var(--pink)" }}
        animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }}>
        <Spark width={34} height={34} />
      </motion.div>
      <motion.div className="float-shape" aria-hidden style={{ top: "18%", left: "46%", color: "var(--blue)" }}
        animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        <Spark width={22} height={22} />
      </motion.div>

      <div className="wrap hero-grid">
        <div>
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease }}>
            <i /> Custom cartoon portraits · Made to order
          </motion.span>

          <h1 id="hero-title">
            <span className="line">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease }}>Your photo.</motion.span>
            </span>
            <span className="line" style={{ paddingBottom: ".14em" }}>
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease }}>
                Turned{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <motion.span className="toon-word" initial={{ rotate: -12, scale: 0.6 }} animate={{ rotate: -3, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 9, delay: 1.0 }}>
                    toon!
                  </motion.span>
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p className="lead" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease }}>
            Send a selfie, a family snap or a photo of your pet — get back a vibrant, one-of-a-kind cartoon that looks unmistakably like <em>you</em>.
            Perfect for gifts, profile pics, posters and prints.
          </motion.p>

          <motion.div className="hero-cta" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95, ease }}>
            <a className="btn pink" href="#showcase" onClick={(e) => { e.preventDefault(); scrollToId("showcase"); }}>
              See the magic <Arrow />
            </a>
            <a className="btn ghost" href="#contact" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>
              Order your toon
            </a>
          </motion.div>

          <motion.div className="hero-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            <div className="hero-faces" aria-hidden>
              {["grill-master-toon", "critter-crew-toon", "forest-trailblazer-toon", "best-buds-toon"].map((b) => (
                <img key={b} src={img(b, "sm")} alt="" width={44} height={44} />
              ))}
            </div>
            Solo · Couples · Families · Pets · Fan-world scenes
          </motion.div>
        </div>

        {/* card stack */}
        <div className="hero-stage" aria-hidden>
          <Parallax mx={mx} my={my} depth={-10} className="card" style={{ width: "58%", aspectRatio: "4/3", top: "2%", left: "0%", rotate: "-9deg" }}>
            <motion.img src={img("best-buds-toon", "sm")} alt="" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }} />
          </Parallax>
          <Parallax mx={mx} my={my} depth={-16} className="card" style={{ width: "52%", aspectRatio: "4/3", top: "6%", right: "-2%", rotate: "8deg" }}>
            <img src={img("family-adventure-toon", "sm")} alt="" />
          </Parallax>

          <motion.div initial={{ opacity: 0, y: 80, rotate: 10 }} animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
            style={{ position: "absolute", width: "66%", aspectRatio: "1", left: "20%", top: "26%" }}>
            <Parallax mx={mx} my={my} depth={14} className="card" style={{ inset: 0 }}>
              <img src={img("critter-crew-toon")} alt="" />
            </Parallax>
          </motion.div>

          <motion.figure className="polaroid" style={{ width: "34%", left: "-3%", bottom: "2%", margin: 0 }}
            initial={{ opacity: 0, x: -60, rotate: -30 }} animate={{ opacity: 1, x: 0, rotate: -10 }}
            transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.1 }}>
            <span className="tape" />
            <img src={img("critter-crew-photo", "sm")} alt="" />
            <figcaption>the original</figcaption>
          </motion.figure>

          <motion.svg viewBox="0 0 120 70" style={{ position: "absolute", width: "18%", left: "26%", bottom: "-4%" }}
            initial="h" animate="v">
            <motion.path d="M5 30 C 30 70, 80 70, 108 28" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"
              variants={{ h: { pathLength: 0 }, v: { pathLength: 1, transition: { delay: 1.7, duration: 0.8 } } }} />
            <motion.path d="M94 26 L110 26 L106 42" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              variants={{ h: { pathLength: 0 }, v: { pathLength: 1, transition: { delay: 2.4, duration: 0.3 } } }} />
          </motion.svg>

          <motion.div className="sticker" style={{ width: "24%", aspectRatio: "1", right: "-2%", bottom: "4%", background: "var(--yellow)", fontSize: "clamp(.8rem,1.5vw,1.1rem)" }}
            initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 12 }} transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1.5 }}>
            <motion.svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 6 }} animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
              <defs><path id="circ" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
              <text fontSize="11.5" fontWeight="800" letterSpacing="2.4" fill="var(--ink)">
                <textPath href="#circ">✦ ONE OF A KIND ✦ 100% YOU </textPath>
              </text>
            </motion.svg>
            <Spark width="34%" height="34%" style={{ color: "var(--pink)" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
