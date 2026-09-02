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
  LayoutGrid,
  Calendar,
  Clock,
  Repeat,
  Contact,
  BarChart3,
  Plug,
  Wallet,
  Settings,
  Plus,
  Check,
  CheckCircle2,
  CalendarCheck,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Home,
  Folder,
  Share2,
  Star,
  Trash2,
  Bell,
  UploadCloud,
  FileText,
  Table2,
  Presentation,
  MoreHorizontal,
  Building2,
  ListFilter,
  Package,
  ShoppingCart,
  Landmark,
  Calculator,
  BarChart2,
  CreditCard,
  Undo2,
  Redo2,
  Printer,
  Bold,
  Italic,
  AlignLeft,
  PaintBucket,
  Sigma,
  Shield,
  Key,
  Eye,
  BadgeCheck,
  Type,
  Copy,
  Maximize2,
  QrCode,
} from "lucide-react";
import { icons, productIcon } from "@/lib/assets";
import { mailRowsBig } from "@/lib/data";

/**
 * "Explore How Simple Your Workflow Can Be" — an interactive product mockup.
 * The left vertical rail switches the visible app: Snaarp Mail (default),
 * Snaarp Meet (Google-Meet-style call) and Snaarp Teams (Microsoft-Teams-style
 * chat). The 1140×700 canvas rescales to fit its container width.
 */

const MOCKUP_W = 1140;
const MOCKUP_H = 700;

type AppKey = "mail" | "meet" | "teams" | "snaarpme" | "drive" | "crm" | "books" | "sheet" | "document" | "presentation" | "lock" | "identity";

