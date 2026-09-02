import Image from "next/image";

/**
 * "From the Blog" section — 3×2 grid of post cards, placed after the pricing
 * teaser / lower-page content and before the final CTA.
 *
 * Design tokens (snaarp-design-system-complete.md, Website surface):
 *   ink #111111 · body #4B5563 · mute #8A8F98 · primary #7C3AED / hover #6D28D9
 *   canvas #ffffff · card radius 16px (rounded.lg) · Poppins · soft layered shadow.
 * Uses the shared scroll-reveal system (data-reveal = stagger delay in ms).
 */

interface Post {
  cover: string;
  tags: [string, string];
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  excerpt: string;
}

// Author avatars (Unsplash headshots).
const AV = {
  priya: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
  tom: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
  amara: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&q=80",
};

// Cover images (Unsplash — workspace / tech / business themed, on-topic).
const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&h=450&fit=crop&q=80`;

const posts: Post[] = [
  {
    cover: IMG("photo-1531403009284-440f080d1e12"), // team collaborating over screens
    tags: ["Productivity", "Guides"],
    title: "Stop juggling twelve tools: how to consolidate your business software stack",
    author: "Priya Raman",
    authorAvatar: AV.priya,
    date: "12 Aug 2026",
    readTime: "6 min read",
    excerpt:
      "Every extra login is another invoice, another password and another place your data drifts out of sync. Here is a practical way to audit your stack and collapse it into one platform.",
  },
  {
    cover: IMG("photo-1454165804606-c3d57bc86b40"), // charts / planning on desk
    tags: ["Pricing", "Scaling"],
    title: "Choosing the right Snaarp plan as your team grows from 5 to 50",
    author: "Tom Mercer",
    authorAvatar: AV.tom,
    date: "05 Aug 2026",
    readTime: "5 min read",
    excerpt:
      "You pay for a band, not a head. We break down when to move up a tier, how the per-person cost falls as you grow, and why over-buying seats early rarely pays off.",
  },
  {
    cover: IMG("photo-1555949963-ff9fe0c870eb"), // security / code on screen
    tags: ["Security", "Teams"],
    title: "Password hygiene for growing teams: a 20-minute Friday checklist",
    author: "Amara Kwesi",
    authorAvatar: AV.amara,
    date: "29 Jul 2026",
    readTime: "4 min read",
    excerpt:
      "Shared logins, stale credentials and ex-contractor access are how most small businesses get breached. A short weekly routine — plus a shared vault — closes the gaps.",
  },
  {
    cover: IMG("photo-1600880292203-757bb62b4baf"), // remote video call / laptop
    tags: ["Remote", "Collaboration"],
    title: "Keeping a distributed team in sync without another meeting",
    author: "Priya Raman",
    authorAvatar: AV.priya,
    date: "21 Jul 2026",
    readTime: "7 min read",
    excerpt:
      "When chat, calls, docs and files share one directory, context stops falling through the cracks. Here is how remote teams cut status meetings by keeping work in one place.",
  },
  {
    cover: IMG("photo-1517245386807-bb43f82c33c4"), // laptop / migration workspace
    tags: ["Migration", "How-to"],
    title: "Migrating from Google Workspace or Microsoft 365 in an afternoon",
    author: "Tom Mercer",
    authorAvatar: AV.tom,
    date: "14 Jul 2026",
    readTime: "8 min read",
    excerpt:
      "Mail keeps its folders and timestamps, files keep version history, and anything the importer cannot map is reported before cutover — never dropped silently. A step-by-step walkthrough.",
  },
  {
    cover: IMG("photo-1552581234-26160f608093"), // sales / meeting discussion
    tags: ["CRM", "Getting Started"],
    title: "Getting started with Snaarp CRM: your first pipeline in 15 minutes",
    author: "Amara Kwesi",
    authorAvatar: AV.amara,
    date: "07 Jul 2026",
    readTime: "5 min read",
    excerpt:
      "Import your contacts, build a stage-by-stage pipeline and connect deals to mail and accounting — so nothing lives in a spreadsheet nobody remembers to update.",
  },
];

function ViewPostLink() {
  return (
    <a
      href="#top"
      className="snp-viewpost"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginTop: 16,
        fontSize: 14,
        fontWeight: 600,
        color: "#111111",
        textDecoration: "underline",
        textUnderlineOffset: 3,
      }}
    >
      View Post <span aria-hidden>→</span>
    </a>
  );
}

export default function Blog() {
  return (
    <section id="blog" style={{ background: "#ffffff", padding: "clamp(56px,7vw,96px) 0" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <div data-reveal="0" style={{ textAlign: "center", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".12em", color: "#7C3AED", textTransform: "uppercase" }}>
            Insights &amp; Updates
          </div>
          <h2 style={{ margin: "12px 0 0", fontSize: "clamp(28px,3.4vw,40px)", fontWeight: 700, color: "#111111", letterSpacing: "-.025em", lineHeight: 1.15 }}>
            From the Blog
          </h2>
          <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#4B5563" }}>
            Tips on running a leaner, simpler business — from consolidating your
            stack to getting more out of every Snaarp app.
          </p>
        </div>

        {/* 3×2 card grid */}
        <div
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "var(--blog-cols)",
            gap: 24,
          }}
        >
          {posts.map((p, idx) => (
            <article
              key={p.title}
              data-reveal={String((idx % 3) * 90)}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#ffffff",
                border: "1px solid #EAEAEA",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 1px 2px rgba(17,17,17,.04),0 10px 26px rgba(17,17,17,.05)",
              }}
            >
              {/* Cover */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}>
                <Image
                  src={p.cover}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                {/* Pill tags top-left */}
                <div style={{ position: "absolute", left: 12, top: 12, display: "flex", gap: 6 }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#ffffff",
                        background: "rgba(17,17,17,.55)",
                        backdropFilter: "blur(4px)",
                        borderRadius: 999,
                        padding: "5px 10px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: "#111111",
                    letterSpacing: "-.01em",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.title}
                </h3>

                {/* Byline */}
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#8A8F98" }}>
                  <Image
                    src={p.authorAvatar}
                    alt={p.author}
                    width={26}
                    height={26}
                    style={{ width: 26, height: 26, borderRadius: 999, objectFit: "cover", flex: "0 0 auto" }}
                  />
                  <span style={{ fontWeight: 600, color: "#111111" }}>{p.author}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.readTime}</span>
                </div>

                <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6, color: "#4B5563" }}>
                  {p.excerpt}
                </p>

                <div style={{ marginTop: "auto" }}>
                  <ViewPostLink />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all posts */}
        <div data-reveal="0" style={{ marginTop: 40, textAlign: "center" }}>
          <a
            href="/blog"
            className="snp-viewall"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 15,
              fontWeight: 600,
              color: "#111111",
              background: "#ffffff",
              border: "1px solid #D4D4D8",
              borderRadius: 999,
              padding: "13px 28px",
            }}
          >
            View All Posts <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
