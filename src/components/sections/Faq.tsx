"use client";

import { useState } from "react";
import { faqData } from "@/lib/data";

/**
 * FAQ accordion — single-open-at-a-time. Matches the source: the first item
 * (index 0) is open initially; clicking an open item closes it (state -1).
 */
export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px" }}>
      <div data-reveal="0" style={{ textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 700, color: "#111111", letterSpacing: "-.025em" }}>
          Questions, answered
        </h2>
        <p style={{ margin: "12px 0 0", fontSize: 15.5, color: "#4B5563" }}>
          Everything people usually ask before switching.
        </p>
      </div>

      <div data-reveal="80" style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 12 }}>
        {faqData.map(([q, a], k) => {
          const isOpen = open === k;
          return (
            <div key={k} style={{ background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 2px rgba(17,17,17,.03)" }}>
              <div
                onClick={() => setOpen(isOpen ? -1 : k)}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 22px", cursor: "pointer" }}
              >
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "#111111" }}>{q}</span>
                <span style={{ flex: "0 0 auto", width: 26, height: 26, borderRadius: 99, background: "#F3EDFF", color: "#7C3AED", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                  {isOpen ? "−" : "+"}
                </span>
              </div>
              {isOpen && (
                <p style={{ margin: 0, padding: "0 22px 22px", fontSize: 14, lineHeight: 1.72, color: "#4B5563", textWrap: "pretty" }}>{a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
