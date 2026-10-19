"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import styles from "./paw-passport.module.css";

const moods = [
  { label: "The little cruncher", detail: "A crisp little treat-time moment.", icon: "✷", product: "beef-lung", color: "#ffe193" },
  { label: "The cosy chewer", detail: "Settle down. Paws up. Chew time.", icon: "♡", product: "bully-stick-6", color: "#ffd0b9" },
  { label: "The curious sniffer", detail: "A new texture to sniff and explore.", icon: "✿", product: "cow-ear", color: "#cde9dc" },
] as const;
const avatars = ["🐶", "🐕", "🐩", "🦮"];
const storageKey = "quipaw-paw-passport-v1";

export function QuizFinder() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(0);
  const [mood, setMood] = useState(0);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const selected = moods[mood];
  const product = products.find((item) => item.id === selected.product)!;
  const displayName = name.trim() || "Your best friend";

  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (value && typeof value.name === "string" && value.name.trim() && value.name.length <= 24 && Number.isInteger(value.mood) && value.mood >= 0 && value.mood < moods.length && Number.isInteger(value.avatar) && value.avatar >= 0 && value.avatar < avatars.length) {
        setName(value.name); setMood(value.mood); setAvatar(value.avatar); setStep(2);
      }
    } catch { /* Works without browser storage, too. */ }
  }, []);

  function goTo(next: number) {
    setStep(next); setStatus("");
    requestAnimationFrame(() => heading.current?.focus());
  }

  function finish() {
    try { localStorage.setItem(storageKey, JSON.stringify({ name: name.trim(), avatar, mood })); }
    catch { setStatus("Your passport is ready. Download it to keep a copy."); }
    setStep(2);
    requestAnimationFrame(() => heading.current?.focus());
  }

  function download() {
    const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) { setStatus("Your browser could not create the card. Please try another browser."); return; }
    ctx.fillStyle = "#dff2e9"; ctx.fillRect(0, 0, 1080, 1350);
    ctx.fillStyle = "#fffdf5"; ctx.beginPath(); ctx.roundRect(65, 65, 950, 1220, 46); ctx.fill();
    ctx.textAlign = "center"; ctx.fillStyle = "#153851"; ctx.font = "bold 34px sans-serif"; ctx.fillText("QUIPAW  /  THE PAW PASSPORT", 540, 155);
    ctx.fillStyle = selected.color; ctx.beginPath(); ctx.arc(540, 420, 175, 0, Math.PI * 2); ctx.fill();
    ctx.font = "180px sans-serif"; ctx.fillText(avatars[avatar], 540, 480);
    ctx.fillStyle = "#153851"; ctx.font = "bold 76px sans-serif";
    let fontSize = 76;
    while (ctx.measureText(displayName).width > 800 && fontSize > 28) { fontSize -= 2; ctx.font = `bold ${fontSize}px sans-serif`; }
    ctx.fillText(displayName, 540, 710);
    ctx.font = "italic 44px Georgia"; ctx.fillStyle = "#287b69"; ctx.fillText(selected.label, 540, 795);
    ctx.font = "28px sans-serif"; ctx.fillText("CERTIFIED GOOD DOG ENERGY", 540, 900);
    ctx.strokeStyle = "#b6d3c2"; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(150, 980); ctx.lineTo(930, 980); ctx.stroke();
    ctx.fillStyle = "#153851"; ctx.font = "bold 31px sans-serif"; ctx.fillText("A whole lot of personality. A little tail wag.", 540, 1070);
    ctx.font = "26px sans-serif"; ctx.fillText("Made with love at quipaw.com", 540, 1170);
    const link = document.createElement("a"); link.download = "quipaw-paw-passport.png"; link.href = canvas.toDataURL("image/png"); link.click();
    setStatus("Your passport image is ready to save and share.");
  }

  return <section id="match" className={`${styles.section} section-wrap`} aria-labelledby="passport-title">
    <div className={styles.intro}><p className="eyebrow">A little passport. A big personality.</p><h2 id="passport-title">Officially a<br /><em>very good dog.</em></h2><p>A name, a little personality, a keepsake made just for them. Let’s meet your favourite tail-wagger.</p><span className={styles.note}>✦ No account needed. All good dogs welcome.</span></div>
    <div className={styles.experience}>
      <div className={styles.card} style={{ "--passport-color": selected.color } as CSSProperties}>
        <div className={styles.cardTop}><strong>Quipaw.</strong><span>PAW PASSPORT</span></div>
        <div className={styles.portrait} aria-hidden="true">{avatars[avatar]}<span>GOOD<br />DOG</span></div>
        <h3>{displayName}</h3><p>{selected.label}</p>
        <div className={styles.stamp}><span aria-hidden="true">{selected.icon}</span><span>Member of the<br /><strong>happy tails club</strong></span></div>
        <div className={styles.cardBottom}>100% personality <span aria-hidden="true">✦</span> Endless tail wags</div>
      </div>
      <div className={styles.formPanel}>
        <div className={styles.steps} aria-label={`Step ${step + 1} of 3`}><span className={step >= 0 ? styles.active : ""}>01 · Meet</span><span className={step >= 1 ? styles.active : ""}>02 · Match</span><span className={step >= 2 ? styles.active : ""}>03 · Keep</span></div>
        <h3 ref={heading} tabIndex={-1}>{step === 0 ? "Who’s the very good dog?" : step === 1 ? "What’s their chew mood?" : `${displayName}, you’re in!`}</h3>
        {step === 0 && <form onSubmit={(event) => { event.preventDefault(); if (name.trim()) goTo(1); }}>
          <label className={styles.label} htmlFor="passport-name">Their name<input id="passport-name" value={name} maxLength={24} required pattern={".*\\S.*"} onChange={(event) => setName(event.target.value)} placeholder="e.g. Charlie" autoComplete="off" /></label>
          <fieldset className={styles.avatars}><legend>Pick their portrait</legend>{avatars.map((item, index) => <button type="button" key={item} aria-label={`Dog portrait ${index + 1}`} aria-pressed={avatar === index} onClick={() => setAvatar(index)}>{item}</button>)}</fieldset>
          <button type="submit" className="button button-dark">Find their personality <span aria-hidden="true">→</span></button>
        </form>}
        {step === 1 && <><fieldset className={styles.moods}><legend className="sr-only">Choose a chew mood</legend>{moods.map((item, index) => <label key={item.label}><input type="radio" name="paw-mood" checked={mood === index} onChange={() => setMood(index)} /><span className={styles.moodIcon} aria-hidden="true">{item.icon}</span><span><strong>{item.label}</strong><small>{item.detail}</small></span></label>)}</fieldset><div className={styles.actions}><button className="button button-dark" onClick={finish}>Make their passport <span aria-hidden="true">✦</span></button><button className={styles.textButton} onClick={() => goTo(0)}>Back</button></div></>}
        {step === 2 && <><p className={styles.resultCopy}>One little keepsake for a very big part of your life.</p><Link href={`/shop?q=${encodeURIComponent(product.name)}`} className={styles.matchProduct}><img src={`/assets/products/${product.image}`} alt={product.name} /><span><small>A texture to explore</small><strong>{product.name}</strong><span>Meet the chew →</span></span></Link><small className={styles.careNote}>A playful starting point. Check ingredients and choose a size suited to your dog. Always supervise chew time.</small><div className={styles.actions}><button className="button button-dark" onClick={download}>Download passport <span aria-hidden="true">↓</span></button><button className={styles.textButton} onClick={() => goTo(0)}>Edit details</button></div><button className={styles.textButton} onClick={() => { try { localStorage.removeItem(storageKey); } catch {} setName(""); setAvatar(0); setMood(0); goTo(0); }}>Start fresh</button></>}
        <p className={styles.status} role="status">{status}</p>
      </div>
    </div>
  </section>;
}
