// ── Gear ────────────────────────────────────────────────────────────
// Every product on the site lives here. Use the link helpers below so
// affiliate refs are never pasted by hand.

const BETAFPV_REF =
  "sca_ref=11385152.B4J5URcAyy&utm_source=socialmedia&utm_medium=socialmedia&utm_campaign=affiliate-alec-searle";

// betafpv("/products/air75-ii-brushless-whoop-quadcopter") → full affiliate URL
export const betafpv = (path = "") =>
  `https://betafpv.com${path}${path.includes("?") ? "&" : "?"}${BETAFPV_REF}`;

export const BETAFPV_MAIN = betafpv();

export const FEATURED = {
  id: "meteor75-pro-kit",
  name: "Meteor75 Pro FPV Kit",
  description: "Complete beginner kit — drone, goggles & controller",
  href: betafpv("/products/meteor75-pro-fpv-kit"),
  image: "/images/Meteor75_Pro_FPV_Kit.png",
};

export const BEGINNER_SETUP = [
  {
    id: "air65",
    name: "Air65 II Brushless Whoop",
    description: "Compact indoor ripper",
    href: betafpv("/products/air65-ii-brushless-whoop-quadcopter"),
    image: "/images/air65.png",
    badge: "My FIRST",
  },
  {
    id: "air75",
    name: "Air75 II Brushless Whoop",
    description: "The perfect starter quad",
    href: betafpv("/products/air75-ii-brushless-whoop-quadcopter"),
    image: "/images/air75.png",
    badge: "My FAVORITE",
  },
  {
    id: "meteor75-pro",
    name: "Meteor75 Pro Brushless Whoop",
    description: "Near indestructible tank",
    href: betafpv("/products/meteor75-pro-brushless-whoop-quadcopter?variant=42995723337862"),
    image: "/images/Meteor75_Pro.png",
  },
  {
    id: "radiomaster",
    name: "RadioMaster Pocket",
    description: "The radio I recommend for beginners",
    href: "https://a.co/d/01hQvt2P",
    affiliate: false,
    badge: "Amazon",
    image: "/images/radiomaster-pocket.png",
  },
  {
    id: "vr04",
    name: "VR04 FPV Goggles",
    description: "See what your drone sees",
    href: betafpv("/products/vr04-fpv-goggles"),
    image: "/images/vr04.png",
  },
  {
    id: "lava",
    name: "Lava II 1S Battery",
    description: "Long-lasting 1S power",
    href: betafpv("/products/lava-ii-1s-battery"),
    image: "/images/lava-battery.png",
  },
  {
    id: "charger",
    name: "HexaCharger 1S",
    description: "Charge 6 batteries at once",
    href: betafpv("/products/hexacharger-1s-charger"),
    image: "/images/hexacharger.png",
  },
];
