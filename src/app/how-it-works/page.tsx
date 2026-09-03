import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ComparisonTable from "@/components/sections/ComparisonTable";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import TourPanel from "@/components/howitworks/TourPanel";

export const metadata: Metadata = {
  title: "How It Works — Snaarp 360 Interactive Product Tour",
  description:
    "Every Snaarp app, live in your browser. Pick a product, try the real features, and check them off as you go — no demo video, no sales call.",
};

export default function HowItWorks() {
  return (
    <>
      <Header />

      {/* Page header */}
      <section
        data-reveal="0"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "clamp(48px,6vw,84px) 24px clamp(24px,3vw,36px)",
          textAlign: "center",
        }}
      >
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
          INTERACTIVE PRODUCT TOUR
        </span>
        <h1
          style={{
            margin: "22px 0 0",
            fontSize: "clamp(32px,4.6vw,56px)",
            lineHeight: 1.06,
            letterSpacing: "-.03em",
            fontWeight: 800,
            color: "#111111",
            textWrap: "balance",
          }}
        >
          Stop Watching. Start Clicking.
        </h1>
        <p
          style={{
            margin: "18px auto 0",
            maxWidth: 620,
            fontSize: 17,
            lineHeight: 1.6,
            color: "#4B5563",
            textWrap: "pretty",
          }}
        >
          Every Snaarp app, live in your browser. Pick a product, try the real
          features, and check them off as you go — no demo video, no sales call.
        </p>
      </section>

      {/* Interactive panel: left navigator + right live mockup */}
      <section
        data-reveal="0"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "clamp(12px,2vw,20px) 24px clamp(56px,7vw,90px)",
        }}
      >
        <TourPanel />
      </section>

      {/* Reused homepage sections */}
      <ComparisonTable />
      <Pricing />
      <Testimonials />

      <Footer />
      <ScrollReveal />
    </>
  );
}
