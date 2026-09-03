"use client";

import Image from "next/image";
import { Check, ChevronDown, Search } from "lucide-react";
import { icons, productIcon } from "@/lib/assets";

/**
 * Left-panel product & feature navigator for the "How It Works" page.
 *
 * Controlled component: the parent (TourPanel) owns expand state and
 * per-product feature completion, so the guided flow can auto-open products and
 * tick off completed features (violet check + progress badge count).
 *
 * Design system: 36×36 violet icon chip, 16px card radius, #F7F7F7 collapsed /
 * white + violet-tinted border expanded, muted #8A8F98 progress text, Poppins.
 */

interface ProductDef {
  key: string;
  name: string;
  icon: string;
  features: string[];
}

export const tourProducts: ProductDef[] = [
  { key: "sso", name: "Snaarp Single Sign-In", icon: icons.snaarpMark, features: ["Sign in into Snaarp products with a single sign-in."] },
  { key: "mail", name: "Snaarp Mail", icon: icons.mail, features: ["Compose email", "Use AI composer", "Attach file or folder", "Set user preference view", "View all snaarp products", "Inbox type", "Undo Send", "Add new account", "Switch account", "Add e-signature"] },
  { key: "meet", name: "Snaarp Meet", icon: icons.meet, features: ["Mic/camera toggle", "Screen share", "Chat panel", "Participants panel", "Raise hand"] },
  { key: "teams", name: "Snaarp Teams", icon: icons.teams, features: ["Send message", "Channel switching", "Thread reply", "File attachment preview", "Emoji reactions", "Calls"] },
  { key: "me", name: "Snaarp Me", icon: icons.me, features: ["New Event Type", "View Meeting Detail + Copy Link"] },
  { key: "lock", name: "Snaarp Lock", icon: icons.lock, features: ["Add Password", "Reveal + Copy", "Lock/Unlock", "Security Alerts", "Item Detail"] },
  { key: "drive", name: "Snaarp Drive", icon: icons.drive, features: ["Upload", "Preview", "Share Link", "Grid ↔ List", "Folder nav"] },
  { key: "sheet", name: "Snaarp Sheet", icon: icons.sheet, features: ["Cell edit / recalc", "Add Row", "Tab switching"] },
  { key: "document", name: "Snaarp Document", icon: icons.document, features: ["Ambient collaborator", "Add Comment", "Share modal", "Toolbar formatting", "Insert Image"] },
  { key: "presentation", name: "Snaarp Presentation", icon: productIcon("presentation"), features: ["Slide nav", "Add Slide", "Present mode", "Layout switching", "Speaker notes", "Share"] },
  { key: "crm", name: "Snaarp CRM", icon: icons.crm, features: ["Move deal stage", "Add new deal", "Filter pipeline", "View weighted value"] },
  { key: "books", name: "Snaarp Books", icon: icons.books, features: ["View receivables", "View payables", "Cash flow chart", "Account watchlist"] },
  { key: "identity", name: "Snaarp Identity", icon: icons.identity, features: ["View ID card", "Card details", "Directory nav", "New card"] },
];

/** Circle affordance: empty (pending) or violet-filled check (completed). */
function CheckCircle({ done }: { done: boolean }) {
  if (done) {
    return (
      <span style={{ width: 16, height: 16, borderRadius: 999, background: "#7C3AED", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Check size={11} strokeWidth={3} color="#ffffff" />
      </span>
    );
  }
  return <span style={{ width: 15, height: 15, borderRadius: 999, border: "1.5px solid #C9C7D2", flex: "0 0 auto", display: "block" }} />;
}

export interface ProductNavigatorProps {
  /** Which cards are expanded. */
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  /** Completed feature indices per product key. */
  completed: Record<string, Set<number>>;
  /**
   * User clicked a feature row — jump the mockup to that feature so they can
   * try it directly, regardless of order or completion state.
   */
  onSelectFeature?: (productKey: string, featureIndex: number) => void;
}

export default function ProductNavigator({ expanded, onToggle, completed, onSelectFeature }: ProductNavigatorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Sticky search / filter */}
      <div style={{ flex: "0 0 auto", paddingBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 42, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", padding: "0 14px" }}>
          <Search size={15} strokeWidth={1.75} color="#9CA3AF" />
          <span style={{ fontSize: 13, color: "#A9A7B2" }}>Search products</span>
        </div>
      </div>

      {/* Scrollable accordion list */}
      <div className="snp-scroll" style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 8 }}>
        {tourProducts.map((p) => {
          const isOpen = !!expanded[p.key];
          const doneSet = completed[p.key] ?? new Set<number>();
          const doneCount = doneSet.size;
          return (
            <div
              key={p.key}
              className={isOpen ? undefined : "snp-accordion-card"}
              style={{
                borderRadius: 16,
                background: isOpen ? "#ffffff" : "#F7F7F7",
                border: isOpen ? "1px solid #E0D3FA" : "1px solid transparent",
                boxShadow: isOpen ? "0 1px 2px rgba(17,17,17,.03),0 10px 26px rgba(124,58,237,.10)" : "none",
                overflow: "visible",
                flex: "0 0 auto",
                transition: "background .15s ease",
              }}
            >
              {/* Header row — whole header toggles this card */}
              <button
                type="button"
                onClick={() => onToggle(p.key)}
                aria-expanded={isOpen}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", minHeight: 60, background: "transparent", border: "none", cursor: "pointer", textAlign: "left", font: "inherit" }}
              >
                <span style={{ width: 36, height: 36, borderRadius: 10, background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                  <Image src={p.icon} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 6 }} />
                </span>
                <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {p.name}
                </span>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: doneCount === p.features.length ? "#7C3AED" : "#8A8F98", flex: "0 0 auto", marginRight: 4 }}>
                  {doneCount}/{p.features.length}
                </span>
                <span style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", color: "#8A8F98" }}>
                  <ChevronDown size={18} strokeWidth={2} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
                </span>
              </button>

              {/* Expanded feature rows — scrollable so long lists stay compact */}
              {isOpen && (
                <ul className="snp-scroll" style={{ listStyle: "none", margin: 0, padding: "0 10px 12px", display: "flex", flexDirection: "column", gap: 2, maxHeight: 232, overflowY: "auto" }}>
                  {p.features.map((f, fi) => {
                    const done = doneSet.has(fi);
                    return (
                      <li key={f} style={{ listStyle: "none" }}>
                        <button
                          type="button"
                          onClick={() => onSelectFeature?.(p.key, fi)}
                          className="snp-feature-row"
                          style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, cursor: "pointer", transition: "background .15s ease", background: "transparent", border: "none", textAlign: "left", font: "inherit" }}
                        >
                          <CheckCircle done={done} />
                          <span style={{ fontSize: 13.5, color: done ? "#9CA3AF" : "#4B5563", textDecoration: done ? "line-through" : "none" }}>{f}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
