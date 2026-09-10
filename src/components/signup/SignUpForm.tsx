"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { icons } from "@/lib/assets";
import type { PlanDef } from "@/lib/plans";

/**
 * Right-hand sign-up form. Working inputs (controlled), password reveal toggle,
 * country + phone-code selects. The selected plan drives the plan card header
 * and the CTA label ("Sign up to <product>"). Design-system styling throughout.
 */

const countries = [
  { name: "Nigeria", code: "+234" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Ghana", code: "+233" },
  { name: "Kenya", code: "+254" },
  { name: "South Africa", code: "+27" },
  { name: "Canada", code: "+1" },
  { name: "Germany", code: "+49" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  height: 46,
  border: "1px solid #E5E3EA",
  borderRadius: 10,
  padding: "0 14px",
  fontSize: 13.5,
  color: "#111111",
  fontFamily: "inherit",
  outline: "none",
  background: "#ffffff",
};

export default function SignUpForm({ plan }: { plan: PlanDef }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const dialCode = countries.find((c) => c.name === country)?.code ?? "+234";

  return (
    <div style={{ background: "#F7F7F8", padding: "clamp(28px,3vw,44px)", display: "flex", flexDirection: "column" }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image src={icons.snaarpMark} alt="Snaarp" width={22} height={22} style={{ width: 22, height: 22 }} />
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#111111" }}>Snaarp</span>
      </div>

      <h1 style={{ margin: 0, fontSize: "clamp(24px,2.6vw,30px)", fontWeight: 800, color: "#111111", letterSpacing: "-.02em" }}>
        Sign up for Snaarp
      </h1>
      <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.5, color: "#4B5563", maxWidth: 420 }}>
        One Snaarp account for Mail, Docs, Sheet, CRM, and everything else.
      </p>

      {/* Card */}
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ marginTop: 20, background: "#ffffff", border: "1px solid #EEECF3", borderRadius: 18, boxShadow: "0 1px 2px rgba(17,17,17,.03),0 12px 30px rgba(17,17,17,.06)", padding: "clamp(20px,2vw,28px)" }}
      >
        {/* Selected plan header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", color: "#8A8F98" }}>SELECTED PLAN</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <Image src={plan.icon} alt="" width={32} height={32} style={{ width: 32, height: 32, borderRadius: 9 }} />
            <span style={{ fontSize: 14.5, fontWeight: 700, color: "#111111" }}>{plan.name}</span>
          </span>
        </div>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#111111" }}>
            {plan.tier} {plan.price}
            <span style={{ fontSize: 13, fontWeight: 500, color: "#8A8F98" }}>/{plan.cadence}</span>
          </div>
          <div style={{ fontSize: 12.5, color: "#8A8F98", marginTop: 4 }}>{plan.detail}</div>
        </div>

        {/* Name row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <input type="text" value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First Name" style={inputStyle} />
          <input type="text" value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last Name" style={inputStyle} />
        </div>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Company Email Address" style={{ ...inputStyle, marginBottom: 12 }} />
        <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Organization Name" style={{ ...inputStyle, marginBottom: 12 }} />

        {/* Country */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", MozAppearance: "none", paddingRight: 40, cursor: "pointer" }}
          >
            {countries.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          <ChevronDown size={16} strokeWidth={2} color="#8A8F98" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        </div>

        {/* Phone row */}
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, marginBottom: 12 }}>
          <input type="text" value={dialCode} readOnly aria-label="Country dialing code" style={{ ...inputStyle, color: "#4B5563", background: "#F7F7F8" }} />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" style={inputStyle} />
        </div>

        {/* Password */}
        <div style={{ position: "relative", marginBottom: 22 }}>
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ ...inputStyle, paddingRight: 44 }}
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? "Hide password" : "Show password"}
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", padding: 0, cursor: "pointer", color: "#9CA3AF", display: "flex" }}
          >
            {showPw ? <EyeOff size={17} strokeWidth={1.75} /> : <Eye size={17} strokeWidth={1.75} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="transition-transform hover:-translate-y-0.5"
          style={{
            width: "100%",
            height: 52,
            border: "none",
            borderRadius: 12,
            background: "linear-gradient(90deg,#A78BFA 0%,#7C3AED 100%)",
            color: "#ffffff",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 8px 22px rgba(124,58,237,.30)",
          }}
        >
          Sign up to {plan.name}
        </button>
      </form>
    </div>
  );
}
