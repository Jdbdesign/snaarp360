import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productIcon } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Sign in — Snaarp",
  description:
    "One Snaarp account for Mail, Docs, Sheet, CRM, and everything else.",
};

/**
 * Snaarp unified sign-in landing page.
 *
 * Uses the standard site navigation (Header) and Footer:
 *   - Centered "Sign in" heading + subtitle.
 *   - A grid of Snaarp product tiles. Each product SVG is a self-contained
 *     violet rounded-square chip with a white glyph, so we render it directly
 *     at tile size with the label beneath.
 *
 * Product logos live under /public/assets/p (via productIcon()).
 */

interface AppTile {
  name: string;
  icon: string;
}

// Order mirrors the reference layout (7 per row).
const appTiles: AppTile[] = [
  { name: "Snaarp Mail", icon: productIcon("mail") },
  { name: "SnaarpMe", icon: productIcon("me") },
  { name: "Snaarp Lock", icon: productIcon("lock") },
  { name: "Snaarp Drive", icon: productIcon("drive") },
  { name: "Snaarp Sheet", icon: productIcon("sheet") },
  { name: "Snaarp PDF", icon: productIcon("pdf") },
  { name: "Snaarp Teams", icon: productIcon("teams") },

  { name: "Snaarp Meet", icon: productIcon("meet") },
  { name: "Snaarp Doc", icon: productIcon("document") },
  { name: "Snaarp Book", icon: productIcon("books") },
  { name: "Website Builder", icon: productIcon("website-builder") },
  { name: "Snaarp CRM", icon: productIcon("crm") },
  { name: "Neoleads", icon: productIcon("neoleads") },
  { name: "Zeus", icon: productIcon("zeus") },

  { name: "One CardX", icon: productIcon("identity") },
  { name: "Sendrit", icon: productIcon("sendrit") },
  { name: "Verifyrit", icon: productIcon("verifyrit") },
  { name: "Snaarp Slide", icon: productIcon("presentation") },
  { name: "Workforce", icon: productIcon("workforce") },
  { name: "Project Mgmt", icon: productIcon("project-management") },
];

export default function SignIn() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "inherit",
      }}
    >
      {/* Standard site navigation */}
      <Header />

      {/* Body */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "clamp(24px,4vw,48px) 24px clamp(48px,7vw,90px)",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(28px,3.4vw,36px)",
            fontWeight: 700,
            color: "#111111",
            letterSpacing: "-.02em",
            textAlign: "center",
          }}
        >
          Sign in
        </h1>
        <p
          style={{
            margin: "12px auto 0",
            maxWidth: 380,
            fontSize: 16,
            lineHeight: 1.5,
            color: "#8A8F98",
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          One Snaarp account for Mail, Docs, Sheet, CRM, and everything else.
        </p>

        {/* Product grid */}
        <div
          style={{
            marginTop: "clamp(32px,4vw,52px)",
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            columnGap: "clamp(20px,3vw,40px)",
            rowGap: "clamp(24px,3vw,40px)",
            maxWidth: 900,
            width: "100%",
          }}
        >
          {appTiles.map((app) => (
            <Link
              key={app.name}
              href="/how-it-works"
              className="snp-signin-tile"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 18,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(124,58,237,.20)",
                  transition: "transform .15s ease, box-shadow .15s ease",
                }}
              >
                <Image src={app.icon} alt={app.name} width={68} height={68} style={{ width: 68, height: 68, display: "block" }} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#111111", textAlign: "center", whiteSpace: "nowrap" }}>
                {app.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
