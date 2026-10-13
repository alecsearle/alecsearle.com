# alecsearle.com Revamp Plan

*Written Oct 12, 2026. A living document: update it as decisions change.*

## Goal
Turn the single scrolling link page into a small **personal FPV resource hub**: what Alec is learning, flying, building and recommending. Affiliate links stay central but **support the content** rather than lead it.

The test for every page: *"This is Alec's site,"* not *"this is a drone store."*

**Constraints:**
- It's a targeted refresh, not a rewrite. Keep what works.
- Low maintenance. Adding a product or video means adding a few lines to one data file.
- No CMS, no database, and no new backend. The only API call stays the cached "latest videos" function.
- The copy is in Alec's voice: conversational, honest, never salesy.
- It ships **before** the giveaway goes live, and must not reveal the giveaway or the Discord early.

---

## 1. Ship order and branches

The giveaway work (`giveaway-10k`) already contains fixes the revamp needs: the cached YouTube function, link-preview (OG) tags, resized images, the multi-page setup and config. It also touches the same files (`App.jsx`, `SocialLinks`, `index.html`, `vite.config.js`). Building the revamp separately from `main` would mean redoing or untangling those changes.

**Plan:** branch `revamp` off `giveaway-10k`, and make the giveaway and Discord **dormant until launch**:

| While `GIVEAWAY.status === 'draft'` | Behaviour |
|---|---|
| Homepage giveaway banner | Hidden (already the case) |
| Discord card, nav link and social icon | **Hidden.** Add `DISCORD_LIVE = GIVEAWAY.status !== 'draft'` in `src/config/site.js`. |
| `/giveaway` on **alecsearle.com** | Shows a plain "Nothing here yet" page with a link home, and stays `noindex` |
| `/giveaway` on **Vercel previews or localhost** | Full draft page with the checklist, as it works today |

Merging `revamp` → `main` ships the new site with everything giveaway-related invisible. **Launch day stays a single config change:** set the dates and `status: 'open'`, then push. The giveaway, the banner and the Discord all appear together.

---

## 2. YouTube setup

**The API key** lives only in Vercel's environment variables. The local `.env` was lost in the factory reset, which is expected because it's never committed.

1. **Check the key's restrictions first.** Go to Google Cloud Console → APIs & Services → Credentials → the key.
   - If **Application restrictions** is set to *HTTP referrers (websites)*, the new server-side function **will fail**, because servers don't send a referrer.
   - Change it to **None**, and set **API restrictions** to *YouTube Data API v3 only*. The key is now server-side only, so this is safe.
   - Creating a fresh key (Credentials → Create credentials → API key) with those same settings is also fine.
