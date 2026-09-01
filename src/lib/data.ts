/**
 * Data structures ported verbatim from the standalone bundle's DCLogic
 * component (buildReplaceRows, buildCompareRows, faqData, mailRows, etc.).
 * Every row's content, icon/logo and value is preserved exactly.
 */
import { productIcon, brandLogo } from "./assets";

/* ---------------------------------------------------------------------------
 * "What Snaarp Can Potentially Replace" table
 * ------------------------------------------------------------------------- */

export type ReplaceComp =
  | { img: string; alt: string; txt: "" }
  | { img: ""; alt: string; txt: string };

export interface ReplaceRow {
  icon: string;
  name: string;
  does: string;
  comps: ReplaceComp[];
  zebra: string;
}

const im = (file: string, alt: string): ReplaceComp => ({
  img: brandLogo(file.replace(".svg", "")),
  alt,
  txt: "",
});

const replaceSource: [string, string, string, ReplaceComp[]][] = [
  ["mail.svg", "Snaarp Mail", "Business email for your organisation.", [im("outlook.svg", "Outlook"), im("gmail.svg", "Gmail"), im("zohomail.svg", "Zoho Mail")]],
  ["meet.svg", "Snaarp Meet", "Video meetings for teams and clients.", [im("zoom.svg", "Zoom"), im("gmeet.svg", "Google Meet"), im("teams.svg", "Microsoft Teams"), im("zohomeeting.svg", "Zoho Meeting")]],
  ["teams.svg", "Snaarp Teams", "Team chat, channels and shared conversations.", [im("slack.svg", "Slack"), im("teams.svg", "Microsoft Teams"), im("gchat.svg", "Google Chat"), im("zohocliq.svg", "Zoho Cliq")]],
  ["me.svg", "Snaarp Me", "Online appointment and meeting scheduling.", [im("calendly.svg", "Calendly"), im("bookings.svg", "Microsoft Bookings"), im("gscheduling.svg", "Google Scheduling"), im("zorobooking.svg", "Zoho Bookings")]],
  ["lock.svg", "Snaarp Lock", "Team password storage and autofill.", [im("1password.svg", "1Password"), im("lastpass.svg", "LastPass"), im("dashlane.svg", "Dashlane"), im("bitwarden.svg", "Bitwarden"), im("zohovault.svg", "Zoho Vault")]],
  ["drive.svg", "Snaarp Drive", "Cloud file storage, sharing and access.", [im("dropbox.svg", "Dropbox"), im("gdrive.svg", "Google Drive"), im("onedrive.svg", "OneDrive"), im("box.svg", "Box"), im("zohoworkdrive.svg", "Zoho WorkDrive")]],
  ["sheet.svg", "Snaarp Sheet", "Business spreadsheets and trackers.", [im("excel.svg", "Microsoft Excel"), im("gsheets.svg", "Google Sheets"), im("zohosheet.svg", "Zoho Sheet")]],
  ["document.svg", "Snaarp Document", "Create, edit and collaborate on documents.", [im("word.svg", "Microsoft Word"), im("gdocs.svg", "Google Docs"), im("zohowriter.svg", "Zoho Writer")]],
  ["presentation.svg", "Snaarp Presentation", "Create and deliver slide presentations.", [im("powerpoint.svg", "PowerPoint"), im("gslides.svg", "Google Slides"), im("zohoshow.svg", "Zoho Show")]],
  ["pdf.svg", "Snaarp PDF", "Read, mark up and manage PDF documents.", [im("adobeacrobat.svg", "Adobe Acrobat"), im("foxit.svg", "Foxit PDF"), im("smallpdf.svg", "Smallpdf"), im("pdfescape.svg", "PDFescape")]],
  ["crm.svg", "Snaarp CRM", "Manage leads, deals and customer relationships.", [im("salesforce.svg", "Salesforce"), im("hubspot.svg", "HubSpot CRM"), im("zohocrm.svg", "Zoho CRM"), im("pipedrive.svg", "Pipedrive"), im("freshsales.svg", "Freshsales")]],
  ["books.svg", "Snaarp Books", "Accounting, invoicing and expense management.", [im("quickbooks.svg", "QuickBooks"), im("xero.svg", "Xero"), im("sage.svg", "Sage"), im("zohobooks.svg", "Zoho Books"), im("freshbooks.svg", "FreshBooks")]],
  ["workforce.svg", "Snaarp Workforce", "HR, onboarding and employee records.", [im("bamboohr.svg", "BambooHR"), im("hibob.svg", "HiBob"), im("personio.svg", "Personio"), im("zohopeople.svg", "Zoho People"), im("sagehr.svg", "Sage HR")]],
  ["identity.svg", "Snaarp Identity", "Digital ID cards, business cards and email signatures.", [im("blinq.svg", "Blinq"), im("hihello.svg", "HiHello"), im("popl.svg", "Popl"), im("uniqode.svg", "Uniqode"), im("exclaimer.svg", "Exclaimer"), im("codetwo.svg", "CodeTwo")]],
  ["sendrit.svg", "Sendrit", "Bulk email campaigns and announcements.", [im("mailchimp.svg", "Mailchimp"), im("brevo.svg", "Brevo"), im("constantcontact.svg", "Constant Contact"), im("mailerlite.svg", "MailerLite"), im("campaignmonitor.svg", "Campaign Monitor")]],
  ["verifyrit.svg", "VerifyRit", "Email-address verification and list cleaning.", [im("zerobounce.svg", "ZeroBounce"), im("neverbounce.svg", "NeverBounce"), im("bouncer.svg", "Bouncer"), im("emailable.svg", "Emailable"), im("kickbox.svg", "Kickbox")]],
  ["zeus.svg", "Zeus Contacts", "Outbound toolkit: prospecting, sending, verification and CRM.", [im("apollo.svg", "Apollo"), im("instantly.svg", "Instantly"), im("lemlist.svg", "Lemlist"), im("smartlead.svg", "Smartlead"), im("hunter.svg", "Hunter")]],
  ["website.svg", "Website Builder", "AI-assisted website creation and publishing.", [im("wix.svg", "Wix"), im("squarespace.svg", "Squarespace"), im("webflow.svg", "Webflow"), im("framer.svg", "Framer"), im("durable.svg", "Durable")]],
];

