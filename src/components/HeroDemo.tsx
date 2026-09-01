"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Video, MonitorUp, MessageSquare, Mic, MicOff, PhoneOff } from "lucide-react";
import { icons } from "@/lib/assets";
import { mailRows, calDays, buildSheetRows, demoSlugs } from "@/lib/data";

/*
 * Hero product-demo carousel — ported 1:1 from the standalone bundle's
 * DCLogic component. A self-driving, timer-based carousel cycling through 6
 * fake app screens. Per screen it moves a simulated cursor to a fixed target,
 * pulses a click "ring" partway through the dwell, then fires a screen-specific
 * UI state change, before advancing to the next screen.
 *
 * Timing (per screen, dur = SECONDS * 1000, default 3.6s):
 *   - enter:  acted=false, ring=false, cursor -> targets[i]
 *   - ring on at   max(700, dur*0.32)
 *   - acted on at  max(950, dur*0.42)  (CRM also moves cursor to x2/y2)
 *   - advance at   dur  -> i = (i+1) % 6, then run() again
 *
 * The inner 1000x620 mockup is scaled to fit its container width via
 * heroScale = min(1, wrapWidth / 1000); the wrapper height tracks it.
 */

const SECONDS = 3.6; // default screen dwell (autoplay on), matches the source
const MOCKUP_W = 1000;
const MOCKUP_H = 620;
// Upper bound on the mockup scale. The original capped at 1 (native size);
// we allow modest upscaling so the demo fills the wider hero column and its
// height better matches the headline column. It still scales DOWN to fit
// narrow containers, preserving the responsive behavior.
const MAX_SCALE = 1.2;

interface Target {
  x: number;
  y: number;
  x2?: number;
  y2?: number;
}

const targets: Target[] = [
  // Targets are in STAGE coordinates (the cursor's coordinate space, i.e. the
  // area below the 44px browser-chrome bar). Values verified by measuring each
  // element's rendered centre against the stage origin.
  { x: 938, y: 72 }, // Identity: Edit button
  { x: 130, y: 84 }, // Mail: Compose button
  { x: 413, y: 199, x2: 642, y2: 199 }, // CRM: drag card QUALIFIED -> PROPOSAL first row
  { x: 487, y: 424 }, // Booking: 10:30 time slot
  { x: 722, y: 287 }, // Sheet: cell D5 (Leeds / Q3 = 31,600)
  { x: 402, y: 526 }, // Meet: mic (mute) button
];

