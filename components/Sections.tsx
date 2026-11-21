"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ADDRESS_LINES, CONTACT, FAQS, SITE } from "@/lib/site";
import { Reveal, SplitHeading } from "./Reveal";
import { Arrow, Facebook, Instagram, Mail, Pin } from "./Icons";
import { scrollToId } from "./Chrome";

/* ───────── Process ───────── */
const STEPS = [
  { n: 1, c: "var(--yellow)", t: "Send your photos", d: "Share a clear photo of each person (and pet!) plus your idea — a theme, a favourite universe, a hobby or an occasion." },
  { n: 2, c: "var(--mint)", t: "Watch it come alive", d: "Your toon is sketched, inked and coloured by hand. You'll see progress and can request tweaks along the way." },
  { n: 3, c: "var(--pink)", t: "Get your toon", d: "Receive a high-resolution file ready to post, print, frame or gift. Expect big smiles." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const len = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="section-head center">
          <Reveal><span className="eyebrow"><i /> How it works</span></Reveal>
          <SplitHeading id="process-title" className="h2" text="Three steps to toon town." />
          <Reveal delay={0.1}><p className="lead">No complicated briefs. Just your photos, your idea and a little patience.</p></Reveal>
        </div>
        <div className="steps" ref={ref}>
          <svg className="steps-line" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden>
            <motion.path d="M80 40 C 250 -20, 330 100, 500 40 S 760 -20, 920 40" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"
              style={{ pathLength: len }} />
          </svg>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15} y={60}>
              <motion.article className="step" whileHover={{ y: -6, rotate: i === 1 ? 1 : -1 }} style={{ height: "100%" }}>
                <motion.div className="num" style={{ background: s.c }} initial={{ scale: 0, rotate: -120 }} whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 + i * 0.15 }}>
                  {s.n}
                </motion.div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Services ───────── */
const SERVICES = [
  { i: "🙂", c: "#fff2b8", t: "Solo toons", d: "A single portrait full of personality — great for profile pictures and avatars." },
  { i: "💞", c: "#ffd3e1", t: "Couples & duos", d: "Best friends, partners, siblings. Anniversaries and weddings sorted." },
  { i: "👨‍👩‍👧‍👦", c: "#cdeffd", t: "Family squads", d: "Grandparents to toddlers, from separate photos, in one epic scene." },
  { i: "🐾", c: "#d6f5e9", t: "Pets & sidekicks", d: "Dogs, cats and every furry friend, drawn with as much love as the humans." },
  { i: "⚡", c: "#e6dcff", t: "Fan-world scenes", d: "Step into the anime, arena or sitcom world you love — complete with backdrops." },
  { i: "🎁", c: "#ffe0cc", t: "Gifts & prints", d: "Birthdays, Father's Day, farewells — a print-ready file for posters, mugs and tees." },
];

