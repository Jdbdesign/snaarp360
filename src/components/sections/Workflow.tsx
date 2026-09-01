"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Mic,
  Video,
  Hand,
  MonitorUp,
  MessageSquare,
  PhoneOff,
  Info,
  Users,
  Search,
  SquarePen,
  Paperclip,
  Image as ImageIcon,
  Smile,
} from "lucide-react";
import { icons } from "@/lib/assets";
import { mailRowsBig } from "@/lib/data";

/**
 * "Explore How Simple Your Workflow Can Be" — an interactive product mockup.
 * The left vertical rail switches the visible app: Snaarp Mail (default),
 * Snaarp Meet (Google-Meet-style call) and Snaarp Teams (Microsoft-Teams-style
 * chat). The 1140×700 canvas rescales to fit its container width.
 */

const MOCKUP_W = 1140;
const MOCKUP_H = 700;

type AppKey = "mail" | "meet" | "teams";

const appMeta: Record<AppKey, { name: string; slug: string; icon: string }> = {
  mail: { name: "Snaarp Mail", slug: "mail/inbox", icon: icons.mail },
  meet: { name: "Snaarp Meet", slug: "meet/ops-sync", icon: icons.meet },
  teams: { name: "Snaarp Teams", slug: "teams/general", icon: icons.teams },
};

/* ------------------------------------------------------------------ */
/* Snaarp Mail (original body)                                         */
/* ------------------------------------------------------------------ */
function MailApp() {
  return (
    <>
      {/* Top bar */}
      <div style={{ position: "absolute", left: 62, right: 0, top: 46, height: 58, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 24px", gap: 16 }}>
        <Image src={icons.mail} alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 8 }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "#111111" }}>Snaarp Mail</span>
        <div style={{ flex: 1, maxWidth: 400, height: 34, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", display: "flex", alignItems: "center", padding: "0 16px" }}>
          <span style={{ fontSize: 12.5, color: "#A9A7B2" }}>Search mail, files and contacts</span>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: "#6B7280" }}>Inbox · 12 unread</span>
        <span style={{ width: 30, height: 30, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>JW</span>
      </div>

      {/* Left mail nav */}
      <div style={{ position: "absolute", left: 62, top: 104, bottom: 0, width: 214, background: "#ffffff", borderRight: "1px solid #F0EFF4", padding: "18px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "11px 18px", textAlign: "center", boxShadow: "0 1px 2px rgba(17,17,17,.06),0 8px 18px rgba(124,58,237,.28)", marginBottom: 12 }}>✎ Compose</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 9, padding: "10px 12px" }}>Inbox · 12</span>
        {["Starred", "Sent", "Drafts · 2", "Snoozed", "Archive"].map((l) => (
          <span key={l} style={{ fontSize: 13, color: "#6B7280", padding: "10px 12px" }}>{l}</span>
        ))}
        <span style={{ width: "100%", height: 1, background: "#F0EFF4", display: "block", margin: "10px 0" }} />
        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8", padding: "0 12px 6px" }}>LABELS</span>
        {["Clients", "Finance", "Suppliers"].map((l) => (
          <span key={l} style={{ fontSize: 13, color: "#6B7280", padding: "10px 12px" }}>{l}</span>
        ))}
      </div>

      {/* Mail list */}
      <div style={{ position: "absolute", left: 276, right: 0, top: 104, bottom: 0, overflow: "hidden" }}>
        {mailRowsBig.map((m, k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 26px", borderBottom: "1px solid #F3F2F6", background: "#ffffff" }}>
            <span style={{ width: 10, height: 10, borderRadius: 99, background: m.dot, display: "block", flex: "0 0 auto" }} />
            <span style={{ width: 34, height: 34, borderRadius: 99, background: m.avBg, color: "#ffffff", fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{m.initials}</span>
            <span style={{ width: 170, fontSize: 13.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.from}</span>
            <span style={{ flex: 1, fontSize: 13.5, color: "#4B5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <b style={{ color: "#111111", fontWeight: 600 }}>{m.subject}</b> — {m.preview}
            </span>
            <span style={{ fontSize: 12, color: "#A9A7B2", flex: "0 0 auto" }}>{m.time}</span>
          </div>
        ))}
      </div>

      {/* Compose panel (static, open) */}
      <div style={{ position: "absolute", right: 34, bottom: 0, width: 440, background: "#ffffff", border: "1px solid #E9E7F0", borderRadius: "16px 16px 0 0", boxShadow: "0 -2px 8px rgba(17,17,17,.05),0 -26px 60px rgba(17,17,17,.18)", overflow: "hidden" }}>
        <div style={{ height: 44, background: "#111111", color: "#ffffff", display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13.5, fontWeight: 600, justifyContent: "space-between" }}>
          <span>New message</span>
          <span style={{ color: "#9CA3AF", fontSize: 12 }}>— ⤢ ✕</span>
        </div>
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", borderBottom: "1px solid #F0EFF4", paddingBottom: 9 }}>
            <span style={{ fontSize: 12, color: "#9CA3AF", width: 46 }}>To</span>
            <span style={{ fontSize: 13, color: "#111111" }}>priya.raman@northwind.co.uk</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", borderBottom: "1px solid #F0EFF4", paddingBottom: 9 }}>
            <span style={{ fontSize: 12, color: "#9CA3AF", width: 46 }}>Subject</span>
            <span style={{ fontSize: 13, color: "#111111", fontWeight: 600 }}>Q3 rollout — revised timeline</span>
          </div>
          <div style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.7, minHeight: 96 }}>
            Hi Priya,
            <br />
            <br />
            Attaching the revised plan — we can bring the migration forward by two weeks now that billing is consolidated in Snaarp Books.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#F7F7F7", border: "1px solid #EFEFEF", borderRadius: 10, padding: "9px 12px" }}>
            <Image src={icons.sheet} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 7 }} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "#111111" }}>Q3-rollout-plan.snsheet</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>248 KB</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 8, borderTop: "1px solid #F0EFF4" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "10px 24px" }}>Send</span>
            <span style={{ fontSize: 14, color: "#9CA3AF" }}>📎</span>
            <span style={{ fontSize: 14, color: "#9CA3AF" }}>🙂</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 11.5, color: "#A9A7B2" }}>Draft saved 12:41</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Meet (Google-Meet-style call)                                */
