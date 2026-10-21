"use client";

import { useLanguage } from "@/components/language-provider";
import { useEffect, useRef, useState } from "react";
import { PassportCard, downloadPassport, preparePortrait, passportThemes, passportBadges, passportAvatars, photoFramings } from "./passport-card";
import Link from "next/link";
import { products } from "@/data/products";
import styles from "./paw-passport.module.css";
const moods = [{
  label: "The little cruncher",
  detail: "A crisp little treat-time moment.",
  icon: "✷",
  product: "beef-lung",
  color: "#ffe193"
}, {
  label: "The cosy chewer",
  detail: "Settle down. Paws up. Chew time.",
  icon: "♡",
  product: "bully-stick-6",
  color: "#ffd0b9"
}, {
  label: "The curious sniffer",
  detail: "A new texture to sniff and explore.",
  icon: "✿",
  product: "cow-ear",
  color: "#cde9dc"
}] as const;
const avatars = passportAvatars;
const storageKey = "quipaw-paw-passport-v1";
export function QuizFinder() {
  const {
    t,
    language
  } = useLanguage();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(0);
  const [mood, setMood] = useState(0);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const [theme, setTheme] = useState(0);
  const [badge, setBadge] = useState(0);
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState("");
  const [zoom, setZoom] = useState(1);
  const [framing, setFraming] = useState(4);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const photoRequest = useRef(0);
  const photoInput = useRef<HTMLInputElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const selected = moods[mood];
  const product = products.find(item => item.id === selected.product)!;
  const displayName = name.trim() || t("Your best friend");
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (value && typeof value.name === "string" && value.name.trim() && value.name.length <= 24 && Number.isInteger(value.mood) && value.mood >= 0 && value.mood < moods.length && Number.isInteger(value.avatar) && value.avatar >= 0 && value.avatar < avatars.length) {
        setName(value.name);
        setMood(value.mood);
        setAvatar(value.avatar);
        setStep(2);
        if (Number.isInteger(value.theme) && value.theme >= 0 && value.theme < passportThemes.length) setTheme(value.theme);
        if (Number.isInteger(value.badge) && value.badge >= 0 && value.badge < passportBadges.length) setBadge(value.badge);
        if (typeof value.note === "string") setNote(value.note.slice(0, 40));
        if (typeof value.photo === "string" && value.photo.length < 600000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value.photo)) setPhoto(value.photo);
        if (Number.isInteger(value.framing) && value.framing >= 0 && value.framing < photoFramings.length) setFraming(value.framing);
        if (typeof value.zoom === "number" && value.zoom >= 1 && value.zoom <= 2) setZoom(value.zoom);
      }
    } catch {/* Works without browser storage, too. */}
  }, []);
  function goTo(next: number) {
    setStep(next);
    setStatus("");
    requestAnimationFrame(() => heading.current?.focus());
  }
  function finish() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        name: name.trim(),
        avatar,
        mood,
        theme,
        badge,
        note: note.trim(),
        photo,
        zoom,
        framing
      }));
    } catch {
      setStatus("Your passport is ready. Download it to keep a copy.");
    }
    setStep(2);
    requestAnimationFrame(() => heading.current?.focus());
  }
  async function download() {
    if (!svgRef.current || exporting) return;
    setExporting(true);
    setStatus("");
    try {
      await downloadPassport(svgRef.current);
      setStatus("Your passport is ready — just like the card, with every little detail.");
    } catch {
      setStatus("We couldn’t save the image. Please try downloading again.");
    } finally {
      setExporting(false);
    }
  }
  async function uploadPhoto(file: File) {
    const request = ++photoRequest.current;
    setPhotoBusy(true);
    setPhotoError("");
    try {
      const portrait = await preparePortrait(file);
      if (request === photoRequest.current) {
        setPhoto(portrait);
        setZoom(1);
        setFraming(4);
      }
    } catch (error) {
      if (request === photoRequest.current) setPhotoError(error instanceof Error && error.message.startsWith("Choose") ? error.message : "We couldn’t read that photo. Please try another one.");
    } finally {
      if (request === photoRequest.current) setPhotoBusy(false);
      if (photoInput.current) photoInput.current.value = "";
    }
  }
  function clearPhoto() {
    ++photoRequest.current;
    setPhoto("");
    setZoom(1);
    setFraming(4);
    setPhotoBusy(false);
    setPhotoError("");
    if (photoInput.current) photoInput.current.value = "";
  }
  return <section id="match" className={`${styles.section} section-wrap`} aria-labelledby="passport-title">
    <div className={styles.intro}><p className="eyebrow">{t("A little passport. A big personality.")}</p><h2 id="passport-title">{t("Officially a")}<br /><em>{t("very good dog.")}</em></h2><p>{t("A name, a little personality, a keepsake made just for them. Let’s meet your favourite tail-wagger.")}</p><span className={styles.note}>{t("✦ No account needed. All good dogs welcome.")}</span></div>
    <div className={styles.experience}>
      <div className={styles.cardPreview}>
        <PassportCard svgRef={svgRef} name={name} avatar={avatar} mood={selected.label} icon={selected.icon} theme={theme} badge={badge} note={note} photo={photo} zoom={zoom} framing={framing} />
      </div>
      <div className={styles.formPanel}>
        <div className={styles.steps} aria-label={t(`Step ${step + 1} of 3`)}><span className={step >= 0 ? styles.active : ""}>{t("01 · Meet")}</span><span className={step >= 1 ? styles.active : ""}>{t("02 · Match")}</span><span className={step >= 2 ? styles.active : ""}>{t("03 · Keep")}</span></div>
        <h3 ref={heading} tabIndex={-1}>{t(step === 0 ? "Who’s the very good dog?" : step === 1 ? "What’s their chew mood?" : `${displayName}, you’re in!`)}</h3>
        {t(step === 0 && <form onSubmit={event => {
          event.preventDefault();
          if (name.trim()) goTo(1);
        }}>
          <label className={styles.label} htmlFor="passport-name">{t("Their name")}<input id="passport-name" value={name} maxLength={24} required pattern={".*\\S.*"} onChange={event => setName(event.target.value)} placeholder={t("e.g. Charlie")} autoComplete="off" /></label>
          <fieldset className={styles.avatars}><legend>{t("Pick their portrait")}</legend>{t(avatars.map((item, index) => <button type="button" key={item} aria-label={t(`Dog portrait ${index + 1}`)} aria-pressed={!photo && avatar === index} onClick={() => {
              clearPhoto();
              setAvatar(index);
            }}>{t(item)}</button>))}</fieldset>
          <div className={styles.photoTools}>
            <label className={styles.uploadLabel}>{t("Or use their own photo")}<input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={event => {
                const file = event.target.files?.[0];
                if (file) void uploadPhoto(file);
              }} /></label>
            <small>{t("JPG, PNG or WebP · up to 8 MB · stays on this device")}</small>
            {t(photoBusy && <small role="status">{t("Preparing their portrait…")}</small>)}
            {t(photoError && <p className={styles.photoError} role="alert">{t(photoError)}</p>)}
            {t(photo && <><label className={styles.framingLabel}>{t("Photo position")}<select aria-label={t("Photo position")} value={framing} onChange={event => setFraming(Number(event.target.value))}>{t(photoFramings.map((item, index) => <option key={item.value} value={index}>{t(item.label)}</option>))}</select></label><label className={styles.zoomLabel}>{t("Photo zoom")}<input type="range" min="1" max="2" step=".05" value={zoom} onChange={event => setZoom(Number(event.target.value))} /></label><button className={styles.textButton} type="button" onClick={clearPhoto}>{t("Remove photo")}</button></>)}
          </div>
          <details className={styles.customize}>
            <summary>{t("Make it more them ")}<span aria-hidden="true">✦</span></summary>
            <fieldset className={styles.colors}><legend>{t("Pick a colour")}</legend>{t(passportThemes.map((item, index) => <button key={item.id} type="button" aria-pressed={theme === index} aria-label={t(item.name)} onClick={() => setTheme(index)}><span style={{
                  background: item.portrait
                }} aria-hidden="true" /><small>{t(item.name)}</small></button>))}</fieldset>
            <label className={styles.label}>{t("Their little badge")}<select aria-label={t("Their little badge")} value={badge} onChange={event => setBadge(Number(event.target.value))}>{t(passportBadges.map((item, index) => <option value={index} key={item}>{t(item.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase()))}</option>))}</select></label>
            <label className={styles.label}>{t("A personal note ")}<span className={styles.optional}>{t("Optional · ")}{t(note.length)}/40</span><input maxLength={40} value={note} onChange={event => setNote(event.target.value)} placeholder={t("Chief snack inspector")} /></label>
          </details>
          <button type="submit" disabled={photoBusy} className="button button-dark">{t("Find their personality ")}<span aria-hidden="true">→</span></button>
        </form>)}
        {t(step === 1 && <><fieldset className={styles.moods}><legend className="sr-only">{t("Choose a chew mood")}</legend>{t(moods.map((item, index) => <label key={item.label}><input type="radio" name="paw-mood" checked={mood === index} onChange={() => setMood(index)} /><span className={styles.moodIcon} aria-hidden="true">{t(item.icon)}</span><span><strong>{t(item.label)}</strong><small>{t(item.detail)}</small></span></label>))}</fieldset><div className={styles.actions}><button className="button button-dark" onClick={finish}>{t("Make their passport ")}<span aria-hidden="true">✦</span></button><button className={styles.textButton} onClick={() => goTo(0)}>{t("Back")}</button></div></>)}
        {t(step === 2 && <><p className={styles.resultCopy}>{t("One little keepsake for a very big part of your life.")}</p><Link href={`/shop?q=${encodeURIComponent(product.name)}`} className={styles.matchProduct}><img src={`/assets/products/${product.image}`} alt={t(product.name)} /><span><small>{t("A texture to explore")}</small><strong>{t(product.name)}</strong><span>{t("Meet the chew →")}</span></span></Link><small className={styles.careNote}>{t("A playful starting point. Check ingredients and choose a size suited to your dog. Always supervise chew time.")}</small><div className={styles.actions}><button className="button button-dark" disabled={exporting} onClick={download}>{t(exporting ? "Preparing your card…" : "Download passport")} <span aria-hidden="true">↓</span></button><button className={styles.textButton} onClick={() => goTo(0)}>{t("Edit details")}</button></div><button className={styles.textButton} onClick={() => {
            try {
              localStorage.removeItem(storageKey);
            } catch {}
            setName("");
            setAvatar(0);
            setMood(0);
            setTheme(0);
            setBadge(0);
            setNote("");
            clearPhoto();
            goTo(0);
          }}>{t("Start fresh")}</button></>)}
        <p className={styles.status} role="status">{t(status)}</p>
      </div>
    </div>
  </section>;
}