export function Services() {
  return (
    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head">
          <Reveal><span className="eyebrow"><i /> What I make</span></Reveal>
          <SplitHeading id="services-title" className="h2" text="Toons for every kind of story." />
        </div>
        <div className="services">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 0.1}>
              <article className="service" style={{ ["--c" as string]: s.c }}>
                <motion.span className="ico" aria-hidden whileHover={{ scale: 1.3, rotate: -12 }}>{s.i}</motion.span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }} aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="section-head" style={{ position: "sticky", top: 120 }}>
          <Reveal><span className="eyebrow"><i /> FAQ</span></Reveal>
          <SplitHeading id="faq-title" className="h2" text="Questions? Answered." />
          <Reveal delay={0.1}>
            <p className="lead">Still curious? Drop a message — I usually reply quickly.</p>
            <p className="hand" style={{ fontSize: "1.8rem", margin: "16px 0 0", rotate: "-3deg", color: "var(--pink)" }}>no question is too silly ✦</p>
          </Reveal>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05} y={24}>
                <div className={`faq-item ${isOpen ? "open" : ""}`}>
                  <h3 style={{ margin: 0 }}>
                    <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                      {f.q}
                      <motion.span className="pm" animate={{ rotate: isOpen ? 45 : 0 }} aria-hidden>
                        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M12 4v16M4 12h16" /></svg>
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.2, 0.9, 0.2, 1] }} style={{ overflow: "hidden" }}>
                        <p className="faq-a">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Contact ───────── */
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "Family toon", people: "", idea: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "mailto">("idle");
  const subject = `TurnedToons request — ${form.type}`;
  const message = `Hi TurnedToons! I'm ${form.name || "…"} and I'd love a ${form.type.toLowerCase()}.${form.people ? `\nPeople/pets: ${form.people}` : ""}${form.idea ? `\nIdea: ${form.idea}` : ""}`;
  const mailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  const openMailApp = () => { window.location.href = mailHref; setStatus("mailto"); };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!CONTACT.web3formsKey) return openMailApp();
    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (botcheck) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CONTACT.web3formsKey,
          subject,
          from_name: "TurnedToons website",
          name: form.name,
          email: form.email,
          replyto: form.email,
          "Toon type": form.type,
          "People & pets": form.people,
          message: form.idea || "(no idea given)",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "Send failed");
      setStatus("sent");
      setForm({ name: "", email: "", type: form.type, people: "", idea: "" });
    } catch {
      setStatus("error");
    }
  };

  const rows = [
    { href: `mailto:${CONTACT.email}`, icon: <Mail />, bg: "var(--yellow)", label: "Email", value: CONTACT.email },
    { href: CONTACT.instagram, icon: <Instagram />, bg: "#ffc0d4", label: "Instagram", value: CONTACT.instagramHandle, ext: true },
    { href: CONTACT.facebook, icon: <Facebook />, bg: "#9cc2ff", label: "Facebook", value: CONTACT.facebookLabel, ext: true },
  ];

  return (
    <section className="section" id="contact" style={{ paddingTop: 0 }} aria-labelledby="contact-title">
      <div className="wrap">
        <Reveal y={70}>
          <div className="contact-card">
            <div className="halftone" aria-hidden style={{ position: "absolute", right: -60, top: -60, width: 300, height: 300, borderRadius: "50%", opacity: 0.18 }} />
            <div style={{ position: "relative" }}>
              <span className="eyebrow"><i style={{ background: "var(--yellow)" }} /> Let&apos;s make your toon</span>
              <h2 id="contact-title" className="h2" style={{ marginTop: 20 }}>Ready to get turned toon?</h2>
              <p className="lead" style={{ marginTop: 16 }}>Email your photos and idea, or message us on Instagram or Facebook — you&apos;ll get a friendly reply with a quote and timeline.</p>
              <address className="contact-list" style={{ fontStyle: "normal" }}>
                {rows.map((r, i) => (
                  <motion.a key={r.label} className="contact-row" href={r.href} {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }}>
                    <span className="ci" style={{ background: r.bg }}>{r.icon}</span>
                    <div><small>{r.label}</small><span>{r.value}</span></div>
                  </motion.a>
                ))}
                <div className="contact-row" style={{ boxShadow: "none", alignItems: "flex-start" }}>
                  <span className="ci" style={{ background: "#fff" }}><Pin /></span>
                  <div>
                    <small>Mailing address</small>
                    {ADDRESS_LINES.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}
                  </div>
                </div>
              </address>
            </div>

            <form className="form" onSubmit={onSubmit}>
              <h3>Quick request</h3>
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden style={{ display: "none" }} />
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-name">Your name</label>
                  <input id="f-name" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sarah" />
                </div>
                <div className="field">
                  <label htmlFor="f-email">Your email</label>
                  <input id="f-email" type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-type">Toon type</label>
                  <select id="f-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {["Solo toon", "Couple toon", "Family toon", "Pet toon", "Fan-world scene", "Gift / surprise"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-people">People &amp; pets</label>
                  <input id="f-people" value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} placeholder="e.g. 2 adults, 1 dog" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-idea">Your idea</label>
                <textarea id="f-idea" value={form.idea} onChange={(e) => setForm({ ...form, idea: e.target.value })} placeholder="Theme, occasion, favourite characters…" />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn" disabled={status === "sending"}>
                  <Mail /> {status === "sending" ? "Sending…" : "Send request"}
                </button>
                {CONTACT.web3formsKey && (
                  <button type="button" className="btn ghost" onClick={openMailApp}>Open in email app</button>
                )}
              </div>
              <p className="form-msg" role="status" aria-live="polite">
                {status === "sent" && <>Thanks! Your request is on its way — I&apos;ll reply by email soon. Send your photos to <strong>{CONTACT.email}</strong>.</>}
                {status === "error" && <>Sorry, that didn&apos;t send. Please try again or email <strong>{CONTACT.email}</strong> directly.</>}
                {status === "mailto" && <>Your email app should open with the request filled in. If it didn&apos;t, write to <strong>{CONTACT.email}</strong>.</>}
                {(status === "idle" || status === "sending") && <>After sending, email your photos to <strong>{CONTACT.email}</strong> or DM them on Instagram.</>}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Footer ───────── */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <motion.p className="footer-big" aria-hidden initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.9, 0.2, 1] }}>
          Turned<span>Toons</span>
        </motion.p>
        <div className="footer-row">
          <span>© {year} {SITE.name} · Phoenix, Arizona</span>
          <nav aria-label="Footer">
            {[["showcase", "Before & After"], ["gallery", "Gallery"], ["process", "Process"], ["faq", "FAQ"], ["contact", "Contact"]].map(([id, l]) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id); }}>{l}</a>
            ))}
          </nav>
          <div className="socials">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email"><Mail /></a>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: 28 }}>
          <a href="#top" className="btn ghost" onClick={(e) => { e.preventDefault(); scrollToId("top"); }}>
            Back to top <Arrow style={{ transform: "rotate(-90deg)" }} />
          </a>
        </p>
      </div>
    </footer>
  );
}
