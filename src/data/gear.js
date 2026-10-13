// ── Gear ────────────────────────────────────────────────────────────
// Every product on the site lives here. Use the link helpers below so
// affiliate refs are never pasted by hand.
//
// Item fields:
//   fly        I currently fly this          → "I fly this" badge
//   recommend  I'd tell a beginner to buy it → "Recommended" badge
//   videoId    my video about it (YouTube id) → "Watch my video" link
//   forWho     one line: who it's for
//   blurb      one or two lines in my own words
//   tagline    short line used on the homepage cards
//   note       small homepage tag ("My FIRST")
//   href       where to buy (null = no buy button yet)
//   store      shown on the buy button
//   affiliate  false for plain (non-affiliate) links

const BETAFPV_REF =
  "sca_ref=11385152.B4J5URcAyy&utm_source=socialmedia&utm_medium=socialmedia&utm_campaign=affiliate-alec-searle";

// betafpv("/products/air75-ii-brushless-whoop-quadcopter") → full affiliate URL
export const betafpv = (path = "") =>
  `https://betafpv.com${path}${path.includes("?") ? "&" : "?"}${BETAFPV_REF}`;

export const BETAFPV_MAIN = betafpv();

export const GEAR = {
  "meteor75-pro-kit": {
    name: "Meteor75 Pro FPV Kit",
    category: "kits",
    recommend: true,
    forWho: "Anyone who wants one box and to be flying today",
    blurb: "Drone, goggles, radio, and batteries in one purchase. The easiest way I've found to get started.",
    tagline: "Complete beginner kit — drone, goggles & controller",
    href: betafpv("/products/meteor75-pro-fpv-kit"),
    store: "BetaFPV",
    image: "/images/Meteor75_Pro_FPV_Kit.png",
    videoId: "NXwnuzHCjhg",
  },
  air65: {
    name: "Air65 II Brushless Whoop",
    category: "whoops",
    recommend: true,
    forWho: "Flying indoors and in tight spaces",
    blurb: "My first FPV drone. Small and light enough to fly around the house.",
    tagline: "Compact indoor ripper",
    note: "My FIRST",
    href: betafpv("/products/air65-ii-brushless-whoop-quadcopter"),
    store: "BetaFPV",
    image: "/images/air65.png",
    videoId: "C-33wRr9qzQ",
  },
  air75: {
    name: "Air75 II Brushless Whoop",
    category: "whoops",
    fly: true,
    recommend: true,
    forWho: "Indoors and outdoors, with a little more power than the Air65",
    blurb: "I fly the Race version as my main analog whoop. I tested all three versions (Freestyle, Race, Champion) head to head.",
    tagline: "The perfect starter quad",
    note: "My FAVORITE",
    href: betafpv("/products/air75-ii-brushless-whoop-quadcopter"),
    store: "BetaFPV",
    image: "/images/air75.png",
    videoId: "rPBj_TY7ePU",
  },
  "meteor75-pro": {
    name: "Meteor75 Pro Brushless Whoop",
    category: "whoops",
    recommend: true,
    forWho: "Beginners who crash a lot (so, everyone)",
    blurb: "The drone from the Meteor75 Pro kit, on its own. Built like a tank.",
    tagline: "Near indestructible tank",
    href: betafpv("/products/meteor75-pro-brushless-whoop-quadcopter?variant=42995723337862"),
    store: "BetaFPV",
    image: "/images/Meteor75_Pro.png",
    videoId: "NXwnuzHCjhg",
  },
  radiomaster: {
    name: "RadioMaster Pocket",
    category: "radios",
    fly: true,
    recommend: true,
    forWho: "Your first radio, and maybe your only one",
    blurb: "The radio I fly with every day. Small, affordable, and ELRS built in.",
    tagline: "The radio I recommend for beginners",
    note: "Amazon",
    href: "https://a.co/d/01hQvt2P",
    store: "Amazon",
    affiliate: false,
    image: "/images/radiomaster-pocket.png",
    videoId: "6pxz_TcRXAg",
  },
  vr04: {
    name: "VR04 FPV Goggles",
    category: "goggles",
    recommend: true,
    forWho: "Your first pair of analog goggles",
    blurb: "The goggles I started with. Simple and affordable, and plenty to learn on.",
    tagline: "See what your drone sees",
    href: betafpv("/products/vr04-fpv-goggles"),
    store: "BetaFPV",
    image: "/images/vr04.png",
    videoId: "1wmoYFjcva8",
  },
  "sky04x-pro": {
    name: "Skyzone SKY04X Pro",
    category: "goggles",
    fly: true,
    forWho: "Upgrading from box goggles",
    blurb: "What I fly with now. I compared them side by side with the VR04 after upgrading.",
    href: "https://www.skyzonefpv.com/products/sky04x-pro",
    store: "Skyzone",
    affiliate: false,
    image: "/images/sky04x-pro.png",
    videoId: "1wmoYFjcva8",
  },
  "foxeer-stubs": {
    name: "Foxeer Stub Antennas",
    category: "accessories",
    fly: true,
    forWho: "A compact antenna upgrade for your goggles",
    blurb: "The antennas on my SKY04X Pro for everyday flying.",
    href: "https://www.amazon.com/dp/B07J6H955F",
    store: "Amazon",
    affiliate: false,
    image: null,
    videoId: null,
  },
  lava: {
    name: "Lava II 1S Battery",
    category: "batteries",
    recommend: true,
    forWho: "The Air65, Air75, and Meteor75 (all 1S whoops)",
    blurb: "The batteries I use in my whoops. Get more than you think you need.",
    tagline: "Long-lasting 1S power",
    href: betafpv("/products/lava-ii-1s-battery"),
    store: "BetaFPV",
    image: "/images/lava-battery.png",
  },
  hexacharger: {
    name: "HexaCharger 1S",
    category: "batteries",
    recommend: true,
    forWho: "Charging a stack of 1S batteries at once",
    blurb: "Charges six 1S batteries at a time.",
    tagline: "Charge 6 batteries at once",
    href: betafpv("/products/hexacharger-1s-charger"),
    store: "BetaFPV",
    image: "/images/hexacharger.png",
    videoId: "1qa31NgudPY",
  },
};

const item = (id) => ({ id, ...GEAR[id] });

// ── /gear page sections ─────────────────────────────────────────────
export const GEAR_SECTIONS = [
  {
    id: "start",
    title: "If you're just starting",
    intro:
      "This is what I'd tell a friend to buy. Grab the kit if you want it easy, or put the pieces together yourself.",
    featured: item("meteor75-pro-kit"),
    groups: [
      {
        label: "Pick a drone",
        note: "Not sure which one? I've got a video coming comparing all three.",
        items: ["air65", "air75", "meteor75-pro"].map(item),
      },
      { label: "Then add", items: ["vr04", "radiomaster", "lava", "hexacharger"].map(item) },
    ],
  },
  {
    id: "flying",
    title: "What I'm flying right now",
    intro: "My current analog setup.",
    groups: [{ items: ["air75", "radiomaster", "sky04x-pro", "foxeer-stubs"].map(item) }],
  },
];

// ── Homepage: "Featured" + "The Best Beginner FPV Setup" ─────────────
// My videos show people scrolling to this exact list. Keep the order,
// section names, and links stable.
export const FEATURED = item("meteor75-pro-kit");
export const BEGINNER_SETUP = ["air65", "air75", "meteor75-pro", "radiomaster", "vr04", "lava", "hexacharger"].map(item);