export const replaceRows: ReplaceRow[] = replaceSource.map((r, k) => ({
  icon: productIcon(r[0].replace(".svg", "")),
  name: r[1],
  does: r[2],
  comps: r[3],
  zebra: k % 2 ? "#FBFAFD" : "#ffffff",
}));

/* ---------------------------------------------------------------------------
 * "Competitive Landscape" comparison table
 * ------------------------------------------------------------------------- */

export interface CompareCell {
  yes: boolean;
  no: boolean;
  txt: string;
}

export interface CompareRow {
  label: string;
  s: CompareCell;
  o: CompareCell[];
  zebra: string;
}

const y: CompareCell = { yes: true, no: false, txt: "" };
const n: CompareCell = { yes: false, no: true, txt: "" };
const ct = (v: string): CompareCell => ({ yes: false, no: false, txt: v });

const compareSource: [string, CompareCell, CompareCell[]][] = [
  ["Email & Calendar", y, [y, y, y, n]],
  ["Office Suite", y, [y, y, y, n]],
  ["Meetings & Team Chat", y, [y, y, y, n]],
  ["Cloud Storage", y, [y, y, y, n]],
  ["CRM", y, [n, n, y, y]],
  ["Accounting", y, [n, n, y, y]],
  ["HR / Workforce", y, [n, n, y, y]],
  ["Password Manager", y, [n, n, y, n]],
  ["Digital Identity", y, [n, n, n, n]],
  ["Email Marketing", y, [n, n, y, y]],
  ["Email Verification", y, [n, n, n, n]],
  ["Outbound Sales Toolkit", y, [n, n, y, y]],
  ["AI Website Builder", y, [n, n, y, y]],
  ["Pricing model", ct("Fixed team plans"), [ct("Per user"), ct("Per user"), ct("Per user"), ct("Per user")]],
  ["20 users / month", ct("£99"), [ct("£216"), ct("£236"), ct("~£740*"), ct("Varies")]],
];

export const compareRows: CompareRow[] = compareSource.map((r, k) => ({
  label: r[0],
  s: r[1],
  o: r[2],
  zebra: k % 2 ? "#FBFAFD" : "#ffffff",
}));

/* ---------------------------------------------------------------------------
 * FAQ
 * ------------------------------------------------------------------------- */

export const faqData: [string, string][] = [
  ["Can I try Snaarp 360 before paying?", "Yes. Every plan starts with a full-feature 14-day trial — no card, no seat minimum. If you do not continue, the workspace stays read-only for 30 days so you can export everything."],
  ["How does billing work as my team grows?", "You pay for a band, not a head. Move from 10 to 20 people and your bill goes from £69 to £99 for the whole team — the effective per-person cost falls every time you grow."],
  ["What is involved in switching from my current tools?", "Most teams migrate mail, contacts and files in an afternoon. We provide guided importers for the major providers, and a migration engineer runs the cutover with you on plans of 20 users and above."],
  ["Will my existing data come across intact?", "Mail keeps folders, flags and timestamps; files keep version history; CRM records keep owners and activity. Anything the importer cannot map is reported before the cutover rather than dropped silently."],
  ["How is our data secured?", "Encryption in transit and at rest, UK and EU data residency, SSO and enforced 2FA on every plan, plus role-based access and full audit logs in the admin console."],
  ["What support do we get?", "Every plan includes priority email and in-app support during UK business hours, with a two-hour first-response target. Plans from 50 users add a named account contact and quarterly reviews."],
];

/* ---------------------------------------------------------------------------
 * Hero demo — mail rows
 * ------------------------------------------------------------------------- */

