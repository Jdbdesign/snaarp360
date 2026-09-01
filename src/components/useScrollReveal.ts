"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal system ported from the standalone bundle's setupReveal().
 *
 * Elements carrying a `data-reveal` attribute (whose value is a per-element
 * stagger delay in ms) start hidden (opacity 0, translateY 24px — set in
 * globals.css) and are revealed by an IntersectionObserver.
 *
 * Faithful details preserved from the original:
 *   - bail out entirely under prefers-reduced-motion (elements just show)
 *   - IntersectionObserver rootMargin '0px 0px -6% 0px', threshold 0.04
 *   - on intersect, reveal after the element's own `data-reveal` delay
 *   - elements already within 0.94 * innerHeight of the top on init are
 *     revealed immediately (not observed) — avoids first-paint flash
 *   - a 12s failsafe reveals everything regardless
 */
export function useScrollReveal() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = Array.prototype.slice.call(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    ) as HTMLElement[];

    if (reduce) {
      els.forEach((el) => el.classList.add("snp-revealed"));
      return;
    }

    let io: IntersectionObserver | null = null;
    let failsafe: ReturnType<typeof setTimeout> | null = null;

    const raf = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const d = parseInt(el.getAttribute("data-reveal") || "0", 10);
            setTimeout(() => {
              el.classList.add("snp-revealed");
            }, d);
            io && io.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
      );

      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.94) {
          el.classList.add("snp-revealed");
          return;
        }
        io!.observe(el);
      });

      failsafe = setTimeout(() => {
        els.forEach((el) => el.classList.add("snp-revealed"));
      }, 12000);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      if (failsafe) clearTimeout(failsafe);
    };
  }, []);
}
