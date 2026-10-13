# 10K Giveaway + Discord Runbook

Everything that happens outside the code. The site side is config-driven. See `src/config/site.js`.

---

## 1. Discord server setup

### Server settings
- [ ] **Enable Community** (Server Settings → Enable Community). Onboarding, Rules Screening, and Announcement channels need it.
- [ ] **Verification level: Medium** (account older than 5 minutes). Raise it to High if bots show up.
- [ ] **Explicit media filter:** scan media from all members.
- [ ] **Safety Setup:** turn on raid protection and DM-spam protection.

### Channels
| Category | Channel | Type | Who can post |
|---|---|---|---|
| START HERE | `#welcome-and-rules` | Text (or the Rules channel) | Mods only |
| | `#announcements` | Announcement | Mods only |
| | `#giveaway-info` | Text | Mods only |
| | `#youtube-uploads` | Text | Mods + MonitoRSS bot only |
| THE HANGAR | `#general-chat` | Text | Everyone |
| | `#flight-clips` | Text | Everyone |
| | `#drone-builds-and-setups` | Forum *(optional; keeps each build in its own thread)* | Everyone |
| FPV HELP DESK | `#beginner-questions` | Text | Everyone |
| | `#troubleshooting` | **Forum**, with tags: Analog, Digital, Betaflight, ELRS/Binding, Batteries, Solved | Everyone |
| | `#gear-recommendations` | Text | Everyone |
| VOICE | `FPV Hangout`, `Simulator Sessions` | Voice | Everyone |

For the read-only channels: on `@everyone`, deny **Send Messages** and **Create Threads**, but leave **Add Reactions** allowed.

### Roles
- `@Moderator`: Manage Messages, Timeout Members, Manage Threads. Give it to 1–2 people you trust once you've seen who's active.
- `@YouTube Notifications`: no permissions; it's only used for pings.
- *(optional)* `@Helper`: a cosmetic role for people who answer a lot of questions. It's a cheap way to reward people helping each other.

### Onboarding (Server Settings → Onboarding)
- Default channels: all of START HERE, THE HANGAR and FPV HELP DESK.
- Add a question: **"Want a ping when a new video drops?"**
  - Yes: assigns `@YouTube Notifications`
  - No: assigns nothing
- Optional question: "Where are you at with FPV?" with the answers *Just looking / Flying a sim / Flying whoops / Flying bigger quads*. These map to cosmetic roles, which helps helpers know who they're talking to.

### AutoMod (Server Settings → AutoMod)
- [ ] **Block mention spam** at 5+ mentions, with the action set to block plus a 10-minute timeout.
- [ ] **Block suspected spam content.**
- [ ] **Commonly flagged words** (all three lists).
- [ ] A **custom keyword rule** that blocks messages and alerts `#mod-log` (a private channel). Keywords:
  - `free nitro`, `steam gift`, `nitro gift`, `*airdrop*`, `@everyone`
  - `discord.gg/`, `discord.com/invite`, with mods exempted
  - common crypto scam phrases
- [ ] Turn off server-wide **Allow members to mention @everyone**.

### `#welcome-and-rules` draft (edit to taste)
> **Welcome to the hangar.** This is a place for FPV pilots of all levels to hang out, ask questions, and help each other. I can't be in here all the time, so if you know the answer to something, jump in.
>
> **Rules**
> 1. Be decent. No harassment, slurs, or picking on beginners. Everyone was new once.
> 2. No spam, self-promo, or DM advertising. Sharing your own clips in #flight-clips is welcome.
> 3. Keep it legal. Don't post about flying in ways that put people at risk or break local law.
> 4. Use the right channel. Use #troubleshooting for problems, and make one post per issue so answers stay together.
> 5. No scams, sketchy links, or "free giveaway" DMs. I will never DM you asking for payment or login info.
> 6. Mods' calls are final.
>
> Giveaway winners are only ever contacted by email from me. I will never ask you to pay shipping or fees.

### `#youtube-uploads`: automatic video posts
Done. Alec set up alerts directly in Discord (Oct 2026).

Note: YouTube's RSS feeds (`youtube.com/feeds/videos.xml?...`) returned 404 when tested in Oct 2026, so don't rely on RSS-based bots like MonitoRSS. The site itself uses the YouTube Data API instead.

---

## 2. Google Form

Live form: https://forms.gle/JjPD9m3KKAQ6HLQ38. It's already set as `GIVEAWAY.formUrl`, using the full docs.google.com URL because the short link can't be embedded. As of Oct 12 it needs no Google sign-in and asks:
eligibility checkbox → full name → email → country → optional "what video brought you here" → rules agreement.

