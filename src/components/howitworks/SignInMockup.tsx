"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import { icons, productIcon } from "@/lib/assets";

/**
 * Interactive Snaarp unified sign-in screen (How It Works tour, step 1).
 *
 * Guided flow:
 *   1. Red pulse cue starts on the Email field.
 *   2. When the typed email contains "com", the cue moves to the Password field.
 *   3. When the password is at least 3 chars, the cue moves to the Sign-in button.
 *   4. Clicking the button shows a ~2s loading state, then calls onSignedIn()
 *      (the parent swaps the mockup to Mail and checks off the SSO feature).
 *
 * Design system: primary #7C3AED, canvas #ffffff, ink/body/mute, 16px card
 * radius, pill button, hairline inputs, Poppins.
 */

const orbitLogos = [
  icons.mail,
  icons.teams,
  icons.me,
  icons.document,
  icons.sheet,
  productIcon("presentation"),
  icons.drive,
  icons.books,
];

type PulseTarget = "email" | "password" | "button" | null;

export default function SignInMockup({ onSignedIn }: { onSignedIn?: () => void }) {
  const RING = 200;
  const radius = RING / 2;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  // Derive the current pulse target from the flow state.
  const emailReady = email.toLowerCase().includes("com");
  const passwordReady = password.length >= 3;
  let pulse: PulseTarget = "email";
  if (emailReady && !passwordReady) pulse = "password";
  else if (emailReady && passwordReady) pulse = "button";
  if (loading) pulse = null;

  const inputBase: React.CSSProperties = {
    height: 40,
    borderRadius: 10,
    border: "1px solid #E5E3EA",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    gap: 8,
  };

  const handleSignIn = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignedIn?.();
    }, 2000);
  };

  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid #E7E4EF",
        boxShadow: "0 2px 6px rgba(17,17,17,.05),0 34px 80px rgba(17,17,17,.16)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser chrome */}
      <div style={{ height: 46, background: "#F7F7F7", borderBottom: "1px solid #EDEDED", display: "flex", alignItems: "center", padding: "0 16px", gap: 8, flex: "0 0 auto" }}>
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FF5F57", display: "block" }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FEBC2E", display: "block" }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#28C840", display: "block" }} />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ minWidth: 300, height: 26, borderRadius: 999, background: "#ffffff", border: "1px solid #E9E9E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>id.snaarp.com/signin</span>
          </div>
        </div>
      </div>

      {/* Split body */}
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* LEFT — violet orbit panel */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(150deg,#8B5CF6 0%,#7C3AED 55%,#6D28D9 100%)",
            padding: 28,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9, flex: "0 0 auto", zIndex: 2 }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src={icons.snaarpMark} alt="Snaarp" width={18} height={18} style={{ width: 18, height: 18 }} />
            </span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#ffffff" }}>Snaarp</span>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: RING, height: RING }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(255,255,255,.28)" }} />
              <div className="snp-orbit-ring" style={{ position: "absolute", inset: 0 }}>
                {orbitLogos.map((logo, i) => {
                  const angle = (i / orbitLogos.length) * 2 * Math.PI - Math.PI / 2;
                  const x = radius + radius * Math.cos(angle);
                  const y = radius + radius * Math.sin(angle);
                  return (
                    <span key={i} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", display: "block" }}>
                      <span className="snp-orbit-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 10, background: "#ffffff", boxShadow: "0 2px 8px rgba(17,17,17,.14)" }}>
                        <Image src={logo} alt="" width={22} height={22} style={{ width: 22, height: 22, borderRadius: 6 }} />
                      </span>
                    </span>
                  );
                })}
              </div>
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 58, height: 58, borderRadius: 16, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(17,17,17,.18)" }}>
                <Image src={icons.snaarpMark} alt="" width={34} height={34} style={{ width: 34, height: 34 }} />
              </div>
            </div>
          </div>

          <div style={{ flex: "0 0 auto", zIndex: 2 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", lineHeight: 1.25, letterSpacing: "-.01em" }}>
              One account. Every
              <br />
              Snaarp product.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 12, color: "rgba(255,255,255,.8)", fontSize: 12 }}>
              <ShieldCheck size={14} strokeWidth={1.75} />
              <span>Secured by Snaarp unified login</span>
            </div>
          </div>
        </div>

        {/* RIGHT — white sign-in form */}
        <div style={{ background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
          <div style={{ width: "100%", maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src={icons.snaarpMark} alt="Snaarp" width={20} height={20} style={{ width: 20, height: 20 }} />
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>Snaarp</span>
            </div>

            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#111111", letterSpacing: "-.02em" }}>Sign in</h2>
            <p style={{ margin: "8px 0 0", fontSize: 12.5, lineHeight: 1.5, color: "#4B5563" }}>
              One Snaarp account for Mail, Docs, Sheet, CRM, and everything else.
            </p>

            {/* Form card */}
            <div style={{ marginTop: 18, background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 16, boxShadow: "0 1px 2px rgba(17,17,17,.04),0 10px 26px rgba(17,17,17,.06)", padding: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#111111", marginBottom: 6 }}>Email</label>
              <div className={pulse === "email" ? "snp-pulse" : undefined} style={{ ...inputBase, marginBottom: 14, borderColor: pulse === "email" ? "#7C3AED" : "#E5E3EA" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={loading}
                  style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#111111", fontFamily: "inherit" }}
                />
              </div>

              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#111111", marginBottom: 6 }}>Password</label>
              <div className={pulse === "password" ? "snp-pulse" : undefined} style={{ ...inputBase, marginBottom: 16, borderColor: pulse === "password" ? "#7C3AED" : "#E5E3EA" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#111111", fontFamily: "inherit" }}
                />
                <button type="button" onClick={() => setShowPw((s) => !s)} style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", display: "flex", color: "#9CA3AF" }} aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff size={15} strokeWidth={1.75} /> : <Eye size={15} strokeWidth={1.75} />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                disabled={loading}
                className={pulse === "button" ? "snp-pulse" : undefined}
                style={{
                  width: "100%",
                  height: 42,
                  border: "none",
                  borderRadius: 999,
                  background: "#7C3AED",
                  color: "#ffffff",
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: loading ? "default" : "pointer",
                  boxShadow: "0 1px 2px rgba(17,17,17,.06),0 8px 18px rgba(124,58,237,.28)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} strokeWidth={2.5} className="snp-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in to Snaarp"
                )}
              </button>
            </div>

            <div style={{ textAlign: "center", fontSize: 11, color: "#8A8F98", marginTop: 16 }}>
              © 2026 Snaarp. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
