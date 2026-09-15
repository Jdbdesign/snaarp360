"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import ProductNavigator, { tourProducts, type ProductDef } from "./ProductNavigator";
import SignInMockup from "./SignInMockup";
import MailMockup from "./MailMockup";

/**
 * Client controller for the How It Works interactive tour. Owns the shared
 * state coordinating the left product navigator (a dropdown showing one
 * product's module at a time) and the right live mockup:
 *   - activeProduct: which product's module/mockup is currently shown
 *   - completed: completed feature indices per product (drives checkmarks/badges)
 *
 * Flow (step 1 wired): the Sign-In mockup guides the user through the form;
 * on sign-in it marks the SSO feature complete. Whenever the active
 * product's features are all complete, an effect below auto-advances
 * activeProduct to the next one in `tourProducts`, moving the dropdown and
 * the module together.
 */

export default function TourPanel() {
  const [activeProduct, setActiveProduct] = useState(tourProducts[0].key);
  const [completed, setCompleted] = useState<Record<string, Set<number>>>({});
  // Collapse the left navigator so the live mockup previews full-width.
  const [navCollapsed, setNavCollapsed] = useState(false);
  // When the user picks a Mail feature row, we bump this so MailMockup seeds
  // its state to that feature. `nonce` lets re-selecting the same row re-run it.
  const [mailJump, setMailJump] = useState<{ feature: number; nonce: number } | null>(null);
  // Persisted second account (Add new account -> reused by Switch account).
  const [accountAdded, setAccountAdded] = useState(false);
  // Presentation mode: the whole tour takes over the viewport, like a slideshow.
  const [isFullScreen, setIsFullScreen] = useState(false);

  // While in presentation mode, lock page scroll and let Escape back out.
  useEffect(() => {
    if (!isFullScreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullScreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFullScreen]);

  // Once every feature of the active product is checked off, move the
  // dropdown (and the module/mockup shown) to the next product in the list.
  useEffect(() => {
    const product = tourProducts.find((p) => p.key === activeProduct);
    if (!product) return;
    const doneCount = (completed[activeProduct] ?? new Set<number>()).size;
    if (doneCount < product.features.length) return;
    const next = tourProducts[tourProducts.findIndex((p) => p.key === activeProduct) + 1];
    if (next) setActiveProduct(next.key);
  }, [completed, activeProduct]);

  const handleSignedIn = () => {
    // Mark Single Sign-In complete (its one feature, index 0). The effect
    // above advances to Mail once this lands.
    setCompleted((prev) => ({ ...prev, sso: new Set([0]) }));
  };

  // Generic: a mockup reports that one of its feature actions was completed,
  // which ticks off the matching navigator row (violet check + badge update).
  const markFeature = (productKey: string, featureIndex: number) => {
    setCompleted((prev) => {
      const next = new Set(prev[productKey] ?? []);
      next.add(featureIndex);
      return { ...prev, [productKey]: next };
    });
  };

  // User clicked a feature row: jump straight to that feature so they can try
  // it directly — any product, any feature, regardless of order/completion.
  const handleSelectFeature = (productKey: string, featureIndex: number) => {
    setActiveProduct(productKey);
    if (productKey === "mail") {
      setMailJump((prev) => ({ feature: featureIndex, nonce: (prev?.nonce ?? 0) + 1 }));
    }
    // Other products don't have interactive mockups yet — no-op beyond
    // switching the dropdown/module above.
  };

  const panelHeight = isFullScreen ? "100%" : 620;
  const activeMockupKey = activeProduct === "sso" ? "signin" : activeProduct === "mail" ? "mail" : "none";

  return (
    <>
      {/* Full-screen toggle — sits above the panel, hidden while presenting */}
      {!isFullScreen && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <button
            type="button"
            onClick={() => setIsFullScreen(true)}
            aria-label="Open full-screen preview"
            title="Full-screen preview"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "#4B5563",
              background: "#F7F7F7",
              border: "1px solid #EFEFEF",
              borderRadius: 999,
              padding: "6px 12px",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <Maximize2 size={15} strokeWidth={1.9} /> Full-screen preview
          </button>
        </div>
      )}

      <div
        style={
          isFullScreen
            ? {
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background: "#FBFAFC",
                padding: "16px clamp(16px,4vw,32px)",
                display: "flex",
                flexDirection: "column",
              }
            : undefined
        }
      >
        {/* Floats over the content instead of reserving its own row, so the
            mockup below gets the full overlay height. */}
        {isFullScreen && (
          <button
            type="button"
            onClick={() => setIsFullScreen(false)}
            aria-label="Exit full-screen preview"
            title="Exit full-screen preview (Esc)"
            style={{
              position: "fixed",
              top: 20,
              right: 24,
              zIndex: 1002,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: "#111111",
              background: "#ffffff",
              border: "1px solid #E5E3EA",
              borderRadius: 999,
              padding: "8px 16px",
              boxShadow: "0 4px 14px rgba(17,17,17,.16)",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <X size={16} strokeWidth={2} /> Cancel
          </button>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: navCollapsed ? "minmax(0, 1fr)" : "var(--tour-cols)",
            gap: 24,
            alignItems: "stretch",
            flex: isFullScreen ? "1" : undefined,
            minHeight: 0,
            overflowY: isFullScreen ? "auto" : undefined,
          }}
        >
          {/* Left: product & feature navigator (hidden when collapsed) */}
          {!navCollapsed && (
            <div
              style={{
                height: panelHeight,
                background: "#ffffff",
                border: "1px solid #EEECF3",
                borderRadius: 18,
                boxShadow: "0 1px 2px rgba(17,17,17,.04),0 10px 26px rgba(17,17,17,.05)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              {/* Collapse control */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8, flex: "0 0 auto" }}>
                <button
                  type="button"
                  onClick={() => setNavCollapsed(true)}
                  aria-label="Collapse product list for full-screen preview"
                  title="Collapse for full preview"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#4B5563",
                    background: "#F7F7F7",
                    border: "1px solid #EFEFEF",
                    borderRadius: 999,
                    padding: "6px 12px",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  <PanelLeftClose size={15} strokeWidth={1.9} /> Collapse
                </button>
              </div>
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }} className="snp-scroll">
                <ProductNavigator
                  activeProduct={activeProduct}
                  onSelectProduct={setActiveProduct}
                  completed={completed}
                  onSelectFeature={handleSelectFeature}
                />
              </div>
            </div>
          )}

          {/* Right: live mockup (fades between states) */}
          <div style={{ height: panelHeight, minWidth: 0, position: "relative" }}>
            {/* Expand control — only shown while collapsed */}
            {navCollapsed && (
              <button
                type="button"
                onClick={() => setNavCollapsed(false)}
                aria-label="Show product list"
                title="Show product list"
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  zIndex: 60,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#111111",
                  background: "rgba(255,255,255,.94)",
                  border: "1px solid #E5E3EA",
                  borderRadius: 999,
                  padding: "7px 13px",
                  boxShadow: "0 2px 8px rgba(17,17,17,.12)",
                  cursor: "pointer",
                  font: "inherit",
                  backdropFilter: "blur(4px)",
                }}
              >
                <PanelLeftOpen size={15} strokeWidth={1.9} /> Products
              </button>
            )}
            <div key={activeProduct} className="snp-mockup-fade" style={{ height: "100%" }}>
              {activeMockupKey === "signin" ? (
                <SignInMockup onSignedIn={handleSignedIn} />
              ) : activeMockupKey === "mail" ? (
                <MailMockup
                  onFeatureComplete={markFeature}
                  jump={mailJump}
                  addedAccount={accountAdded}
                  onAddAccount={() => setAccountAdded(true)}
                />
              ) : (
                <ComingSoonMockup product={tourProducts.find((p) => p.key === activeProduct)!} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Placeholder shown on the right when the dropdown lands on a product that
 * doesn't have an interactive mockup wired up yet. */
function ComingSoonMockup({ product }: { product: ProductDef }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: "#ffffff",
        border: "1px solid #EEECF3",
        borderRadius: 18,
        boxShadow: "0 1px 2px rgba(17,17,17,.04),0 10px 26px rgba(17,17,17,.05)",
      }}
    >
      <span style={{ width: 56, height: 56, borderRadius: 14, background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image src={product.icon} alt="" width={30} height={30} style={{ width: 30, height: 30, borderRadius: 8 }} />
      </span>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>{product.name}</div>
      <div style={{ fontSize: 13, color: "#8A8F98" }}>Interactive preview coming soon.</div>
    </div>
  );
}