export interface MailRow {
  from: string;
  subject: string;
  preview: string;
  time: string;
  dot: string;
}

export const mailRows: MailRow[] = [
  { from: "Design Team", subject: "New Feature Feedback", preview: "We have compiled the user feedback from the latest beta…", time: "12:41", dot: "#7C3AED" },
  { from: "Cloud Services", subject: "System Maintenance Notice", preview: "Scheduled maintenance this Sunday 02:00–04:00 BST.", time: "11:20", dot: "#F97316" },
  { from: "Sarah Jenkins", subject: "Budget Approval Status", preview: "Finance signed off the Q3 equipment line — see attached.", time: "09:58", dot: "#16A34A" },
  { from: "Alex Rivera", subject: "Weekly Sync Summary", preview: "Three items carried over. Pipeline review moved to Thursday.", time: "Wed", dot: "#D5D3DC" },
  { from: "Mike Chen", subject: "Client Presentation Draft", preview: "First pass is in Drive — happy to walk through it.", time: "Wed", dot: "#D5D3DC" },
  { from: "Lisa Park", subject: "Onboarding Checklist", preview: "Two starters on Monday, both provisioned in Workforce.", time: "Tue", dot: "#D5D3DC" },
  { from: "James Wilson", subject: "Supplier Renewal", preview: "They came back with 8% — I think we can hold at 4%.", time: "Tue", dot: "#D5D3DC" },
];

const bigAv = ["#7C3AED", "#F97316", "#16A34A", "#111111", "#6D28D9", "#0EA5E9", "#DC2626", "#7C3AED", "#3B3552"];

export interface MailRowBig extends MailRow {
  initials: string;
  avBg: string;
}

export const mailRowsBig: MailRowBig[] = mailRows
  .concat([
    { from: "Accounts Payable", subject: "Invoice INV-20418", preview: "Payment cleared. Reconciled against Snaarp Books.", time: "Mon", dot: "#D5D3DC" },
    { from: "Kestrel Group", subject: "Contract redlines", preview: "Legal returned two clauses — nothing structural.", time: "Mon", dot: "#D5D3DC" },
  ])
  .map((m, k) => ({
    ...m,
    initials: m.from
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    avBg: bigAv[k % bigAv.length],
  }));

/* ---------------------------------------------------------------------------
 * Hero demo — Snaarp Me booking calendar days
 * ------------------------------------------------------------------------- */

export interface CalDay {
  n: number;
  bg: string;
  fg: string;
  fw: number;
}

const availDays = [2, 3, 8, 9, 10, 15, 16, 17, 22, 23, 24, 29, 30];

export const calDays: CalDay[] = Array.from({ length: 30 }, (_, idx) => {
  const d = idx + 1;
  const sel = d === 15;
  const avail = availDays.indexOf(d) >= 0;
  return {
    n: d,
    bg: sel ? "#7C3AED" : avail ? "#F3EDFF" : "transparent",
    fg: sel ? "#ffffff" : avail ? "#7C3AED" : "#C8C6D0",
    fw: sel ? 700 : avail ? 600 : 400,
  };
});

/* ---------------------------------------------------------------------------
 * Hero demo — Sheet rows. `typed` toggles the Q3 forecast values when the
 * carousel "types" the formula on the Sheet screen.
 * ------------------------------------------------------------------------- */

export interface SheetRow {
  n: number;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  fg: string;
  fw: number;
  dbg: string;
}

export function buildSheetRows(typed: boolean): SheetRow[] {
  const sheetData: string[][] = [
    ["Region", "Q1", "Q2", "Q3", "FY view"],
    ["London", "82,400", "91,200", "104,500", "278,100"],
    ["Manchester", "41,900", "44,600", "49,800", "136,300"],
    ["Bristol", "28,300", "30,100", "33,700", "92,100"],
    ["Leeds", "19,800", "22,400", typed ? "31,600" : "", "73,800"],
    ["Glasgow", "17,200", "18,900", "20,400", "56,500"],
    ["Dublin", "24,600", "26,800", "29,900", "81,300"],
    ["Remote / EU", "12,100", "13,500", "15,200", "40,800"],
    ["Total", "226,300", "247,500", typed ? "285,100" : "253,500", "758,900"],
  ];
  return sheetData.map((r, k) => ({
    n: k + 1,
    a: r[0],
    b: r[1],
    c: r[2],
    d: r[3],
    e: r[4],
    fg: k === 0 || k === 8 ? "#111111" : "#4B5563",
    fw: k === 0 || k === 8 ? 600 : 400,
    dbg: k === 4 && typed ? "#F3EDFF" : "transparent",
  }));
}

// Slugs shown in the fake browser address bar per demo screen.
export const demoSlugs = [
  "identity/cards",
  "mail/inbox",
  "crm/pipeline",
  "me/booking",
  "sheet/q3-forecast",
  "meet/ops-sync",
];
