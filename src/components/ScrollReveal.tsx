"use client";

import { useScrollReveal } from "./useScrollReveal";

/**
 * Mounts the global scroll-reveal IntersectionObserver. Rendered once near the
 * end of the page so all [data-reveal] elements exist in the DOM when it runs.
 */
export default function ScrollReveal() {
  useScrollReveal();
  return null;
}
