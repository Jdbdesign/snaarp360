/**
 * Central map of static assets, extracted from the standalone bundle's
 * ext_resources manifest. All SVGs live under /public/assets.
 *
 *  - icons/*  : Snaarp app icons used in the hero mockups, features grid,
 *               header and footer.
 *  - p/*      : Snaarp product icons used in the "What Snaarp Can Replace" table.
 *  - b/*      : Third-party competitor logos used in the same table.
 */

// Snaarp app icons (used across hero demo, features, header, footer).
export const icons = {
  snaarp: "/assets/icons/snaarp.svg",
  mail: "/assets/icons/mail.svg",
  meet: "/assets/icons/meet.svg",
  teams: "/assets/icons/teams.svg",
  me: "/assets/icons/me.svg",
  lock: "/assets/icons/lock.svg",
  drive: "/assets/icons/drive.svg",
  sheet: "/assets/icons/sheet.svg",
  document: "/assets/icons/document.svg",
  crm: "/assets/icons/crm.svg",
  books: "/assets/icons/books.svg",
  workforce: "/assets/icons/workforce.svg",
  identity: "/assets/icons/identity.svg",
} as const;

// Product icons for the replace table (superset of app icons; includes
// pdf/presentation/sendrit/verifyrit/website/zeus which only appear there).
export const productIcon = (name: string) => `/assets/p/${name}.svg`;

// Competitor / third-party brand logos for the replace table.
export const brandLogo = (name: string) => `/assets/b/${name}.svg`;
