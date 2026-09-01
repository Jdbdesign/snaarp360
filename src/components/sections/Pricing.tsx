/** Pricing tiers + "grow" row + trust badges. People icons are inline SVG. */

// Each pricing tier's "people" icon is a distinct inline SVG (1..6 figures).
function People1() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="#7C3AED">
      <circle cx="12" cy="7.2" r="4.3" />
      <path d="M3.4 20.6c0-4.4 3.9-7.3 8.6-7.3s8.6 2.9 8.6 7.3z" />
    </svg>
  );
}
function People2() {
  return (
    <svg width="46" height="34" viewBox="0 0 34 24" fill="#7C3AED">
      <circle cx="10.5" cy="7.6" r="3.9" />
      <path d="M2.6 20.6c0-4.1 3.5-6.8 7.9-6.8s7.9 2.7 7.9 6.8z" />
      <circle cx="23.5" cy="7.6" r="3.9" />
      <path d="M15.6 20.6c0-4.1 3.5-6.8 7.9-6.8s7.9 2.7 7.9 6.8z" />
    </svg>
  );
}
function People3() {
  return (
    <svg width="56" height="34" viewBox="0 0 44 24" fill="#7C3AED">
      <circle cx="8" cy="8" r="3.6" />
      <path d="M1 20.6c0-3.8 3.2-6.3 7-6.3s7 2.5 7 6.3z" />
      <circle cx="22" cy="8" r="3.6" />
      <path d="M15 20.6c0-3.8 3.2-6.3 7-6.3s7 2.5 7 6.3z" />
      <circle cx="36" cy="8" r="3.6" />
      <path d="M29 20.6c0-3.8 3.2-6.3 7-6.3s7 2.5 7 6.3z" />
    </svg>
  );
}
function People5() {
  return (
    <svg width="66" height="34" viewBox="0 0 56 24" fill="#7C3AED">
      <circle cx="7" cy="8.4" r="3.3" />
      <path d="M0.6 20.6c0-3.5 2.9-5.8 6.4-5.8s6.4 2.3 6.4 5.8z" />
      <circle cx="21" cy="8.4" r="3.3" />
      <path d="M14.6 20.6c0-3.5 2.9-5.8 6.4-5.8s6.4 2.3 6.4 5.8z" />
      <circle cx="35" cy="8.4" r="3.3" />
      <path d="M28.6 20.6c0-3.5 2.9-5.8 6.4-5.8s6.4 2.3 6.4 5.8z" />
      <circle cx="49" cy="8.4" r="3.3" />
      <path d="M42.6 20.6c0-3.5 2.9-5.8 6.4-5.8s6.4 2.3 6.4 5.8z" />
    </svg>
  );
}
function People6() {
  return (
    <svg width="76" height="34" viewBox="0 0 68 24" fill="#7C3AED">
      <circle cx="6.5" cy="8.8" r="3.1" />
      <path d="M0.5 20.6c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4z" />
      <circle cx="20.5" cy="8.8" r="3.1" />
      <path d="M14.5 20.6c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4z" />
      <circle cx="34.5" cy="8.8" r="3.1" />
      <path d="M28.5 20.6c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4z" />
      <circle cx="48.5" cy="8.8" r="3.1" />
      <path d="M42.5 20.6c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4z" />
      <circle cx="62.5" cy="8.8" r="3.1" />
      <path d="M56.5 20.6c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4z" />
    </svg>
  );
}

const badgeCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #EDEBF2",
  borderRadius: 16,
  padding: "24px 18px 26px",
  textAlign: "center",
  boxShadow: "0 1px 2px rgba(17,17,17,.04),0 10px 26px rgba(17,17,17,.06)",
};

const priceLabelStyle: React.CSSProperties = {
  marginTop: 16,
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: ".08em",
  color: "#111111",
};
const priceStyle: React.CSSProperties = {
  marginTop: 8,
  fontSize: 38,
  fontWeight: 800,
  color: "#111111",
  letterSpacing: "-.035em",
  lineHeight: 1,
};
const perMonthStyle: React.CSSProperties = {
  marginTop: 10,
  display: "inline-block",
  fontSize: 12.5,
  fontWeight: 600,
  color: "#111111",
  borderBottom: "3px solid #7C3AED",
  paddingBottom: 3,
};

function TrustBadgeIcon({ kind }: { kind: "users" | "check" | "cross" | "clock" }) {
  if (kind === "users") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#7C3AED">
        <circle cx="9" cy="7.4" r="3.6" />
        <path d="M2 20.4c0-3.9 3.2-6.4 7-6.4s7 2.5 7 6.4z" />
        <circle cx="18" cy="7.4" r="2.8" />
      </svg>
    );
  }
  if (kind === "check") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8.6" fill="none" stroke="#7C3AED" strokeWidth="1.8" />
        <path d="M6.2 10.2 L8.9 12.9 L13.9 7.3" stroke="#7C3AED" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "cross") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8.6" fill="none" stroke="#7C3AED" strokeWidth="1.8" />
        <path d="M7 7 L13 13 M13 7 L7 13" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect x="2.2" y="3.4" width="15.6" height="11" rx="3" fill="none" stroke="#7C3AED" strokeWidth="1.8" />
      <path d="M6.4 14.4 L6.4 17.6 L10 14.4 Z" fill="#7C3AED" />
    </svg>
  );
}