const appMeta: Record<AppKey, { name: string; slug: string; icon: string }> = {
  mail: { name: "Snaarp Mail", slug: "mail/inbox", icon: icons.mail },
  meet: { name: "Snaarp Meet", slug: "meet/ops-sync", icon: icons.meet },
  teams: { name: "Snaarp Teams", slug: "teams/general", icon: icons.teams },
  snaarpme: { name: "Snaarp Me", slug: "me/home", icon: icons.me },
  drive: { name: "Snaarp Drive", slug: "drive/home", icon: icons.drive },
  crm: { name: "Snaarp CRM", slug: "crm/pipeline", icon: icons.crm },
  books: { name: "Snaarp Books", slug: "books/dashboard", icon: icons.books },
  sheet: { name: "Snaarp Sheet", slug: "sheet/q3-forecast", icon: icons.sheet },
  document: { name: "Snaarp Document", slug: "document/editor", icon: icons.document },
  presentation: { name: "Snaarp Presentation", slug: "presentation/editor", icon: productIcon("presentation") },
  lock: { name: "Snaarp Lock", slug: "lock/vault", icon: icons.lock },
  identity: { name: "Snaarp Identity", slug: "identity/cards", icon: icons.identity },
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
/* Snaarp Me (scheduling dashboard) — empty states filled with content */
/* ------------------------------------------------------------------ */
const meNav: { icon: typeof LayoutGrid; label: string; active?: boolean }[] = [
  { icon: LayoutGrid, label: "Home", active: true },
  { icon: Calendar, label: "Event Type" },
  { icon: Clock, label: "Availability" },
  { icon: Calendar, label: "Calendar" },
  { icon: Video, label: "Meetings" },
  { icon: Repeat, label: "Workflows" },
  { icon: Contact, label: "Contacts" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Plug, label: "Integrations" },
  { icon: Wallet, label: "Billing" },
];

const meSchedule = [
  { time: "09:30", dur: "30 min", title: "Discovery call — Northwind Logistics", who: "Amara Kwesi", bg: "#7C3AED", type: "Video" },
  { time: "11:00", dur: "45 min", title: "Product demo — Bluecrest Health", who: "Priya Raman", bg: "#0EA5E9", type: "Video" },
  { time: "14:15", dur: "30 min", title: "Onboarding — Trailmark Ltd", who: "Tom Mercer", bg: "#16A34A", type: "Phone" },
  { time: "16:00", dur: "15 min", title: "Weekly sync — Sales team", who: "Internal", bg: "#F97316", type: "Video" },
];

const meStats = [
  { icon: CalendarCheck, label: "Bookings This Week", value: "18", tint: "#F3EDFF", fg: "#7C3AED" },
  { icon: Clock, label: "Upcoming", value: "6", tint: "#E0F2FE", fg: "#0EA5E9" },
  { icon: CheckCircle2, label: "Completed This Week", value: "12", tint: "#DCFCE7", fg: "#16A34A" },
  { icon: TrendingUp, label: "Cancellation Rate", value: "3.2%", tint: "#FEF3C7", fg: "#D97706" },
];

const meUpcoming = [
  { day: "TUE", date: "16", title: "Strategy review — Meridian Retail", time: "10:00 · 45 min · Snaarp Meet", who: "MK", bg: "#7C3AED" },
  { day: "WED", date: "17", title: "Intro call — Kestrel Group", time: "13:30 · 30 min · Phone", who: "JW", bg: "#111111" },
  { day: "FRI", date: "19", title: "Quarterly check-in — Verta Health", time: "15:00 · 30 min · Snaarp Meet", who: "SL", bg: "#6D28D9" },
];

const meActivity = [
  { who: "Amara K.", action: "booked Discovery call", when: "12 min ago", bg: "#7C3AED" },
  { who: "Priya R.", action: "rescheduled Product demo", when: "1 hr ago", bg: "#0EA5E9" },
  { who: "Tom M.", action: "confirmed Onboarding", when: "3 hrs ago", bg: "#16A34A" },
  { who: "Sofia L.", action: "left feedback ★★★★★", when: "Yesterday", bg: "#6D28D9" },
];

const meChecklist = [
  { n: 1, title: "Complete your profile", sub: "Set your name and username for y…", done: true },
  { n: 2, title: "Set your availability", sub: "Define when you're available f…", done: true },
  { n: 3, title: "Create an event type", sub: "Set up a meeting type people …", done: true },
  { n: 4, title: "Connect your calendar", sub: "Sync Google or Outlook calen…", done: false },
  { n: 5, title: "Share your booking link", sub: "Copy your link and share it wit…", done: false },
];

function SnaarpMeApp() {
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#FAFAFB", overflow: "hidden", color: "#111111" }}>
      {/* App sidebar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 190, background: "#ffffff", borderRight: "1px solid #F0EFF4", padding: "16px 12px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 8px 14px" }}>
          <span style={{ width: 26, height: 26, borderRadius: 8, background: "#7C3AED", color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>S</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>Snaarp Me</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {meNav.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: n.active ? "#F3EDFF" : "transparent", color: n.active ? "#7C3AED" : "#6B7280", fontWeight: n.active ? 600 : 500, fontSize: 12.5 }}>
                <Icon size={16} strokeWidth={1.75} />
                <span>{n.label}</span>
              </div>
            );
          })}
        </div>
        <span style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", color: "#6B7280", fontSize: 12.5, borderTop: "1px solid #F0EFF4", marginTop: 8, paddingTop: 14 }}>
          <Settings size={16} strokeWidth={1.75} />
          <span>Settings</span>
        </div>
      </div>

      {/* Top bar */}
      <div style={{ position: "absolute", left: 190, right: 0, top: 0, height: 52, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}>
        <span style={{ flex: 1 }} />
        <Settings size={17} strokeWidth={1.75} color="#9CA3AF" />
        <LayoutGrid size={17} strokeWidth={1.75} color="#9CA3AF" />
        <span style={{ width: 28, height: 28, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>YJ</span>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#111111" }}>Yinka Jacobs</div>
          <div style={{ fontSize: 10.5, color: "#9CA3AF" }}>yinka@snaarp.com</div>
        </div>
        <ChevronDown size={15} strokeWidth={1.75} color="#9CA3AF" />
      </div>

      {/* Scrollable-looking content area */}
      <div style={{ position: "absolute", left: 190, right: 0, top: 52, bottom: 0, overflow: "hidden", padding: "22px 24px", display: "grid", gridTemplateColumns: "1fr 260px", gap: 20, alignItems: "start" }}>
        {/* Main column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Welcome card */}
          <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#111111" }}>Welcome back, Yinka</div>
              <div style={{ fontSize: 12.5, color: "#6B7280", marginTop: 3 }}>Here&apos;s what&apos;s happening with your schedule today.</div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "9px 16px" }}>
              <Plus size={15} strokeWidth={2} /> New Event
            </span>
          </div>

          {/* Today's schedule */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>Today&apos;s Schedule</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#7C3AED", display: "inline-flex", alignItems: "center", gap: 4 }}>View calendar <ChevronRight size={13} strokeWidth={2} /></span>
            </div>
            <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 14, overflow: "hidden" }}>
              {meSchedule.map((m, k) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderBottom: k < meSchedule.length - 1 ? "1px solid #F3F2F6" : "none" }}>
                  <div style={{ width: 52, textAlign: "center", flex: "0 0 auto" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>{m.time}</div>
                    <div style={{ fontSize: 10, color: "#9CA3AF" }}>{m.dur}</div>
                  </div>
                  <span style={{ width: 3, alignSelf: "stretch", borderRadius: 2, background: m.bg, flex: "0 0 auto" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.title}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{m.who}</div>
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: m.type === "Video" ? "#7C3AED" : "#6B7280", background: m.type === "Video" ? "#F3EDFF" : "#F3F4F6", borderRadius: 999, padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: 5, flex: "0 0 auto" }}>
                    {m.type === "Video" ? <Video size={12} strokeWidth={2} /> : <Clock size={12} strokeWidth={2} />}
                    {m.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {meStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, padding: "12px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 8, background: s.tint, color: s.fg, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                      <Icon size={14} strokeWidth={2} />
                    </span>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#111111" }}>{s.value}</span>
                  </div>
                  <div style={{ fontSize: 10.5, color: "#6B7280", marginTop: 8, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              );
            })}
          </div>

          {/* Upcoming bookings */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>Upcoming Bookings</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#7C3AED" }}>View all</span>
            </div>
            <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 14, overflow: "hidden" }}>
              {meUpcoming.map((b, k) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderBottom: k < meUpcoming.length - 1 ? "1px solid #F3F2F6" : "none" }}>
                  <div style={{ width: 42, textAlign: "center", background: "#F7F7F7", border: "1px solid #EFEFEF", borderRadius: 9, padding: "5px 0", flex: "0 0 auto" }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".06em", color: "#9CA3AF" }}>{b.day}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#111111", lineHeight: 1 }}>{b.date}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{b.time}</div>
                  </div>
                  <span style={{ width: 28, height: 28, borderRadius: 99, background: b.bg, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{b.who}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Onboarding checklist */}
          <div style={{ background: "linear-gradient(180deg,#F3EDFF,#FBFAFF)", border: "1px solid #E7DDFC", borderRadius: 14, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#111111", lineHeight: 1.3 }}>Get started with<br />Snaarp Me</div>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>Dismiss</span>
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 6 }}>Complete these steps to start accepting bookings</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
              <span style={{ fontSize: 10.5, color: "#6B7280" }}>3 of 5 completed</span>
              <span style={{ flex: 1, height: 5, borderRadius: 3, background: "#E7DDFC", overflow: "hidden" }}>
                <span style={{ display: "block", width: "60%", height: "100%", background: "#7C3AED" }} />
              </span>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: "#7C3AED" }}>60%</span>
            </div>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {meChecklist.map((c) => (
                <div key={c.n} style={{ display: "flex", alignItems: "center", gap: 10, background: "#ffffff", border: "1px solid #EEE7FB", borderRadius: 10, padding: "8px 10px" }}>
                  <span style={{ width: 20, height: 20, borderRadius: 99, background: c.done ? "#16A34A" : "#F3EDFF", color: c.done ? "#fff" : "#7C3AED", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                    {c.done ? <Check size={12} strokeWidth={3} /> : c.n}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: c.done ? "#9CA3AF" : "#111111", textDecoration: c.done ? "line-through" : "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
                    <div style={{ fontSize: 10, color: "#9CA3AF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.sub}</div>
                  </div>
                  {!c.done && <ChevronRight size={14} strokeWidth={2} color="#C4B5FD" />}
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111111", marginBottom: 12 }}>Recent Activity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {meActivity.map((a, k) => (
                <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 99, background: a.bg, color: "#fff", fontSize: 9.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{a.who.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, color: "#4B5563", lineHeight: 1.4 }}>
                      <b style={{ color: "#111111", fontWeight: 600 }}>{a.who}</b> {a.action}
                    </div>
                    <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 1 }}>{a.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Drive (file manager) — clean recent-files table             */
/* ------------------------------------------------------------------ */
const driveNav: { icon: typeof Home; label: string; active?: boolean }[] = [
  { icon: Home, label: "Home", active: true },
  { icon: Folder, label: "My Files" },
  { icon: ImageIcon, label: "Photos" },
  { icon: Share2, label: "Shared" },
  { icon: Star, label: "Favorites" },
  { icon: Trash2, label: "Recycle Bin" },
];

const driveQuick = [
  { logo: icons.document, name: "Snaarp Docs", sub: "Supercharge your writing" },
  { logo: productIcon("presentation"), name: "Presentation", sub: "Bring your ideas to life" },
  { logo: icons.sheet, name: "Sheets", sub: "Do more with your data" },
];

// File-type styling for the recent table.
const fileKinds = {
  doc: { Icon: FileText, fg: "#0EA5E9", bg: "#E0F2FE", ext: ".sndoc" },
  ppt: { Icon: Presentation, fg: "#7C3AED", bg: "#F3EDFF", ext: ".snslides" },
  sheet: { Icon: Table2, fg: "#16A34A", bg: "#DCFCE7", ext: ".snsheet" },
  folder: { Icon: Folder, fg: "#F59E0B", bg: "#FEF3C7", ext: "" },
} as const;

const driveOwner = "adaeze";
const driveFiles: { name: string; kind: keyof typeof fileKinds; opened: string; shared?: boolean }[] = [
  { name: "Q3 Revenue Forecast", kind: "sheet", opened: "Fri at 2:57 PM" },
  { name: "Client Presentation — Northwind", kind: "ppt", opened: "Fri at 2:54 PM" },
  { name: "Onboarding Handbook", kind: "doc", opened: "Fri at 2:53 PM", shared: true },
  { name: "Bug Testing Notes", kind: "doc", opened: "Fri at 2:49 PM" },
  { name: "Brand Assets 2026", kind: "folder", opened: "Fri at 2:37 PM", shared: true },
  { name: "Sales Pipeline Report", kind: "sheet", opened: "Fri at 2:35 PM" },
  { name: "Product Roadmap", kind: "ppt", opened: "Fri at 2:32 PM", shared: true },
  { name: "Team Meeting Minutes", kind: "doc", opened: "Thu at 12:25 PM" },
  { name: "Expense Tracker", kind: "sheet", opened: "Thu at 11:55 AM" },
];

function SnaarpDriveApp() {
  const chips = ["All", "Folders", "Docs", "Sheets", "Presentation", "PDF", "Images"];
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#FAFAFB", overflow: "hidden", color: "#111111" }}>
      {/* Sidebar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 198, background: "#ffffff", borderRight: "1px solid #F0EFF4", padding: "14px 12px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 6px 12px" }}>
          <span style={{ width: 24, height: 24, borderRadius: 7, background: "#7C3AED", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image src={icons.drive} alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 7 }} />
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>SnaarpDrive</span>
        </div>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px", marginBottom: 8 }}>
          <span style={{ width: 26, height: 26, borderRadius: 99, background: "#EDE9F6", color: "#7C3AED", fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>AO</span>
          <div style={{ lineHeight: 1.25, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#111111" }}>Adaeze Okonkwo</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>adaeze@snaarp.com</div>
          </div>
        </div>

        {/* Create button */}
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "10px 14px", marginBottom: 14, boxShadow: "0 1px 2px rgba(17,17,17,.06),0 8px 18px rgba(124,58,237,.26)" }}>
          <Plus size={15} strokeWidth={2} /> Create or upload
        </span>

        {/* Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {driveNav.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: n.active ? "#F3EDFF" : "transparent", color: n.active ? "#7C3AED" : "#6B7280", fontWeight: n.active ? 600 : 500, fontSize: 12.5 }}>
                <Icon size={16} strokeWidth={1.75} />
                <span>{n.label}</span>
              </div>
            );
          })}
        </div>

        <span style={{ width: "100%", height: 1, background: "#F0EFF4", display: "block", margin: "12px 0" }} />
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".08em", color: "#B0AEB8", padding: "0 10px 6px" }}>BROWSE FILES BY</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", color: "#6B7280", fontSize: 12.5 }}>
          <Users size={16} strokeWidth={1.75} />
          <span>Workspaces</span>
        </div>
      </div>

      {/* Top bar */}
      <div style={{ position: "absolute", left: 198, right: 0, top: 0, height: 52, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 22px", gap: 14 }}>
        <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 999, padding: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", padding: "5px 14px", borderRadius: 999 }}>Photos</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#111111", background: "#ffffff", padding: "5px 14px", borderRadius: 999, boxShadow: "0 1px 2px rgba(17,17,17,.08)" }}>Files</span>
        </div>
        <div style={{ flex: 1, maxWidth: 420, height: 34, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", display: "flex", alignItems: "center", padding: "0 14px", gap: 8, margin: "0 auto" }}>
          <Search size={14} strokeWidth={1.75} color="#9CA3AF" />
          <span style={{ fontSize: 12, color: "#A9A7B2" }}>Search files…</span>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", display: "inline-flex", alignItems: "center", gap: 6 }}><UploadCloud size={15} strokeWidth={1.75} />Get more storage</span>
        <Bell size={16} strokeWidth={1.75} color="#9CA3AF" />
        <LayoutGrid size={16} strokeWidth={1.75} color="#9CA3AF" />
        <span style={{ width: 28, height: 28, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>AO</span>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", left: 198, right: 0, top: 52, bottom: 0, overflow: "hidden", padding: "20px 26px" }}>
        {/* Get started */}
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#111111", marginBottom: 10 }}>Get started</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
          {driveQuick.map((q) => (
            <div key={q.name} style={{ display: "flex", alignItems: "center", gap: 12, background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, padding: "12px 14px" }}>
              <Image src={q.logo} alt="" width={34} height={34} style={{ width: 34, height: 34, borderRadius: 9, flex: "0 0 auto" }} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#111111" }}>{q.name}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{q.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#111111" }}>Recent</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {chips.map((c, k) => (
            <span key={c} style={{ fontSize: 11.5, fontWeight: 600, color: k === 0 ? "#ffffff" : "#6B7280", background: k === 0 ? "#7C3AED" : "#F3F4F6", borderRadius: 999, padding: "5px 12px" }}>{c}</span>
          ))}
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: "#A9A7B2", background: "#ffffff", border: "1px solid #EFEFEF", borderRadius: 8, padding: "6px 12px" }}>Filter by name or person</span>
        </div>

        {/* File table */}
        <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 140px", padding: "10px 18px", borderBottom: "1px solid #F0EFF4", fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", color: "#9CA3AF" }}>
            <span>NAME</span>
            <span>OPENED</span>
            <span>OWNER</span>
          </div>
          {driveFiles.map((f, k) => {
            const kind = fileKinds[f.kind];
            const KindIcon = kind.Icon;
            return (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr 180px 140px", alignItems: "center", padding: "10px 18px", borderBottom: k < driveFiles.length - 1 ? "1px solid #F5F4F8" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: kind.bg, color: kind.fg, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                    <KindIcon size={16} strokeWidth={2} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {f.name}{kind.ext}
                    </div>
                    <div style={{ fontSize: 10, color: "#B0AEB8", display: "flex", alignItems: "center", gap: 5 }}>
                      {f.shared ? "Shared" : "Own"}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: "#F59E0B" }}>{f.opened}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 20, height: 20, borderRadius: 99, background: "#EDE9F6", color: "#7C3AED", fontSize: 8.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>AO</span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{driveOwner}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp CRM (Kanban pipeline) — draggable prospect cards            */
/* ------------------------------------------------------------------ */
interface Deal {
  id: string;
  company: string;
  value: number; // GBP
  tag: string;
  who: string; // initials
  whoName: string;
  bg: string;
}

const crmStageMeta: { key: string; label: string; accent: string }[] = [
  { key: "new", label: "New", accent: "#9CA3AF" },
  { key: "qualified", label: "Qualified", accent: "#0EA5E9" },
  { key: "proposal", label: "Proposal", accent: "#F59E0B" },
  { key: "won", label: "Won", accent: "#16A34A" },
];

const crmInitial: Record<string, Deal[]> = {
  new: [
    { id: "d1", company: "Halden & Co", value: 18400, tag: "Retainer", who: "AK", whoName: "Amara K.", bg: "#7C3AED" },
    { id: "d2", company: "Trailmark Ltd", value: 9200, tag: "Inbound", who: "TM", whoName: "Tom M.", bg: "#0EA5E9" },
    { id: "d3", company: "Kestrel Group", value: 26000, tag: "Referral", who: "PR", whoName: "Priya R.", bg: "#6D28D9" },
  ],
  qualified: [
    { id: "d4", company: "Northwind Logistics", value: 64000, tag: "20 seats", who: "AK", whoName: "Amara K.", bg: "#7C3AED" },
    { id: "d5", company: "Bluecrest Health", value: 41500, tag: "Demo booked", who: "SL", whoName: "Sofia L.", bg: "#16A34A" },
  ],
  proposal: [
    { id: "d6", company: "Meridian Retail", value: 52000, tag: "Sent 3 Aug", who: "TM", whoName: "Tom M.", bg: "#F97316" },
  ],
  won: [
    { id: "d7", company: "Orbital Labs", value: 31000, tag: "Closed", who: "PR", whoName: "Priya R.", bg: "#6D28D9" },
    { id: "d8", company: "Verta Health", value: 14750, tag: "Closed", who: "SL", whoName: "Sofia L.", bg: "#16A34A" },
  ],
};

const gbp = (n: number) =>
  n >= 1000 ? `£${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `£${n}`;
const gbpFull = (n: number) => "£" + n.toLocaleString("en-GB");

function SnaarpCrmApp() {
  const [board, setBoard] = useState<Record<string, Deal[]>>(crmInitial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<string | null>(null);

  const findStage = (id: string) =>
    Object.keys(board).find((s) => board[s].some((d) => d.id === id));

  const moveDeal = (id: string, toStage: string) => {
    const fromStage = findStage(id);
    if (!fromStage || fromStage === toStage) return;
    setBoard((prev) => {
      const deal = prev[fromStage].find((d) => d.id === id)!;
      return {
        ...prev,
        [fromStage]: prev[fromStage].filter((d) => d.id !== id),
        [toStage]: [...prev[toStage], deal],
      };
    });
  };

  const weighted = Object.values(board)
    .flat()
    .reduce((sum, d) => sum + d.value, 0);

  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#FAFAFB", overflow: "hidden", color: "#111111" }}>
      {/* Top bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}>
        <Image src={icons.crm} alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 8 }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "#111111" }}>Pipeline — UK New Business</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 999, padding: "4px 10px" }}>Q3</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11.5, color: "#6B7280", display: "inline-flex", alignItems: "center", gap: 6 }}><ListFilter size={15} strokeWidth={1.75} />Filter</span>
        <span style={{ fontSize: 11.5, color: "#4B5563" }}>Weighted value <b style={{ color: "#111111" }}>{gbpFull(weighted)}</b></span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "8px 14px" }}>
          <Plus size={14} strokeWidth={2} /> New deal
        </span>
      </div>

      {/* Board */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 52, bottom: 0, padding: 20, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, alignItems: "start" }}>
        {crmStageMeta.map((stage) => {
          const deals = board[stage.key];
          const total = deals.reduce((s, d) => s + d.value, 0);
          const isOver = overStage === stage.key;
          return (
            <div
              key={stage.key}
              onDragOver={(e) => {
                e.preventDefault();
                if (overStage !== stage.key) setOverStage(stage.key);
              }}
              onDragLeave={(e) => {
                // only clear if leaving the column entirely
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverStage((s) => (s === stage.key ? null : s));
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragId) moveDeal(dragId, stage.key);
                setDragId(null);
                setOverStage(null);
              }}
              style={{
                background: isOver ? "#F1ECFB" : "#F5F4F8",
                borderRadius: 12,
                padding: 12,
                minHeight: 480,
                border: isOver ? "1.5px dashed #7C3AED" : "1.5px solid transparent",
                transition: "background .15s ease, border-color .15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: stage.accent, display: "block" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", color: "#6B7280", textTransform: "uppercase" }}>{stage.label} · {deals.length}</span>
                </span>
                <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>{gbp(total)}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {deals.map((d) => (
                  <div
                    key={d.id}
                    draggable
                    onDragStart={(e) => {
                      setDragId(d.id);
                      e.dataTransfer.effectAllowed = "move";
                      try { e.dataTransfer.setData("text/plain", d.id); } catch {}
                    }}
                    onDragEnd={() => {
                      setDragId(null);
                      setOverStage(null);
                    }}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #EEECF3",
                      borderRadius: 10,
                      padding: 11,
                      cursor: "grab",
                      boxShadow: dragId === d.id ? "0 8px 20px rgba(124,58,237,.25)" : "0 1px 2px rgba(17,17,17,.04)",
                      opacity: dragId === d.id ? 0.55 : 1,
                      transition: "box-shadow .15s ease, opacity .15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: "#F3EDFF", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                        <Building2 size={13} strokeWidth={2} />
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#111111", flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.company}</span>
                      <MoreHorizontal size={14} strokeWidth={2} color="#C4C4C4" />
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#111111", marginTop: 8 }}>{gbpFull(d.value)}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: stage.key === "won" ? "#16A34A" : "#6B7280", background: stage.key === "won" ? "#DCFCE7" : "#F3F4F6", borderRadius: 999, padding: "3px 8px" }}>{d.tag}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 18, height: 18, borderRadius: 99, background: d.bg, color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{d.who}</span>
                        <span style={{ fontSize: 9.5, color: "#9CA3AF" }}>{d.whoName}</span>
                      </span>
                    </div>
                  </div>
                ))}

                {/* Drop hint when dragging over an empty-ish column */}
                {isOver && (
                  <div style={{ height: 44, border: "1.5px dashed #C4B5FD", background: "#F7F3FF", borderRadius: 10 }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Books (accounting dashboard) — empty states filled          */
/* ------------------------------------------------------------------ */
const booksNav: { icon: typeof Home; label: string; active?: boolean; caret?: boolean }[] = [
  { icon: Home, label: "Home", active: true },
  { icon: Package, label: "Products" },
  { icon: ShoppingCart, label: "Sales", caret: true },
  { icon: ShoppingCart, label: "Purchases", caret: true },
  { icon: Landmark, label: "Banking", caret: true },
  { icon: Calculator, label: "Accountant" },
  { icon: BarChart2, label: "Reports" },
  { icon: FileText, label: "Documents" },
  { icon: Settings, label: "Settings" },
];

// Cash-flow bars (in £k) — incoming vs outgoing across the fiscal months.
const cashFlow = [
  { m: "Apr", in: 32, out: 21 },
  { m: "May", in: 41, out: 26 },
  { m: "Jun", in: 38, out: 24 },
  { m: "Jul", in: 52, out: 33 },
  { m: "Aug", in: 47, out: 29 },
  { m: "Sep", in: 61, out: 38 },
];
const cashMax = 70;

const booksProjects = [
  { name: "Northwind — Q3 Retainer", pct: 72, hrs: "48 / 66 hrs", color: "#7C3AED" },
  { name: "Bluecrest Implementation", pct: 45, hrs: "31 / 70 hrs", color: "#0EA5E9" },
  { name: "Meridian Rebrand", pct: 90, hrs: "54 / 60 hrs", color: "#16A34A" },
];

const booksBanks = [
  { name: "Barclays Business", last4: "4471", balance: "£48,920.15", tint: "#E0F2FE", fg: "#0EA5E9" },
  { name: "Snaarp Card", last4: "0148", balance: "−£3,204.60", tint: "#F3EDFF", fg: "#7C3AED" },
];

const booksWatchlist = [
  { name: "Sales — Consulting", type: "Income", amount: "£186,400", trend: "up" },
  { name: "Office & Software", type: "Expense", amount: "£42,180", trend: "down" },
  { name: "Payroll", type: "Expense", amount: "£98,650", trend: "up" },
  { name: "VAT Payable", type: "Liability", amount: "£21,340", trend: "flat" },
];

function BooksTab({ label, active }: { label: string; active?: boolean }) {
  return (
    <span style={{ fontSize: 12.5, fontWeight: 600, color: active ? "#7C3AED" : "#6B7280", borderBottom: active ? "2px solid #7C3AED" : "2px solid transparent", paddingBottom: 10 }}>
      {label}
    </span>
  );
}

function SnaarpBooksApp() {
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#F5F5F7", overflow: "hidden", color: "#111111" }}>
      {/* Sidebar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 184, background: "#ffffff", borderRight: "1px solid #F0EFF4", padding: "14px 12px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 6px 14px" }}>
          <Image src={icons.books} alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 7 }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>Snaarp Books</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {booksNav.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: n.active ? "#F3EDFF" : "transparent", color: n.active ? "#7C3AED" : "#6B7280", fontWeight: n.active ? 600 : 500, fontSize: 12.5 }}>
                <Icon size={16} strokeWidth={1.75} />
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.caret && <ChevronRight size={13} strokeWidth={2} color="#C4C4C4" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Top bar */}
      <div style={{ position: "absolute", left: 184, right: 0, top: 0, height: 48, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <div style={{ flex: 1, maxWidth: 380, height: 30, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", display: "flex", alignItems: "center", padding: "0 12px", gap: 8, margin: "0 auto" }}>
          <Search size={13} strokeWidth={1.75} color="#9CA3AF" />
          <span style={{ fontSize: 11.5, color: "#A9A7B2" }}>Search…  ( / )</span>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "6px 14px" }}><Plus size={13} strokeWidth={2} />New</span>
        <Users size={16} strokeWidth={1.75} color="#9CA3AF" />
        <Bell size={16} strokeWidth={1.75} color="#9CA3AF" />
        <Settings size={16} strokeWidth={1.75} color="#9CA3AF" />
        <span style={{ width: 26, height: 26, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>AO</span>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", left: 184, right: 0, top: 48, bottom: 0, overflow: "hidden", padding: "18px 24px" }}>
        {/* Greeting + tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 34, height: 34, borderRadius: 99, background: "#F3EDFF", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
            <Building2 size={17} strokeWidth={1.75} />
          </span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>Hello, Daniel Osei</div>
            <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>Gold</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 14, borderBottom: "1px solid #EAEAEA" }}>
          <BooksTab label="Dashboard" active />
          <BooksTab label="Getting Started" />
          <BooksTab label="Recent Updates" />
        </div>

        {/* Receivables + Payables */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
          {[
            { title: "Total Receivables", subtitle: "Total Unpaid Invoices", amount: "£84,250.00", cur: "£61,900.00", over: "£22,350.00" },
            { title: "Total Payables", subtitle: "Total Unpaid Bills", amount: "£37,480.00", cur: "£29,300.00", over: "£8,180.00" },
          ].map((c) => (
            <div key={c.title} style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>{c.title}</span>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "#7C3AED", display: "inline-flex", alignItems: "center", gap: 4 }}><Plus size={12} strokeWidth={2} />New</span>
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 8 }}>{c.subtitle}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#111111", marginTop: 2 }}>{c.amount}</div>
              <div style={{ height: 6, borderRadius: 3, background: "#F0EFF4", marginTop: 12, display: "flex", overflow: "hidden" }}>
                <span style={{ width: "72%", background: "#7C3AED" }} />
                <span style={{ width: "28%", background: "#F97316" }} />
              </div>
              <div style={{ display: "flex", gap: 18, marginTop: 10, fontSize: 11, color: "#6B7280" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 99, background: "#7C3AED" }} />Current: {c.cur}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 99, background: "#F97316" }} />Overdue: {c.over}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cash Flow */}
        <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, padding: "16px 18px", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>Cash Flow</span>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: "#6B7280", border: "1px solid #EFEFEF", borderRadius: 8, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 6 }}>This Fiscal Year <ChevronDown size={13} strokeWidth={2} /></span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 22, height: 130, padding: "0 6px" }}>
            {cashFlow.map((c) => (
              <div key={c.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 110 }}>
                  <span style={{ width: 14, height: `${(c.in / cashMax) * 100}%`, background: "#16A34A", borderRadius: "4px 4px 0 0" }} />
                  <span style={{ width: 14, height: `${(c.out / cashMax) * 100}%`, background: "#F97316", borderRadius: "4px 4px 0 0" }} />
                </div>
                <span style={{ fontSize: 10, color: "#9CA3AF" }}>{c.m}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10, fontSize: 11, color: "#6B7280" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "#16A34A" }} />Incoming</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "#F97316" }} />Outgoing</span>
          </div>
        </div>

        {/* Projects + Bank cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, padding: "16px 18px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>Projects</span>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
              {booksProjects.map((p) => (
                <div key={p.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5 }}>
                    <span style={{ fontWeight: 600, color: "#111111" }}>{p.name}</span>
                    <span style={{ color: "#9CA3AF" }}>{p.hrs}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "#F0EFF4", marginTop: 6, overflow: "hidden" }}>
                    <span style={{ display: "block", width: `${p.pct}%`, height: "100%", background: p.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, padding: "16px 18px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>Bank and Credit Cards</span>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              {booksBanks.map((b) => (
                <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid #F0EFF4", borderRadius: 10, padding: "10px 12px" }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: b.tint, color: b.fg, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                    <CreditCard size={16} strokeWidth={2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#111111" }}>{b.name}</div>
                    <div style={{ fontSize: 10.5, color: "#9CA3AF" }}>•••• {b.last4}</div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: b.balance.startsWith("−") ? "#DC2626" : "#111111" }}>{b.balance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Watchlist */}
        <div style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, padding: "16px 18px", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>Account Watchlist</span>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: "#6B7280", border: "1px solid #EFEFEF", borderRadius: 8, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 6 }}>Accrual <ChevronDown size={13} strokeWidth={2} /></span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 140px", padding: "8px 4px", borderBottom: "1px solid #F0EFF4", fontSize: 10, fontWeight: 700, letterSpacing: ".04em", color: "#9CA3AF" }}>
            <span>ACCOUNT</span><span>TYPE</span><span style={{ textAlign: "right" }}>BALANCE</span>
          </div>
          {booksWatchlist.map((w, k) => (
            <div key={w.name} style={{ display: "grid", gridTemplateColumns: "1fr 120px 140px", alignItems: "center", padding: "9px 4px", borderBottom: k < booksWatchlist.length - 1 ? "1px solid #F5F4F8" : "none" }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#111111" }}>{w.name}</span>
              <span style={{ fontSize: 11, color: "#6B7280" }}>{w.type}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#111111", textAlign: "right", display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                {w.trend === "up" && <TrendingUp size={13} strokeWidth={2} color="#16A34A" />}
                {w.trend === "down" && <TrendingUp size={13} strokeWidth={2} color="#DC2626" style={{ transform: "scaleY(-1)" }} />}
                {w.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Sheet (Google-Sheets-style spreadsheet)                     */
/* ------------------------------------------------------------------ */
const sheetCols = ["A", "B", "C", "D", "E", "F", "G"];
// Row data: A..G. Empty strings render as blank cells.
const sheetData: string[][] = [
  ["Region", "Q1", "Q2", "Q3", "Q4", "FY Total", "% Growth"],
  ["London", "82,400", "91,200", "104,500", "112,300", "390,400", "18.2%"],
  ["Manchester", "41,900", "44,600", "49,800", "53,100", "189,400", "12.6%"],
  ["Bristol", "28,300", "30,100", "33,700", "36,900", "129,000", "14.3%"],
  ["Leeds", "19,800", "22,400", "31,600", "34,200", "108,000", "21.5%"],
  ["Glasgow", "17,200", "18,900", "20,400", "22,800", "79,300", "9.8%"],
  ["Dublin", "24,600", "26,800", "29,900", "32,400", "113,700", "15.1%"],
  ["Remote / EU", "12,100", "13,500", "15,200", "17,600", "58,400", "16.7%"],
  ["Total", "226,300", "247,500", "285,100", "309,300", "1,068,200", "16.4%"],
  ["", "", "", "", "", "", ""],
  ["Target", "220,000", "240,000", "270,000", "300,000", "1,030,000", ""],
  ["Variance", "6,300", "7,500", "15,100", "9,300", "38,200", ""],
];
const SHEET_ROWS = 14; // include a couple of empty rows at the bottom
// Selected cell D5 (Leeds / Q3 = 31,600). Grid row index 5 shows sheet row 5
// via the "row ri+1" header; column index 3 = "D" (A=0,B=1,C=2,D=3).
const selectedCell = { r: 4, c: 3 };

function SheetToolBtn({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#5F6368" }}>
      {children}
    </span>
  );
}

function SnaarpSheetApp() {
  const colW = 118; // data column width
  const rowH = 26;
  const rowHeadW = 42;

  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#ffffff", overflow: "hidden", color: "#111111", fontSize: 12 }}>
      {/* Title / menu bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56, borderBottom: "1px solid #E8EAED", padding: "8px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <Image src={icons.sheet} alt="" width={30} height={30} style={{ width: 30, height: 30, borderRadius: 7 }} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#111111" }}>Q3 Revenue Forecast</span>
            <Star size={14} strokeWidth={1.75} color="#C4C4C4" />
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 3, fontSize: 11.5, color: "#5F6368" }}>
            {["File", "Edit", "View", "Insert", "Format", "Data", "Tools"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "#16A34A" }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#16A34A" }} /> Saved to Drive
        </span>
        {/* collaborator avatars */}
        <span style={{ display: "flex" }}>
          {[["AO", "#7C3AED"], ["TM", "#0EA5E9"], ["PR", "#16A34A"]].map(([i, c], k) => (
            <span key={k} style={{ width: 24, height: 24, borderRadius: 99, background: c, color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff", marginLeft: k ? -7 : 0 }}>{i}</span>
          ))}
        </span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "#ffffff", background: "#16A34A", borderRadius: 999, padding: "6px 14px" }}>Share</span>
      </div>

      {/* Toolbar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 56, height: 40, borderBottom: "1px solid #E8EAED", display: "flex", alignItems: "center", padding: "0 12px", gap: 2, background: "#F9FBFD" }}>
        <SheetToolBtn><Undo2 size={15} strokeWidth={1.75} /></SheetToolBtn>
        <SheetToolBtn><Redo2 size={15} strokeWidth={1.75} /></SheetToolBtn>
        <SheetToolBtn><Printer size={15} strokeWidth={1.75} /></SheetToolBtn>
        <span style={{ width: 1, height: 20, background: "#E8EAED", margin: "0 6px" }} />
        <span style={{ fontSize: 11.5, color: "#5F6368", padding: "0 8px" }}>100%</span>
        <span style={{ width: 1, height: 20, background: "#E8EAED", margin: "0 6px" }} />
        <SheetToolBtn><span style={{ fontSize: 13, fontWeight: 600 }}>£</span></SheetToolBtn>
        <SheetToolBtn><span style={{ fontSize: 13 }}>%</span></SheetToolBtn>
        <span style={{ width: 1, height: 20, background: "#E8EAED", margin: "0 6px" }} />
        <SheetToolBtn><Bold size={15} strokeWidth={2} /></SheetToolBtn>
        <SheetToolBtn><Italic size={15} strokeWidth={2} /></SheetToolBtn>
        <SheetToolBtn><PaintBucket size={15} strokeWidth={1.75} /></SheetToolBtn>
        <span style={{ width: 1, height: 20, background: "#E8EAED", margin: "0 6px" }} />
        <SheetToolBtn><AlignLeft size={15} strokeWidth={1.75} /></SheetToolBtn>
        <SheetToolBtn><Sigma size={15} strokeWidth={1.75} /></SheetToolBtn>
      </div>

      {/* Name box + formula bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 30, borderBottom: "1px solid #E8EAED", display: "flex", alignItems: "center", padding: "0 6px", gap: 8 }}>
        <span style={{ width: rowHeadW + 8, fontSize: 11.5, fontWeight: 600, color: "#111111", textAlign: "center" }}>D5</span>
        <span style={{ width: 1, height: 18, background: "#E8EAED" }} />
        <Sigma size={13} strokeWidth={1.75} color="#9CA3AF" />
        <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 11.5, color: "#4B5563" }}>=SUM(D2:D4)*1.06</span>
      </div>

      {/* Grid */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 126, bottom: 28, overflow: "hidden", background: "#ffffff" }}>
        {/* Column header row */}
        <div style={{ display: "flex", height: 22, borderBottom: "1px solid #E8EAED" }}>
          <span style={{ width: rowHeadW, background: "#F8F9FA", borderRight: "1px solid #E8EAED", flex: "0 0 auto" }} />
          {sheetCols.map((c, ci) => (
            <span key={c} style={{ width: colW, flex: "0 0 auto", background: ci === selectedCell.c ? "#D2E3FC" : "#F8F9FA", borderRight: "1px solid #E8EAED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 500, color: ci === selectedCell.c ? "#1967D2" : "#5F6368" }}>{c}</span>
          ))}
        </div>

        {/* Data rows */}
        {Array.from({ length: SHEET_ROWS }).map((_, ri) => {
          const row = sheetData[ri] || [];
          const isHeaderRow = ri === 0;
          const isTotalRow = row[0] === "Total";
          return (
            <div key={ri} style={{ display: "flex", height: rowH, borderBottom: "1px solid #F1F3F4" }}>
              <span style={{ width: rowHeadW, flex: "0 0 auto", background: ri === selectedCell.r ? "#D2E3FC" : "#F8F9FA", borderRight: "1px solid #E8EAED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: ri === selectedCell.r ? "#1967D2" : "#5F6368" }}>{ri + 1}</span>
              {sheetCols.map((_, ci) => {
                const val = row[ci] ?? "";
                const isSel = ri === selectedCell.r && ci === selectedCell.c;
                const numeric = ci > 0 && val !== "";
                return (
                  <span
                    key={ci}
                    style={{
                      width: colW,
                      flex: "0 0 auto",
                      borderRight: "1px solid #F1F3F4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: numeric ? "flex-end" : "flex-start",
                      padding: "0 8px",
                      fontSize: 11.5,
                      color: isHeaderRow || isTotalRow ? "#111111" : "#3C4043",
                      fontWeight: isHeaderRow || isTotalRow ? 600 : 400,
                      background: isTotalRow ? "#F8F9FA" : "transparent",
                      boxShadow: isSel ? "inset 0 0 0 2px #1A73E8" : "none",
                      position: "relative",
                    }}
                  >
                    {val}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom sheet tabs */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 28, borderTop: "1px solid #E8EAED", background: "#F9FBFD", display: "flex", alignItems: "center", padding: "0 10px", gap: 4 }}>
        <Plus size={14} strokeWidth={2} color="#5F6368" />
        <span style={{ width: 1, height: 16, background: "#E8EAED", margin: "0 4px" }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: "#111111", background: "#ffffff", borderTop: "2px solid #16A34A", padding: "5px 14px", borderRadius: "0 0 2px 2px" }}>Forecast</span>
        <span style={{ fontSize: 11, color: "#5F6368", padding: "5px 12px" }}>Actuals</span>
        <span style={{ fontSize: 11, color: "#5F6368", padding: "5px 12px" }}>Targets</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Document (writing editor)                                    */
/* ------------------------------------------------------------------ */
function SnaarpDocumentApp() {
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#F1F3F4", overflow: "hidden", color: "#111111" }}>
      {/* Title / menu bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56, background: "#ffffff", borderBottom: "1px solid #E8EAED", padding: "8px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <Image src={icons.document} alt="" width={30} height={30} style={{ width: 30, height: 30, borderRadius: 7 }} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Q3 Rollout Plan</span>
            <Star size={14} strokeWidth={1.75} color="#C4C4C4" />
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 3, fontSize: 11.5, color: "#5F6368" }}>
            {["File", "Edit", "View", "Insert", "Format", "Tools"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "#16A34A" }}><span style={{ width: 7, height: 7, borderRadius: 99, background: "#16A34A" }} /> Saved to Drive</span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "6px 14px" }}>Share</span>
      </div>
      {/* Toolbar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 56, height: 38, background: "#EDF2FA", borderBottom: "1px solid #E8EAED", display: "flex", alignItems: "center", padding: "0 16px", gap: 4 }}>
        <SheetToolBtn><Undo2 size={15} strokeWidth={1.75} /></SheetToolBtn>
        <SheetToolBtn><Redo2 size={15} strokeWidth={1.75} /></SheetToolBtn>
        <SheetToolBtn><Printer size={15} strokeWidth={1.75} /></SheetToolBtn>
        <span style={{ width: 1, height: 18, background: "#D2D5DA", margin: "0 6px" }} />
        <span style={{ fontSize: 11.5, color: "#5F6368", padding: "0 6px" }}>Normal text</span>
        <span style={{ width: 1, height: 18, background: "#D2D5DA", margin: "0 6px" }} />
        <SheetToolBtn><Bold size={15} strokeWidth={2} /></SheetToolBtn>
        <SheetToolBtn><Italic size={15} strokeWidth={2} /></SheetToolBtn>
        <SheetToolBtn><Type size={15} strokeWidth={1.75} /></SheetToolBtn>
        <span style={{ width: 1, height: 18, background: "#D2D5DA", margin: "0 6px" }} />
        <SheetToolBtn><AlignLeft size={15} strokeWidth={1.75} /></SheetToolBtn>
      </div>
      {/* Page */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 94, bottom: 0, overflow: "hidden", display: "flex", justifyContent: "center", paddingTop: 26 }}>
        <div style={{ width: 620, background: "#ffffff", borderRadius: "3px 3px 0 0", boxShadow: "0 1px 3px rgba(60,64,67,.15)", padding: "48px 64px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#111111" }}>Q3 Rollout Plan</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>Prepared by Adaeze Okonkwo · Updated 12 Aug 2026</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#111111", marginTop: 26 }}>Overview</div>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "#3C4043", marginTop: 8 }}>
            This document outlines the phased rollout of Snaarp 360 across the organisation. With billing
            now consolidated in Snaarp Books, we can bring the migration forward by two weeks and retire the
            remaining legacy subscriptions before the end of the quarter.
          </p>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#111111", marginTop: 20 }}>Key milestones</div>
          <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#3C4043", marginTop: 8, paddingLeft: 22 }}>
            <li>Week 1 — Migrate mail, contacts and shared drives</li>
            <li>Week 2 — Onboard the sales team to Snaarp CRM</li>
            <li>Week 3 — Move accounting workflows into Snaarp Books</li>
          </ul>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "#3C4043", marginTop: 14 }}>
            Anything the importer cannot map is reported before cutover rather than dropped silently.
            <span style={{ display: "inline-block", width: 2, height: 15, background: "#7C3AED", marginLeft: 2, verticalAlign: "middle", animation: "snpCaret 1s step-end infinite" }} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Presentation (slide editor)                                  */
/* ------------------------------------------------------------------ */
const slideThumbs = [
  { n: 1, title: "Snaarp 360", sub: "Company overview", active: true },
  { n: 2, title: "The problem", sub: "" },
  { n: 3, title: "One platform", sub: "" },
  { n: 4, title: "Pricing", sub: "" },
  { n: 5, title: "Roadmap", sub: "" },
];

function SnaarpPresentationApp() {
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#F1F3F4", overflow: "hidden", color: "#111111" }}>
      {/* Title bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56, background: "#ffffff", borderBottom: "1px solid #E8EAED", padding: "8px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <Image src={productIcon("presentation")} alt="" width={30} height={30} style={{ width: 30, height: 30, borderRadius: 7 }} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Investor Deck — 2026</div>
          <div style={{ display: "flex", gap: 14, marginTop: 3, fontSize: 11.5, color: "#5F6368" }}>
            {["File", "Edit", "View", "Insert", "Slide", "Format"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "#111111", border: "1px solid #EFEFEF", borderRadius: 8, padding: "6px 12px" }}><Maximize2 size={13} strokeWidth={1.75} /> Present</span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "6px 14px" }}>Share</span>
      </div>
      {/* Body: thumbnails + stage */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 56, bottom: 0, display: "flex" }}>
        {/* Thumbnail rail */}
        <div style={{ width: 140, background: "#ffffff", borderRight: "1px solid #E8EAED", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
          {slideThumbs.map((s) => (
            <div key={s.n} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 10, color: "#9CA3AF", width: 10, paddingTop: 2 }}>{s.n}</span>
              <div style={{ flex: 1, aspectRatio: "16/9", borderRadius: 5, background: s.active ? "linear-gradient(135deg,#8B5CF6,#6D28D9)" : "#F1F3F4", border: s.active ? "2px solid #7C3AED" : "1px solid #E8EAED", padding: 7, color: s.active ? "#fff" : "#9CA3AF", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: 8, fontWeight: 700, lineHeight: 1.2 }}>{s.title}</span>
                {s.sub && <span style={{ fontSize: 6.5, opacity: 0.8 }}>{s.sub}</span>}
              </div>
            </div>
          ))}
        </div>
        {/* Stage */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 30 }}>
          <div style={{ width: "100%", maxWidth: 560, aspectRatio: "16/9", borderRadius: 10, background: "linear-gradient(135deg,#8B5CF6,#6D28D9)", boxShadow: "0 10px 30px rgba(109,40,217,.28)", padding: 44, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
            <Image src={icons.snaarp} alt="" width={40} height={40} style={{ width: 40, height: 40, borderRadius: 11, position: "absolute", top: 28, left: 44 }} />
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-.02em" }}>Snaarp 360</div>
            <div style={{ fontSize: 16, opacity: 0.85, marginTop: 8 }}>20+ business apps. One platform. One subscription.</div>
            <div style={{ fontSize: 12, opacity: 0.7, position: "absolute", bottom: 28, left: 44 }}>Company overview · Q3 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Lock (password vault)                                        */
/* ------------------------------------------------------------------ */
const vaultItems = [
  { name: "Barclays Business", user: "adaeze@snaarp.com", tint: "#E0F2FE", fg: "#0EA5E9", letter: "B", strength: "Strong", fav: true },
  { name: "Snaarp Admin Console", user: "adaeze@snaarp.com", tint: "#F3EDFF", fg: "#7C3AED", letter: "S", strength: "Strong", fav: true },
  { name: "AWS Root", user: "ops@snaarp.com", tint: "#FEF3C7", fg: "#D97706", letter: "A", strength: "Strong", fav: false },
  { name: "Figma Team", user: "design@snaarp.com", tint: "#FEE2E2", fg: "#DC2626", letter: "F", strength: "Medium", fav: false },
  { name: "Stripe Dashboard", user: "finance@snaarp.com", tint: "#DCFCE7", fg: "#16A34A", letter: "S", strength: "Strong", fav: false },
  { name: "Northwind SFTP", user: "ops@snaarp.com", tint: "#EDE9F6", fg: "#6D28D9", letter: "N", strength: "Strong", fav: false },
];

function SnaarpLockApp() {
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#FAFAFB", overflow: "hidden", color: "#111111" }}>
      {/* Sidebar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 190, background: "#ffffff", borderRight: "1px solid #F0EFF4", padding: "16px 12px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 6px 14px" }}>
          <Image src={icons.lock} alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 7 }} />
          <span style={{ fontSize: 14, fontWeight: 700 }}>Snaarp Lock</span>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: "#fff", background: "#7C3AED", borderRadius: 999, padding: "10px 14px", marginBottom: 14 }}><Plus size={15} strokeWidth={2} /> New item</span>
        {[
          { icon: Shield, label: "All items", active: true },
          { icon: Star, label: "Favorites" },
          { icon: Key, label: "Logins" },
          { icon: CreditCard, label: "Cards" },
          { icon: FileText, label: "Secure notes" },
          { icon: Users, label: "Shared vaults" },
          { icon: Trash2, label: "Trash" },
        ].map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: n.active ? "#F3EDFF" : "transparent", color: n.active ? "#7C3AED" : "#6B7280", fontWeight: n.active ? 600 : 500, fontSize: 12.5 }}>
              <Icon size={16} strokeWidth={1.75} /><span>{n.label}</span>
            </div>
          );
        })}
      </div>
      {/* Top bar */}
      <div style={{ position: "absolute", left: 190, right: 0, top: 0, height: 48, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <div style={{ flex: 1, maxWidth: 360, height: 30, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", display: "flex", alignItems: "center", padding: "0 12px", gap: 8 }}>
          <Search size={13} strokeWidth={1.75} color="#9CA3AF" /><span style={{ fontSize: 11.5, color: "#A9A7B2" }}>Search vault</span>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: "#16A34A", display: "inline-flex", alignItems: "center", gap: 6 }}><Shield size={14} strokeWidth={2} /> Vault unlocked</span>
        <span style={{ width: 26, height: 26, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>AO</span>
      </div>
      {/* Items */}
      <div style={{ position: "absolute", left: 190, right: 0, top: 48, bottom: 0, overflow: "hidden", padding: "18px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>All items <span style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}>· 24 logins</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {vaultItems.map((v) => (
            <div key={v.name} style={{ display: "flex", alignItems: "center", gap: 12, background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 12, padding: "12px 14px" }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: v.tint, color: v.fg, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{v.letter}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</span>
                  {v.fav && <Star size={11} strokeWidth={2} color="#F59E0B" fill="#F59E0B" />}
                </div>
                <div style={{ fontSize: 11, color: "#9CA3AF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.user}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 2, color: "#C4C4C4" }}>••••••••••</span>
                  <span style={{ fontSize: 9, fontWeight: 600, color: v.strength === "Strong" ? "#16A34A" : "#D97706", background: v.strength === "Strong" ? "#DCFCE7" : "#FEF3C7", borderRadius: 999, padding: "2px 7px" }}>{v.strength}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "#9CA3AF" }}>
                <Eye size={14} strokeWidth={1.75} />
                <Copy size={14} strokeWidth={1.75} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snaarp Identity (digital ID cards)                                  */
/* ------------------------------------------------------------------ */
function SnaarpIdentityApp() {
  const dirItems = [
    { label: "All cards · 148", active: true },
    { label: "Pending approval · 6", active: false },
    { label: "Contractors · 21", active: false },
    { label: "Archived · 34", active: false },
  ];
  return (
    <div style={{ position: "absolute", left: 62, right: 0, top: 46, bottom: 0, background: "#FBFAFD", overflow: "hidden", color: "#111111" }}>
      {/* Top bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}>
        <Image src={icons.identity} alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 8 }} />
        <span style={{ fontSize: 15, fontWeight: 600 }}>ID Cards</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 999, padding: "4px 10px" }}>Snaarp Identity</span>
        <span style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#fff", background: "#7C3AED", borderRadius: 999, padding: "7px 14px" }}><Plus size={14} strokeWidth={2} /> New card</span>
        <span style={{ width: 26, height: 26, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>AO</span>
      </div>
      {/* Directory sidebar */}
      <div style={{ position: "absolute", left: 0, top: 52, bottom: 0, width: 196, background: "#ffffff", borderRight: "1px solid #F0EFF4", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8" }}>DIRECTORY</span>
        {dirItems.map((d) => (
          <span key={d.label} style={{ fontSize: 12.5, fontWeight: d.active ? 600 : 400, color: d.active ? "#7C3AED" : "#6B7280", background: d.active ? "#F3EDFF" : "transparent", borderRadius: 8, padding: "9px 11px" }}>{d.label}</span>
        ))}
        <span style={{ width: "100%", height: 1, background: "#F0EFF4", display: "block", margin: "8px 0" }} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8" }}>TEMPLATES</span>
        <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Employee — Standard</span>
        <span style={{ fontSize: 12.5, color: "#6B7280", padding: "9px 11px" }}>Visitor — Day pass</span>
      </div>
      {/* Card stage + details */}
      <div style={{ position: "absolute", left: 196, right: 300, top: 52, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 280, borderRadius: 20, background: "linear-gradient(160deg,#8B5CF6,#6D28D9)", padding: 24, boxShadow: "0 2px 6px rgba(17,17,17,.06),0 24px 44px rgba(109,40,217,.3)", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Image src={icons.snaarp} alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 7 }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".14em", color: "rgba(255,255,255,.72)" }}>SNAARP 360</span>
          </div>
          <div style={{ width: 92, height: 92, borderRadius: 99, background: "rgba(255,255,255,.16)", border: "2px solid rgba(255,255,255,.4)", margin: "20px auto 0", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 28, fontWeight: 700 }}>AO</div>
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Adaeze Okonkwo</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.76)", marginTop: 2 }}>Head of Operations</div>
          </div>
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 9, letterSpacing: ".12em", color: "rgba(255,255,255,.6)" }}>EMPLOYEE ID</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>SN-0148-AO</span>
            </div>
            <span style={{ width: 48, height: 48, borderRadius: 10, background: "#fff", color: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}><QrCode size={30} strokeWidth={1.5} /></span>
          </div>
        </div>
      </div>
      {/* Details panel */}
      <div style={{ position: "absolute", right: 0, top: 52, bottom: 0, width: 300, background: "#ffffff", borderLeft: "1px solid #F0EFF4", padding: "18px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#B0AEB8" }}>CARD DETAILS</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 999, padding: "5px 12px" }}><BadgeCheck size={13} strokeWidth={2} /> Verified</span>
        </div>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {[["Full name", "Adaeze Okonkwo"], ["Department", "Operations"], ["Access level", "Site + Cloud"], ["Email", "adaeze@snaarp.com"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>{l}</span>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: "#111111", background: "#F7F7F7", border: "1px solid #EFEFEF", borderRadius: 9, padding: "9px 11px" }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: "#16A34A", display: "block" }} />
            <span style={{ fontSize: 12, color: "#4B5563" }}>Verified 12 Aug 2026</span>
          </div>
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

            {/* App rail — clickable icons; scrollable when they overflow. */}
            <div className="snp-rail" style={{ position: "absolute", left: 0, top: 46, bottom: 0, width: 62, background: "#ffffff", borderRight: "1px solid #F0EFF4", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "14px 0", zIndex: 20, overflowY: "auto", overflowX: "hidden" }}>
              <Image src={icons.snaarp} alt="" width={30} height={30} style={{ width: 30, height: 30, borderRadius: 9 }} />
              <span style={{ width: 26, height: 1, background: "#EFEFEF", display: "block", margin: "4px 0" }} />
              {railIcon(icons.mail, "mail")}
              {railIcon(icons.meet, "meet")}
              {railIcon(icons.teams, "teams")}
              {railIcon(icons.me, "snaarpme")}
              {railIcon(icons.drive, "drive")}
              {railIcon(icons.crm, "crm")}
              {railIcon(icons.books, "books")}
              {railIcon(icons.sheet, "sheet")}
              {railIcon(icons.document, "document")}
              {railIcon(productIcon("presentation"), "presentation")}
              {railIcon(icons.lock, "lock")}
              {railIcon(icons.identity, "identity")}
            </div>

            {/* Active app body */}
            {active === "mail" && <MailApp />}
            {active === "meet" && <MeetApp />}
            {active === "teams" && <TeamsApp />}
            {active === "snaarpme" && <SnaarpMeApp />}
            {active === "drive" && <SnaarpDriveApp />}
            {active === "crm" && <SnaarpCrmApp />}
            {active === "books" && <SnaarpBooksApp />}
            {active === "sheet" && <SnaarpSheetApp />}
            {active === "document" && <SnaarpDocumentApp />}
            {active === "presentation" && <SnaarpPresentationApp />}
            {active === "lock" && <SnaarpLockApp />}
            {active === "identity" && <SnaarpIdentityApp />}
          </div>
        </div>
      </div>
    </section>
  );
}
