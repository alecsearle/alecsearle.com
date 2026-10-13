// ── Site-wide settings ──────────────────────────────────────────────
// Launch-day changes should only ever touch this file.

export const SITE_URL = "https://alecsearle.com";
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@alec_searle";

// Permanent Discord invite (never expires). Empty = Discord links hidden.
export const DISCORD_INVITE_URL = "https://discord.gg/JtkmvZgHJU";

// Public contact for giveaway questions — also the address winner emails
// come from (see the official rules).
export const CONTACT_EMAIL = "giveaway@alecsearle.com";

// ── 10K Giveaway ────────────────────────────────────────────────────
// status:
//   'draft'  — page reachable at /giveaway for testing, hidden from search,
//              not linked anywhere, shows a launch checklist
//   'open'   — homepage banner on, form live
//   'closed' — form hidden, "winners will be contacted" message
//
// Launch day: set status to 'open', set startsAt/endsAt, push.
// The full legal text lives in src/content/giveaway-rules.md.

export const GIVEAWAY = {
  status: "draft",

  // ISO dates in Mountain Time, 14 days apart. Utah is on MST (-07:00) from
  // Nov 1, 2026 until Mar 14, 2027.
  startsAt: null, // e.g. "2026-11-10T12:00:00-07:00"
  endsAt: null, // e.g. "2026-11-24T23:59:00-07:00"

  // Full Google Form URL (not the forms.gle short link — that can't be embedded).
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScMzv0AR36BCHf-33w4o2t1SzxC7h3h89Vc3dfsfBfqr9EsPA/viewform",

  winners: 2,

  // Rendered into section 3 of the official rules. Keep in sync with the
  // form's country question.
  eligibleCountries: [
    "**United States:** Excluding Puerto Rico, Guam, the U.S. Virgin Islands, and other U.S. territories.",
    "**Canada:** Excluding the Province of Quebec.",
    "**United Kingdom**",
    "**Australia**",
    "**New Zealand**",
    "**European Union / European Economic Area:** Excluding Italy.",
    "**Japan**",
    "**South Korea**",
  ],

  // Prize cards on the giveaway page. The binding list is section 5 of the rules.
  eligibleDrones: [
    { id: "air65", name: "Air65 II", variants: "Freestyle · Race · Champion", image: "/images/air65.png" },
    { id: "air75", name: "Air75 II", variants: "Freestyle · Race · Champion", image: "/images/air75.png" },
    { id: "meteor75-pro-ii", name: "Meteor75 Pro II", variants: "Analog", image: "/images/Meteor75_Pro.png" },
  ],

  // Confirmed extra prizes (e.g. Liftoff keys). Adding one also needs a line
  // in section 5 of the rules. Shape: { name: "...", count: 5 }
  bonusPrizes: [],
};

export const formEmbedUrl = (url) =>
  url ? `${url}${url.includes("?") ? "&" : "?"}embedded=true` : "";

// "October 20, 2026 at 12:00 PM" in Mountain Time, or "TBD".
export function formatMountainTime(iso) {
  if (!iso) return "TBD";
  return new Date(iso).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Denver",
  });
}