const trustBadges: { kind: "users" | "check" | "cross" | "clock"; title: string; body: string; reveal: number }[] = [
  { kind: "users", title: "No per-user pricing", body: "One price for your whole team, at every tier.", reveal: 0 },
  { kind: "check", title: "No hidden fees", body: "Storage, support and updates are all included.", reveal: 60 },
  { kind: "cross", title: "Cancel anytime", body: "Monthly rolling. Export your data whenever you like.", reveal: 120 },
  { kind: "clock", title: "Priority support", body: "Real humans, UK business hours, under two hours.", reveal: 180 },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "clamp(56px,7vw,96px) 0" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" }}>
        <div data-reveal="0" style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 700, color: "#111111", letterSpacing: "-.025em" }}>
            Plans For Every Business Size
          </h2>
          <p style={{ margin: "12px 0 0", fontSize: 15.5, color: "#4B5563" }}>
            Flexible pricing that suits every business.
          </p>
        </div>

        <div data-reveal="80" style={{ marginTop: 38, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(168px,1fr))", gap: 16, alignItems: "end" }}>
          <div style={badgeCardStyle}>
            <div style={{ height: 44, display: "flex", alignItems: "flex-end", justifyContent: "center" }}><People1 /></div>
            <div style={priceLabelStyle}>1 USER</div>
            <div style={priceStyle}>£15</div>
            <div style={perMonthStyle}>/month</div>
          </div>
          <div style={badgeCardStyle}>
            <div style={{ height: 44, display: "flex", alignItems: "flex-end", justifyContent: "center" }}><People2 /></div>
            <div style={priceLabelStyle}>UP TO 5 USERS</div>
            <div style={priceStyle}>£39</div>
            <div style={perMonthStyle}>/month</div>
          </div>
          <div style={badgeCardStyle}>
            <div style={{ height: 44, display: "flex", alignItems: "flex-end", justifyContent: "center" }}><People3 /></div>
            <div style={priceLabelStyle}>UP TO 10 USERS</div>
            <div style={priceStyle}>£69</div>
            <div style={perMonthStyle}>/month</div>
          </div>
          {/* Most popular tier */}
          <div style={{ position: "relative", background: "#ffffff", border: "1px solid #EDEBF2", borderRadius: 16, padding: "34px 18px 28px", textAlign: "center", boxShadow: "0 2px 6px rgba(17,17,17,.06),0 20px 44px rgba(124,58,237,.18)" }}>
            <span style={{ position: "absolute", left: "50%", top: -14, transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 10.5, fontWeight: 700, letterSpacing: ".09em", color: "#ffffff", background: "linear-gradient(90deg,#F97316,#7C3AED)", borderRadius: 999, padding: "7px 16px", boxShadow: "0 6px 16px rgba(124,58,237,.3)" }}>
              MOST POPULAR
            </span>
            <div style={{ height: 44, display: "flex", alignItems: "flex-end", justifyContent: "center" }}><People3 /></div>
            <div style={priceLabelStyle}>UP TO 20 USERS</div>
            <div style={{ marginTop: 8, fontSize: 38, fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1, background: "linear-gradient(90deg,#F97316,#7C3AED)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>£99</div>
            <div style={perMonthStyle}>/month</div>
          </div>
          <div style={badgeCardStyle}>
            <div style={{ height: 44, display: "flex", alignItems: "flex-end", justifyContent: "center" }}><People5 /></div>
            <div style={priceLabelStyle}>UP TO 50 USERS</div>
            <div style={priceStyle}>£249</div>
            <div style={perMonthStyle}>/month</div>
          </div>
          <div style={badgeCardStyle}>
            <div style={{ height: 44, display: "flex", alignItems: "flex-end", justifyContent: "center" }}><People6 /></div>
            <div style={priceLabelStyle}>UP TO 100 USERS</div>
            <div style={priceStyle}>£499</div>
            <div style={perMonthStyle}>/month</div>
          </div>
        </div>

        <div data-reveal="0" style={{ marginTop: 34, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
          <div style={{ flex: "1 1 380px", fontSize: "clamp(16px,2vw,21px)", fontWeight: 600, color: "#111111", letterSpacing: "-.02em", lineHeight: 1.45 }}>
            Grow your team. Pay less per user. <span style={{ color: "#7C3AED" }}>The more you grow, the more you save.</span>
          </div>
          <a
            href="#pricing"
            className="transition-colors hover:!bg-[#6D28D9]"
            style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", borderRadius: 999, padding: "14px 26px", boxShadow: "0 1px 2px rgba(17,17,17,.06),0 10px 24px rgba(124,58,237,.26)" }}
          >
            View All Plans <span>→</span>
          </a>
        </div>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 24, borderTop: "1px solid #EFEEF3", paddingTop: 34 }}>
          {trustBadges.map((b) => (
            <div key={b.title} data-reveal={String(b.reveal)} style={{ display: "flex", gap: 14 }}>
              <span style={{ flex: "0 0 auto", width: 38, height: 38, borderRadius: 11, background: "#F3EDFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrustBadgeIcon kind={b.kind} />
              </span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: "#111111" }}>{b.title}</div>
                <p style={{ margin: "5px 0 0", fontSize: 12.8, lineHeight: 1.6, color: "#4B5563" }}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
