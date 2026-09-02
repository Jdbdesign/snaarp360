import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Settings,
  LayoutGrid,
  PenLine,
  Inbox,
  Star,
  Clock,
  Send,
  FileText,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  CalendarClock,
  Mail as MailIcon,
  Shield,
  Trash2,
  Square,
  RefreshCw,
  List,
  Grid2x2,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import { icons } from "@/lib/assets";

/**
 * Static Snaarp Mail mockup for the "How It Works" right panel.
 *
 * Layout / information architecture mirrors the real Snaarp Mail product
 * (top bar + sidebar nav + list panel with group header + rows), but every
 * colour follows the Snaarp design system (violet #7C3AED accents, canvas /
 * canvas-soft backgrounds, ink/body/mute text) — not the reference's grey/blue.
 * Static only: no interactivity. Browser frame + compose panel unchanged.
 */

interface Row {
  initials: string;
  avBg: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  isNew?: boolean;
  attachments?: { name: string; kind: "pdf" | "image" | "sheet" }[];
}

const rows: Row[] = [
  { initials: "C", avBg: "#DC2626", sender: "ChatSnaarp", subject: "Reimagine your workflow with just a few words", preview: "", date: "Yesterday", unread: true, isNew: true },
  { initials: "G", avBg: "#F97316", sender: "Google", subject: "You shared some Google Account data with divriots.com", preview: "", date: "Aug 31", unread: true },
  {
    initials: "V", avBg: "#0EA5E9", sender: "Victor", subject: "Images for Landing Page", preview: "",
    date: "Aug 31", unread: true,
    attachments: [
      { name: "Snaarp_Comparison…", kind: "pdf" },
      { name: "What_We_Replace.pdf", kind: "pdf" },
      { name: "Landing Image Aug 3…", kind: "image" },
    ],
  },
  { initials: "SS", avBg: "#16A34A", sender: "Snaarp Sheet", subject: "Victor Ariyibi shared \"New Snaarp Pricing\" with you on Snaarp Sheet", preview: "", date: "Aug 30", unread: false },
  { initials: "G", avBg: "#F97316", sender: "Google", subject: "You shared some Google Account data with Vecteezy", preview: "", date: "Aug 29", unread: false },
  { initials: "DT", avBg: "#7C3AED", sender: "Design Team", subject: "New Feature Feedback", preview: "— We have compiled the user feedback from the latest beta…", date: "Aug 28", unread: false },
  { initials: "AR", avBg: "#111111", sender: "Alex Rivera", subject: "Weekly Sync Summary", preview: "— Three items carried over. Pipeline review moved to Thursday.", date: "Aug 27", unread: false },
  { initials: "LP", avBg: "#6D28D9", sender: "Lisa Park", subject: "Onboarding Checklist", preview: "— Two starters on Monday, both provisioned in Workforce.", date: "Aug 27", unread: false },
];

// Sidebar nav (top section always shown; "more" items shown under the Less toggle).
const navTop: { icon: typeof Inbox; label: string; count?: string; active?: boolean }[] = [
  { icon: Inbox, label: "Inbox", count: "8", active: true },
  { icon: Star, label: "Starred" },
  { icon: Clock, label: "Snoozed" },
  { icon: Send, label: "Sent" },
  { icon: FileText, label: "Drafts", count: "30" },
];
const navMore: { icon: typeof Inbox; label: string }[] = [
  { icon: TrendingUp, label: "Important" },
  { icon: CalendarClock, label: "Scheduled" },
  { icon: MailIcon, label: "All Mail" },
  { icon: Shield, label: "Spam" },
  { icon: Trash2, label: "Trash" },
];