2. Create a local `.env` (it's already gitignored):
   ```
   YOUTUBE_API_KEY=your_key_here
   ```
3. In Vercel → Settings → Environment Variables:
   - Add `YOUTUBE_API_KEY` for **Production and Preview**.
   - Remove `VITE_YOUTUBE_API_KEY` once the new one works. The function accepts either name in the meantime.
4. For local testing of `/api/videos`, run `npx vercel dev`. This needs a one-time `npx vercel login` and `npx vercel link`. Plain `npm run dev` works for everything else.

**How the site uses YouTube after the revamp:**
- **"Latest videos" carousel:** live, through the cached function (about 100 API calls a day at most).
- **/learn, featured videos and related videos:** static, in a hand-curated data file. Thumbnails come straight from `i.ytimg.com/vi/<id>/hqdefault.jpg`, so there's **no API at runtime**. If the API goes down, only the carousel falls back to a link.
- **One-time helper:** `scripts/list-videos.mjs` pulls every upload (ID, title, date, duration, Short or long-form) into `scripts/videos.json` using the local key. That export is what we use to curate `src/data/videos.js`, and it gets re-run whenever we want to catch up on new uploads. It isn't part of the site build.

---

## 3. Site structure

```
/            Home: the hub
/gear        What I fly and recommend
/learn       Tutorials, organised by topic
/builds      Builds and projects with parts lists
/giveaway    (dormant until launch)
/giveaway/rules
```

"Community" isn't a separate page: it's the Discord, linked in the nav and footer once `DISCORD_LIVE` is on.

Each page is its own HTML entry: add it to `PAGES` in `vite.config.js` and to `vercel.json`. That gives each page its own title and link preview without a router.

**Shared layout** (new components used by every page):
- `SiteNav`: name or avatar on the left; Gear · Learn · Builds (· Discord once live) on the right. It's a sticky, compact bar, and on mobile it's a simple horizontal row with no hamburger menu (only 3–4 links).
- `Footer`: socials, a readable affiliate disclosure, Discord (once live), a © line, and links out to `portfolio.` / `aerial.` subdomains once they exist (optional).
- `PageShell`: wraps the nav, the content width and the footer, plus Vercel Analytics, which is currently repeated in each page.

**Width:** the current `max-w-xl` (576 px) column is right for the homepage on a phone, but Gear and Learn need grids. Content pages use `max-w-3xl` with a two-column grid from `md:` up, and stay single-column on phones.

---

## 4. Data files (the maintenance surface)

Everything editable lives in `src/data/`. Pages contain no hard-coded products or videos.

### `src/data/gear.js` (replaces `AffiliateSection/products.js`)
```js
{
  id: 'air75-ii',
  name: 'Air75 II Brushless Whoop',
  brand: 'BetaFPV',
  category: 'whoops',            // see CATEGORIES below
  relation: 'fly',               // 'fly' | 'recommend' | 'reviewed'
  forWho: 'First-timers who want to fly indoors and out',
  blurb: 'My favorite whoop. …',   // one or two lines, in Alec's voice
  href: betafpv('/products/air75-ii-…'),  // helper adds the affiliate ref
  affiliate: true,               // false → no "affiliate" marker
  image: '/images/air75.png',
  videoId: 'abc123',             // optional related video
  featured: true,                // shows on the homepage (max ~3)
  starter: true,                 // part of the "start here" beginner setup
}
```

- **Relation badges** (one per product), which carry the honesty point from the brief:
  - `fly` → **"I fly this"**: gear Alec currently uses
  - `recommend` → **"Recommended"**: gear he'd tell a friend to buy
  - `reviewed` → **"Reviewed"**: tested on the channel, without a blanket endorsement. The card links the review video so people can decide for themselves.
- **Categories:** Beginner kits · Tiny whoops · Radios · Goggles · Batteries & chargers · Digital FPV · Bigger quads · Accessories & tools. Empty categories are hidden automatically.
- **Affiliate helpers:** `betafpv(path)` and similar functions add the ref and UTM parameters, so links are never pasted by hand. The existing `REF` string moves here.

### `src/data/videos.js`
```js
{ id: 'YouTubeId', title: 'How to Fly FPV Drones | A Beginner Guide',
  topic: 'first-flights', series: 'flying-for-dummies', featured: true,
  chapters: [{ t: '1:05', label: 'Hovering & landing' }, …] }  // optional
```
- **Topics:** Getting started · Gear & setup · Simulator training · First flights & skills · Betaflight & config · Batteries & charging · Repairs & troubleshooting · Digital FPV · Builds & mods.
- **Series:** `setup-for-dummies` and `flying-for-dummies` are shown as numbered playlists on /learn.

### `src/data/builds.js`
The Bandit build moves here from `products.js`: parts, extras, hero image, video and the O4 conversion notes. Every build uses the same shape, so the existing `BuildDropdown` and `PartRow` render any of them.

---

## 5. Pages

### Home (`/`): the hub
Order on a phone:
1. **Hero:** a flying still or a short silent loop (if it's light enough), avatar, and a one-line intro in your own words. Something like *"I started flying FPV in spring 2026 and have been documenting everything I learn along the way."* The tagline moves on from "Beginner FPV Pilot".
2. **New to FPV? Start here:** a card linking to the beginner setup on /gear and to Flying FPV for Dummies on /learn. This is the main path for beginners and the main affiliate path.
3. **What I'm flying right now:** 3 `featured` gear cards and a "See all gear →" link.
4. **Who I am:** the 6-month video embedded with a click-to-play thumbnail (no YouTube iframe until clicked, which keeps the page fast).
5. **Latest videos:** the existing carousel, unchanged.
6. **Discord card** (once live) **and the giveaway banner** (while open, pinned at the top).
7. Footer.

The full beginner setup list and the 3.5" build leave the homepage and move to /gear and /builds, so the page gets shorter and more personal.

### Gear (`/gear`)
- An intro paragraph: how you pick gear, what the badges mean, and the disclosure in plain words.
- **"The beginner setup"** first. This is today's Featured kit and 7-item list, with the same products and links, so existing affiliate traffic keeps working.
- Then the categories with jump links (sticky chips on mobile).
- Product card (an evolution of `ProductCard`): image, name, relation badge, "for: …" line, blurb, a buy button with an "affiliate" marker, and a "▶ Watch my video" link when `videoId` is set.

### Learn (`/learn`)
- **Featured at the top:** Flying FPV for Dummies, showing its 8 exercises as chapter links that jump to timestamps.
- The two series as numbered lists.
- Then topic sections in a grid of `VideoCard`s (the existing component), which open on YouTube.
- No articles. Each topic can have an optional one-line intro.

### Builds (`/builds`)
- One card per build that expands into the existing parts-list UI:
  - **Bandit 3.5"**, plus the O4 Pro conversion as an update
  - Tiny whoop mods
  - 3D-printed accessories (linked to the MakerWorld collection)
  - FPV monitor build (when there's a video)
- Shared parts (props, batteries) can point to the matching /gear items.

---

## 6. Design direction
Keep the current identity (dark `#0a0a0a`, white type, soft `white/5` cards). It already matches *clean, personal, not overly futuristic*. The refinements:
- **Real photography:** your flight stills or shots of your drones in Southern Utah. That's the biggest single step from "link page" to "Alec's site".
- **One accent colour** for buttons and badges, pulled from your thumbnails or brand, instead of all white.
- Typography: slightly larger body text on desktop, and a display weight for page titles.
- **Motion:** hover states only. No scroll animations or parallax.
- **Performance:** images resized or in WebP, lazy-loaded below the fold, and click-to-play video embeds. Aim for a Lighthouse score of 95+ on mobile.

---

## 7. Phases (each one ships on its own)

| # | Phase | Contents | Needs from Alec |
|---|---|---|---|
| 0 | **Foundations** | Branch `revamp` off `giveaway-10k`; `DISCORD_LIVE` gating; production "Nothing here yet" page for `/giveaway`; `PageShell`, `SiteNav`, `Footer`; move data into `src/data/`; YouTube export script | API key in `.env` (section 2) |
| 1 | **/gear** | Gear page and new product card; current products moved over with relation badges | Products list (section 8) |
| 2 | **/learn** | Video data and the Learn page | Confirm topic assignments from the export |
| 3 | **/builds** | Bandit and any other builds | O4 conversion details and photos |
| 4 | **New homepage** | Hero, Start here, featured gear, 6-month video, carousel | Hero photo or clip, intro line |
| 5 | **Polish and ship** | OG images for each page, Lighthouse pass, checks on phones and in-app browsers, merge to `main` | Final review |

The giveaway launch (setting status to open) can happen any time after phase 5 is merged.

---

## 8. Inputs needed

1. **The YouTube API key** in a local `.env`, with the restriction checked (section 2).
2. **Gear inventory.** For each item: relation (fly / recommend / reviewed), a one-line "who it's for", a link (affiliate if you have one) and a related video if there is one. A rough list in chat is fine and I'll format it.
   - Items to consider: RadioMaster Pocket, LiteRadio, DJI RC3, VR04, VR03, SKY04X Pro, DJI Goggles 3, Air65 II, the Air75 II variants, Meteor75 Pro and Pro II, Curve Micro 16, Avata 2, O4 Pro, Lava batteries, HexaCharger, M7AC, Liftoff, Bambu A1, and anything from Droneer, EMAX or Caddx you'd stand behind.
   - Don't list brand-supplied gear unless you'd actually recommend it, or mark it as `reviewed`.
3. **Photos:** a hero flight still or your quad in the desert, plus build photos.
4. **The intro line** for the homepage, in your words. I can draft options.

## 9. Not doing (for now)
- `aerial.` and `portfolio.` sites (separate projects; footer links only)
- Blog or articles, search, comments
- A CMS or admin UI (the data files are the CMS)
- Price tracking or automatic product feeds

## 10. Verifying each phase
- `npm run build`, and every page appears in `dist/`
- A Vercel preview checked on a phone, including from the Instagram and TikTok in-app browsers
- Every affiliate link still carries the ref (a scripted check that every BetaFPV `href` includes `sca_ref`)
- Each page's link preview checked in Discord or on opengraph.xyz
- On production while the giveaway is in draft: `/giveaway` shows "Nothing here yet", and there's no Discord anywhere
