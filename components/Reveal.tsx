"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function Reveal({ delay = 0, y = 40, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.2, 0.9, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SplitHeading({ text, className, as = "h2", id }: { text: string; className?: string; as?: "h2" | "h3"; id?: string }) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      id={id}
      className={className}
      initial="h"
      whileInView="v"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.06 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden style={{ display: "inline-block", overflow: "hidden", paddingBottom: ".08em", marginRight: ".24em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            variants={{ h: { y: "105%", rotate: 6 }, v: { y: 0, rotate: 0, transition: { duration: 0.75, ease: [0.2, 0.9, 0.2, 1] } } }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
