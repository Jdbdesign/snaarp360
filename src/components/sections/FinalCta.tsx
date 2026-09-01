/** Final CTA band. */
export default function FinalCta() {
  return (
    <section data-reveal="0" style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px clamp(56px,7vw,90px)" }}>
      <div
        style={{
          borderRadius: 16,
          background: "#7C3AED",
          padding: "clamp(40px,5.5vw,66px) clamp(28px,4vw,52px)",
          textAlign: "center",
          boxShadow: "0 2px 6px rgba(17,17,17,.06),0 26px 60px rgba(124,58,237,.28)",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "clamp(24px,3.2vw,38px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-.03em", lineHeight: 1.15, textWrap: "balance" }}>
          Ready to simplify your business stack?
        </h3>
        <p style={{ margin: "14px auto 0", maxWidth: 520, fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,.85)" }}>
          Start free for 14 days. No card required, no per-user maths, and your
          data leaves with you if it is not a fit.
        </p>
        <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a
            href="#pricing"
            className="transition-colors hover:!bg-[#F3EDFF]"
            style={{ fontSize: 15, fontWeight: 600, color: "#7C3AED", background: "#ffffff", borderRadius: 999, padding: "15px 30px" }}
          >
            Start 14-days Free Trial
          </a>
          <a
            href="#workflow"
            className="transition-colors hover:!border-white hover:!bg-white/10"
            style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", border: "1px solid rgba(255,255,255,.5)", borderRadius: 999, padding: "15px 28px" }}
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
