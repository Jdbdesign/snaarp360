"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import ProductNavigator from "./ProductNavigator";
import SignInMockup from "./SignInMockup";
import MailMockup from "./MailMockup";

/**
 * Client controller for the How It Works interactive tour. Owns the shared
 * state coordinating the left product navigator and the right live mockup:
 *   - activeMockup: which product's mockup is shown on the right
 *   - expanded: which navigator cards are open
 *   - completed: completed feature indices per product (drives checkmarks/badges)
 *
 * Flow (step 1 wired): the Sign-In mockup guides the user through the form;
 * on sign-in it marks the SSO feature complete and swaps the mockup to Mail,
 * auto-opening the Mail card in the navigator.
 */

type MockupKey = "signin" | "mail";

export default function TourPanel() {
  const [activeMockup, setActiveMockup] = useState<MockupKey>("signin");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ sso: true });
  const [completed, setCompleted] = useState<Record<string, Set<number>>>({});
  // Collapse the left navigator so the live mockup previews full-width.
  const [navCollapsed, setNavCollapsed] = useState(false);
  // When the user picks a Mail feature row, we bump this so MailMockup seeds
  // its state to that feature. `nonce` lets re-selecting the same row re-run it.
  const [mailJump, setMailJump] = useState<{ feature: number; nonce: number } | null>(null);
  // Persisted second account (Add new account -> reused by Switch account).
  const [accountAdded, setAccountAdded] = useState(false);

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSignedIn = () => {
    // Mark Single Sign-In complete (its one feature, index 0).
    setCompleted((prev) => ({ ...prev, sso: new Set([0]) }));
    // Swap the mockup to Mail and open the Mail card (keep SSO open so the
    // completed check stays visible).
    setActiveMockup("mail");
    setExpanded((prev) => ({ ...prev, sso: true, mail: true }));
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
    // Make sure the chosen product's card is open (and the navigator visible).
    setExpanded((prev) => ({ ...prev, [productKey]: true }));

    if (productKey === "sso") {
      // SSO's only feature = the sign-in screen.
      setActiveMockup("signin");
      return;
    }
    if (productKey === "mail") {
      setActiveMockup("mail");
      setMailJump((prev) => ({ feature: featureIndex, nonce: (prev?.nonce ?? 0) + 1 }));
      return;
    }
    // Other products don't have interactive mockups yet — no-op for now.
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: navCollapsed ? "minmax(0, 1fr)" : "var(--tour-cols)",
        gap: 24,
        alignItems: "stretch",
      }}
    >
      {/* Left: product & feature navigator (hidden when collapsed) */}
      {!navCollapsed && (
        <div
          style={{
            height: 620,
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
            <ProductNavigator expanded={expanded} onToggle={toggle} completed={completed} onSelectFeature={handleSelectFeature} />
          </div>
        </div>
      )}

      {/* Right: live mockup (fades between states) */}
      <div style={{ height: 620, minWidth: 0, position: "relative" }}>
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
        <div key={activeMockup} className="snp-mockup-fade" style={{ height: "100%" }}>
          {activeMockup === "signin" ? (
            <SignInMockup onSignedIn={handleSignedIn} />
          ) : (
            <MailMockup
              onFeatureComplete={markFeature}
              jump={mailJump}
              addedAccount={accountAdded}
              onAddAccount={() => setAccountAdded(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
