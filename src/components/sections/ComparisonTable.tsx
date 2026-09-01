import { compareRows } from "@/lib/data";

/** "Competitive Landscape" — data-driven comparison grid vs 4 competitors. */

function CheckIcon({ fill }: { fill: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="10" fill={fill} />
      <path d="M5.8 10.4 L8.6 13.1 L14.2 7.3" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="10" fill="#DC2626" />
      <path d="M6.9 6.9 L13.1 13.1 M13.1 6.9 L6.9 13.1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function ComparisonTable() {
  const cols = "1.7fr repeat(5,1fr)";
  const competitors = ["Microsoft 365", "Google Workspace", "Zoho One", "Odoo"];

  return (
    <section id="compare" style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px" }}>
      <div data-reveal="0" style={{ textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 700, color: "#111111", letterSpacing: "-.025em" }}>
          Competitive Landscape
        </h2>
        <p style={{ margin: "12px 0 0", fontSize: 15.5, color: "#4B5563" }}>
          20+ business apps. One platform. One subscription.
        </p>
      </div>

      <div
        data-reveal="80"
        style={{
          marginTop: 34,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid #EEECF3",
          boxShadow: "0 1px 2px rgba(17,17,17,.04),0 14px 40px rgba(17,17,17,.06)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 880 }}>
            <div style={{ display: "grid", gridTemplateColumns: cols, background: "#111111" }}>
              <span style={{ padding: "16px 20px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".06em", color: "#ffffff" }}>Business capability</span>
              <span style={{ padding: "16px 8px", fontSize: 11.5, fontWeight: 700, color: "#ffffff", textAlign: "center", background: "#7C3AED" }}>Snaarp 360</span>
              {competitors.map((c) => (
                <span key={c} style={{ padding: "16px 8px", fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,.8)", textAlign: "center" }}>{c}</span>
              ))}
            </div>

            {compareRows.map((r) => (
              <div key={r.label} style={{ display: "grid", gridTemplateColumns: cols, alignItems: "stretch", borderBottom: "1px solid #F2F1F6", background: r.zebra }}>
                <span style={{ padding: "13px 20px", fontSize: 13, fontWeight: 500, color: "#111111", display: "flex", alignItems: "center" }}>{r.label}</span>
                <span style={{ padding: "13px 8px", display: "flex", alignItems: "center", justifyContent: "center", background: "#F3EDFF", borderLeft: "1px solid #E7DDFC", borderRight: "1px solid #E7DDFC" }}>
                  {r.s.yes && <CheckIcon fill="#7C3AED" />}
                  {r.s.txt && <span style={{ fontSize: 13, fontWeight: 700, color: "#7C3AED", textAlign: "center" }}>{r.s.txt}</span>}
                </span>
                {r.o.map((c, k) => (
                  <span key={k} style={{ padding: "13px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {c.yes && <CheckIcon fill="#16A34A" />}
                    {c.no && <CrossIcon />}
                    {c.txt && <span style={{ fontSize: 12.5, color: "#4B5563", textAlign: "center" }}>{c.txt}</span>}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
