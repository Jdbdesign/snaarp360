import type { Metadata } from "next";
import Header from "@/components/Header";
import SignUpForm from "@/components/signup/SignUpForm";
import SignUpOrbit from "@/components/signup/SignUpOrbit";
import { productIcon } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Sign up — Snaarp",
  description:
    "Create your Snaarp account. One account for Mail, Docs, Sheet, CRM, and everything else.",
};

/**
 * Catalogue of sign-up-able products. A product is chosen on the pricing page
 * and passed through as `?product=<key>` (defaults to Snaarp Drive, matching
 * the reference). Each entry drives the selected-plan card and CTA label.
 */
export interface PlanDef {
  key: string;
  name: string;
  icon: string;
  tier: string;
  price: string;
  cadence: string;
  detail: string;
}

export const plans: Record<string, PlanDef> = {
  drive: { key: "drive", name: "Snaarp Drive", icon: productIcon("drive"), tier: "Pro", price: "£25", cadence: "month", detail: "100 GB · Billed monthly · 14-day free trial included" },
  mail: { key: "mail", name: "Snaarp Mail", icon: productIcon("mail"), tier: "Pro", price: "£12", cadence: "month", detail: "50 GB mailbox · Billed monthly · 14-day free trial included" },
  sheet: { key: "sheet", name: "Snaarp Sheet", icon: productIcon("sheet"), tier: "Pro", price: "£15", cadence: "month", detail: "Unlimited sheets · Billed monthly · 14-day free trial included" },
  crm: { key: "crm", name: "Snaarp CRM", icon: productIcon("crm"), tier: "Growth", price: "£39", cadence: "month", detail: "10k contacts · Billed monthly · 14-day free trial included" },
  teams: { key: "teams", name: "Snaarp Teams", icon: productIcon("teams"), tier: "Pro", price: "£18", cadence: "month", detail: "Unlimited channels · Billed monthly · 14-day free trial included" },
  document: { key: "document", name: "Snaarp Doc", icon: productIcon("document"), tier: "Pro", price: "£14", cadence: "month", detail: "Unlimited docs · Billed monthly · 14-day free trial included" },
};

const features = [
  { title: "Unified Inbox", body: "Business email, shared mailboxes and aliases on your own domain." },
  { title: "Docs & Collaboration", body: "Write, comment and co-edit documents stored right beside your files." },
  { title: "Team Collaboration", body: "Channels, threads and video rooms that live beside your files." },
  { title: "Client Scheduling", body: "Shareable booking pages that write straight into your calendar." },
];

export default function SignUp({
  searchParams,
}: {
  searchParams?: { product?: string };
}) {
  const key = searchParams?.product ?? "drive";
  const plan = plans[key] ?? plans.drive;

  return (
    <>
      <Header />

      <main
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "clamp(20px,3vw,36px) 24px clamp(48px,6vw,80px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "var(--signup-cols)",
            gap: 0,
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid #ECEAF2",
            boxShadow: "0 2px 8px rgba(17,17,17,.05),0 30px 70px rgba(17,17,17,.10)",
            minHeight: 640,
          }}
        >
          {/* LEFT — violet orbit + features */}
          <div
            style={{
              position: "relative",
              background: "linear-gradient(155deg,#6D28D9 0%,#5B21B6 55%,#4C1D95 100%)",
              padding: "clamp(28px,3vw,40px)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <SignUpOrbit />

            {/* Features */}
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 16, zIndex: 2 }}>
              {features.map((f) => (
                <div key={f.title} style={{ display: "flex", gap: 12 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "rgba(255,255,255,.18)",
                      border: "1px solid rgba(255,255,255,.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "0 0 auto",
                      marginTop: 2,
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2l2.2 2.3L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}>{f.title}</div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "rgba(255,255,255,.78)" }}>{f.body}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.78)" }}>and many more…</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.6)", marginTop: 8 }}>© 2026 Snaarp. All rights reserved.</div>
            </div>
          </div>

          {/* RIGHT — sign-up form */}
          <SignUpForm plan={plan} />
        </div>
      </main>
    </>
  );
}
