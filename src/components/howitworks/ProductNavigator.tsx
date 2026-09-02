import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { icons, productIcon } from "@/lib/assets";

/**
 * Left-panel product & feature navigator for the "How It Works" page.
 *
 * STATIC first pass only (no interactivity): renders the accordion list with
 * Snaarp Mail expanded (showing ALL its feature rows) and the rest collapsed.
 * Click handlers, checkbox state and progress logic come in a later pass.
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

// Feature sets mirror each product's interactive hero tile (see spec). Products
// with an existing interactive mockup are included; feature rows are never
// invented for products without a defined set.
const products: ProductDef[] = [
  { key: "mail", name: "Snaarp Mail", icon: icons.mail, features: ["Compose email", "Use AI composer", "Attach file or folder", "Set user preference view"] },
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

/** Empty circle affordance for a not-yet-completed feature row. */
function CheckCircle() {
  return (
    <span
      style={{
        width: 15,
        height: 15,
        borderRadius: 999,
        border: "1.5px solid #C9C7D2",
        flex: "0 0 auto",
        display: "block",
      }}
    />
  );
}

export default function ProductNavigator() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Sticky search / filter (stays pinned above the scrollable list) */}
      <div style={{ flex: "0 0 auto", paddingBottom: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 42,
            borderRadius: 999,
            background: "#F7F7F7",
            border: "1px solid #EFEFEF",
            padding: "0 14px",
          }}
        >
          <Search size={15} strokeWidth={1.75} color="#9CA3AF" />
          <span style={{ fontSize: 13, color: "#A9A7B2" }}>Search products</span>
        </div>
      </div>

      {/* Scrollable accordion list */}
      <div className="snp-scroll" style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 8 }}>
        {products.map((p) => {
          const expanded = p.key === "mail"; // static: only Mail open
          return (
            <div
              key={p.key}
              className={expanded ? undefined : "snp-accordion-card"}
              style={{
                borderRadius: 16,
                background: expanded ? "#ffffff" : "#F7F7F7",
                border: expanded ? "1px solid #E0D3FA" : "1px solid transparent",
                boxShadow: expanded
                  ? "0 1px 2px rgba(17,17,17,.03),0 10px 26px rgba(124,58,237,.10)"
                  : "none",
                overflow: "visible",
                flex: "0 0 auto",
                transition: "background .15s ease",
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", minHeight: 60 }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#F3E8FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "0 0 auto",
                  }}
                >
                  <Image src={p.icon} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 6 }} />
                </span>
                <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {p.name}
                </span>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "#8A8F98", flex: "0 0 auto", marginRight: 4 }}>
                  0/{p.features.length}
                </span>
                <span style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", color: "#8A8F98" }}>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .2s ease" }}
                  />
                </span>
              </div>

              {/* Expanded feature rows (Mail only) — auto-sizes to fit all rows */}
              {expanded && (
                <ul style={{ listStyle: "none", margin: 0, padding: "0 10px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
                  {p.features.map((f) => (
                    <li key={f} className="snp-feature-row" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, cursor: "pointer", transition: "background .15s ease" }}>
                      <CheckCircle />
                      <span style={{ fontSize: 13.5, color: "#4B5563" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
