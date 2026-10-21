"use client";

import { useLanguage } from "@/components/language-provider";
export function SiteContact() {
  const {
    t,
    language
  } = useLanguage();
  return <section id="contact" className="contact-section">
    <div className="section-wrap contact-pdf-banner"><img src="/assets/quipaw-pdf-contact.webp" alt={t("Quipaw dogs wearing colorful headphones around a speaker and laptop beneath a Get in Touch greeting")} /></div>
    <div className="section-wrap contact-inner">
      <div className="contact-copy">
        <p className="eyebrow">{t("A friendly hello")}</p>
        <h2>{t("We’re all ")}<em>{t("ears.")}</em></h2>
        <p>{t("Have a question about a chew, a partnership or anything Quipaw? Send us a note and we’ll get back to you.")}</p>
        <div className="contact-links">
          <a className="contact-email" href="tel:+12813010010"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 4h3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg><span>281-301-0010</span></a>
          <a className="contact-email" href="mailto:support@quipaw.com"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg><span>{t("support@quipaw.com")}</span></a>
        </div>
        <div className="contact-social"><span>{t("Follow the happy tails")}</span><a href="https://www.instagram.com/" aria-label={t("Instagram")}><svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></a><a href="https://www.facebook.com/" aria-label={t("Facebook")}>{t("f")}</a><a href="https://www.youtube.com/" aria-label={t("YouTube")}><svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M5 4.5h14a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-7a4 4 0 0 1 4-4ZM10 8v8l6-4-6-4Z" /></svg></a></div>
      </div>
      <form className="contact-form" action="mailto:support@quipaw.com" method="post" encType="text/plain"><label>{t("Your name")}<input name="name" required placeholder={t("The human’s name")} /></label><label>{t("Email address")}<input type="email" name="email" required placeholder={t("you@example.com")} /></label><label>{t("What’s on your mind?")}<textarea name="message" rows={4} required placeholder={t("Ask us anything...")} /></label><button className="button button-dark" type="submit">{t("Open an email ")}<span aria-hidden="true">↗</span></button></form>
    </div>
  </section>;
}