export default function HeroDemo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [i, setI] = useState(0);
  const [acted, setActed] = useState(false);
  const [ring, setRing] = useState(false);
  const [cur, setCur] = useState({ x: 500, y: 300 });
  const [heroScale, setHeroScale] = useState(1);

  // Track latest screen index in a ref so the timer chain reads fresh values.
  const iRef = useRef(0);
  iRef.current = i;

  useEffect(() => {
    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const later = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    const fit = () => {
      const a = wrapRef.current;
      if (a && a.clientWidth) {
        setHeroScale(Math.min(MAX_SCALE, a.clientWidth / MOCKUP_W));
      }
    };

    const run = () => {
      const idx = iRef.current;
      const t = targets[idx];
      const dur = SECONDS * 1000;
      setActed(false);
      setRing(false);
      setCur({ x: t.x, y: t.y });
      later(() => setRing(true), Math.max(700, dur * 0.32));
      later(() => {
        setActed(true);
        setRing(false);
        if (t.x2 != null && t.y2 != null) setCur({ x: t.x2, y: t.y2 });
      }, Math.max(950, dur * 0.42));
      later(() => {
        const next = (iRef.current + 1) % 6;
        iRef.current = next;
        setI(next);
        run();
      }, dur);
    };

    fit();
    window.addEventListener("resize", fit);
    later(fit, 400);
    run();

    return () => {
      clear();
      window.removeEventListener("resize", fit);
    };
    // Intentionally run once on mount; the timer chain drives everything.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heroH = Math.round(MOCKUP_H * heroScale);

  // Computed per-screen values (mirrors renderVals()).
  const op = (n: number) => (i === n ? 1 : 0);
  const editBg = i === 0 && acted ? "#7C3AED" : "#ffffff";
  const editFg = i === 0 && acted ? "#ffffff" : "#111111";
  const qrOpacity = i === 0 && acted ? 1 : 0.55;
  const composeOpen = i === 1 && acted;
  // CRM deal card: starts as the first card in the QUALIFIED column, then
  // drags to the first row of the PROPOSAL column. Column first-row positions
  // (measured in the 1000px mockup): QUALIFIED left 318, PROPOSAL left 547,
  // both at top ~156.
  const dealX = i === 2 && acted ? 547 : 318;
  const dealY = 156;
  const dealRot = i === 2 && acted ? 0 : -2.5;
  const ghostA = i === 2 && acted ? 1 : 0;
  const ghostB = i === 2 && acted ? 0 : 1;
  const slotPicked = i === 3 && acted;
  const slotBg = i === 3 && acted ? "#7C3AED" : "#ffffff";
  const slotFg = i === 3 && acted ? "#ffffff" : "#7C3AED";
  const slotBorder = i === 3 && acted ? "#7C3AED" : "#DDD3F7";
  const typed = i === 4 && acted;
  const cellRing = i === 4 ? 1 : 0;
  const formulaText = typed ? "=SUM(D2:D4)*1.06" : "";
  const micMuted = i === 5 && acted;
  const micBg = i === 5 && acted ? "#DC2626" : "#2A2540";
  const sheetRows = buildSheetRows(typed);

  const sidebarImg = (src: string, dim = false) => (
    <Image
      src={src}
      alt=""
      width={26}
      height={26}
      style={{ width: 26, height: 26, borderRadius: 8, opacity: dim ? 0.42 : 1 }}
    />
  );

  return (
    <div ref={wrapRef} style={{ width: "100%", height: heroH, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: MOCKUP_W,
          height: MOCKUP_H,
          transform: `scale(${heroScale})`,
          transformOrigin: "top left",
          borderRadius: 18,
          overflow: "hidden",
          background: "#ffffff",
          border: "1px solid #EAE7F0",
          boxShadow: "0 2px 6px rgba(17,17,17,.05),0 30px 70px rgba(17,17,17,.13)",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height: 44,
            background: "#F7F7F7",
            borderBottom: "1px solid #EDEDED",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
          }}
        >
          <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FF5F57", display: "block" }} />
          <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FEBC2E", display: "block" }} />
          <span style={{ width: 11, height: 11, borderRadius: 99, background: "#28C840", display: "block" }} />
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div
              style={{
                minWidth: 300,
                height: 24,
                borderRadius: 999,
                background: "#ffffff",
                border: "1px solid #E9E9E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                padding: "0 16px",
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: 2, border: "1.5px solid #A78BFA", display: "block" }} />
              <span style={{ fontSize: 11, color: "#9CA3AF", letterSpacing: ".01em" }}>
                app.snaarp.com/{demoSlugs[i]}
              </span>
            </div>
          </div>
          <span style={{ fontSize: 11, color: "#C4C4C4" }}>⌘</span>
        </div>

        {/* Screen stage */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 44,
            bottom: 0,
            overflow: "hidden",
            background: "#FBFAFD",
          }}
        >
          {/* ---------- Screen 0: Identity / ID Cards ---------- */}
          <div style={{ position: "absolute", inset: 0, opacity: op(0), transition: "opacity .55s ease" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 56,
                background: "#ffffff",
                borderRight: "1px solid #F0EFF4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 9,
                padding: "12px 0",
              }}
            >
              {sidebarImg(icons.snaarp)}
              <span style={{ width: 22, height: 1, background: "#EFEFEF", display: "block", margin: "3px 0" }} />
              {sidebarImg(icons.identity)}
              {sidebarImg(icons.mail, true)}
              {sidebarImg(icons.crm, true)}
              {sidebarImg(icons.me, true)}
              {sidebarImg(icons.sheet, true)}
              {sidebarImg(icons.meet, true)}
            </div>
            <div
              style={{
                position: "absolute",
                left: 56,
                right: 0,
                top: 0,
                height: 52,
                background: "#ffffff",
                borderBottom: "1px solid #F0EFF4",
                display: "flex",
                alignItems: "center",
                padding: "0 22px",
                gap: 12,
              }}
            >
              <Image src={icons.identity} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 7 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111111" }}>ID Cards</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 999, padding: "4px 10px" }}>
                Snaarp Identity
              </span>
              <span style={{ flex: 1 }} />
              <span style={{ width: 26, height: 26, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                JW
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: 56,
                top: 52,
                bottom: 0,
                width: 196,
                background: "#ffffff",
                borderRight: "1px solid #F0EFF4",
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8" }}>DIRECTORY</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 8, padding: "9px 11px" }}>All cards · 148</span>
              <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Pending approval · 6</span>
              <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Contractors · 21</span>
              <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Archived · 34</span>
              <span style={{ width: "100%", height: 1, background: "#F0EFF4", display: "block", margin: "8px 0" }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8" }}>TEMPLATES</span>
              <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Employee — Standard</span>
              <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Visitor — Day pass</span>
            </div>
            <div style={{ position: "absolute", left: 252, right: 300, top: 52, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  width: 266,
                  borderRadius: 20,
                  background: "linear-gradient(160deg,#8B5CF6,#6D28D9)",
                  padding: 22,
                  boxShadow: "0 2px 6px rgba(17,17,17,.06),0 24px 44px rgba(109,40,217,.3)",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Image src={icons.snaarp} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 7 }} />
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".14em", color: "rgba(255,255,255,.72)" }}>SNAARP 360</span>
                </div>
                <div style={{ width: 88, height: 88, borderRadius: 99, background: "rgba(255,255,255,.16)", border: "2px solid rgba(255,255,255,.4)", margin: "20px auto 0", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: 26, fontWeight: 700, letterSpacing: ".02em" }}>
                  JW
                </div>
                <div style={{ textAlign: "center", marginTop: 14 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#ffffff", letterSpacing: "-.01em" }}>Jordan Whitfield</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.76)", marginTop: 2 }}>Head of Operations</div>
                </div>
                <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 9, letterSpacing: ".12em", color: "rgba(255,255,255,.6)" }}>EMPLOYEE ID</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#ffffff" }}>SN-0148-JW</span>
                  </div>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 10,
                      background: "#ffffff",
                      display: "grid",
                      gridTemplateColumns: "repeat(5,1fr)",
                      gridTemplateRows: "repeat(5,1fr)",
                      gap: 2,
                      padding: 6,
                      opacity: qrOpacity,
                      transition: "opacity .4s ease",
                    }}
                  >
                    {/* QR mock: filled cells match the source pattern */}
                    {[1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1].map((c, k) => (
                      <span key={k} style={c ? { background: "#111111", display: "block" } : undefined} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 52,
                bottom: 0,
                width: 300,
                background: "#ffffff",
                borderLeft: "1px solid #F0EFF4",
                padding: "18px 22px",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8" }}>CARD DETAILS</span>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["Full name", "Jordan Whitfield"],
                  ["Department", "Operations"],
                  ["Access level", "Site + Cloud"],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>{label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: "#111111", background: "#F7F7F7", border: "1px solid #EFEFEF", borderRadius: 9, padding: "9px 11px" }}>{val}</span>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: "#16A34A", display: "block" }} />
                  <span style={{ fontSize: 12, color: "#4B5563" }}>Verified 12 Aug 2026</span>
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                right: 24,
                top: 56,
                width: 72,
                height: 32,
                borderRadius: 999,
                background: editBg,
                color: editFg,
                fontSize: 12,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E5E3EA",
                transition: "background .25s ease,color .25s ease",
              }}
            >
              Edit
            </div>
          </div>

          {/* ---------- Screen 1: Mail ---------- */}
          <div style={{ position: "absolute", inset: 0, opacity: op(1), transition: "opacity .55s ease" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 56,
                background: "#ffffff",
                borderRight: "1px solid #F0EFF4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 9,
                padding: "12px 0",
              }}
            >
              {sidebarImg(icons.snaarp)}
              <span style={{ width: 22, height: 1, background: "#EFEFEF", display: "block", margin: "3px 0" }} />
              {sidebarImg(icons.mail)}
              {sidebarImg(icons.identity, true)}
              {sidebarImg(icons.crm, true)}
              {sidebarImg(icons.me, true)}
              {sidebarImg(icons.sheet, true)}
              {sidebarImg(icons.meet, true)}
            </div>
            <div
              style={{
                position: "absolute",
                left: 56,
                right: 0,
                top: 0,
                height: 52,
                background: "#ffffff",
                borderBottom: "1px solid #F0EFF4",
                display: "flex",
                alignItems: "center",
                padding: "0 22px",
                gap: 14,
              }}
            >
              <Image src={icons.mail} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 7 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111111" }}>Snaarp Mail</span>
              <div style={{ flex: 1, maxWidth: 320, height: 30, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", display: "flex", alignItems: "center", padding: "0 14px" }}>
                <span style={{ fontSize: 11.5, color: "#A9A7B2" }}>Search mail</span>
              </div>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>Inbox · 12 unread</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: 56,
                top: 52,
                bottom: 0,
                width: 190,
                background: "#ffffff",
                borderRight: "1px solid #F0EFF4",
                padding: "66px 14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 8, padding: "9px 11px" }}>Inbox · 12</span>
              {["Starred", "Sent", "Drafts · 2", "Snoozed", "Archive"].map((l) => (
                <span key={l} style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>{l}</span>
              ))}
              <span style={{ width: "100%", height: 1, background: "#F0EFF4", display: "block", margin: "10px 0" }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8", padding: "0 11px" }}>LABELS</span>
              <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Clients</span>
              <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Finance</span>
            </div>
            <div style={{ position: "absolute", left: 246, right: 0, top: 52, bottom: 0, overflow: "hidden" }}>
              {mailRows.map((m, k) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", borderBottom: "1px solid #F3F2F6", background: "#ffffff" }}>
                  <span style={{ width: 9, height: 9, borderRadius: 99, background: m.dot, display: "block", flex: "0 0 auto" }} />
                  <span style={{ width: 150, fontSize: 12.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.from}</span>
                  <span style={{ flex: 1, fontSize: 12.5, color: "#4B5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <b style={{ color: "#111111", fontWeight: 600 }}>{m.subject}</b> — {m.preview}
                  </span>
                  <span style={{ fontSize: 11, color: "#A9A7B2", flex: "0 0 auto" }}>{m.time}</span>
                </div>
              ))}
            </div>
            {/* Compose button floats in the top gap of the mail nav column
                (which starts at left:56, top:52 with 66px top padding). */}
            <div style={{ position: "absolute", left: 70, top: 66, width: 120, height: 36, borderRadius: 999, background: "#7C3AED", color: "#ffffff", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, boxShadow: "0 1px 2px rgba(17,17,17,.06),0 8px 18px rgba(124,58,237,.3)", zIndex: 3 }}>
              <span style={{ fontSize: 15, lineHeight: 1 }}>✎</span>Compose
            </div>
            {composeOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 26,
                  bottom: 0,
                  width: 390,
                  background: "#ffffff",
                  border: "1px solid #E9E7F0",
                  borderRadius: "14px 14px 0 0",
                  boxShadow: "0 -2px 8px rgba(17,17,17,.05),0 -22px 50px rgba(17,17,17,.14)",
                  overflow: "hidden",
                  animation: "snpRise .42s cubic-bezier(.16,1,.3,1) both",
                  zIndex: 4,
                }}
              >
                <div style={{ height: 38, background: "#111111", color: "#ffffff", display: "flex", alignItems: "center", padding: "0 14px", fontSize: 12.5, fontWeight: 600, justifyContent: "space-between" }}>
                  <span>New message</span>
                  <span style={{ color: "#9CA3AF" }}>✕</span>
                </div>
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 9 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", borderBottom: "1px solid #F0EFF4", paddingBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF", width: 38 }}>To</span>
                    <span style={{ fontSize: 12.5, color: "#111111" }}>priya.raman@northwind.co.uk</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", borderBottom: "1px solid #F0EFF4", paddingBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF", width: 38 }}>Subject</span>
                    <span style={{ fontSize: 12.5, color: "#111111", fontWeight: 600 }}>Q3 rollout — revised timeline</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#4B5563", lineHeight: 1.65, minHeight: 74 }}>
                    Hi Priya,
                    <br />
                    Attaching the revised plan — we can bring the migration forward by two weeks now that billing is consolidated.
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 6, borderTop: "1px solid #F0EFF4" }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "8px 20px" }}>Send</span>
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>📎</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ fontSize: 11, color: "#A9A7B2" }}>Draft saved</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ---------- Screen 2: CRM Pipeline ---------- */}
          <div style={{ position: "absolute", inset: 0, opacity: op(2), transition: "opacity .55s ease" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 56,
                background: "#ffffff",
                borderRight: "1px solid #F0EFF4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 9,
                padding: "12px 0",
              }}
            >
              {sidebarImg(icons.snaarp)}
              <span style={{ width: 22, height: 1, background: "#EFEFEF", display: "block", margin: "3px 0" }} />
              {sidebarImg(icons.crm)}
              {sidebarImg(icons.mail, true)}
              {sidebarImg(icons.identity, true)}
              {sidebarImg(icons.me, true)}
              {sidebarImg(icons.sheet, true)}
              {sidebarImg(icons.meet, true)}
            </div>
            <div style={{ position: "absolute", left: 56, right: 0, top: 0, height: 52, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}>
              <Image src={icons.crm} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 7 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111111" }}>Pipeline — UK New Business</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11.5, color: "#4B5563" }}>
                Weighted value <b style={{ color: "#111111" }}>£412,800</b>
              </span>
            </div>
            <div style={{ position: "absolute", left: 76, right: 20, top: 72, bottom: 20, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
              {/* NEW */}
              <div style={{ background: "#F5F4F8", borderRadius: 12, padding: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", color: "#6B7280" }}>NEW · 6</span>
                  <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>£84k</span>
                </div>
                {[
                  ["Halden & Co", "£18,400 · Retainer"],
                  ["Trailmark Ltd", "£9,200 · Inbound"],
                  ["Kestrel Group", "£26,000 · Referral"],
                ].map(([t, s], k) => (
                  <div key={k} style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 10, padding: 11, marginBottom: k < 2 ? 9 : 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#111111" }}>{t}</div>
                    <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 3 }}>{s}</div>
                  </div>
                ))}
              </div>
              {/* QUALIFIED */}
              <div style={{ background: "#F5F4F8", borderRadius: 12, padding: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", color: "#6B7280" }}>QUALIFIED · 4</span>
                  <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>£131k</span>
                </div>
                <div style={{ height: 78, border: "1.5px dashed #D9D5E4", borderRadius: 10, marginBottom: 9, opacity: ghostA, transition: "opacity .35s ease" }} />
                <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 10, padding: 11 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#111111" }}>Bluecrest Health</div>
                  <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 3 }}>£41,500 · Demo booked</div>
                </div>
              </div>
              {/* PROPOSAL */}
              <div style={{ background: "#F5F4F8", borderRadius: 12, padding: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", color: "#6B7280" }}>PROPOSAL · 3</span>
                  <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>£118k</span>
                </div>
                <div style={{ height: 78, border: "1.5px dashed #C4B5FD", background: "#F7F3FF", borderRadius: 10, marginBottom: 9, opacity: ghostB, transition: "opacity .35s ease" }} />
                <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 10, padding: 11 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#111111" }}>Meridian Retail</div>
                  <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 3 }}>£52,000 · Sent 3 Aug</div>
                </div>
              </div>
              {/* WON */}
              <div style={{ background: "#F5F4F8", borderRadius: 12, padding: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", color: "#6B7280" }}>WON · 9</span>
                  <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>£79k</span>
                </div>
                <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 10, padding: 11, marginBottom: 9 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#111111" }}>Orbital Labs</div>
                  <div style={{ fontSize: 10.5, color: "#16A34A", marginTop: 3 }}>£31,000 · Closed</div>
                </div>
                <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 10, padding: 11 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#111111" }}>Verta Health</div>
                  <div style={{ fontSize: 10.5, color: "#16A34A", marginTop: 3 }}>£14,750 · Closed</div>
                </div>
              </div>
            </div>
            {/* Moving deal card */}
            <div
              style={{
                position: "absolute",
                left: dealX,
                top: dealY,
                width: 190,
                background: "#ffffff",
                border: "1.5px solid #7C3AED",
                borderRadius: 10,
                padding: 11,
                boxShadow: "0 2px 6px rgba(17,17,17,.06),0 18px 34px rgba(124,58,237,.22)",
                transform: `rotate(${dealRot}deg)`,
                transition: "left .85s cubic-bezier(.4,0,.2,1),top .85s cubic-bezier(.4,0,.2,1),transform .85s ease",
                zIndex: 5,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: "#111111" }}>Northwind Logistics</div>
              <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 3 }}>£64,000 · 20 seats</div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 18, height: 18, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>AK</span>
                <span style={{ fontSize: 10, color: "#9CA3AF" }}>Amara K.</span>
              </div>
            </div>
          </div>

          {/* ---------- Screen 3: Snaarp Me booking ---------- */}
          <div style={{ position: "absolute", inset: 0, opacity: op(3), transition: "opacity .55s ease" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 56,
                background: "#ffffff",
                borderRight: "1px solid #F0EFF4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 9,
                padding: "12px 0",
              }}
            >
              {sidebarImg(icons.snaarp)}
              <span style={{ width: 22, height: 1, background: "#EFEFEF", display: "block", margin: "3px 0" }} />
              {sidebarImg(icons.me)}
              {sidebarImg(icons.mail, true)}
              {sidebarImg(icons.crm, true)}
              {sidebarImg(icons.identity, true)}
              {sidebarImg(icons.sheet, true)}
              {sidebarImg(icons.meet, true)}
            </div>
            <div style={{ position: "absolute", left: 56, right: 0, top: 0, height: 52, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}>
              <Image src={icons.me} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 7 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111111" }}>Snaarp Me — Booking page</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 999, padding: "5px 12px" }}>snaarp.me/jordan</span>
            </div>
            <div style={{ position: "absolute", left: 76, top: 76, width: 270 }}>
              <div style={{ width: 44, height: 44, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>JW</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 14 }}>Jordan Whitfield</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#111111", letterSpacing: "-.02em", marginTop: 2 }}>Discovery call</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 16 }}>
                <span style={{ fontSize: 12.5, color: "#4B5563" }}>🕒 30 minutes</span>
                <span style={{ fontSize: 12.5, color: "#4B5563" }}>📍 Snaarp Meet (link sent on booking)</span>
                <span style={{ fontSize: 12.5, color: "#4B5563" }}>🌍 Europe/London (GMT+1)</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.65, color: "#6B7280", margin: "16px 0 0" }}>
                A short call to understand your current tool stack and map it onto Snaarp 360.
              </p>
            </div>
            <div style={{ position: "absolute", left: 376, right: 20, top: 76, bottom: 20, background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>September 2026</span>
                <span style={{ fontSize: 12, color: "#9CA3AF" }}>‹ ›</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginTop: 14 }}>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, k) => (
                  <span key={k} style={{ fontSize: 9.5, color: "#B0AEB8", textAlign: "center" }}>{d}</span>
                ))}
                {calDays.map((d) => (
                  <span key={d.n} style={{ fontSize: 11, textAlign: "center", padding: "6px 0", borderRadius: 8, color: d.fg, background: d.bg, fontWeight: d.fw }}>{d.n}</span>
                ))}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8", marginTop: 18 }}>TUESDAY 15 SEPTEMBER</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginTop: 10 }}>
                {["09:00", "09:30", "10:00", "10:30", "11:30", "13:00"].map((t) => {
                  // The 10:30 slot is the one the demo "clicks": it highlights
                  // (purple) once the slot is picked, in place of the old
                  // free-floating 10:30 overlay button.
                  const picked = t === "10:30" && slotPicked;
                  return (
                    <span
                      key={t}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: picked ? slotFg : "#7C3AED",
                        background: picked ? slotBg : "#ffffff",
                        border: `1px solid ${picked ? slotBorder : "#DDD3F7"}`,
                        borderRadius: 9,
                        padding: "9px 0",
                        textAlign: "center",
                        transition: "background .3s ease,color .3s ease",
                      }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
              {slotPicked && (
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, animation: "snpRise .35s ease both" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "10px 22px" }}>Confirm 10:30</span>
                  <span style={{ fontSize: 11.5, color: "#6B7280" }}>Tue 15 Sep · 30 min · GMT+1</span>
                </div>
              )}
            </div>
          </div>

          {/* ---------- Screen 4: Sheet ---------- */}
          <div style={{ position: "absolute", inset: 0, opacity: op(4), transition: "opacity .55s ease" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 56,
                background: "#ffffff",
                borderRight: "1px solid #F0EFF4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 9,
                padding: "12px 0",
              }}
            >
              {sidebarImg(icons.snaarp)}
              <span style={{ width: 22, height: 1, background: "#EFEFEF", display: "block", margin: "3px 0" }} />
              {sidebarImg(icons.sheet)}
              {sidebarImg(icons.mail, true)}
              {sidebarImg(icons.crm, true)}
              {sidebarImg(icons.me, true)}
              {sidebarImg(icons.identity, true)}
              {sidebarImg(icons.meet, true)}
            </div>
            <div style={{ position: "absolute", left: 56, right: 0, top: 0, height: 52, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}>
              <Image src={icons.sheet} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 7 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111111" }}>Q3 Revenue Forecast</span>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>· Saved to Snaarp Drive</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 999, padding: "5px 12px" }}>4 editors</span>
            </div>
            <div style={{ position: "absolute", left: 56, right: 0, top: 52, height: 34, background: "#FAFAFC", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", gap: 16, padding: "0 22px", fontSize: 11.5, color: "#6B7280" }}>
              <span style={{ fontWeight: 700, color: "#111111" }}>D5</span>
              <span style={{ width: 1, height: 14, background: "#E5E3EA", display: "block" }} />
              <span style={{ fontFamily: "ui-monospace,monospace", color: "#4B5563" }}>{formulaText}</span>
            </div>
            <div style={{ position: "absolute", left: 76, right: 20, top: 104, bottom: 20, background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "44px repeat(5,1fr)" }}>
                <span style={{ background: "#F5F4F8", borderBottom: "1px solid #EEECF3", borderRight: "1px solid #EEECF3", height: 30 }} />
                {["A", "B", "C"].map((c) => (
                  <span key={c} style={{ background: "#F5F4F8", borderBottom: "1px solid #EEECF3", borderRight: "1px solid #EEECF3", height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 600, color: "#9CA3AF" }}>{c}</span>
                ))}
                <span style={{ background: "#EDE6FF", borderBottom: "1px solid #EEECF3", borderRight: "1px solid #EEECF3", height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 700, color: "#7C3AED" }}>D</span>
                <span style={{ background: "#F5F4F8", borderBottom: "1px solid #EEECF3", height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 600, color: "#9CA3AF" }}>E</span>
              </div>
              {sheetRows.map((r) => (
                <div key={r.n} style={{ display: "grid", gridTemplateColumns: "44px repeat(5,1fr)" }}>
                  <span style={{ background: "#F5F4F8", borderBottom: "1px solid #F3F2F6", borderRight: "1px solid #EEECF3", height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 600, color: "#9CA3AF" }}>{r.n}</span>
                  <span style={{ borderBottom: "1px solid #F3F2F6", borderRight: "1px solid #F3F2F6", height: 34, display: "flex", alignItems: "center", padding: "0 10px", fontSize: 11.5, color: r.fg, fontWeight: r.fw }}>{r.a}</span>
                  <span style={{ borderBottom: "1px solid #F3F2F6", borderRight: "1px solid #F3F2F6", height: 34, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 10px", fontSize: 11.5, color: r.fg, fontWeight: r.fw }}>{r.b}</span>
                  <span style={{ borderBottom: "1px solid #F3F2F6", borderRight: "1px solid #F3F2F6", height: 34, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 10px", fontSize: 11.5, color: r.fg, fontWeight: r.fw }}>{r.c}</span>
                  <span style={{ borderBottom: "1px solid #F3F2F6", borderRight: "1px solid #F3F2F6", height: 34, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 10px", fontSize: 11.5, color: r.fg, fontWeight: r.fw, background: r.dbg }}>{r.d}</span>
                  <span style={{ borderBottom: "1px solid #F3F2F6", height: 34, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 10px", fontSize: 11.5, color: r.fg, fontWeight: r.fw }}>{r.e}</span>
                </div>
              ))}
            </div>
            {/* Selection ring over cell D5 (Leeds / Q3 = 31,600). Grid starts
                at left:76,top:104; header row 30px; each of 5 cols = 172px, so
                col D = 636–808 and data row 5 (Leeds) = 270–304. */}
            <div style={{ position: "absolute", left: 638, top: 271, width: 168, height: 32, border: "2px solid #7C3AED", borderRadius: 3, opacity: cellRing, transition: "opacity .25s ease", pointerEvents: "none", zIndex: 4 }} />
          </div>

          {/* ---------- Screen 5: Meet ---------- */}
          <div style={{ position: "absolute", inset: 0, opacity: op(5), transition: "opacity .55s ease", background: "#141220" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52, display: "flex", alignItems: "center", padding: "0 22px", gap: 12, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              <Image src={icons.meet} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 7 }} />
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "#ffffff" }}>Weekly Ops Sync</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>· 24:18</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#ffffff", background: "rgba(124,58,237,.35)", border: "1px solid rgba(167,139,250,.5)", borderRadius: 999, padding: "5px 12px" }}>Recording</span>
            </div>
            <div style={{ position: "absolute", left: 22, right: 22, top: 70, bottom: 96, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "repeat(2,1fr)", gap: 12 }}>
              {[
                { init: "JW", bg: "#7C3AED", label: "Jordan W. · you", me: true, labelColor: "rgba(255,255,255,.82)" },
                { init: "AK", bg: "#3B3552", label: "Amara K." },
                { init: "PR", bg: "#3B3552", label: "Priya R." },
                { init: "TM", bg: "#3B3552", label: "Tom M." },
                { init: "SL", bg: "#3B3552", label: "Sofia L." },
                { init: "+4", bg: "#3B3552", label: "4 others" },
              ].map((p, k) => (
                <div key={k} style={{ borderRadius: 12, background: "#221E33", border: p.me ? "2px solid #7C3AED" : undefined, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ width: 62, height: 62, borderRadius: 99, background: p.bg, color: "#fff", fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.init}</span>
                  <span style={{ position: "absolute", left: 10, bottom: 9, fontSize: 10.5, color: p.labelColor || "rgba(255,255,255,.7)" }}>{p.label}</span>
                </div>
              ))}
            </div>
            {/* Control bar: camera, screen-share, chat, mic (mute toggle),
                divider, then Leave — all in one centered cluster. The mic is
                the demo's click target and turns red when muted. */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <span style={{ width: 48, height: 48, borderRadius: 99, background: "#2A2540", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                <Video size={20} strokeWidth={2} />
              </span>
              <span style={{ width: 48, height: 48, borderRadius: 99, background: micBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", transition: "background .3s ease" }}>
                {micMuted ? <MicOff size={20} strokeWidth={2} /> : <Mic size={20} strokeWidth={2} />}
              </span>
              <span style={{ width: 48, height: 48, borderRadius: 99, background: "#2A2540", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                <MonitorUp size={20} strokeWidth={2} />
              </span>
              <span style={{ width: 48, height: 48, borderRadius: 99, background: "#2A2540", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                <MessageSquare size={20} strokeWidth={2} />
              </span>
              <span style={{ height: 64, width: 1, background: "rgba(255,255,255,.1)", display: "block" }} />
              <span style={{ padding: "0 20px", height: 48, borderRadius: 99, background: "#DC2626", color: "#ffffff", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <PhoneOff size={17} strokeWidth={2} />
                Leave
              </span>
            </div>
            {micMuted && (
              <div style={{ position: "absolute", left: "50%", top: 452, transform: "translateX(-50%)", fontSize: 11, fontWeight: 600, color: "#ffffff", background: "rgba(220,38,38,.9)", borderRadius: 999, padding: "5px 14px", animation: "snpRise .3s ease both" }}>
                You are muted
              </div>
            )}
          </div>

          {/* ---------- Simulated cursor + click ring ---------- */}
          <div
            style={{
              position: "absolute",
              left: cur.x,
              top: cur.y,
              transition: "left 1s cubic-bezier(.4,0,.2,1),top 1s cubic-bezier(.4,0,.2,1)",
              zIndex: 40,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 38,
                height: 38,
                borderRadius: 99,
                border: "2px solid #7C3AED",
                opacity: ring ? 1 : 0,
                animation: "snpRing .5s ease-out infinite",
              }}
            />
            <svg width="22" height="22" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 3px 6px rgba(17,17,17,.32))" }}>
              <path
                d="M5 2 L5 20.5 L10.1 15.4 L13.3 22 L16.7 20.3 L13.5 13.9 L20.3 13.7 Z"
                fill="#111111"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