**Fixes still worth making in the form**
- [ ] **Country: change it to a Dropdown** listing only the eligible countries (the list in `GIVEAWAY.eligibleCountries`, with each EU/EEA country listed individually and Italy left out). As a free-text field it lets ineligible and misspelled countries through, and you'd have to clean them up by hand.
- [ ] **Rules agreement: put the link in the question description**: `https://alecsearle.com/giveaway/rules`.
- [ ] Settings: leave **Limit to 1 response** OFF and email collection set to anything but *Verified*, because both force a Google sign-in.
- [ ] Turn off "Show link to submit another response" in the confirmation settings.
- [ ] Delete your test responses before launch.

## 3. Launch day (within about 24 hours of hitting both milestones)

- [ ] In `src/config/site.js`, set `startsAt` / `endsAt` (14 days, Mountain Time; use `-07:00` for any date from Nov 1 to Mar 14).
- [ ] In `src/content/giveaway-rules.md`, update **Last Updated**.
- [ ] Send a test email to giveaway@alecsearle.com and reply from it, to confirm that address works both ways.
- [ ] Set `GIVEAWAY.status = 'open'` and push to `main`.
- [ ] Check alecsearle.com: the banner shows and links to /giveaway, the form loads, and the deadline is right.
- [ ] Open alecsearle.com/giveaway from inside the **Instagram** and **TikTok** apps (DM yourself the link) and submit a real test entry, then delete it.
- [ ] Paste the link in Discord and check the preview card.
- [ ] Post the giveaway details in `#giveaway-info`, publish the videos and Reels, and set the link in your bios.

**At the deadline:** in the Form, turn off **Responses → Accepting responses**. The site switches to "Entries closed" on its own when `endsAt` passes. Set `status: 'closed'` when convenient.

---

## 4. Picking winners (within 7 days of the close)

1. In the responses Sheet, **duplicate the tab** and name it `Draw`. Work only in that tab so the raw data stays untouched.
2. Add a column **Dupes** with `=COUNTIF(C:C, C2)`, filled down. COUNTIF is case-insensitive. (`C` is the email column; adjust it to match your Sheet.)
3. Keep the **earliest** entry for each email. Delete any later duplicate rows, plus obvious alt-account patterns (the same name or near-identical emails).
4. Delete rows from ineligible countries or regions (Quebec, Italy, US territories, and so on).
5. Select the data rows, then **Data → Randomize range**. Rows 1–2 are the potential winners and the rows below them are alternates, in order. Screen-record this step.
6. Email the winners from **giveaway@alecsearle.com** using the template below. They have **7 days** to reply.
7. **Canadian winners** must correctly answer an unaided skill-testing question before being confirmed. For example: "(12 × 4) + 30 ÷ 5 − 7 = ?", answer **47**. Put it in the email.
8. Once they're verified, ask for shipping details (no P.O. boxes, APO/FPO or freight forwarders) and place the BetaFPV order **within 14 days**.
9. Announce the winners in Discord by first name or username, **with their permission**.
10. Delete non-winner entry data **within 90 days** of the close.

### Winner email
> **From:** giveaway@alecsearle.com
> **Subject: You won the alec_searle 10K giveaway 🎉**
>
> Hey {first name},
>
> You were picked as one of the two winners of my 10K giveaway! Thanks so much for entering.
>
> To claim it, reply to this email within 7 days and let me know:
> 1. Confirm you're 18+ (or the age of majority where you live) and a resident of {country}.
> 2. Which drone you want: Air65 II (Freestyle / Race / Champion), Air75 II (Freestyle / Race / Champion), or Meteor75 Pro II Analog.
> {Canada only: 3. Answer this skill-testing question with no calculator or help: (12 × 4) + 30 ÷ 5 − 7 = ?}
>
> Once that's confirmed I'll ask for a shipping address and order it straight from BetaFPV to you. I will never ask you to pay anything. If anyone else messages you claiming to be me, it's a scam.
>
> Also, is it okay if I announce you as a winner (first name or username) in the Discord and on socials? Totally fine if not.
>
> Alec

### Shipping details email (after they confirm)
> Awesome, it's yours. Send me:
> - Full name for shipping
> - Street address (no P.O. boxes or freight forwarders)
> - Phone number (the carrier sometimes needs it)
>
> I'll only share this with BetaFPV and the shipping carrier to get your drone to you. Heads up: depending on your country there may be customs or import fees on delivery, and those are on the winner per the rules.
