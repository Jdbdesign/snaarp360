import Image from "next/image";
import { icons, productIcon } from "@/lib/assets";

/**
 * Sign-up hero orbit: two concentric rings of Snaarp product logos rotate
 * continuously (opposite directions, different speeds) around a fixed centre
 * Snaarp mark. Each icon counter-rotates so it stays upright.
 *
 * Each product SVG is already a self-contained violet rounded tile with a
 * white glyph, so we render it directly at a single uniform size (no wrapper
 * chip) — every logo is the same size.
 *
 * Pure CSS animation (globals.css: .snp-orbit-ring-inner / -outer and matching
 * -icon classes). Respects prefers-reduced-motion.
 */

const SIZE = 420; // orbit canvas
const OUTER_R = 184; // outer ring radius
const INNER_R = 104; // inner ring radius
const ICON = 62; // uniform icon size for all orbiting logos

const outerLogos = [
  productIcon("mail"),
  productIcon("teams"),
  productIcon("drive"),
  productIcon("me"),
  productIcon("crm"),
  productIcon("books"),
];
const innerLogos = [
  productIcon("lock"),
  productIcon("document"),
  productIcon("sheet"),
  productIcon("meet"),
];

function OrbitIcon({ logo, iconClass }: { logo: string; iconClass: string }) {
  return (
    <span
      className={iconClass}
      style={{
        display: "block",
        width: ICON,
        height: ICON,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(17,17,17,.18)",
      }}
    >
      <Image src={logo} alt="" width={ICON} height={ICON} style={{ width: ICON, height: ICON, display: "block" }} />
    </span>
  );
}

export default function SignUpOrbit() {
  const center = SIZE / 2;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, zIndex: 2, minHeight: SIZE }}>
      <div style={{ position: "relative", width: SIZE, height: SIZE }}>
        {/* Ring guides */}
        <div style={{ position: "absolute", left: center - OUTER_R, top: center - OUTER_R, width: OUTER_R * 2, height: OUTER_R * 2, borderRadius: "50%", border: "1px solid rgba(255,255,255,.22)" }} />
        <div style={{ position: "absolute", left: center - INNER_R, top: center - INNER_R, width: INNER_R * 2, height: INNER_R * 2, borderRadius: "50%", border: "1px solid rgba(255,255,255,.22)" }} />

        {/* Outer rotating ring */}
        <div className="snp-orbit-ring-outer" style={{ position: "absolute", inset: 0 }}>
          {outerLogos.map((logo, i) => {
            const angle = (i / outerLogos.length) * 2 * Math.PI - Math.PI / 2;
            const x = center + OUTER_R * Math.cos(angle);
            const y = center + OUTER_R * Math.sin(angle);
            return (
              <span key={i} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)" }}>
                <OrbitIcon logo={logo} iconClass="snp-orbit-icon-outer" />
              </span>
            );
          })}
        </div>

        {/* Inner rotating ring */}
        <div className="snp-orbit-ring-inner" style={{ position: "absolute", inset: 0 }}>
          {innerLogos.map((logo, i) => {
            const angle = (i / innerLogos.length) * 2 * Math.PI - Math.PI / 2;
            const x = center + INNER_R * Math.cos(angle);
            const y = center + INNER_R * Math.sin(angle);
            return (
              <span key={i} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)" }}>
                <OrbitIcon logo={logo} iconClass="snp-orbit-icon-inner" />
              </span>
            );
          })}
        </div>

        {/* Fixed centre Snaarp mark */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 72, height: 72, borderRadius: 20, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 28px rgba(17,17,17,.22)" }}>
          <Image src={icons.snaarpMark} alt="Snaarp" width={42} height={42} style={{ width: 42, height: 42 }} />
        </div>
      </div>
    </div>
  );
}
