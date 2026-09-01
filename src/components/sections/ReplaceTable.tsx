import Image from "next/image";
import { replaceRows } from "@/lib/data";

/** "What Snaarp Can Potentially Replace" — data-driven table. */
export default function ReplaceTable() {
  const cols = "minmax(210px,1fr) minmax(250px,1.35fr) minmax(320px,1.75fr)";

  return (
    <section
      id="replace"
      style={{
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "clamp(40px,5vw,64px) 24px clamp(56px,7vw,90px)",
      }}
    >
      <div data-reveal="0" style={{ textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 700, color: "#111111", letterSpacing: "-.025em" }}>
          What Snaarp Can Potentially Replace
        </h2>
        <p style={{ margin: "12px 0 0", fontSize: 15.5, color: "#4B5563" }}>
          18 business tools. One platform. One subscription.
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
          <div style={{ minWidth: 900 }}>
            <div style={{ display: "grid", gridTemplateColumns: cols, background: "#7C3AED" }}>
              {["SNAARP PRODUCT", "WHAT IT DOES", "SEPARATE PRODUCTS IT CAN POTENTIALLY REPLACE"].map((h) => (
                <span key={h} style={{ padding: "16px 22px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em", color: "#ffffff" }}>
                  {h}
                </span>
              ))}
            </div>
            {replaceRows.map((r) => (
              <div key={r.name} style={{ display: "grid", gridTemplateColumns: cols, alignItems: "center", borderBottom: "1px solid #F2F1F6", background: r.zebra }}>
                <div style={{ padding: "13px 22px", display: "flex", alignItems: "center", gap: 12 }}>
                  <Image src={r.icon} alt="" width={26} height={26} style={{ width: 26, height: 26, borderRadius: 8, flex: "0 0 auto" }} />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: "#111111" }}>{r.name}</span>
                </div>
                <div style={{ padding: "13px 22px", fontSize: 13, color: "#4B5563", lineHeight: 1.5 }}>{r.does}</div>
                <div style={{ padding: "13px 22px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
                  {r.comps.map((c, k) =>
                    c.img ? (
                      <img key={k} src={c.img} alt={c.alt} title={c.alt} style={{ height: 30, width: "auto", maxWidth: 110, objectFit: "contain" }} />
                    ) : (
                      <span key={k} style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", background: "#F3F4F6", border: "1px solid #E9E8EE", borderRadius: 999, padding: "5px 11px", whiteSpace: "nowrap" }}>
                        {c.txt}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
