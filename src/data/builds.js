// ── Builds ──────────────────────────────────────────────────────────
// My First 3.5" Build ("the Bandit")
// Collapsible parts list featured for the 3.5" build video.
// href: null marks a part whose purchase link is still pending.

export const BUILD_TITLE = 'My First 3.5" Build';
export const BUILD_SUBTITLE = 'Every part on my first 3.5" freestyle quad';

// Finished-quad hero photo. Drop the file in public/images/ to activate it;
// until then the section shows a labeled placeholder.
export const BUILD_HERO_IMAGE = "/images/finished_build.jpg";

// Paste the build video URL here at launch. Empty falls back to the channel.
export const BUILD_VIDEO_URL = "https://youtu.be/1FGU_FMeoo4?si=TbTPNEpzvOGqWCeJ";
export const BUILD_CHANNEL_URL = "https://www.youtube.com/@alec_searle";

export const BUILD_PARTS = [
  {
    id: "frame",
    category: "Frame",
    name: "FlyFishRC Volador VX3.5",
    qty: "×1",
    price: "~$39",
    href: "https://www.aliexpress.us/item/3256808804036046.html",
    image: "/images/vovador_vx3.5_frame.png",
  },
  {
    id: "stack",
    category: "FC / ESC Stack",
    name: "SpeedyBee F405 Mini + BLS 35A ESC V2",
    qty: "×1",
    price: "~$76",
    href: "https://s.click.aliexpress.com/e/_c2v33LIP",
    image: "/images/speedybee_f405_mini.png",
  },
  {
    id: "motors",
    category: "Motors",
    name: "T-HOBBY Pacer P1804 3400KV 5mm",
    qty: "×4",
    price: "~$84",
    href: "https://www.mepsking.shop/thobby-pacer-p1804-3-4s-toothpick.html?inviterId=2061269649758978049&utm_source=affiliate&utm_medium=affiliate&spec=3400KV%20%2F%205mm",
    image: "/images/t-hobby-p1804-motors.png",
  },
  {
    id: "rx",
    category: "ELRS Receiver",
    name: "SpeedyBee Nano 2.4GHz",
    qty: "2-pack",
    price: "~$29",
    href: "https://s.click.aliexpress.com/e/_c3no7n03",
    image: "/images/ELRS_receiver.png",
  },
  {
    id: "vtx",
    category: "VTX",
    name: "SpeedyBee TX800 5.8GHz w/ Antenna",
    qty: "×1",
    price: "~$36",
    href: "https://www.aliexpress.us/item/3256808616815674.html",
    image: "/images/speedybee-tx800.png",
  },
  {
    id: "camera",
    category: "Camera",
    name: "RunCam Phoenix 2 SP V3",
    qty: "×1",
    price: "~$30",
    href: "https://s.click.aliexpress.com/e/_c3Zi82hh",
    image: "/images/phoenix_runcam.png",
  },
  {
    id: "props",
    category: "Props",
    name: 'HQ Prop 3.5" Tri-Blade (3.5×2.2×3)',
    qty: "6 packs",
    price: "~$21",
    href: "https://www.racedayquads.com/products/hq-prop-3528-3-5x2-8x3-tri-blade-3-5-prop-4-pack-grey-1?variant=40244892434545",
    image: "/images/props_3.5.png",
  },
  {
    id: "battery-gnb",
    category: "Battery",
    name: "GAONENG GNB 650mAh 4S HV",
    qty: "2-pack",
    price: "~$35",
    href: "https://www.aliexpress.us/item/3256807587746610.html",
    image: "/images/GAONENG-650mAh-4S.png",
  },
];

// Approximate build cost, summed from the item prices below so it never
// drifts out of sync with the rows. Core = parts on the airframe;
// extras = reusable gear (charger, GPS, tools) bought alongside it.
const sumPrices = (items) =>
  items.reduce((total, item) => {
    const n = parseFloat((item.price || "").replace(/[^0-9.]/g, ""));
    return total + (Number.isFinite(n) ? n : 0);
  }, 0);

// Supporting gear bought for the build but not mounted on the quad.
export const BUILD_EXTRAS = [
  {
    id: "prop-remover",
    category: "Tool",
    name: "Prop Remover",
    qty: "×1",
    price: "~$2",
    href: "https://www.aliexpress.us/item/3256808474026621.html",
    image: "/images/prop-remover.png",
  },
  {
    id: "charger",
    category: "Charger",
    name: "ToolkitRC M7AC 100W AC / 300W DC Charger",
    qty: "×1",
    price: "~$79",
    href: "https://www.aliexpress.us/item/3256804491259327.html",
    image: "/images/lipo_charger.png",
  },
  {
    id: "buzzer",
    category: "Buzzer",
    name: "ViFly Finder 2",
    qty: "×1",
    price: "~$18",
    href: "https://www.racedayquads.com/products/vifly-finder-buzzer-lost-drone-finder-locater?variant=12856681627761",
    image: "/images/vifly-finder-2.png",
  },
  {
    id: "gps",
    category: "GPS",
    name: "HGLRC M100-5883 GPS",
    qty: "×1",
    price: "~$20",
    href: "https://www.racedayquads.com/products/hglrc-m100-5883-gps-module-10th-gen?variant=40233959063665",
    image: "/images/hglrc-gps.png",
  },
];

export const BUILD_CORE_COST = Math.round(sumPrices(BUILD_PARTS));
export const BUILD_EXTRAS_COST = Math.round(sumPrices(BUILD_EXTRAS));
