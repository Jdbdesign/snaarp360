"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Settings,
  LayoutGrid,
  PenLine,
  Inbox,
  Star,
  Clock,
  Send,
  FileText,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  CalendarClock,
  Mail as MailIcon,
  Shield,
  Trash2,
  RefreshCw,
  List,
  ListOrdered,
  Grid2x2,
  MoreVertical,
  Paperclip,
  Smile,
  Minus,
  Maximize2,
  X,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Baseline,
  AlignLeft,
  Indent,
  Outdent,
  Sparkles,
  Type,
  Link as LinkIcon,
  Upload,
  FileUp,
  FolderUp,
  HardDrive,
  FileVideo,
  Check,
  Loader2,
  CheckCircle2,
  Eye,
  Plus,
  LogOut,
} from "lucide-react";
import { icons } from "@/lib/assets";

/**
 * Interactive Snaarp Mail mockup (How It Works tour, step 2).
 *
 * Compose flow:
 *   - The Compose button pulses. Clicking it opens the "New Message" modal
 *     (bottom-right), matching the real product.
 *   - Inside the modal the pulse cue starts on the "To" field.
 *   - When the To value contains "com", the cue moves to "Subject".
 *   - When the Subject is at least 3 chars, the cue moves to the AI (sparkle)
 *     icon in the toolbar — inviting the user to try the AI composer (next step).
 *
 * Colours follow the Snaarp design system (violet accents, canvas/soft, ink/
 * body/mute), Lucide icons throughout.
 */

interface Row {
  initials: string;
  avBg: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  isNew?: boolean;
  attachments?: { name: string; kind: "pdf" | "image" | "sheet" }[];
}

const rows: Row[] = [
  { initials: "C", avBg: "#DC2626", sender: "ChatSnaarp", subject: "Reimagine your workflow with just a few words", preview: "", date: "Yesterday", unread: true, isNew: true },
  { initials: "G", avBg: "#F97316", sender: "Google", subject: "You shared some Google Account data with divriots.com", preview: "", date: "Aug 31", unread: true },
  {
    initials: "V", avBg: "#0EA5E9", sender: "Victor", subject: "Images for Landing Page", preview: "",
    date: "Aug 31", unread: true,
    attachments: [
      { name: "Snaarp_Comparison…", kind: "pdf" },
      { name: "What_We_Replace.pdf", kind: "pdf" },
      { name: "Landing Image Aug 3…", kind: "image" },
    ],
  },
  { initials: "SS", avBg: "#16A34A", sender: "Snaarp Sheet", subject: "Victor Ariyibi shared \"New Snaarp Pricing\" with you on Snaarp Sheet", preview: "", date: "Aug 30", unread: false },
  { initials: "G", avBg: "#F97316", sender: "Google", subject: "You shared some Google Account data with Vecteezy", preview: "", date: "Aug 29", unread: false },
  { initials: "DT", avBg: "#7C3AED", sender: "Design Team", subject: "New Feature Feedback", preview: "— We have compiled the user feedback from the latest beta…", date: "Aug 28", unread: false },
  { initials: "AR", avBg: "#111111", sender: "Alex Rivera", subject: "Weekly Sync Summary", preview: "— Three items carried over. Pipeline review moved to Thursday.", date: "Aug 27", unread: false },
  { initials: "LP", avBg: "#6D28D9", sender: "Lisa Park", subject: "Onboarding Checklist", preview: "— Two starters on Monday, both provisioned in Workforce.", date: "Aug 27", unread: false },
];

// Second account's inbox (Amara Okafor) — shown after switching accounts.
const rowsSecondary: Row[] = [
  { initials: "F", avBg: "#DB2777", sender: "Figma", subject: "Amara, your team plan invoice is ready", preview: "", date: "Today", unread: true, isNew: true },
  { initials: "N", avBg: "#111111", sender: "Notion", subject: "3 pages were shared with you this week", preview: "", date: "Today", unread: true },
  { initials: "SB", avBg: "#16A34A", sender: "Snaarp Books", subject: "September receivables summary is available", preview: "", date: "Sep 1", unread: true },
  { initials: "L", avBg: "#0A66C2", sender: "LinkedIn", subject: "You appeared in 12 searches this week", preview: "", date: "Aug 31", unread: false },
  { initials: "SC", avBg: "#7C3AED", sender: "Snaarp CRM", subject: "Deal \"Acme × Meridian\" moved to Negotiation", preview: "", date: "Aug 30", unread: false },
  { initials: "DK", avBg: "#F97316", sender: "Daniel Kim", subject: "Re: Q4 marketing brief", preview: "— Looks good, just tweaked the timeline on slide 4.", date: "Aug 29", unread: false },
  { initials: "AWS", avBg: "#232F3E", sender: "AWS", subject: "Your August usage report", preview: "— Your monthly cost summary is ready to review.", date: "Aug 28", unread: false },
  { initials: "PT", avBg: "#0EA5E9", sender: "Product Team", subject: "Sprint 24 retro notes", preview: "— Action items assigned, board updated for next sprint.", date: "Aug 27", unread: false },
];

const navTop: { icon: typeof Inbox; label: string; count?: string; active?: boolean }[] = [
  { icon: Inbox, label: "Inbox", count: "8", active: true },
  { icon: Star, label: "Starred" },
  { icon: Clock, label: "Snoozed" },
  { icon: Send, label: "Sent" },
  { icon: FileText, label: "Drafts", count: "30" },
];
const navMore: { icon: typeof Inbox; label: string }[] = [
  { icon: TrendingUp, label: "Important" },
  { icon: CalendarClock, label: "Scheduled" },
  { icon: MailIcon, label: "All Mail" },
  { icon: Shield, label: "Spam" },
  { icon: Trash2, label: "Trash" },
];

