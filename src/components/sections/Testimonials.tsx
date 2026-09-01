/** Testimonials — 3 quote cards on a full-bleed #F7F7F7 band. */

const testimonials: {
  quote: string;
  initials: string;
  avBg: string;
  name: string;
  role: string;
  reveal: number;
}[] = [
  {
    quote:
      "We were paying for six subscriptions and reconciling four invoices a month. Snaarp took that to one, and nobody on the team noticed a downgrade.",
    initials: "PR",
    avBg: "#7C3AED",
    name: "Priya Raman",
    role: "Operations Director, Northwind",
    reveal: 0,
  },
  {
    quote:
      "Onboarding used to mean five accounts per starter. Now it is one record in Workforce and the rest provisions itself in about ninety seconds.",
    initials: "AK",
    avBg: "#111111",
    name: "Amara Kwesi",
    role: "People Lead, Bluecrest Health",
    reveal: 80,
  },
  {
    quote:
      "Our software line dropped from £1,140 to £249 a month for fifty people. The CRM and accounting talking to each other was the unexpected bonus.",
    initials: "TM",
    avBg: "#6D28D9",
    name: "Tom Mercer",
    role: "Founder, Trailmark Ltd",
    reveal: 160,
  },
];

export default function Testimonials() {
  return (
    <section style={{ background: "#F7F7F7", padding: "clamp(56px,7vw,96px) 0" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" }}>
        <div data-reveal="0" style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 700, color: "#111111", letterSpacing: "-.025em" }}>
            Teams that cut their stack in half
          </h2>
          <p style={{ margin: "12px 0 0", fontSize: 15.5, color: "#4B5563" }}>
            A few words from businesses already running on Snaarp 360.
          </p>
        </div>
        <div style={{ marginTop: 38, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-reveal={String(t.reveal)}
              style={{
                background: "#ffffff",
                border: "1px solid #EEECF3",
                borderRadius: 16,
                padding: 28,
                boxShadow: "0 1px 2px rgba(17,17,17,.03),0 10px 26px rgba(17,17,17,.05)",
              }}
            >
              <div style={{ fontSize: 34, lineHeight: 1, color: "#DDD3F7", fontWeight: 800 }}>&ldquo;</div>
              <p style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.7, color: "#111111", textWrap: "pretty" }}>{t.quote}</p>
              <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 40, height: 40, borderRadius: 99, background: t.avBg, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.initials}</span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#111111" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
