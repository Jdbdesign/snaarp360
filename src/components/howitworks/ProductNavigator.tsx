"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { icons, productIcon } from "@/lib/assets";

/**
 * Left-panel product & feature navigator for the "How It Works" page.
 *
 * Single-product view: a dropdown picks which product's module is shown
 * below (defaults to Single Sign-In). The parent (TourPanel) owns which
 * product is active and per-product feature completion, so it can
 * auto-advance the dropdown to the next product once the current one's
 * features are all ticked off. Keeping only one module on screen at a time
 * (dropdown menu overlays, doesn't push layout) is what keeps the sidebar's
 * height fixed regardless of which product is selected.
 *
 * Design system: 36×36 violet icon chip, 16px card radius, white + violet-
 * tinted border, muted #8A8F98 progress text, Poppins.
 */

export interface ProductDef {
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

/** A live search match — either a whole product or one of its features. */
type SearchResult =
  | { type: "product"; product: ProductDef }
  | { type: "feature"; product: ProductDef; featureIndex: number; feature: string };

/** Bolds the part of `text` that matches `query` (case-insensitive), for the
 * live search results — makes it visible which letters typed produced the
 * suggestion. */
function highlightMatch(text: string, query: string) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <strong style={{ fontWeight: 700, color: "#7C3AED" }}>{text.slice(i, i + query.length)}</strong>
      {text.slice(i + query.length)}
    </>
  );
}

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
  /** Which product's module is currently shown. */
  activeProduct: string;
  onSelectProduct: (key: string) => void;
  /** Completed feature indices per product key. */
  completed: Record<string, Set<number>>;
  /**
   * User clicked a feature row — jump the mockup to that feature so they can
   * try it directly, regardless of order or completion state.
   */
  onSelectFeature?: (productKey: string, featureIndex: number) => void;
}

