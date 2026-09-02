"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { icons } from "@/lib/assets";

/**
 * Sticky site header ported from the standalone bundle's <header>.
 * The original `style-hover` attributes are reproduced as real Tailwind
 * `hover:` utilities (nav link color -> #111111, CTA bg -> #6D28D9).
 * The active nav item (matched against the current route) gets the brand
 * colour + an underline indicator.
 */
export default function Header() {
  const pathname = usePathname();
  const navLink =
    "text-[14px] font-medium text-[#4B5563] transition-colors hover:text-[#111111]";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "rgba(255,255,255,.88)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #F0EEF4",
      }}
    >
      <div
        style={{
          // Match the hero's wider container so the nav's left/right edges
          // line up with the hero content below it.
          maxWidth: "var(--hero-max, var(--container-max))",
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <a
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 9, flex: "0 0 auto" }}
        >
          <Image
            src={icons.snaarp}
            alt="Snaarp"
            width={28}
            height={28}
            style={{ width: 28, height: 28, borderRadius: 9 }}
          />
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#111111",
              letterSpacing: "-.02em",
            }}
          >
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
              letterSpacing: ".04em",
            }}
          >
            360
          </span>
        </a>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            flex: "1 1 auto",
            flexWrap: "wrap",
          }}
        >
          <a href="#replace" className={navLink} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            Product
            <span style={{ fontSize: 9, color: "#9CA3AF" }}>▾</span>
          </a>
          <a href="#features" className={navLink} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            Solutions
            <span style={{ fontSize: 9, color: "#9CA3AF" }}>▾</span>
          </a>
          <a
            href="/how-it-works"
            aria-current={pathname === "/how-it-works" ? "page" : undefined}
            className={
              pathname === "/how-it-works"
                ? "text-[14px] font-semibold text-[#7C3AED] transition-colors"
                : navLink
            }
            style={
              pathname === "/how-it-works"
                ? { position: "relative", paddingBottom: 4, borderBottom: "2px solid #7C3AED" }
                : undefined
            }
          >
            How it works
          </a>
          <a href="#faq" className={navLink} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            Resources
            <span style={{ fontSize: 9, color: "#9CA3AF" }}>▾</span>
          </a>
          <a href="#pricing" className={navLink}>
            Pricing
          </a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "0 0 auto" }}>
          <a href="#top" style={{ fontSize: 14, fontWeight: 500, color: "#111111" }}>
            Log In
          </a>
          <a
            href="#pricing"
            className="transition-colors hover:!bg-[#6D28D9]"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              background: "#7C3AED",
              borderRadius: 999,
              padding: "11px 20px",
              boxShadow:
                "0 1px 2px rgba(17,17,17,.06),0 8px 20px rgba(124,58,237,.24)",
            }}
          >
            Get started for free
          </a>
        </div>
      </div>
    </header>
  );
}