function AttachmentChip({ name, kind }: { name: string; kind: "pdf" | "image" | "sheet" }) {
  const map = {
    pdf: { fg: "#DC2626", bg: "#FEE2E2", label: "PDF" },
    image: { fg: "#7C3AED", bg: "#F3EDFF", label: "IMG" },
    sheet: { fg: "#16A34A", bg: "#DCFCE7", label: "XLS" },
  } as const;
  const s = map[kind];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F7F7F7", border: "1px solid #EFEFEF", borderRadius: 6, padding: "3px 8px 3px 4px", maxWidth: 150 }}>
      <span style={{ fontSize: 8, fontWeight: 700, color: s.fg, background: s.bg, borderRadius: 3, padding: "2px 4px", flex: "0 0 auto" }}>{s.label}</span>
      <span style={{ fontSize: 11, color: "#4B5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>
    </span>
  );
}

export default function MailMockup({ composeOpen = false }: { composeOpen?: boolean }) {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid #E7E4EF",
        boxShadow: "0 2px 6px rgba(17,17,17,.05),0 34px 80px rgba(17,17,17,.16)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser chrome (unchanged) */}
      <div style={{ height: 46, background: "#F7F7F7", borderBottom: "1px solid #EDEDED", display: "flex", alignItems: "center", padding: "0 16px", gap: 8, flex: "0 0 auto" }}>
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FF5F57", display: "block" }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FEBC2E", display: "block" }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#28C840", display: "block" }} />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ minWidth: 300, height: 26, borderRadius: 999, background: "#ffffff", border: "1px solid #E9E9E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>app.snaarp.com/mail/inbox</span>
          </div>
        </div>
      </div>

      {/* App body */}
      <div style={{ position: "relative", flex: 1, minHeight: 0, background: "#ffffff" }}>
        {/* Top bar */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 18px", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, width: 184, flex: "0 0 auto" }}>
            <Image src={icons.mail} alt="" width={26} height={26} style={{ width: 26, height: 26, borderRadius: 8 }} />
            <span style={{ fontSize: 15.5, fontWeight: 700, color: "#111111" }}>Snaarp Mail</span>
          </div>
          {/* Centered search */}
          <div style={{ flex: 1, height: 38, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", display: "flex", alignItems: "center", padding: "0 14px", gap: 10 }}>
            <Search size={16} strokeWidth={1.75} color="#8A8F98" />
            <span style={{ flex: 1, fontSize: 12.5, color: "#A9A7B2" }}>Search in Inbox</span>
            <SlidersHorizontal size={16} strokeWidth={1.75} color="#8A8F98" />
          </div>
          {/* Right cluster */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "0 0 auto" }}>
            <Settings size={18} strokeWidth={1.75} color="#8A8F98" />
            <LayoutGrid size={18} strokeWidth={1.75} color="#8A8F98" />
            <span style={{ width: 30, height: 30, borderRadius: 99, background: "#7C3AED", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>JW</span>
          </div>
        </div>

        {/* Left sidebar */}
        <div style={{ position: "absolute", left: 0, top: 56, bottom: 0, width: 210, background: "#ffffff", borderRight: "1px solid #F0EFF4", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3, overflow: "hidden" }}>
          <span className="snp-pulse" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, fontSize: 13.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "11px 18px", boxShadow: "0 1px 2px rgba(17,17,17,.06),0 8px 18px rgba(124,58,237,.28)", marginBottom: 10 }}>
            <PenLine size={15} strokeWidth={2} /> Compose
          </span>

          {navTop.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", borderRadius: 999, background: n.active ? "#F3EDFF" : "transparent", color: n.active ? "#7C3AED" : "#4B5563" }}>
                <Icon size={18} strokeWidth={1.75} color={n.active ? "#7C3AED" : "#8A8F98"} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: n.active ? 600 : 500 }}>{n.label}</span>
                {n.count && <span style={{ fontSize: 11.5, fontWeight: 600, color: n.active ? "#7C3AED" : "#8A8F98" }}>{n.count}</span>}
              </div>
            );
          })}

          {/* Less toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", color: "#8A8F98" }}>
            <ChevronUp size={18} strokeWidth={1.75} color="#8A8F98" />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Less</span>
          </div>

          {navMore.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", borderRadius: 999, color: "#4B5563" }}>
                <Icon size={18} strokeWidth={1.75} color="#8A8F98" />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{n.label}</span>
              </div>
            );
          })}
        </div>

        {/* Main list panel */}
        <div style={{ position: "absolute", left: 210, right: 0, top: 56, bottom: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Toolbar row */}
          <div style={{ height: 44, borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 18px", gap: 12, flex: "0 0 auto" }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, border: "1.6px solid #C9C7D2", display: "block", flex: "0 0 auto" }} />
            <ChevronDown size={15} strokeWidth={1.75} color="#8A8F98" />
            <RefreshCw size={15} strokeWidth={1.75} color="#8A8F98" />
            <span style={{ flex: 1 }} />
            {/* Default / Compact segmented control */}
            <div style={{ display: "flex", border: "1px solid #EFEFEF", borderRadius: 999, padding: 2, background: "#ffffff" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 999, padding: "5px 12px" }}>
                <List size={13} strokeWidth={2} /> Default
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "#8A8F98", padding: "5px 12px" }}>
                <Grid2x2 size={13} strokeWidth={2} /> Compact
              </span>
            </div>
          </div>

          {/* Group header */}
          <div style={{ height: 38, display: "flex", alignItems: "center", padding: "0 18px", gap: 8, flex: "0 0 auto", background: "#FBFAFD", borderBottom: "1px solid #F3F2F6" }}>
            <ChevronDown size={15} strokeWidth={2} color="#4B5563" />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#111111" }}>Unread</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 11.5, color: "#8A8F98" }}>1–8 of 8</span>
            <span style={{ display: "flex", alignItems: "center", gap: 2, color: "#C4C4C4" }}>
              <span style={{ fontSize: 14 }}>‹</span>
              <span style={{ fontSize: 14 }}>›</span>
            </span>
            <MoreVertical size={15} strokeWidth={1.75} color="#8A8F98" />
          </div>

          {/* Rows */}
          <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            {rows.map((r, k) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 18px", borderBottom: "1px solid #F3F2F6", background: "#ffffff" }}>
                <span style={{ width: 15, height: 15, borderRadius: 4, border: "1.6px solid #C9C7D2", display: "block", flex: "0 0 auto", marginTop: 6 }} />
                <Star size={15} strokeWidth={1.75} color="#C9C7D2" style={{ flex: "0 0 auto", marginTop: 6 }} />
                <span style={{ width: 30, height: 30, borderRadius: 99, background: r.avBg, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{r.initials}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: r.unread ? 700 : 500, color: "#111111", whiteSpace: "nowrap" }}>{r.sender}</span>
                    {r.isNew && <span style={{ fontSize: 9.5, fontWeight: 700, color: "#fff", background: "#7C3AED", borderRadius: 5, padding: "2px 7px" }}>New</span>}
                  </div>
                  <div style={{ fontSize: 12.5, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <span style={{ color: r.unread ? "#111111" : "#4B5563", fontWeight: r.unread ? 600 : 400 }}>{r.subject}</span>
                    {r.preview && <span style={{ color: "#8A8F98" }}> {r.preview}</span>}
                  </div>
                  {r.attachments && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 6, padding: "3px 9px" }}>
                        <Paperclip size={11} strokeWidth={2} /> {r.attachments.length} attachments
                      </span>
                      {r.attachments.map((a) => (
                        <AttachmentChip key={a.name} name={a.name} kind={a.kind} />
                      ))}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: 11.5, fontWeight: r.unread ? 700 : 400, color: r.unread ? "#111111" : "#8A8F98", flex: "0 0 auto", marginTop: 4 }}>{r.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compose panel — only shown when Compose is open. Hidden by default;
            the interactivity pass will toggle `composeOpen` on Compose click. */}
        {composeOpen && (
        <div style={{ position: "absolute", right: 26, bottom: 0, width: 360, background: "#ffffff", border: "1px solid #E9E7F0", borderRadius: "16px 16px 0 0", boxShadow: "0 -2px 8px rgba(17,17,17,.05),0 -26px 60px rgba(17,17,17,.18)", overflow: "hidden", zIndex: 5 }}>
          <div style={{ height: 44, background: "#111111", color: "#ffffff", display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13.5, fontWeight: 600, justifyContent: "space-between" }}>
            <span>New message</span>
            <span style={{ color: "#9CA3AF", fontSize: 12 }}>— ⤢ ✕</span>
          </div>
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 11 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", borderBottom: "1px solid #F0EFF4", paddingBottom: 9 }}>
              <span style={{ fontSize: 12, color: "#9CA3AF", width: 30 }}>To</span>
              <span style={{ fontSize: 13, color: "#111111" }}>priya.raman@northwind.co.uk</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", borderBottom: "1px solid #F0EFF4", paddingBottom: 9 }}>
              <span style={{ fontSize: 12, color: "#9CA3AF", width: 46 }}>Subject</span>
              <span style={{ fontSize: 13, color: "#111111", fontWeight: 600 }}>Q3 rollout — revised timeline</span>
            </div>
            <div style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.7, minHeight: 80 }}>
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
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "10px 22px" }}>
                <Send size={13} strokeWidth={2} /> Send
              </span>
              <Paperclip size={15} strokeWidth={1.75} color="#9CA3AF" />
              <Smile size={15} strokeWidth={1.75} color="#9CA3AF" />
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11.5, color: "#A9A7B2" }}>Draft saved 12:41</span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
