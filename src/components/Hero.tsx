import Image from "next/image";
import { icons } from "@/lib/assets";
import HeroDemo from "./HeroDemo";

/** Hero section: headline column + self-driving demo window. */

const heroIcons: [string, string][] = [
  [icons.mail, "Snaarp Mail"],
  [icons.meet, "Snaarp Meet"],
  [icons.teams, "Snaarp Teams"],
  [icons.me, "Snaarp Me"],
  [icons.lock, "Snaarp Lock"],
  [icons.drive, "Snaarp Drive"],
  [icons.sheet, "Snaarp Sheet"],
  [icons.document, "Snaarp Document"],
  [icons.crm, "Snaarp CRM"],
  [icons.books, "Snaarp Books"],
];

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        maxWidth: "var(--hero-max, var(--container-max))",
        margin: "0 auto",
        padding: "clamp(40px,6vw,76px) 24px clamp(32px,5vw,56px)",
        display: "grid",
        // Asymmetric columns: the demo (2nd) gets more width than the text so
        // the mockup renders larger. `minmax(0,...)` fr tracks keep it from
        // overflowing. On narrow screens the whole grid stacks (see below).
        gridTemplateColumns: "var(--hero-cols)",
        gap: "clamp(32px,4vw,56px)",
        alignItems: "center",
      }}
    >
      <div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#F3EDFF",
            color: "#7C3AED",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".12em",
            borderRadius: 999,
            padding: "8px 16px",
            whiteSpace: "nowrap",
          }}
        >
          ALL-IN-ONE BUSINESS PLATFORM
        </span>
        <h1
          style={{
            margin: "22px 0 0",
            fontSize: "clamp(34px,5.1vw,60px)",
            lineHeight: 1.03,
            letterSpacing: "-.03em",
            fontWeight: 800,
            color: "#111111",
            textWrap: "balance",
          }}
        >
          <span style={{ color: "#7C3AED" }}>20+</span> BUSINESS APPS.
          <br />
          ONE SUBSCRIPTION.
        </h1>
        <div style={{ marginTop: 26 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#9CA3AF" }}>STARTING FROM</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 2 }}>
            <span style={{ fontSize: "clamp(32px,4vw,44px)", fontWeight: 800, color: "#7C3AED", letterSpacing: "-.03em" }}>£15</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: "#111111" }}>/MONTH</span>
          </div>
        </div>
        <p
          style={{
            margin: "14px 0 0",
            fontSize: 17,
            lineHeight: 1.6,
            color: "#4B5563",
            maxWidth: 480,
            textWrap: "pretty",
          }}
        >
          Everything your business needs in one simple platform — mail,
          meetings, documents, CRM, accounting, HR and more, under a single flat
          subscription.
        </p>
        <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 12 }}>
          {/* Continuously-scrolling app-icon marquee (same technique as the
              trust bar): a masked, overflow-hidden track whose icons are
              duplicated so the -50% translate loops seamlessly. */}
          <div
            style={{
              flex: "1 1 auto",
              minWidth: 0,
              overflow: "hidden",
              WebkitMaskImage:
                "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
              maskImage:
                "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
            }}
          >
            <div style={{ display: "flex", gap: 10, width: "max-content", animation: "snpMarquee 22s linear infinite" }}>
              {[...heroIcons, ...heroIcons].map(([src, alt], k) => (
                <Image
                  key={`${alt}-${k}`}
                  src={src}
                  alt={alt}
                  title={alt}
                  width={34}
                  height={34}
                  style={{ width: 34, height: 34, borderRadius: 10, flex: "0 0 auto" }}
                />
              ))}
            </div>
          </div>
          <span style={{ flex: "0 0 auto", fontSize: 12, fontWeight: 600, color: "#6B7280", background: "#F7F7F7", border: "1px solid #EDEDED", borderRadius: 999, padding: "7px 12px", whiteSpace: "nowrap" }}>
            +10 more
          </span>
        </div>
        <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a
            href="#pricing"
            className="transition-colors hover:!bg-[#6D28D9]"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#ffffff",
              background: "#7C3AED",
              borderRadius: 999,
              padding: "15px 28px",
              whiteSpace: "nowrap",
              boxShadow: "0 1px 2px rgba(17,17,17,.06),0 12px 28px rgba(124,58,237,.28)",
            }}
          >
            Start 14-days Free Trial
          </a>
          <a
            href="#workflow"
            className="transition-colors hover:!border-[#7C3AED] hover:!text-[#7C3AED]"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#111111",
              background: "#ffffff",
              border: "1px solid #E5E3EA",
              borderRadius: 999,
              padding: "15px 26px",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 99, background: "#7C3AED", display: "inline-block" }} />
            Book a Demo
          </a>
        </div>
      </div>

      <HeroDemo />
    </section>
  );
}