/* ------------------------------------------------------------------ */
const meetTiles = [
  { init: "AO", bg: "#7C3AED", label: "Adaeze Okonkwo (You)", me: true },
  { init: "TB", bg: "#0EA5E9", label: "Tomas Bergström" },
  { init: "RK", bg: "#F97316", label: "Ravi Krishnan" },
  { init: "ML", bg: "#16A34A", label: "Mara Lindqvist" },
  { init: "DS", bg: "#DC2626", label: "Diego Salazar" },
  { init: "Nw", bg: "#6D28D9", label: "Nadia Werner" },
];

function MeetApp() {
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#202124", overflow: "hidden" }}>
      {/* meeting stage */}
      <div style={{ position: "absolute", left: 24, right: 24, top: 24, bottom: 96, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "repeat(2,1fr)", gap: 16 }}>
        {meetTiles.map((t, k) => (
          <div key={k} style={{ borderRadius: 12, background: "#3C4043", border: t.me ? "2px solid #7C3AED" : "none", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <span style={{ width: 84, height: 84, borderRadius: 99, background: t.bg, color: "#fff", fontSize: 28, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", textTransform: "uppercase" }}>{t.init}</span>
            <span style={{ position: "absolute", left: 14, bottom: 12, fontSize: 12.5, fontWeight: 500, color: "#ffffff" }}>{t.label}</span>
            <span style={{ position: "absolute", right: 12, top: 12, width: 26, height: 26, borderRadius: 99, background: "rgba(0,0,0,.4)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Mic size={13} strokeWidth={2} /></span>
          </div>
        ))}
      </div>

      {/* meeting name (top-left) */}
      <div style={{ position: "absolute", left: 24, top: 0, height: 24, display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.8)", fontSize: 12 }} />

      {/* bottom control bar */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96, background: "#202124", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.72)", fontSize: 13 }}>
          <span style={{ fontWeight: 600, color: "#ffffff" }}>14:32</span>
          <span>|</span>
          <span>Weekly Ops Sync</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {[Mic, Video, Hand, MonitorUp, MessageSquare].map((Icon, k) => (
            <span key={k} style={{ width: 48, height: 48, borderRadius: 99, background: "#3C4043", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} strokeWidth={2} /></span>
          ))}
          <span style={{ padding: "0 26px", height: 48, borderRadius: 99, background: "#EA4335", color: "#fff", display: "flex", alignItems: "center" }}><PhoneOff size={20} strokeWidth={2} /></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "rgba(255,255,255,.72)" }}>
          <Info size={18} strokeWidth={2} />
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}><Users size={18} strokeWidth={2} />6</span>
          <MessageSquare size={18} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Teams (Microsoft-Teams-style chat) — new user names          */
/* ------------------------------------------------------------------ */
const teamsChats = [
  { init: "SN", name: "Snaarp team", preview: "You: @all The new design system…", time: "30 min", bg: "#7C3AED", active: true },
  { init: "DA", name: "Daniela Alvarez", preview: "this is a good effect", time: "1 day", bg: "#0EA5E9", unread: 3 },
  { init: "KO", name: "Kenji Ohara", preview: "pls can you send the workforce l…", time: "13 days", bg: "#F97316", unread: 2 },
  { init: "IB", name: "Imani Balogun", preview: "okay, I'd check", time: "14 days", bg: "#16A34A" },
  { init: "LR", name: "Lukas Richter", preview: "Audio call · 52:09", time: "19 days", bg: "#DC2626" },
  { init: "PM", name: "Priya Menon", preview: "https://www.figma.com/design/?0g…", time: "21 days", bg: "#6D28D9" },
  { init: "OF", name: "Omar Farouk", preview: "https://www.snaarp.com/design/?0g…", time: "26 days", bg: "#3B3552" },
];

const teamsMessages = [
  { init: "IB", name: "Imani Balogun", bg: "#16A34A", time: "3:15 PM", text: "Good afternoon @Everyone", mention: true },
  { init: "LR", name: "Lukas Richter", bg: "#DC2626", time: "3:16 PM", text: "Confirm if you can see this" },
  { init: "OF", name: "Omar Farouk", bg: "#3B3552", time: "3:17 PM", text: "🔥😍", emojiOnly: true },
  { init: "KO", name: "Kenji Ohara", bg: "#F97316", time: "9:13 AM", text: "@Everyone Good morning", mention: true },
  { init: "DA", name: "Daniela Alvarez", bg: "#0EA5E9", time: "9:29 AM", text: "Good Morning" },
  { init: "LR", name: "Lukas Richter", bg: "#DC2626", time: "9:37 AM", text: "Good morning everyone" },
];

function TeamsApp() {
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#1F1F1F", overflow: "hidden", color: "#E1E1E1" }}>
      {/* chat list column */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 260, background: "#2B2B2B", borderRight: "1px solid #3B3B3B", padding: "14px 12px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#ffffff" }}>Chat</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12, color: "#9AA0A6" }}>
            <Search size={16} strokeWidth={2} />
            <SquarePen size={16} strokeWidth={2} />
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {["All", "Unread", "Group"].map((t, k) => (
            <span key={t} style={{ fontSize: 12, fontWeight: 600, color: k === 0 ? "#ffffff" : "#9AA0A6", background: k === 0 ? "#3B3B3B" : "transparent", borderRadius: 6, padding: "5px 10px" }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", color: "#8A8A8A", padding: "4px 6px" }}>CHATS</div>
        {teamsChats.map((c, k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 8px", borderRadius: 8, background: c.active ? "#3A2E5C" : "transparent", marginBottom: 2 }}>
            <span style={{ width: 34, height: 34, borderRadius: 99, background: c.bg, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{c.init}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
                <span style={{ fontSize: 10.5, color: "#8A8A8A", flex: "0 0 auto" }}>{c.time}</span>
              </div>
              <div style={{ fontSize: 11.5, color: "#9AA0A6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.preview}</div>
            </div>
            {c.unread ? (
              <span style={{ width: 18, height: 18, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{c.unread}</span>
            ) : null}
          </div>
        ))}
      </div>

      {/* conversation header */}
      <div style={{ position: "absolute", left: 260, right: 0, top: 0, height: 52, borderBottom: "1px solid #3B3B3B", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <span style={{ width: 30, height: 30, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>SN</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#ffffff" }}>Snaarp team</span>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: 8, fontSize: 13, color: "#9AA0A6" }}>
          <span style={{ color: "#ffffff", borderBottom: "2px solid #7C3AED", paddingBottom: 15 }}>Chat</span>
          <span>Files</span>
          <span>Photos</span>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 6, padding: "7px 14px", display: "inline-flex", alignItems: "center", gap: 7 }}><Video size={15} strokeWidth={2} />Meet now</span>
        <span style={{ fontSize: 13, color: "#9AA0A6", marginLeft: 6, display: "inline-flex", alignItems: "center", gap: 6 }}><Users size={16} strokeWidth={2} />9</span>
      </div>

      {/* message thread */}
      <div style={{ position: "absolute", left: 260, right: 0, top: 52, bottom: 72, padding: "16px 24px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 14 }}>
        {teamsMessages.map((m, k) => (
          <div key={k} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ width: 32, height: 32, borderRadius: 99, background: m.bg, color: "#fff", fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{m.init}</span>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#ffffff" }}>{m.name}</span>
                <span style={{ fontSize: 10.5, color: "#8A8A8A" }}>{m.time}</span>
              </div>
              <div style={{ marginTop: 4, display: "inline-block", background: m.emojiOnly ? "transparent" : "#2B2B2B", borderRadius: 8, padding: m.emojiOnly ? 0 : "8px 12px", fontSize: m.emojiOnly ? 20 : 13, color: "#E1E1E1" }}>
                {m.mention ? (
                  <>
                    <span style={{ color: "#8AB4F8", fontWeight: 600 }}>@Everyone</span>
                    {m.text.replace("@Everyone", "")}
                  </>
                ) : (
                  m.text
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* composer */}
      <div style={{ position: "absolute", left: 260, right: 0, bottom: 0, height: 72, borderTop: "1px solid #3B3B3B", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <div style={{ flex: 1, height: 44, borderRadius: 10, background: "#2B2B2B", border: "1px solid #3B3B3B", display: "flex", alignItems: "center", padding: "0 14px", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#8A8A8A" }}>type a message — use @ to mention, paste images</span>
          <span style={{ flex: 1 }} />
          <span style={{ display: "flex", alignItems: "center", gap: 12, color: "#9AA0A6" }}>
            <Smile size={16} strokeWidth={2} />
            <Paperclip size={16} strokeWidth={2} />
            <ImageIcon size={16} strokeWidth={2} />
            <Mic size={16} strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Container with clickable rail                                       */
/* ------------------------------------------------------------------ */
export default function Workflow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [active, setActive] = useState<AppKey>("mail");

  useEffect(() => {
    const fit = () => {
      const a = wrapRef.current;
      if (a && a.clientWidth) setScale(Math.min(1, a.clientWidth / MOCKUP_W));
    };
    fit();
    window.addEventListener("resize", fit);
    const t = setTimeout(fit, 400);
    return () => {
      window.removeEventListener("resize", fit);
      clearTimeout(t);
    };
  }, []);

  const h = Math.round(MOCKUP_H * scale);

  // Rail icon: clickable for the three built apps, decorative for the rest.
  const railIcon = (src: string, key?: AppKey) => {
    const isActive = key && active === key;
    const clickable = !!key;
    return (
      <button
        type="button"
        onClick={clickable ? () => setActive(key!) : undefined}
        aria-label={key ? appMeta[key].name : undefined}
        style={{
          border: "none",
          background: isActive ? "#F3EDFF" : "transparent",
          borderRadius: 10,
          padding: 4,
          margin: 0,
          cursor: clickable ? "pointer" : "default",
          display: "flex",
          lineHeight: 0,
        }}
      >
        <Image src={src} alt="" width={30} height={30} style={{ width: 30, height: 30, borderRadius: 9, opacity: isActive ? 1 : clickable ? 0.85 : 0.42 }} />
      </button>
    );
  };

  const meta = appMeta[active];

  return (
    <section id="workflow" style={{ background: "#F7F7F7", padding: "clamp(56px,7vw,96px) 0" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" }}>
        <div data-reveal="0" style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 700, color: "#111111", letterSpacing: "-.025em", lineHeight: 1.14 }}>
            Explore How Simple Your
            <br />
            Workflow Can Be
          </h2>
          <p style={{ margin: "12px 0 0", fontSize: 15.5, color: "#4B5563" }}>
            20+ business apps. One platform. One subscription.
          </p>
        </div>

        <div data-reveal="80" ref={wrapRef} style={{ marginTop: 38, width: "100%", height: h, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: MOCKUP_W,
              height: MOCKUP_H,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: "top center",
              borderRadius: 18,
              overflow: "hidden",
              background: "#ffffff",
              border: "1px solid #E7E4EF",
              boxShadow: "0 2px 6px rgba(17,17,17,.05),0 34px 80px rgba(17,17,17,.16)",
            }}
          >
            {/* Browser chrome */}
            <div style={{ height: 46, background: "#F7F7F7", borderBottom: "1px solid #EDEDED", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FF5F57", display: "block" }} />
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FEBC2E", display: "block" }} />
              <span style={{ width: 11, height: 11, borderRadius: 99, background: "#28C840", display: "block" }} />
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div style={{ minWidth: 340, height: 26, borderRadius: 999, background: "#ffffff", border: "1px solid #E9E9E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>app.snaarp.com/{meta.slug}</span>
                </div>
              </div>
            </div>

            {/* App rail — Mail / Meet / Teams are clickable */}
            <div style={{ position: "absolute", left: 0, top: 46, bottom: 0, width: 62, background: "#ffffff", borderRight: "1px solid #F0EFF4", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "14px 0", zIndex: 20 }}>
              <Image src={icons.snaarp} alt="" width={30} height={30} style={{ width: 30, height: 30, borderRadius: 9 }} />
              <span style={{ width: 26, height: 1, background: "#EFEFEF", display: "block", margin: "4px 0" }} />
              {railIcon(icons.mail, "mail")}
              {railIcon(icons.meet, "meet")}
              {railIcon(icons.teams, "teams")}
              {railIcon(icons.me)}
              {railIcon(icons.drive)}
              {railIcon(icons.crm)}
              {railIcon(icons.books)}
              {railIcon(icons.sheet)}
            </div>

            {/* Active app body */}
            {active === "mail" && <MailApp />}
            {active === "meet" && <MeetApp />}
            {active === "teams" && <TeamsApp />}
          </div>
        </div>
      </div>
    </section>
  );
}
