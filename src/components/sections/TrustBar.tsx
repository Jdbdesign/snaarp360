/** Trust-bar marquee: infinite horizontal scroll with edge fade mask. */

const logos: { text: string; weight: number; ls: string }[] = [
  { text: "Northwind", weight: 700, ls: "-.02em" },
  { text: "Verta Health", weight: 600, ls: ".02em" },
  { text: "BLUECREST", weight: 800, ls: "-.03em" },
  { text: "Orbital Labs", weight: 500, ls: ".06em" },
  { text: "Kestrel Group", weight: 700, ls: "-.01em" },
  { text: "MERIDIAN", weight: 400, ls: ".1em" },
  { text: "Halden & Co", weight: 700, ls: "-.02em" },
  { text: "Trailmark", weight: 600, ls: ".03em" },
];

export default function TrustBar() {
  // The source renders the 8 logos twice (16 spans) so the -50% marquee loops
  // seamlessly.
  const doubled = [...logos, ...logos];

  return (
    <section
      data-reveal="0"
      style={{
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "clamp(30px,4vw,50px) 24px clamp(50px,6vw,80px)",
      }}
    >
      <div style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", color: "#B0AEB8" }}>
        TRUSTED BY GROWING BUSINESSES ACROSS THE WORLD
      </div>
      <div
        style={{
          marginTop: 26,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
          maskImage:
            "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
        }}
      >
        <div style={{ display: "flex", gap: 64, width: "max-content", animation: "snpMarquee 34s linear infinite" }}>
          {doubled.map((l, k) => (
            <span
              key={k}
              style={{
                fontSize: 20,
                fontWeight: l.weight,
                color: "#C8C6D0",
                letterSpacing: l.ls,
                whiteSpace: "nowrap",
              }}
            >
              {l.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