function AttachmentChip({ name, kind }: { name: string; kind: "pdf" | "image" | "sheet" }) {
  const map = {
    pdf: { fg: "#DC2626", bg: "#FEE2E2", label: "PDF" },
    image: { fg: "#7C3AED", bg: "#F3EDFF", label: "IMG" },
    sheet: { fg: "#16A34A", bg: "#DCFCE7", label: "XLS" },
  } as const;
  const s = map[kind];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F7F7F7", border: "1px solid #EFEFEF", borderRadius: 6, padding: "3px 8px 3px 4px", maxWidth: 150 }}>
      <span style={{ fontSize: 8, fontWeight: 700, color: s.fg, background: s.bg, borderRadius: 3, padding: "2px 4px", flex: "0 0 auto" }}>{s.label}</span>
      <span style={{ fontSize: 11, color: "#4B5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>
    </span>
  );
}

/* Small toolbar icon button */
function TB({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ width: 24, height: 24, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", color: "#5F6368", flex: "0 0 auto" }}>
      {children}
    </span>
  );
}

type Pulse =
  | "compose" | "to" | "subject" | "ai" | "aiPrompt" | "generate" | "close"
  | "attach" | "addFile" | "done" | "send" | "compact" | "grid"
  | "gear" | "inboxDefault" | "inboxStarred"
  | "undoToggle" | "undoWindow"
  | "avatar" | "addAnother" | "acctEmail" | "acctPassword" | "addAccount"
  | "switchAcct" | null;

// The account the user "adds" during the Add-new-account flow. Reused later by
// the Switch-account feature.
const NEW_ACCOUNT = { name: "Amara Okafor", email: "amara@acme.com", initials: "AO", avBg: "#0EA5E9" };
const PRIMARY_ACCOUNT = { name: "Johnson Manrope", email: "johnman@acme.com", initials: "JM", avBg: "#7C3AED", firstName: "Johnson" };

// The 9 Snaarp apps shown in the "Snaarp apps" launcher grid.
const APPS: { name: string; icon: string }[] = [
  { name: "Mail", icon: icons.mail },
  { name: "Meet", icon: icons.meet },
  { name: "Teams", icon: icons.teams },
  { name: "Snaarp Me", icon: icons.me },
  { name: "Snaarp Lock", icon: icons.lock },
  { name: "Snaarp Drive", icon: icons.drive },
  { name: "Sheet", icon: icons.sheet },
  { name: "Document", icon: icons.document },
  { name: "CRM", icon: icons.crm },
];

// The file the user "selects" from their computer.
const UPLOAD_FILE = { name: "Recording 2026-09-01 021820.mp4", size: "18.4 MB" };

// The email body the AI "generates".
const AI_BODY = `Hi Priya,

Following up on the Q3 rollout — with billing now consolidated in Snaarp Books, we can bring the migration forward by two weeks.

I've attached the revised plan. Happy to walk through the timeline on a quick call whenever suits you.

Best,
Jordan`;

export default function MailMockup({
  onFeatureComplete,
  jump,
  addedAccount,
  onAddAccount,
}: {
  onFeatureComplete?: (productKey: string, featureIndex: number) => void;
  /** Persisted second account (so Switch account works after Add new account). */
  addedAccount?: boolean;
  /** Report that the second account was added, so the parent can persist it. */
  onAddAccount?: () => void;
  /**
   * When the user clicks a Mail feature row in the navigator, the parent bumps
   * this to `{ feature, nonce }`. The mockup seeds its internal state so the
   * user starts right at that feature's beginning — letting them try any
   * feature directly, regardless of completion or order. `nonce` lets the same
   * feature be re-selected (forces the seeding effect to re-run).
   */
  jump?: { feature: number; nonce: number } | null;
}) {
  const [composeOpen, setComposeOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [body, setBody] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);
  // Upload lifecycle: idle -> uploading -> done.
  const [uploadStage, setUploadStage] = useState<"idle" | "uploading" | "done">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  // Set once the user clicks "Done" — the file stays attached to the email.
  const [attachDone, setAttachDone] = useState(false);
  // Set once the user clicks "Send" — completes the Compose email flow.
  const [sent, setSent] = useState(false);
  // Inbox view mode — user can switch between Default and Compact.
  const [viewMode, setViewMode] = useState<"default" | "compact">("default");
  // Set once the user first switches the view — completes "Set user preference view".
  const [viewChanged, setViewChanged] = useState(false);
  // Which standalone feature (index) the user jumped to, for features that
  // aren't part of the compose flow (e.g. 4 = View all snaarp products).
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  // Snaarp apps launcher dropdown (feature 4).
  const [appsOpen, setAppsOpen] = useState(false);
  // Quick settings dropdown + inbox type (feature 5). Starts on "Unread first".
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inboxType, setInboxType] = useState<"default" | "unread" | "starred">("unread");
  // Set once the user has switched to "Starred first" — completes the feature.
  const [inboxTypeDone, setInboxTypeDone] = useState(false);
  // Undo Send (feature 6): toggle starts OFF; enabling reveals the cancel-window
  // dropdown; picking a non-"Immediately" window completes the feature.
  const [undoEnabled, setUndoEnabled] = useState(false);
  const [cancelWindow, setCancelWindow] = useState("Immediately");
  const [undoDropdownOpen, setUndoDropdownOpen] = useState(false);
  const [undoDone, setUndoDone] = useState(false);
  // Account switcher (feature 7 = Add new account, feature 8 = Switch account).
  const [accountOpen, setAccountOpen] = useState(false); // avatar dropdown
  const [manageOpen, setManageOpen] = useState(false); // "Manage users" modal
  const [acctEmail, setAcctEmail] = useState("");
  const [acctPassword, setAcctPassword] = useState("");
  // Whether the second account has been added (persisted via prop for Switch).
  const [accountAdded, setAccountAdded] = useState(!!addedAccount);
  // Which account is currently active ("primary" or "secondary"). Switching
  // changes the avatar, greeting and inbox contents.
  const [activeAccount, setActiveAccount] = useState<"primary" | "secondary">("primary");
  // Set once the user switches accounts — completes "Switch account".
  const [switchDone, setSwitchDone] = useState(false);

  const generated = body.length > 0;
  const uploading = uploadStage === "uploading";
  const uploadDone = uploadStage === "done";
  // The file remains attached once the upload starts and stays after "Done".
  const fileAttached = uploadStage !== "idle" || attachDone;

  // Active account drives the avatar, greeting and inbox contents.
  const currentAccount = activeAccount === "secondary" ? NEW_ACCOUNT : PRIMARY_ACCOUNT;
  const currentFirstName = activeAccount === "secondary" ? NEW_ACCOUNT.name.split(" ")[0] : PRIMARY_ACCOUNT.firstName;
  const currentRows = activeAccount === "secondary" ? rowsSecondary : rows;

  // Guided pulse target.
  const toReady = to.toLowerCase().includes("com");
  const subjectReady = subject.trim().length >= 3;
  const promptReady = aiPrompt.trim().length >= 3;
  let pulse: Pulse = "compose";
  if (activeFeature === 4) {
    // View all snaarp products: cue the grid/apps launcher icon until opened.
    pulse = appsOpen ? null : "grid";
  } else if (activeFeature === 5) {
    // Inbox type: gear -> Default -> Starred first, then stop (still switchable).
    if (!settingsOpen) pulse = "gear";
    else if (inboxTypeDone) pulse = null;
    else if (inboxType !== "default") pulse = "inboxDefault";
    else pulse = "inboxStarred";
  } else if (activeFeature === 6) {
    // Undo Send: gear -> enable toggle -> pick a cancel window, then stop.
    if (!settingsOpen) pulse = "gear";
    else if (undoDone) pulse = null;
    else if (!undoEnabled) pulse = "undoToggle";
    else pulse = "undoWindow";
  } else if (activeFeature === 7) {
    // Add new account: avatar -> Add another -> email -> password -> Add account.
    const acctEmailReady = acctEmail.toLowerCase().includes("com");
    const acctPassReady = acctPassword.trim().length >= 3;
    if (accountAdded) pulse = null;
    else if (!accountOpen) pulse = "avatar";
    else if (!manageOpen) pulse = "addAnother";
    else if (!acctEmailReady) pulse = "acctEmail";
    else if (!acctPassReady) pulse = "acctPassword";
    else pulse = "addAccount";
  } else if (activeFeature === 8) {
    // Switch account: avatar -> pick the second account, then stop.
    if (switchDone) pulse = null;
    else if (!accountOpen) pulse = "avatar";
    else pulse = "switchAcct";
  } else if (sent && !composeOpen) {
    // Email sent: cue the Compact view toggle until the user switches views,
    // then stop (they can still toggle back and forth freely).
    pulse = viewChanged ? null : "compact";
  } else if (composeOpen) {
    if (!toReady) pulse = "to";
    else if (!subjectReady) pulse = "subject";
    else if (aiOpen) {
      // AI box open: prompt -> generate -> (once generated) close
      if (!promptReady) pulse = "aiPrompt";
      else if (!generated) pulse = "generate";
      else pulse = "close";
    } else if (!generated) {
      // AI box not opened yet -> cue the sparkle
      pulse = "ai";
    } else if (sent) {
      // Email sent -> Compose email flow complete, no cue
      pulse = null;
    } else if (attachDone) {
      // File attached (Done clicked) -> cue the Send button to finish composing
      pulse = "send";
    } else if (uploadDone) {
      // Upload finished -> cue the "Done" button in the progress modal
      pulse = "done";
    } else if (uploading) {
      // Upload in progress -> no cue while it runs
      pulse = null;
    } else if (!attachOpen) {
      // AI content generated and box closed -> cue the attachment icon
      pulse = "attach";
    } else {
      // Attachment modal open -> cue "Add File" (we start with add file)
      pulse = "addFile";
    }
  }

  const handleGenerate = () => {
    if (generating) return;
    setGenerating(true);
    setTimeout(() => {
      setBody(AI_BODY);
      setGenerating(false);
    }, 1400);
  };

  // User "selects" a file from their computer: close the picker and begin the
  // simulated upload (attachment card in the compose body + progress modal).
  const handleAddFile = () => {
    setAttachOpen(false);
    setUploadProgress(0);
    setUploadStage("uploading");
  };

  // User sends the composed email — completes the "Compose email" feature
  // (Mail index 0) and closes the compose window.
  const handleSend = () => {
    setSent(true);
    onFeatureComplete?.("mail", 0);
    setComposeOpen(false);
  };

  // User changes the inbox type from the Quick settings modal. Switching to
  // "Starred first" completes "Inbox type" (Mail index 5). The modal stays
  // open and the user can keep switching freely afterwards.
  const handleInboxType = (type: "default" | "unread" | "starred") => {
    setInboxType(type);
    if (type === "starred" && !inboxTypeDone) {
      setInboxTypeDone(true);
      onFeatureComplete?.("mail", 5);
    }
  };

  // User picks the second account in the dropdown — switches the active account
  // (avatar, greeting, inbox all change) and completes "Switch account" (8).
  const handleSwitchAccount = () => {
    setActiveAccount("secondary");
    setAccountOpen(false);
    if (!switchDone) {
      setSwitchDone(true);
      onFeatureComplete?.("mail", 8);
    }
  };

  // User submits the "Add account" form — adds the second account, returns to
  // the avatar dropdown showing it, and completes "Add new account" (index 7).
  const handleAddAccount = () => {
    setAccountAdded(true);
    setManageOpen(false);
    setAccountOpen(true); // back to the avatar dropdown, now with the new account
    onAddAccount?.();
    onFeatureComplete?.("mail", 7);
  };

  // User picks a "Cancel window" for Undo Send. Choosing anything other than
  // "Immediately" completes "Undo Send" (Mail index 6). Still changeable after.
  const handleCancelWindow = (value: string) => {
    setCancelWindow(value);
    setUndoDropdownOpen(false);
    if (value !== "Immediately" && !undoDone) {
      setUndoDone(true);
      onFeatureComplete?.("mail", 6);
    }
  };

  // User opens the Snaarp apps launcher — completes "View all snaarp products"
  // (Mail index 4). They can still open/close it freely afterwards.
  const handleOpenApps = () => {
    setAppsOpen((o) => {
      const next = !o;
      if (next) onFeatureComplete?.("mail", 4);
      return next;
    });
  };

  // User switches the inbox view. The first switch completes "Set user
  // preference view" (Mail index 3); afterwards they can toggle freely.
  const handleViewChange = (mode: "default" | "compact") => {
    setViewMode(mode);
    if (!viewChanged) {
      setViewChanged(true);
      onFeatureComplete?.("mail", 3);
    }
  };

  // Drive the upload progress bar while uploading, then flip to "done".
  useEffect(() => {
    if (uploadStage !== "uploading") return;
    const tick = setInterval(() => {
      setUploadProgress((p) => (p < 95 ? Math.min(95, p + 7) : p));
    }, 120);
    const finish = setTimeout(() => {
      setUploadProgress(100);
      setUploadStage("done");
    }, 2200);
    return () => {
      clearInterval(tick);
      clearTimeout(finish);
    };
  }, [uploadStage]);

  // Jump directly to a chosen Mail feature (from the navigator). Reset the
  // compose state, then seed just enough so the user starts at that feature's
  // beginning and the guided pulse lands on the right element.
  useEffect(() => {
    if (!jump) return;
    // Full reset of the compose/upload/view state.
    setAiOpen(false);
    setAiPrompt("");
    setGenerating(false);
    setAttachOpen(false);
    setUploadStage("idle");
    setUploadProgress(0);
    setAttachDone(false);
    setSent(false);
    setActiveFeature(null);
    setAppsOpen(false);
    setSettingsOpen(false);
    setUndoDropdownOpen(false);
    setAccountOpen(false);
    setManageOpen(false);
    setAcctEmail("");
    setAcctPassword("");
    setSwitchDone(false);

    switch (jump.feature) {
      case 0: // Compose email — open an empty compose window (pulse -> To)
        setComposeOpen(true);
        setTo("");
        setSubject("");
        setBody("");
        break;
      case 1: // Use AI composer — compose ready, AI box open (pulse -> prompt)
        setComposeOpen(true);
        setTo("jordan@company.com");
        setSubject("Q3 rollout timeline");
        setBody("");
        setAiOpen(true);
        break;
      case 2: // Attach file or folder — email drafted & closed AI (pulse -> paperclip)
        setComposeOpen(true);
        setTo("jordan@company.com");
        setSubject("Q3 rollout timeline");
        setBody(AI_BODY);
        break;
      case 3: // Set user preference view — compose done (pulse -> Compact)
        setComposeOpen(false);
        setSent(true);
        setViewMode("default");
        setViewChanged(false);
        break;
      case 4: // View all snaarp products — inbox view, pulse the grid/apps icon
        setComposeOpen(false);
        setActiveFeature(4);
        break;
      case 5: // Inbox type — start on "Unread first", pulse the settings gear
        setComposeOpen(false);
        setActiveFeature(5);
        setInboxType("unread");
        setInboxTypeDone(false);
        break;
      case 6: // Undo Send — toggle starts OFF, pulse the settings gear
        setComposeOpen(false);
        setActiveFeature(6);
        setUndoEnabled(false);
        setCancelWindow("Immediately");
        setUndoDone(false);
        break;
      case 7: // Add new account — pulse the avatar, second account not yet added
        setComposeOpen(false);
        setActiveFeature(7);
        setAccountAdded(!!addedAccount);
        break;
      case 8: // Switch account — second account must exist; start on primary
        setComposeOpen(false);
        setActiveFeature(8);
        setAccountAdded(true); // the second account is available to switch to
        setActiveAccount("primary");
        setSwitchDone(false);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jump?.nonce]);

  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid #E7E4EF",
        boxShadow: "0 2px 6px rgba(17,17,17,.05),0 34px 80px rgba(17,17,17,.16)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser chrome */}
      <div style={{ height: 46, background: "#F7F7F7", borderBottom: "1px solid #EDEDED", display: "flex", alignItems: "center", padding: "0 16px", gap: 8, flex: "0 0 auto" }}>
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FF5F57", display: "block" }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#FEBC2E", display: "block" }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: "#28C840", display: "block" }} />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ minWidth: 300, height: 26, borderRadius: 999, background: "#ffffff", border: "1px solid #E9E9E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>app.snaarp.com/mail/inbox</span>
          </div>
        </div>
      </div>

      {/* App body */}
      <div style={{ position: "relative", flex: 1, minHeight: 0, background: "#ffffff" }}>
        {/* Top bar */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56, background: "#ffffff", borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 18px", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, width: 184, flex: "0 0 auto" }}>
            <Image src={icons.mail} alt="" width={26} height={26} style={{ width: 26, height: 26, borderRadius: 8 }} />
            <span style={{ fontSize: 15.5, fontWeight: 700, color: "#111111" }}>Snaarp Mail</span>
          </div>
          <div style={{ flex: 1, height: 38, borderRadius: 999, background: "#F7F7F7", border: "1px solid #EFEFEF", display: "flex", alignItems: "center", padding: "0 14px", gap: 10 }}>
            <Search size={16} strokeWidth={1.75} color="#8A8F98" />
            <span style={{ flex: 1, fontSize: 12.5, color: "#A9A7B2" }}>Search in Inbox</span>
            <SlidersHorizontal size={16} strokeWidth={1.75} color="#8A8F98" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "0 0 auto" }}>
            {/* Settings gear — pulse target for "Inbox type" */}
            <span style={{ position: "relative", display: "flex" }}>
              <button
                type="button"
                onClick={() => setSettingsOpen((o) => !o)}
                aria-label="Quick settings"
                className={pulse === "gear" ? "snp-pulse snp-pulse-front" : undefined}
                style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", padding: 0, background: settingsOpen ? "#F3EDFF" : "transparent" }}
              >
                <Settings size={18} strokeWidth={1.75} color={settingsOpen ? "#7C3AED" : "#8A8F98"} />
              </button>

              {/* Quick settings dropdown */}
              {settingsOpen && (
                <div
                  className="snp-mockup-fade snp-scroll"
                  style={{ position: "absolute", top: 40, right: 0, width: 300, maxHeight: 400, overflowY: "auto", background: "#ffffff", border: "1px solid #ECEAF2", borderRadius: 14, boxShadow: "0 10px 34px rgba(17,17,17,.16)", padding: "16px 16px 14px", zIndex: 30 }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: "#111111" }}>Quick settings</span>
                    <Settings size={15} strokeWidth={1.75} color="#8A8F98" />
                  </div>
                  <div style={{ border: "1px solid #E5E3EA", borderRadius: 8, padding: "9px 0", textAlign: "center", fontSize: 12.5, fontWeight: 500, color: "#4B5563", marginBottom: 16 }}>See all settings</div>

                  {/* INBOX TYPE */}
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", color: "#8A8F98", marginBottom: 10 }}>INBOX TYPE</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
                    {([
                      { key: "default" as const, label: "Default", icon: MailIcon, pk: "inboxDefault" as const },
                      { key: "unread" as const, label: "Unread first", icon: Eye, pk: null },
                      { key: "starred" as const, label: "Starred first", icon: LayoutGrid, pk: "inboxStarred" as const },
                    ]).map((opt) => {
                      const Icon = opt.icon;
                      const selected = inboxType === opt.key;
                      const isPulse = opt.pk !== null && pulse === opt.pk;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleInboxType(opt.key)}
                          className={isPulse ? "snp-pulse snp-pulse-front" : undefined}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "10px 4px", borderRadius: 10, border: selected ? "1px solid #B794F4" : "1px solid #E5E3EA", background: selected ? "#F3EDFF" : "#ffffff", cursor: "pointer", font: "inherit", transition: "background .15s ease" }}
                        >
                          <Icon size={16} strokeWidth={1.75} color={selected ? "#7C3AED" : "#8A8F98"} />
                          <span style={{ fontSize: 10.5, fontWeight: 500, color: selected ? "#7C3AED" : "#4B5563", whiteSpace: "nowrap" }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* EMAIL PREVIEW */}
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", color: "#8A8F98", marginBottom: 8 }}>EMAIL PREVIEW</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ fontSize: 12.5, color: "#4B5563" }}>Show snippets</span>
                    <span style={{ width: 34, height: 18, borderRadius: 99, background: "#7C3AED", position: "relative", flex: "0 0 auto" }}>
                      <span style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, borderRadius: 99, background: "#fff" }} />
                    </span>
                  </div>

                  {/* CONVERSATIONS */}
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", color: "#8A8F98", marginBottom: 8 }}>CONVERSATIONS</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ fontSize: 12.5, color: "#4B5563" }}>Group by conversation</span>
                    <span style={{ width: 34, height: 18, borderRadius: 99, background: "#7C3AED", position: "relative", flex: "0 0 auto" }}>
                      <span style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, borderRadius: 99, background: "#fff" }} />
                    </span>
                  </div>

                  {/* UNDO SEND */}
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", color: "#8A8F98", marginBottom: 8 }}>UNDO SEND</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: undoEnabled ? 10 : 16 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#4B5563" }}><Undo2 size={13} strokeWidth={1.75} /> Enable undo send</span>
                    {/* Toggle (pulse target) */}
                    <button
                      type="button"
                      onClick={() => setUndoEnabled((v) => !v)}
                      aria-label="Enable undo send"
                      aria-pressed={undoEnabled}
                      className={pulse === "undoToggle" ? "snp-pulse snp-pulse-front" : undefined}
                      style={{ width: 34, height: 18, borderRadius: 99, background: undoEnabled ? "#7C3AED" : "#D6D3DE", position: "relative", flex: "0 0 auto", border: "none", cursor: "pointer", padding: 0, transition: "background .15s ease" }}
                    >
                      <span style={{ position: "absolute", top: 2, left: undoEnabled ? 18 : 2, width: 14, height: 14, borderRadius: 99, background: "#fff", transition: "left .15s ease" }} />
                    </button>
                  </div>
                  {/* Cancel window — only shown once undo send is enabled */}
                  {undoEnabled && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, position: "relative" }}>
                      <span style={{ fontSize: 12.5, color: "#4B5563" }}>Cancel window</span>
                      <span style={{ position: "relative" }}>
                        <button
                          type="button"
                          onClick={() => setUndoDropdownOpen((o) => !o)}
                          className={pulse === "undoWindow" ? "snp-pulse snp-pulse-front" : undefined}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#111111", background: "#ffffff", border: "1px solid #E5E3EA", borderRadius: 7, padding: "5px 9px", cursor: "pointer", font: "inherit", minWidth: 108, justifyContent: "space-between" }}
                        >
                          {cancelWindow} <ChevronDown size={11} strokeWidth={2} />
                        </button>
                        {undoDropdownOpen && (
                          <div style={{ position: "absolute", top: 32, right: 0, width: 130, background: "#ffffff", border: "1px solid #ECEAF2", borderRadius: 8, boxShadow: "0 8px 22px rgba(17,17,17,.14)", padding: 4, zIndex: 40 }}>
                            {["Immediately", "5 seconds", "10 seconds", "20 seconds", "30 seconds"].map((opt) => {
                              const active = opt === cancelWindow;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleCancelWindow(opt)}
                                  style={{ width: "100%", textAlign: "left", fontSize: 12, fontWeight: active ? 600 : 400, color: active ? "#7C3AED" : "#4B5563", background: active ? "#F3EDFF" : "transparent", border: "none", borderRadius: 6, padding: "7px 10px", cursor: "pointer", font: "inherit" }}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </span>
                    </div>
                  )}

                  {/* EXTERNAL IMAGES */}
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", color: "#8A8F98", marginBottom: 8 }}>EXTERNAL IMAGES</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                    {[
                      { label: "Always show", on: false },
                      { label: "Ask first", on: true },
                      { label: "Never show", on: false },
                    ].map((o) => (
                      <div key={o.label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <span style={{ width: 14, height: 14, borderRadius: 99, border: o.on ? "4px solid #7C3AED" : "1.5px solid #C9C7D2", flex: "0 0 auto" }} />
                        <span style={{ fontSize: 12.5, color: "#4B5563" }}>{o.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* OFFLINE MODE */}
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", color: "#8A8F98", marginBottom: 8 }}>OFFLINE MODE</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#4B5563" }}><HardDrive size={13} strokeWidth={1.75} /> Cache emails offline</span>
                    <span style={{ width: 34, height: 18, borderRadius: 99, background: "#7C3AED", position: "relative", flex: "0 0 auto" }}>
                      <span style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, borderRadius: 99, background: "#fff" }} />
                    </span>
                  </div>

                  {/* DENSITY */}
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", color: "#8A8F98", marginBottom: 10 }}>DENSITY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {[
                      { label: "Compact", icon: Grid2x2, active: true },
                      { label: "Default", icon: List, active: false },
                      { label: "Spacious", icon: List, active: false },
                    ].map((d) => {
                      const Icon = d.icon;
                      return (
                        <div key={d.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "10px 4px", borderRadius: 10, border: d.active ? "1px solid #B794F4" : "1px solid #E5E3EA", background: d.active ? "#F3EDFF" : "#ffffff" }}>
                          <Icon size={16} strokeWidth={1.75} color={d.active ? "#7C3AED" : "#8A8F98"} />
                          <span style={{ fontSize: 10.5, fontWeight: 500, color: d.active ? "#7C3AED" : "#4B5563" }}>{d.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </span>
            {/* Apps launcher (grid) — pulse target for "View all snaarp products" */}
            <span style={{ position: "relative", display: "flex" }}>
              <button
                type="button"
                onClick={handleOpenApps}
                aria-label="View all snaarp products"
                className={pulse === "grid" ? "snp-pulse snp-pulse-front" : undefined}
                style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", padding: 0, background: appsOpen ? "#F3EDFF" : "transparent", color: appsOpen ? "#7C3AED" : "#8A8F98" }}
              >
                <LayoutGrid size={18} strokeWidth={1.75} color={appsOpen ? "#7C3AED" : "#8A8F98"} />
              </button>

              {/* Snaarp apps dropdown */}
              {appsOpen && (
                <div
                  className="snp-mockup-fade"
                  style={{ position: "absolute", top: 40, right: 0, width: 300, background: "#ffffff", border: "1px solid #ECEAF2", borderRadius: 16, boxShadow: "0 10px 34px rgba(17,17,17,.16)", padding: "16px 8px 12px", zIndex: 30 }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111111", padding: "0 12px 12px" }}>Snaarp apps</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                    {APPS.map((a) => (
                      <div key={a.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "12px 6px", borderRadius: 12, cursor: "pointer" }} className="snp-feature-row">
                        <span style={{ width: 40, height: 40, borderRadius: 12, background: "#F3EDFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Image src={a.icon} alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 7 }} />
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap" }}>{a.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </span>
            {/* Avatar — pulse target for "Add new account" */}
            <span style={{ position: "relative", display: "flex" }}>
              <button
                type="button"
                onClick={() => setAccountOpen((o) => !o)}
                aria-label="Account"
                className={pulse === "avatar" ? "snp-pulse snp-pulse-front" : undefined}
                style={{ width: 32, height: 32, borderRadius: 99, background: currentAccount.avBg, color: "#fff", fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", padding: 0, transition: "background .2s ease" }}
              >
                {currentAccount.initials}
              </button>

              {/* Account dropdown */}
              {accountOpen && (
                <div className="snp-mockup-fade" style={{ position: "absolute", top: 42, right: 0, width: 320, background: "#F3F4FB", border: "1px solid #E4E2EE", borderRadius: 16, boxShadow: "0 12px 36px rgba(17,17,17,.18)", zIndex: 35, overflow: "hidden" }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "12px 0 4px" }}>
                    <span style={{ fontSize: 12.5, color: "#4B5563" }}>{currentAccount.email}</span>
                    <button type="button" onClick={() => setAccountOpen(false)} aria-label="Close" style={{ position: "absolute", right: 12, top: 10, border: "none", background: "transparent", cursor: "pointer", color: "#8A8F98", display: "flex", padding: 0 }}><X size={16} strokeWidth={2} /></button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "6px 0 14px" }}>
                    <span style={{ width: 64, height: 64, borderRadius: 99, background: currentAccount.avBg, color: "#fff", fontSize: 22, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{currentAccount.initials}</span>
                    <span style={{ fontSize: 19, fontWeight: 700, color: "#111111" }}>Hi, {currentFirstName}!</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#4B5563", border: "1px solid #D6D3DE", borderRadius: 999, padding: "7px 16px", background: "#ffffff" }}>Manage your account</span>
                  </div>

                  {/* Accounts list */}
                  <div style={{ background: "#ffffff", borderRadius: 14, margin: "0 10px 10px", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#111111" }}>Hide more accounts</span>
                      <ChevronUp size={16} strokeWidth={2} color="#8A8F98" />
                    </div>
                    {/* Primary account — clickable to switch back */}
                    <button
                      type="button"
                      onClick={() => { setActiveAccount("primary"); setAccountOpen(false); }}
                      className="snp-feature-row"
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: activeAccount === "primary" ? "#F7F5FF" : "transparent", border: "none", cursor: "pointer", font: "inherit", textAlign: "left" }}
                    >
                      <span style={{ width: 30, height: 30, borderRadius: 99, background: PRIMARY_ACCOUNT.avBg, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{PRIMARY_ACCOUNT.initials}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#111111" }}>{PRIMARY_ACCOUNT.name}</div>
                        <div style={{ fontSize: 11, color: "#8A8F98" }}>{PRIMARY_ACCOUNT.email}</div>
                      </div>
                      <span style={{ fontSize: 10.5, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 6, padding: "3px 8px", flex: "0 0 auto" }}>Default</span>
                    </button>
                    {/* Second account — clickable to switch to (pulse target) */}
                    {accountAdded && (
                      <button
                        type="button"
                        onClick={handleSwitchAccount}
                        className={pulse === "switchAcct" ? "snp-pulse snp-pulse-front" : "snp-feature-row"}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderTop: "1px solid #F3F2F6", background: activeAccount === "secondary" ? "#F7F5FF" : "transparent", border: "none", cursor: "pointer", font: "inherit", textAlign: "left" }}
                      >
                        <span style={{ width: 30, height: 30, borderRadius: 99, background: NEW_ACCOUNT.avBg, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{NEW_ACCOUNT.initials}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#111111" }}>{NEW_ACCOUNT.name}</div>
                          <div style={{ fontSize: 11, color: "#8A8F98" }}>{NEW_ACCOUNT.email}</div>
                        </div>
                      </button>
                    )}
                    {/* Add another account (pulse target) */}
                    <button
                      type="button"
                      onClick={() => setManageOpen(true)}
                      className={pulse === "addAnother" ? "snp-pulse snp-pulse-front" : undefined}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderTop: "1px solid #F3F2F6", background: "transparent", border: "none", cursor: "pointer", font: "inherit", textAlign: "left" }}
                    >
                      <span style={{ width: 26, height: 26, borderRadius: 99, background: "#EAF1FE", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}><Plus size={15} strokeWidth={2} color="#3B82F6" /></span>
                      <span style={{ fontSize: 12.5, fontWeight: 500, color: "#4B5563" }}>Add another account</span>
                    </button>
                    {/* Sign out */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderTop: "1px solid #F3F2F6" }}>
                      <LogOut size={16} strokeWidth={1.75} color="#8A8F98" />
                      <span style={{ fontSize: 12.5, fontWeight: 500, color: "#4B5563" }}>Sign out of all accounts</span>
                    </div>
                  </div>
                </div>
              )}
            </span>
          </div>
        </div>

        {/* Left sidebar */}
        <div style={{ position: "absolute", left: 0, top: 56, bottom: 0, width: 210, background: "#ffffff", borderRight: "1px solid #F0EFF4", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3, overflow: "hidden" }}>
          <button
            type="button"
            onClick={() => setComposeOpen(true)}
            className={pulse === "compose" ? "snp-pulse" : undefined}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, fontSize: 13.5, fontWeight: 600, color: "#ffffff", background: "#7C3AED", border: "none", borderRadius: 999, padding: "11px 18px", boxShadow: "0 1px 2px rgba(17,17,17,.06),0 8px 18px rgba(124,58,237,.28)", marginBottom: 10, cursor: "pointer", font: "inherit" }}
          >
            <PenLine size={15} strokeWidth={2} /> Compose
          </button>

          {navTop.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", borderRadius: 999, background: n.active ? "#F3EDFF" : "transparent", color: n.active ? "#7C3AED" : "#4B5563" }}>
                <Icon size={18} strokeWidth={1.75} color={n.active ? "#7C3AED" : "#8A8F98"} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: n.active ? 600 : 500 }}>{n.label}</span>
                {n.count && <span style={{ fontSize: 11.5, fontWeight: 600, color: n.active ? "#7C3AED" : "#8A8F98" }}>{n.count}</span>}
              </div>
            );
          })}

          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", color: "#8A8F98" }}>
            <ChevronUp size={18} strokeWidth={1.75} color="#8A8F98" />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Less</span>
          </div>

          {navMore.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", borderRadius: 999, color: "#4B5563" }}>
                <Icon size={18} strokeWidth={1.75} color="#8A8F98" />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{n.label}</span>
              </div>
            );
          })}
        </div>

        {/* Main list panel */}
        <div style={{ position: "absolute", left: 210, right: 0, top: 56, bottom: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: 44, borderBottom: "1px solid #F0EFF4", display: "flex", alignItems: "center", padding: "0 18px", gap: 12, flex: "0 0 auto" }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, border: "1.6px solid #C9C7D2", display: "block", flex: "0 0 auto" }} />
            <ChevronDown size={15} strokeWidth={1.75} color="#8A8F98" />
            <RefreshCw size={15} strokeWidth={1.75} color="#8A8F98" />
            <span style={{ flex: 1 }} />
            <div style={{ display: "flex", border: "1px solid #EFEFEF", borderRadius: 999, padding: 2, background: "#ffffff" }}>
              <button
                type="button"
                onClick={() => handleViewChange("default")}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: viewMode === "default" ? "#7C3AED" : "#8A8F98", background: viewMode === "default" ? "#F3EDFF" : "transparent", borderRadius: 999, padding: "5px 12px", border: "none", cursor: "pointer", font: "inherit", transition: "background .15s ease, color .15s ease" }}
              >
                <List size={13} strokeWidth={2} /> Default
              </button>
              <button
                type="button"
                onClick={() => handleViewChange("compact")}
                className={pulse === "compact" ? "snp-pulse snp-pulse-front" : undefined}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: viewMode === "compact" ? "#7C3AED" : "#8A8F98", background: viewMode === "compact" ? "#F3EDFF" : "transparent", borderRadius: 999, padding: "5px 12px", border: "none", cursor: "pointer", font: "inherit", transition: "background .15s ease, color .15s ease" }}
              >
                <Grid2x2 size={13} strokeWidth={2} /> Compact
              </button>
            </div>
          </div>

          {inboxType === "default" ? (
            /* Default inbox type — category tabs (Primary / Updates / …) */
            <div style={{ height: 42, display: "flex", alignItems: "stretch", padding: "0 18px", gap: 22, flex: "0 0 auto", borderBottom: "1px solid #F0EFF4" }}>
              {[
                { label: "Primary (5)", icon: Inbox, active: true },
                { label: "Updates", icon: MailIcon, active: false },
                { label: "Promotions (3)", icon: Star, active: false },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <span key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: t.active ? "#7C3AED" : "#8A8F98", borderBottom: t.active ? "2px solid #7C3AED" : "2px solid transparent" }}>
                    <Icon size={14} strokeWidth={1.75} /> {t.label}
                  </span>
                );
              })}
            </div>
          ) : (
            /* Unread first / Starred first — section header */
            <div style={{ height: 38, display: "flex", alignItems: "center", padding: "0 18px", gap: 8, flex: "0 0 auto", background: "#FBFAFD", borderBottom: "1px solid #F3F2F6" }}>
              <ChevronDown size={15} strokeWidth={2} color="#4B5563" />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#111111" }}>{inboxType === "starred" ? "Starred" : "Unread"}</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 11.5, color: "#8A8F98" }}>1–8 of 8</span>
              <span style={{ display: "flex", alignItems: "center", gap: 2, color: "#C4C4C4" }}>
                <span style={{ fontSize: 14 }}>‹</span>
                <span style={{ fontSize: 14 }}>›</span>
              </span>
              <MoreVertical size={15} strokeWidth={1.75} color="#8A8F98" />
            </div>
          )}

          {/* Starred first shows an empty starred section above the list */}
          {inboxType === "starred" && (
            <div style={{ padding: "18px 18px", textAlign: "center", fontSize: 12.5, color: "#8A8F98", borderBottom: "1px solid #F3F2F6", flex: "0 0 auto" }}>
              No starred emails
            </div>
          )}
          {inboxType === "starred" && (
            <div style={{ height: 34, display: "flex", alignItems: "center", padding: "0 18px", gap: 8, flex: "0 0 auto", background: "#FBFAFD", borderBottom: "1px solid #F3F2F6" }}>
              <ChevronDown size={15} strokeWidth={2} color="#4B5563" />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#111111" }}>Everything else</span>
            </div>
          )}

          <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            {viewMode === "compact"
              ? /* Compact view — single dense row per message */
                currentRows.map((r, k) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 18px", borderBottom: "1px solid #F3F2F6", background: "#ffffff" }}>
                    <span style={{ width: 14, height: 14, borderRadius: 4, border: "1.6px solid #C9C7D2", display: "block", flex: "0 0 auto" }} />
                    <Star size={14} strokeWidth={1.75} color="#C9C7D2" style={{ flex: "0 0 auto" }} />
                    <span style={{ width: 128, flex: "0 0 auto", fontSize: 12.5, fontWeight: r.unread ? 700 : 500, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.sender}</span>
                    <div style={{ flex: 1, minWidth: 0, fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <span style={{ color: r.unread ? "#111111" : "#4B5563", fontWeight: r.unread ? 600 : 400 }}>{r.subject}</span>
                      {r.isNew && <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", background: "#7C3AED", borderRadius: 5, padding: "1px 6px", marginLeft: 8 }}>New</span>}
                      {r.preview && <span style={{ color: "#8A8F98" }}> {r.preview}</span>}
                    </div>
                    {r.attachments && <Paperclip size={13} strokeWidth={1.75} color="#8A8F98" style={{ flex: "0 0 auto" }} />}
                    <span style={{ fontSize: 11, fontWeight: r.unread ? 700 : 400, color: r.unread ? "#111111" : "#8A8F98", flex: "0 0 auto", width: 54, textAlign: "right" }}>{r.date}</span>
                  </div>
                ))
              : /* Default view — roomy row with avatar + attachment chips */
                currentRows.map((r, k) => (
                  <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 18px", borderBottom: "1px solid #F3F2F6", background: "#ffffff" }}>
                    <span style={{ width: 15, height: 15, borderRadius: 4, border: "1.6px solid #C9C7D2", display: "block", flex: "0 0 auto", marginTop: 6 }} />
                    <Star size={15} strokeWidth={1.75} color="#C9C7D2" style={{ flex: "0 0 auto", marginTop: 6 }} />
                    <span style={{ width: 30, height: 30, borderRadius: 99, background: r.avBg, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{r.initials}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: r.unread ? 700 : 500, color: "#111111", whiteSpace: "nowrap" }}>{r.sender}</span>
                        {r.isNew && <span style={{ fontSize: 9.5, fontWeight: 700, color: "#fff", background: "#7C3AED", borderRadius: 5, padding: "2px 7px" }}>New</span>}
                      </div>
                      <div style={{ fontSize: 12.5, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <span style={{ color: r.unread ? "#111111" : "#4B5563", fontWeight: r.unread ? 600 : 400 }}>{r.subject}</span>
                        {r.preview && <span style={{ color: "#8A8F98" }}> {r.preview}</span>}
                      </div>
                      {r.attachments && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F3EDFF", borderRadius: 6, padding: "3px 9px" }}>
                            <Paperclip size={11} strokeWidth={2} /> {r.attachments.length} attachments
                          </span>
                          {r.attachments.map((a) => (
                            <AttachmentChip key={a.name} name={a.name} kind={a.kind} />
                          ))}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 11.5, fontWeight: r.unread ? 700 : 400, color: r.unread ? "#111111" : "#8A8F98", flex: "0 0 auto", marginTop: 4 }}>{r.date}</span>
                  </div>
                ))}
          </div>
        </div>

        {/* New Message modal (bottom-right) — matches the real product */}
        {composeOpen && (
          <div
            className="snp-mockup-fade"
            style={{
              position: "absolute",
              right: 20,
              bottom: 0,
              width: 460,
              background: "#ffffff",
              border: "1px solid #E5E3EA",
              borderRadius: "12px 12px 0 0",
              boxShadow: "0 -2px 8px rgba(17,17,17,.05),0 -26px 60px rgba(17,17,17,.22)",
              overflow: "hidden",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ height: 40, background: "#F1F3F4", display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>New Message</span>
              <span style={{ display: "flex", alignItems: "center", gap: 14, color: "#5F6368" }}>
                <Minus size={15} strokeWidth={2} />
                <Maximize2 size={13} strokeWidth={2} />
                <button type="button" onClick={() => setComposeOpen(false)} style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", color: "#5F6368", display: "flex" }} aria-label="Close">
                  <X size={16} strokeWidth={2} />
                </button>
              </span>
            </div>

            {/* To */}
            <div className={pulse === "to" ? "snp-pulse" : undefined} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderBottom: "1px solid #F0EFF4", borderRadius: pulse === "to" ? 6 : 0 }}>
              <span style={{ fontSize: 12.5, color: "#8A8F98" }}>To</span>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 12.5, color: "#111111", fontFamily: "inherit", background: "transparent" }}
              />
              <span style={{ fontSize: 12, color: "#8A8F98" }}>Cc Bcc</span>
            </div>

            {/* Subject */}
            <div className={pulse === "subject" ? "snp-pulse" : undefined} style={{ display: "flex", alignItems: "center", padding: "9px 14px", borderBottom: "1px solid #F0EFF4", borderRadius: pulse === "subject" ? 6 : 0 }}>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                style={{ flex: 1, border: "none", outline: "none", fontSize: 12.5, color: "#111111", fontFamily: "inherit", background: "transparent" }}
              />
            </div>

            {/* Body — filled with the AI-generated content once generated */}
            <div style={{ minHeight: 150, maxHeight: 190, overflowY: "auto", padding: "12px 14px", fontSize: 12.5, lineHeight: 1.6, color: "#4B5563", position: "relative", whiteSpace: "pre-wrap" }}>
              {generating ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#7C3AED", fontWeight: 500 }}>
                  <Sparkles size={14} strokeWidth={2} className="snp-spin" /> Generating…
                </span>
              ) : (
                body
              )}
            </div>

            {/* Attachment thumbnail card (stays in the compose area once attached) */}
            {fileAttached && (
              <div style={{ padding: "0 14px 12px" }}>
                <div style={{ position: "relative", width: 150, border: "1px solid #E5E3EA", borderRadius: 10, overflow: "hidden", background: "#ffffff" }}>
                  {/* Remove */}
                  <button
                    type="button"
                    aria-label="Remove attachment"
                    style={{ position: "absolute", top: 6, right: 6, width: 20, height: 20, borderRadius: 99, background: "rgba(255,255,255,.92)", border: "1px solid #E5E3EA", display: "flex", alignItems: "center", justifyContent: "center", color: "#5F6368", cursor: "pointer", padding: 0, zIndex: 2 }}
                  >
                    <X size={12} strokeWidth={2.2} />
                  </button>
                  {/* Thumbnail */}
                  <div style={{ height: 74, background: "#F3EDFF", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <FileVideo size={26} strokeWidth={1.75} color="#7C3AED" />
                    <span style={{ position: "absolute", bottom: 6, left: 6, fontSize: 8, fontWeight: 700, color: "#fff", background: "#DC2626", borderRadius: 3, padding: "1px 4px" }}>MP4</span>
                  </div>
                  {/* Meta + progress */}
                  <div style={{ padding: "7px 9px 9px" }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{UPLOAD_FILE.name}</div>
                    {uploadDone || attachDone ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 10.5, fontWeight: 600, color: "#16A34A" }}>
                        <CheckCircle2 size={12} strokeWidth={2.2} /> Complete
                      </div>
                    ) : (
                      <>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, fontSize: 10.5, color: "#8A8F98" }}>
                          <span>Uploading…</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div style={{ marginTop: 4, height: 3, borderRadius: 99, background: "#EDEBF3", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${uploadProgress}%`, background: "#7C3AED", borderRadius: 99, transition: "width .15s linear" }} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* AI composer box — appears above the toolbar when opened */}
            {aiOpen && (
              <div style={{ margin: "0 12px 10px", background: "#ffffff", border: "1px solid #E7DDFC", borderRadius: 12, boxShadow: "0 1px 2px rgba(17,17,17,.04),0 8px 22px rgba(124,58,237,.10)", padding: 12 }}>
                <div className={pulse === "aiPrompt" ? "snp-pulse" : undefined} style={{ borderRadius: 8, marginBottom: 10 }}>
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Describe what you want to write…"
                    disabled={generating}
                    style={{ width: "100%", border: "none", outline: "none", fontSize: 12.5, color: "#111111", fontFamily: "inherit", background: "transparent", padding: "2px 2px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* Tone selector */}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 500, color: "#4B5563", background: "#F7F7F7", border: "1px solid #EFEFEF", borderRadius: 8, padding: "6px 10px" }}>
                    Professional <ChevronDown size={12} strokeWidth={2} />
                  </span>
                  <span style={{ flex: 1 }} />
                  {/* Cancel / Close */}
                  <button
                    type="button"
                    onClick={() => {
                      // Closing after a successful generation completes the
                      // "Use AI composer" feature (Mail feature index 1).
                      if (generated) onFeatureComplete?.("mail", 1);
                      setAiOpen(false);
                    }}
                    className={pulse === "close" ? "snp-pulse" : undefined}
                    style={{ fontSize: 12, fontWeight: 600, color: "#4B5563", background: "#ffffff", border: "1px solid #E5E3EA", borderRadius: 8, padding: "7px 14px", cursor: "pointer", font: "inherit" }}
                  >
                    {generated ? "Close" : "Cancel"}
                  </button>
                  {/* Generate / Regenerate */}
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={!promptReady || generating}
                    className={pulse === "generate" ? "snp-pulse" : undefined}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      color: promptReady ? "#ffffff" : "#9CA3AF",
                      background: promptReady ? "#7C3AED" : "#F1F1F3",
                      border: "none",
                      borderRadius: 8,
                      padding: "7px 14px",
                      cursor: promptReady && !generating ? "pointer" : "default",
                      font: "inherit",
                      transition: "background .2s ease, color .2s ease",
                    }}
                  >
                    <Sparkles size={13} strokeWidth={2} />
                    {generated ? "Regenerate" : "Generate"}
                  </button>
                </div>
              </div>
            )}

            {/* Formatting toolbar */}
            <div style={{ margin: "0 12px", background: "#F1F3F4", borderRadius: 999, display: "flex", alignItems: "center", gap: 2, padding: "5px 10px", flexWrap: "nowrap", overflow: "hidden" }}>
              <TB><Undo2 size={14} strokeWidth={1.75} /></TB>
              <TB><Redo2 size={14} strokeWidth={1.75} /></TB>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "#5F6368", padding: "0 6px" }}>Arial <ChevronDown size={12} strokeWidth={2} /></span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "#5F6368", padding: "0 6px" }}>Medium <ChevronDown size={12} strokeWidth={2} /></span>
              <TB><Bold size={14} strokeWidth={2} /></TB>
              <TB><Italic size={14} strokeWidth={2} /></TB>
              <TB><Underline size={14} strokeWidth={2} /></TB>
              <TB><Baseline size={14} strokeWidth={2} /></TB>
              <TB><AlignLeft size={14} strokeWidth={1.75} /></TB>
              <TB><List size={14} strokeWidth={1.75} /></TB>
              <TB><ListOrdered size={14} strokeWidth={1.75} /></TB>
              <TB><Outdent size={14} strokeWidth={1.75} /></TB>
              <TB><Indent size={14} strokeWidth={1.75} /></TB>
            </div>

            {/* Bottom action row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
              {/* Send split button — pulse on a wrapper so the ring isn't
                  clipped by the button's own `overflow: hidden`. */}
              <span className={pulse === "send" ? "snp-pulse" : undefined} style={{ display: "inline-flex", borderRadius: 999 }}>
                <span style={{ display: "inline-flex", alignItems: "center", background: "#7C3AED", borderRadius: 999, overflow: "hidden" }}>
                  <button type="button" onClick={handleSend} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#ffffff", padding: "9px 18px", background: "transparent", border: "none", cursor: "pointer", font: "inherit" }}>Send</button>
                  <span style={{ width: 1, height: 20, background: "rgba(255,255,255,.3)" }} />
                  <span style={{ display: "flex", alignItems: "center", padding: "0 8px", color: "#ffffff" }}><ChevronDown size={14} strokeWidth={2} /></span>
                </span>
              </span>

              {/* AI composer toggle (pulse target) */}
              <button
                type="button"
                onClick={() => setAiOpen((o) => !o)}
                className={pulse === "ai" ? "snp-pulse" : undefined}
                aria-label="AI composer"
                style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: pulse === "ai" || aiOpen ? "#7C3AED" : "#5F6368", background: pulse === "ai" || aiOpen ? "#F3EDFF" : "transparent", flex: "0 0 auto", border: "none", cursor: "pointer", padding: 0 }}
              >
                <Sparkles size={16} strokeWidth={2} />
              </button>
              <TB><Type size={15} strokeWidth={1.75} /></TB>
              {/* Attachment (paperclip) — opens the "Open a file" modal */}
              <button
                type="button"
                onClick={() => setAttachOpen(true)}
                aria-label="Attach file or folder"
                className={pulse === "attach" ? "snp-pulse" : undefined}
                style={{ width: 24, height: 24, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", color: pulse === "attach" ? "#7C3AED" : "#5F6368", background: pulse === "attach" ? "#F3EDFF" : "transparent", flex: "0 0 auto", border: "none", cursor: "pointer", padding: 0 }}
              >
                <Paperclip size={15} strokeWidth={1.75} />
              </button>
              <TB><LinkIcon size={15} strokeWidth={1.75} /></TB>
              <TB><Smile size={15} strokeWidth={1.75} /></TB>
              <span style={{ flex: 1 }} />
              <Trash2 size={16} strokeWidth={1.75} color="#DC2626" />
            </div>
          </div>
        )}

        {/* "Open a file" attachment modal — centered over the app body */}
        {attachOpen && (
          <div style={{ position: "absolute", inset: 0, zIndex: 40, background: "rgba(17,17,17,.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div className="snp-mockup-fade" style={{ width: 520, maxWidth: "100%", background: "#ffffff", borderRadius: 16, boxShadow: "0 10px 40px rgba(17,17,17,.28)", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 0" }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: "#111111" }}>Open a file</span>
                <button type="button" onClick={() => setAttachOpen(false)} aria-label="Close" style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", color: "#8A8F98", display: "flex" }}>
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "14px 22px 0", borderBottom: "1px solid #EEECF3" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#7C3AED", borderBottom: "2px solid #7C3AED", paddingBottom: 10 }}>
                  <Upload size={15} strokeWidth={2} /> Upload
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#8A8F98", borderBottom: "2px solid transparent", paddingBottom: 10 }}>
                  <HardDrive size={15} strokeWidth={1.75} /> Drive
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: 22 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {/* Add File (pulse target) */}
                  <button
                    type="button"
                    onClick={handleAddFile}
                    className={pulse === "addFile" ? "snp-pulse" : undefined}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, background: "#ffffff", border: "1px solid #E5E3EA", borderRadius: 12, padding: "26px 16px", cursor: "pointer", font: "inherit", textAlign: "center" }}
                  >
                    <span style={{ width: 40, height: 40, borderRadius: 10, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                      <FileUp size={19} strokeWidth={1.75} color="#4B5563" />
                    </span>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: "#111111" }}>Add File</span>
                    <span style={{ fontSize: 12, color: "#8A8F98" }}>Upload one or more files</span>
                  </button>

                  {/* Add Folder */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, background: "#ffffff", border: "1px solid #E5E3EA", borderRadius: 12, padding: "26px 16px", textAlign: "center" }}>
                    <span style={{ width: 40, height: 40, borderRadius: 10, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                      <FolderUp size={19} strokeWidth={1.75} color="#4B5563" />
                    </span>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: "#111111" }}>Add Folder</span>
                    <span style={{ fontSize: 12, color: "#8A8F98" }}>Upload a folder as one item</span>
                  </div>
                </div>

                {/* Dropzone */}
                <div style={{ marginTop: 16, border: "1.5px dashed #D9D5E4", borderRadius: 12, padding: "22px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#8A8F98" }}>
                  <Upload size={18} strokeWidth={1.75} />
                  <span style={{ fontSize: 12.5 }}>Or drag and drop files here</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload progress modal — bottom-left of the mail page */}
        {uploadStage !== "idle" && (
          <div
            className="snp-mockup-fade"
            style={{
              position: "absolute",
              left: 16,
              bottom: 16,
              width: 320,
              background: "#1F1F24",
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(17,17,17,.35)",
              overflow: "hidden",
              zIndex: 50,
              color: "#fff",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
              {uploadDone ? (
                <CheckCircle2 size={18} strokeWidth={2} color="#22C55E" />
              ) : (
                <Loader2 size={18} strokeWidth={2} color="#A78BFA" className="snp-spin" />
              )}
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>
                {uploadDone ? "1 upload finished" : "1 upload in progress"}
              </span>
              {uploadDone ? (
                <button
                  type="button"
                  onClick={() => {
                    // Completes the "Attach file or folder" feature (Mail index 2)
                    // and ends this segment of the tour (stops the pulse).
                    onFeatureComplete?.("mail", 2);
                    setUploadStage("idle");
                    setAttachDone(true);
                  }}
                  className={pulse === "done" ? "snp-pulse" : undefined}
                  style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "transparent", border: "none", cursor: "pointer", font: "inherit", padding: "2px 4px", borderRadius: 6 }}
                >
                  Done
                </button>
              ) : (
                <>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#C7C5CE" }}>Cancel all</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#C7C5CE" }}>Close</span>
                </>
              )}
              <ChevronDown size={16} strokeWidth={2} color="#9C9AA5" />
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 14px 10px", fontSize: 11.5, fontWeight: 600 }}>
              <span style={{ color: "#fff", borderBottom: "2px solid #A78BFA", paddingBottom: 4 }}>All (1)</span>
              <span style={{ color: "#8A8892" }}>Processing {uploadDone ? "" : "(1)"}</span>
              <span style={{ color: "#8A8892" }}>Completed {uploadDone ? "(1)" : ""}</span>
              <span style={{ color: "#8A8892" }}>Failed</span>
            </div>

            {/* File row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
              <span style={{ width: 26, height: 26, borderRadius: 99, border: uploadDone ? "none" : "2px solid rgba(167,139,250,.4)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", background: uploadDone ? "#22C55E" : "transparent" }}>
                {uploadDone ? <Check size={14} strokeWidth={2.6} color="#fff" /> : <Upload size={12} strokeWidth={2} color="#A78BFA" />}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{UPLOAD_FILE.name}</div>
                {uploadDone ? (
                  <div style={{ fontSize: 11, color: "#22C55E", marginTop: 3 }}>Complete</div>
                ) : (
                  <>
                    <div style={{ fontSize: 11, color: "#C7C5CE", marginTop: 3 }}>Uploading… {uploadProgress}%</div>
                    <div style={{ marginTop: 5, height: 3, borderRadius: 99, background: "rgba(255,255,255,.14)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${uploadProgress}%`, background: "#A78BFA", borderRadius: 99, transition: "width .15s linear" }} />
                    </div>
                  </>
                )}
              </div>
              {!uploadDone && (
                <button type="button" aria-label="Cancel upload" style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", color: "#9C9AA5", display: "flex", flex: "0 0 auto" }}>
                  <X size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* "Manage users" modal — add / switch accounts */}
        {manageOpen && (
          <div style={{ position: "absolute", inset: 0, zIndex: 45, background: "rgba(17,17,17,.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div className="snp-mockup-fade" style={{ width: 460, maxWidth: "100%", background: "#ffffff", borderRadius: 16, boxShadow: "0 10px 40px rgba(17,17,17,.28)", padding: 22 }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: "#111111" }}>Manage users</span>
                <button type="button" onClick={() => setManageOpen(false)} aria-label="Close" style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", color: "#8A8F98", display: "flex" }}><X size={18} strokeWidth={2} /></button>
              </div>
              <div style={{ fontSize: 12.5, color: "#8A8F98", marginBottom: 16 }}>Switch accounts on this device or remove an account from this device.</div>

              {/* Current account card */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, border: "1px solid #EEECF3", borderRadius: 12, padding: 14, marginBottom: 18 }}>
                <span style={{ width: 36, height: 36, borderRadius: 99, background: PRIMARY_ACCOUNT.avBg, color: "#fff", fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{PRIMARY_ACCOUNT.initials}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>{PRIMARY_ACCOUNT.name}</div>
                  <div style={{ fontSize: 11.5, color: "#8A8F98" }}>{PRIMARY_ACCOUNT.email}</div>
                  <div style={{ fontSize: 11, color: "#8A8F98", marginTop: 4 }}>Last active: 9/2/2026, 1:39:53 AM</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "#16A34A", marginTop: 4 }}>Current account</div>
                </div>
                <div style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: "#4B5563", border: "1px solid #E5E3EA", borderRadius: 7, padding: "5px 12px" }}>Active</span>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: "#4B5563", border: "1px solid #E5E3EA", borderRadius: 7, padding: "5px 12px" }}>Remove</span>
                </div>
              </div>

              {/* Sign in to another account */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#111111" }}>Sign in to another account</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#8A8F98" }}><ChevronUp size={14} strokeWidth={2} /> Cancel</span>
              </div>

              {/* Email */}
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "#4B5563", marginBottom: 6 }}>Email</div>
              <div className={pulse === "acctEmail" ? "snp-pulse snp-pulse-front" : undefined} style={{ borderRadius: 8, marginBottom: 14 }}>
                <input
                  type="text"
                  value={acctEmail}
                  onChange={(e) => setAcctEmail(e.target.value)}
                  placeholder="Enter email address"
                  style={{ width: "100%", boxSizing: "border-box", border: "1px solid #E5E3EA", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: "#111111", fontFamily: "inherit", outline: "none" }}
                />
              </div>

              {/* Password */}
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "#4B5563", marginBottom: 6 }}>Password</div>
              <div className={pulse === "acctPassword" ? "snp-pulse snp-pulse-front" : undefined} style={{ borderRadius: 8, marginBottom: 18 }}>
                <input
                  type="password"
                  value={acctPassword}
                  onChange={(e) => setAcctPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{ width: "100%", boxSizing: "border-box", border: "1px solid #E5E3EA", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: "#111111", fontFamily: "inherit", outline: "none" }}
                />
              </div>

              {/* Add account */}
              <button
                type="button"
                onClick={handleAddAccount}
                className={pulse === "addAccount" ? "snp-pulse snp-pulse-front" : undefined}
                style={{ width: "100%", fontSize: 13.5, fontWeight: 600, color: "#ffffff", background: "#111111", border: "none", borderRadius: 8, padding: "12px 0", cursor: "pointer", font: "inherit" }}
              >
                Add account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
