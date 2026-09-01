"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { icons } from "@/lib/assets";

/** Features grid on a full-bleed #F7F7F7 band.
 *
 * Shows 6 cards at a time and loops through two sets of 6. On each switch the
 * incoming cards animate in one-by-one (staggered slide-up + fade), giving a
 * smooth sequential entrance rather than a flat cross-fade.
 */

interface Feature {
  icon: string;
  title: string;
  body: string;
}

const featureSets: Feature[][] = [
  [
    { icon: icons.mail, title: "Unified Inbox", body: "Business email, shared mailboxes and aliases on your own domain." },
    { icon: icons.teams, title: "Team Collaboration", body: "Channels, threads and video rooms that live beside your files." },
    { icon: icons.me, title: "Client Scheduling", body: "Shareable booking pages that write straight into your calendar." },
    { icon: icons.lock, title: "Secure Password Vault", body: "Shared credentials with role-based access and instant revocation." },
    { icon: icons.drive, title: "Cloud Storage & Files", body: "Versioned company storage with granular sharing and audit trails." },
    { icon: icons.workforce, title: "Workforce & HR Tools", body: "Onboarding, records and leave tracking tied to your directory." },
  ],
  [
    { icon: icons.meet, title: "Video Meetings", body: "HD calls, screen sharing and recordings that link to your calendar." },
    { icon: icons.crm, title: "Sales CRM", body: "Track leads, deals and pipelines with contacts shared across apps." },
    { icon: icons.sheet, title: "Spreadsheets & Trackers", body: "Live spreadsheets and dashboards your whole team can edit together." },
    { icon: icons.document, title: "Docs & Collaboration", body: "Write, comment and co-edit documents stored right beside your files." },
    { icon: icons.books, title: "Accounting & Invoicing", body: "Send invoices, log expenses and reconcile — connected to your CRM." },
    { icon: icons.identity, title: "Digital Identity", body: "Digital ID cards, business cards and email signatures for the team." },
  ],
];

// Per-card entrance stagger and how long a set stays before the next animates.
const STAGGER_MS = 110; // delay between each card animating in
const CARD_ANIM_MS = 620; // duration of a single card's entrance
const HOLD_MS = 5200; // total time a set is shown before switching

export default function Features() {
  const [activeSet, setActiveSet] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      setActiveSet((s) => (s + 1) % featureSets.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="features" style={{ background: "#F7F7F7", padding: "clamp(56px,7vw,96px) 0" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          // Text column is narrower than the card area so the 6 cards can lay
          // out 3-across (2 rows) rather than 2-across. Stacks on mobile.
          gridTemplateColumns: "var(--features-cols)",
          gap: "clamp(32px,4vw,56px)",
          alignItems: "start",
        }}
      >
        <div data-reveal="0" style={{ maxWidth: 520 }}>
          <h2 style={{ margin: 0, fontSize: "clamp(28px,3.6vw,42px)", fontWeight: 700, color: "#111111", letterSpacing: "-.03em", lineHeight: 1.14 }}>
            Everything you need to <span style={{ color: "#7C3AED" }}>run your business</span>, in one place.
          </h2>
          <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.7, color: "#4B5563", textWrap: "pretty" }}>
            One login, one bill, one admin console. Every Snaarp app shares the
            same directory, permissions and data — so your team stops copying
            information between products.
          </p>
          <a href="#replace" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, fontSize: 14.5, fontWeight: 600, color: "#7C3AED" }}>
            See all 20+ apps <span>→</span>
          </a>
        </div>

        {/*
          Both sets are rendered stacked in the same grid cell so the wrapper
          always reserves the height of the TALLER set — this prevents the
          layout from jumping when the sets swap. Only the active set is
          visible; its cards replay the staggered slide-up entrance on each
          switch (re-keyed by activeSet). The inactive set stays in the layout
          via visibility:hidden so it keeps holding its space.
        */}
        <div data-reveal="80" style={{ display: "grid" }}>
          {featureSets.map((set, setIdx) => {
            const isActive = setIdx === activeSet;
            return (
              <div
                key={isActive ? `active-${activeSet}` : `idle-${setIdx}`}
                aria-hidden={!isActive}
                style={{
                  gridArea: "1 / 1",
                  display: "grid",
                  gridTemplateColumns: "var(--features-card-cols)",
                  gap: 16,
                  visibility: isActive ? "visible" : "hidden",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {set.map((f, idx) => (
                  <div
                    key={f.title}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #EEECF3",
                      borderRadius: 16,
                      padding: 22,
                      boxShadow: "0 1px 2px rgba(17,17,17,.03),0 8px 22px rgba(17,17,17,.05)",
                      // Sequential slide-up + fade entrance (active set only).
                      animation: isActive
                        ? `snpRiseCard ${CARD_ANIM_MS}ms cubic-bezier(.16,1,.3,1) both`
                        : "none",
                      animationDelay: isActive ? `${idx * STAGGER_MS}ms` : undefined,
                    }}
                  >
                    <Image src={f.icon} alt="" width={34} height={34} style={{ width: 34, height: 34, borderRadius: 10 }} />
                    <div style={{ marginTop: 16, fontSize: 14.5, fontWeight: 600, color: "#111111" }}>{f.title}</div>
                    <p style={{ margin: "7px 0 0", fontSize: 12.8, lineHeight: 1.6, color: "#4B5563" }}>{f.body}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
