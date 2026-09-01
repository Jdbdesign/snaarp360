/** "ONE PLATFORM. ONE SUBSCRIPTION." price CTA band. */
export default function CtaBand() {
  return (
    <section
      data-reveal="0"
      style={{
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "0 24px clamp(56px,7vw,90px)",
      }}
    >
      <div
        style={{
          borderRadius: 16,
          background: "#7C3AED",
          padding: "clamp(32px,4.5vw,52px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 32,
          alignItems: "center",
          boxShadow: "0 2px 6px rgba(17,17,17,.06),0 26px 60px rgba(124,58,237,.3)",
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-.025em", lineHeight: 1.12 }}>
            ONE PLATFORM.
            <br />
            ONE SUBSCRIPTION.
          </h3>
          <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "rgba(255,255,255,.82)", maxWidth: 420 }}>
            Stop paying twelve invoices for twelve tools. Consolidate your
            stack, keep your data in one place, and cut your software spend.
          </p>
          <a
            href="#pricing"
            className="transition-colors hover:!bg-[#F3EDFF]"
            style={{
              display: "inline-block",
              marginTop: 24,
              fontSize: 14.5,
              fontWeight: 600,
              color: "#7C3AED",
              background: "#ffffff",
              borderRadius: 999,
              padding: "14px 28px",
              whiteSpace: "nowrap",
            }}
          >
            Start a 14-days trial
          </a>
        </div>
        <div style={{ textAlign: "right" }}>
          {/* Keep the price block on the right, but left-align its contents so
              "STARTING FROM" lines up with the left edge of £15. */}
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", color: "rgba(255,255,255,.7)" }}>STARTING FROM</div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-start", gap: 2, marginTop: 6 }}>
              <span style={{ fontSize: "clamp(48px,7vw,84px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-.04em", lineHeight: 1 }}>£15</span>
              <span style={{ fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 600, color: "rgba(255,255,255,.85)" }}>/MONTH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
