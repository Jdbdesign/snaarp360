import Image from "next/image";
import { icons } from "@/lib/assets";

/**
 * Site footer ported from the standalone bundle's <footer>.
 * `style-hover` link treatments are reproduced with real hover utilities.
 */

const footerCols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "PRODUCT",
    links: [
      { label: "Snaarp Mail", href: "#replace" },
      { label: "Snaarp Meet", href: "#replace" },
      { label: "Snaarp CRM", href: "#replace" },
      { label: "Snaarp Drive", href: "#replace" },
      { label: "Snaarp Books", href: "#replace" },
      { label: "All apps", href: "#replace" },
    ],
  },
  {
    title: "SOLUTIONS",
    links: [
      { label: "Startups", href: "#features" },
      { label: "Agencies", href: "#features" },
      { label: "Professional services", href: "#features" },
      { label: "Retail & e-commerce", href: "#features" },
      { label: "Non-profits", href: "#features" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Help centre", href: "#faq" },
      { label: "Migration guides", href: "#faq" },
      { label: "Compare platforms", href: "#compare" },
      { label: "Security & trust", href: "#faq" },
      { label: "Status", href: "#faq" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#top" },
      { label: "Careers", href: "#top" },
      { label: "Partners", href: "#top" },
      { label: "Contact", href: "#top" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy policy", href: "#top" },
      { label: "Terms of service", href: "#top" },
      { label: "Data processing", href: "#top" },
      { label: "Cookies", href: "#top" },
    ],
  },
];

export default function Footer() {
  const link = "text-[13.5px] text-[#C8C6D0] transition-colors hover:text-white";
  const social =
    "w-9 h-9 rounded-full border border-[#2C2A33] text-[#C8C6D0] text-xs font-semibold flex items-center justify-center transition-colors hover:!border-[#7C3AED] hover:text-white";

  return (
    <footer style={{ background: "#111111", padding: "clamp(48px,6vw,76px) 0 0" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 36,
        }}
      >
        <div style={{ gridColumn: "span 2", minWidth: 240 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Image
              src={icons.snaarp}
              alt="Snaarp"
              width={28}
              height={28}
              style={{ width: 28, height: 28, borderRadius: 9 }}
            />
            <span style={{ fontSize: 17, fontWeight: 700, color: "#ffffff", letterSpacing: "-.02em" }}>
              Snaarp
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#ffffff",
                background: "#7C3AED",
                borderRadius: 999,
                padding: "3px 8px",
              }}
            >
              360
            </span>
          </div>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 13.5,
              lineHeight: 1.7,
              color: "#8E8B98",
              maxWidth: 290,
            }}
          >
            20+ business apps on one subscription. Built for growing teams who
            would rather run their business than manage their software.
          </p>
          <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
            {["in", "X", "▶", "f"].map((s, idx) => (
              <a key={idx} href="#top" className={social}>
                {s}
              </a>
            ))}
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".12em",
                color: "#6B6875",
              }}
            >
              {col.title}
            </span>
            {col.links.map((l, idx) => (
              <a key={idx} href={l.href} className={link}>
                {l.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "clamp(36px,4vw,54px) auto 0",
          padding: "22px 24px 30px",
          borderTop: "1px solid #232128",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 12.5, color: "#6B6875" }}>
          © 2026 Snaarp 360 Ltd. All rights reserved. Registered in England &
          Wales.
        </span>
        <span style={{ fontSize: 12.5, color: "#6B6875" }}>
          All third-party trademarks are the property of their respective
          owners.
        </span>
      </div>
    </footer>
  );
}
