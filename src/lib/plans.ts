import { productIcon } from "@/lib/assets";

/**
 * Catalogue of sign-up-able products. A product is chosen on the pricing page
 * and passed to /sign-up as `?product=<key>` (defaults to Snaarp Drive). Each
 * entry drives the selected-plan card and the CTA label on the sign-up page.
 *
 * Kept in a plain module (not the page file) because Next.js App Router only
 * permits a fixed set of named exports from `page.tsx`.
 */
export interface PlanDef {
  key: string;
  name: string;
  icon: string;
  tier: string;
  price: string;
  cadence: string;
  detail: string;
}

export const plans: Record<string, PlanDef> = {
  drive: { key: "drive", name: "Snaarp Drive", icon: productIcon("drive"), tier: "Pro", price: "£25", cadence: "month", detail: "100 GB · Billed monthly · 14-day free trial included" },
  mail: { key: "mail", name: "Snaarp Mail", icon: productIcon("mail"), tier: "Pro", price: "£12", cadence: "month", detail: "50 GB mailbox · Billed monthly · 14-day free trial included" },
  sheet: { key: "sheet", name: "Snaarp Sheet", icon: productIcon("sheet"), tier: "Pro", price: "£15", cadence: "month", detail: "Unlimited sheets · Billed monthly · 14-day free trial included" },
  crm: { key: "crm", name: "Snaarp CRM", icon: productIcon("crm"), tier: "Growth", price: "£39", cadence: "month", detail: "10k contacts · Billed monthly · 14-day free trial included" },
  teams: { key: "teams", name: "Snaarp Teams", icon: productIcon("teams"), tier: "Pro", price: "£18", cadence: "month", detail: "Unlimited channels · Billed monthly · 14-day free trial included" },
  document: { key: "document", name: "Snaarp Doc", icon: productIcon("document"), tier: "Pro", price: "£14", cadence: "month", detail: "Unlimited docs · Billed monthly · 14-day free trial included" },
};