export default function ProductNavigator({ activeProduct, onSelectProduct, completed, onSelectFeature }: ProductNavigatorProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Last feature row clicked per product — gives it the same "currently
  // viewing this" background the Mail app itself uses for its active Inbox
  // row, so a user revisiting a finished module can see which entry they
  // last opened, not just its checkmark.
  const [activeFeatureByProduct, setActiveFeatureByProduct] = useState<Record<string, number>>({});
  const product = tourProducts.find((p) => p.key === activeProduct) ?? tourProducts[0];
  const doneSet = completed[product.key] ?? new Set<number>();
  const doneCount = doneSet.size;

  // Live, real-time search across every product's name AND its individual
  // features/modules — not just whichever product the dropdown has active.
  const query = searchQuery.trim();
  const searchResults = useMemo<SearchResult[]>(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];
    for (const p of tourProducts) {
      if (p.name.toLowerCase().includes(q)) results.push({ type: "product", product: p });
      p.features.forEach((feature, featureIndex) => {
        if (feature.toLowerCase().includes(q)) results.push({ type: "feature", product: p, featureIndex, feature });
      });
    }
    return results;
  }, [query]);

  const selectResult = (result: SearchResult) => {
    onSelectProduct(result.product.key);
    if (result.type === "feature") {
      setActiveFeatureByProduct((prev) => ({ ...prev, [result.product.key]: result.featureIndex }));
      onSelectFeature?.(result.product.key, result.featureIndex);
    }
    setSearchQuery("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Live search — filters products and features in real time as you type */}
      <div style={{ flex: "0 0 auto", paddingBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 42, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", padding: "0 14px" }}>
          <Search size={15} strokeWidth={1.75} color="#9CA3AF" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim()) setMenuOpen(false);
            }}
            placeholder="Search products"
            aria-label="Search products and features"
            style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#111111", fontFamily: "inherit" }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", color: "#9CA3AF", padding: 0, flex: "0 0 auto" }}
            >
              <X size={15} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {query ? (
        /* Search results — every matching product or feature, across the
           whole catalogue, updating on every keystroke. */
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            borderRadius: 16,
            background: "#ffffff",
            border: "1px solid #EEECF3",
            padding: "6px 4px 6px 10px",
          }}
        >
          {searchResults.length === 0 ? (
            <div style={{ padding: "16px 10px", fontSize: 13, color: "#8A8F98" }}>No matches for &ldquo;{query}&rdquo;.</div>
          ) : (
            <ul className="snp-scroll" style={{ listStyle: "none", margin: 0, padding: "4px 6px 6px 0", display: "flex", flexDirection: "column", gap: 2, flex: 1, minHeight: 0, overflowY: "auto" }}>
              {searchResults.map((result) => {
                const key = result.type === "product" ? result.product.key : `${result.product.key}-${result.featureIndex}`;
                const pDoneSet = completed[result.product.key] ?? new Set<number>();
                return (
                  <li key={key} style={{ listStyle: "none" }}>
                    <button
                      type="button"
                      onClick={() => selectResult(result)}
                      className="snp-feature-row"
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, cursor: "pointer", transition: "background .15s ease", background: "transparent", border: "none", textAlign: "left", font: "inherit" }}
                    >
                      {result.type === "product" ? (
                        <>
                          <span style={{ width: 28, height: 28, borderRadius: 8, background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                            <Image src={result.product.icon} alt="" width={16} height={16} style={{ width: 16, height: 16, borderRadius: 4 }} />
                          </span>
                          <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{highlightMatch(result.product.name, query)}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#8A8F98", flex: "0 0 auto" }}>
                            {pDoneSet.size}/{result.product.features.length}
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle done={pDoneSet.has(result.featureIndex)} />
                          <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 13.5, color: pDoneSet.has(result.featureIndex) ? "#9CA3AF" : "#4B5563", textDecoration: pDoneSet.has(result.featureIndex) ? "line-through" : "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {highlightMatch(result.feature, query)}
                            </span>
                            <span style={{ fontSize: 11, color: "#A9A7B2", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{result.product.name}</span>
                          </span>
                        </>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <>
          {/* Product picker — a dropdown menu overlays on open, so it never
              pushes the layout and the sidebar's height stays fixed. */}
          <div style={{ position: "relative", flex: "0 0 auto", marginBottom: 10 }}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                minHeight: 60,
                borderRadius: 16,
                background: "#ffffff",
                border: "1px solid #E0D3FA",
                boxShadow: "0 1px 2px rgba(17,17,17,.03),0 10px 26px rgba(124,58,237,.10)",
                cursor: "pointer",
                textAlign: "left",
                font: "inherit",
              }}
            >
              <span style={{ width: 36, height: 36, borderRadius: 10, background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                <Image src={product.icon} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 6 }} />
              </span>
              <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, fontWeight: 600, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {product.name}
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: doneCount === product.features.length ? "#7C3AED" : "#8A8F98", flex: "0 0 auto", marginRight: 4 }}>
                {doneCount}/{product.features.length}
              </span>
              <span style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", color: "#8A8F98" }}>
                <ChevronDown size={18} strokeWidth={2} style={{ transform: menuOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
              </span>
            </button>

            {menuOpen && (
              <ul
                role="listbox"
                className="snp-scroll"
                style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 40, margin: 0, padding: 6, listStyle: "none", background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 16, boxShadow: "0 12px 32px rgba(17,17,17,.16)", maxHeight: 320, overflowY: "auto" }}
              >
                {tourProducts.map((p) => {
                  const pDoneCount = (completed[p.key] ?? new Set<number>()).size;
                  const isActive = p.key === product.key;
                  return (
                    <li key={p.key} style={{ listStyle: "none" }}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          onSelectProduct(p.key);
                          setMenuOpen(false);
                        }}
                        className="snp-feature-row"
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 10, background: isActive ? "#F3EDFF" : "transparent", border: "none", cursor: "pointer", textAlign: "left", font: "inherit" }}
                      >
                        <span style={{ width: 26, height: 26, borderRadius: 7, background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                          <Image src={p.icon} alt="" width={16} height={16} style={{ width: 16, height: 16, borderRadius: 4 }} />
                        </span>
                        <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 500, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {p.name}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: pDoneCount === p.features.length ? "#7C3AED" : "#8A8F98", flex: "0 0 auto" }}>
                          {pDoneCount}/{p.features.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Active product's module — feature checklist */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              borderRadius: 16,
              background: "#ffffff",
              border: "1px solid #EEECF3",
              padding: "6px 4px 6px 10px",
            }}
          >
            <ul className="snp-scroll" style={{ listStyle: "none", margin: 0, padding: "4px 6px 6px 0", display: "flex", flexDirection: "column", gap: 2, flex: 1, minHeight: 0, overflowY: "auto" }}>
              {product.features.map((f, fi) => {
                const done = doneSet.has(fi);
                const isActive = activeFeatureByProduct[product.key] === fi;
                return (
                  <li key={f} style={{ listStyle: "none" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFeatureByProduct((prev) => ({ ...prev, [product.key]: fi }));
                        onSelectFeature?.(product.key, fi);
                      }}
                      className="snp-feature-row"
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, cursor: "pointer", transition: "background .15s ease", background: isActive ? "#F3EDFF" : "transparent", border: "none", textAlign: "left", font: "inherit" }}
                    >
                      <CheckCircle done={done} />
                      <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: isActive ? 600 : 400, color: isActive ? "#7C3AED" : done ? "#9CA3AF" : "#4B5563", textDecoration: done ? "line-through" : "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
