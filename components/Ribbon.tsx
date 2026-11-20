"use client";

import { motion } from "framer-motion";
import { WORKS, img } from "@/lib/site";
import { Spark } from "./Icons";

const WORDS = ["Portraits", "Families", "Couples", "Pets", "Anime looks", "Sitcom style", "Fan-world scenes", "Gifts"];
const COLORS = ["var(--yellow)", "var(--pink)", "var(--mint)", "var(--blue)", "var(--orange)", "var(--lilac)"];

function Loop({ children, duration, reverse }: { children: React.ReactNode; duration: number; reverse?: boolean }) {
  return (
    <motion.div
      className="marquee"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
      {children}
    </motion.div>
  );
}

export default function Ribbon() {
  return (
    <div className="ribbon" aria-hidden>
      <div className="ribbon-band">
        <Loop duration={32}>
          <div className="marquee-item">
            {WORDS.map((w, i) => (
              <span key={w} style={{ display: "inline-flex", alignItems: "center", gap: 28 }}>
                {w}
                <Spark style={{ color: COLORS[i % COLORS.length] }} />
              </span>
            ))}
          </div>
        </Loop>
      </div>
      <div className="ribbon-band alt">
        <Loop duration={46} reverse>
          <div className="marquee-item">
            {WORKS.map((w, i) => (
              <img
                key={w.slug}
                className="marquee-thumb"
                src={img(w.toon, "sm")}
                alt=""
                loading="lazy"
                style={{ aspectRatio: `${w.w}/${w.h}`, rotate: `${i % 2 ? 2 : -2}deg` }}
              />
            ))}
          </div>
        </Loop>
      </div>
    </div>
  );
}
