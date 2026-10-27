// ── Videos for /learn ───────────────────────────────────────────────
// Hand-curated. To add a video: copy its id/title/length from
// scripts/videos.json (npm run videos) into the right topic.
// short: true marks a YouTube Short. part: numbered series entry.
// A topic with `feature` gets the big layout: the long-form video plus a
// numbered list (its exercises, or the series Shorts).

export const FEATURED_VIDEO = {
  id: "AXTtgPLoQrA",
  title: "How to Fly an FPV Drone (Beginner Guide)",
  length: "20:31",
  // Exercises (with a number) are shown as the main chapter buttons.
  chapters: [
    { t: "0:00", label: "How to fly FPV" },
    { t: "1:16", label: "What is FPV?" },
    { t: "2:00", label: "Flight modes explained" },
    { t: "3:15", label: "Choosing a simulator" },
    { t: "3:50", label: "Radio vs gaming controller" },
    { t: "5:53", label: "How to hold the radio" },
    { t: "6:42", label: "Stick controls explained" },
    { t: "8:02", label: "Hover & land", exercise: 1 },
    { t: "10:13", label: "Turning", exercise: 2 },
    { t: "11:57", label: "Figure 8s", exercise: 3 },
    { t: "14:30", label: "Orbits", exercise: 4 },
    { t: "15:22", label: "Flying through gates", exercise: 5 },
    { t: "16:34", label: "Flips & rolls", exercise: 6 },
    { t: "17:50", label: "Split-S", exercise: 7 },
    { t: "18:40", label: "Power loops", exercise: 8 },
    { t: "19:40", label: "What's next?" },
  ],
};

export const TOPICS = [
  {
    id: "start",
    title: "Start here",
    intro: "New to FPV? These answer \"what should I buy?\"",
    videos: [
      { id: "NXwnuzHCjhg", title: "I Found the Easiest Way to Start FPV (Meteor75 Pro Kit)", length: "16:09" },
      { id: "C-33wRr9qzQ", title: "The BEST Budget FPV Setup for Beginners (Air65 II)", length: "10:46" },
      { id: "uZPKhtO4I34", title: "Air65II vs Air75II — Which One Should You Buy?", length: "8:33" },
    ],
  },
  {
    id: "setup",
    title: "FPV Setup for Dummies",
    intro: "Getting your gear connected and ready to fly.",
    feature: { id: "r8WMn2OeP4Q", title: "How I Set Up My First FPV Drone (Beginner Guide)", length: "14:40" },
    listLabel: "The series: each step remade as its own Short, with extra detail",
    videos: [
      { id: "Z7tlE0BmAAU", title: "How FPV Actually Works", length: "1:22", short: true, part: 1 },
      { id: "aQmuHDup26Y", title: "FPV Setup for Beginners | What Gear Do You Need?", length: "0:51", short: true, part: 2 },
      { id: "67Mtp3uXy0s", title: "FPV Radio Setup (Model Profile & Arm Alert)", length: "2:34", short: true, part: 3 },
      { id: "wbPngqZj1ok", title: "How to Bind Your FPV Drone to Your Controller", length: "1:07", short: true, part: 4 },
      { id: "1qa31NgudPY", title: "Charging LiPo’s Safely", length: "2:41", short: true, part: 5 },
      { id: "tk2GYly9KMw", title: "Betaflight Basics Before Flying", length: "3:00", short: true, part: 6 },
      { id: "8RnGpQwaDQU", title: "Pairing Goggles With Your Drone", length: "2:26", short: true, part: 7 },
      { id: "xEf8j9te2zQ", title: "Your First FPV Flight", length: "0:58", short: true, part: 8 },
    ],
  },
  {
    id: "flying",
    title: "Flying FPV for Dummies",
    intro: "Learning to actually fly, starting in a simulator.",
    feature: FEATURED_VIDEO,
    videos: [
      { id: "Ljw2_856qfc", title: "Your First FPV Simulator (Beginner Guide) | Liftoff Microdrones", length: "15:08" },
      { id: "HV4aiumloDk", title: "I Spent 20 Hours Learning FPV in a Simulator… Here’s What Happened", length: "4:59" },
      { id: "0RQHfmo3zW0", title: "How to Fly FPV Drones | Beginner Basics", length: "1:34", short: true },
      { id: "krqtForhbf8", title: "How to Fly an FPV Drone for the First Time", length: "1:26", short: true },
      { id: "1Xx6dBsCIZQ", title: "How to Turn an FPV Drone | Easy Exercises", length: "1:25", short: true },
    ],
  },
  {
    id: "fixes",
    title: "Quick fixes & tips",
    intro: "Short answers to the problems everyone runs into.",
    videos: [
      { id: "-EonGpeA6uc", title: "How To Fix a Tinywhoop Motor That Won’t Spin", length: "1:30", short: true },
      { id: "Ttv3CZi560Y", title: "Why Does My FPV Drone Video Cut Out? (ELRS + VTX Fix)", length: "0:44", short: true },
      { id: "oTeYJ_vXaNI", title: "Control VTX Power With Your Scroll Wheel (Betaflight Setup Guide)", length: "11:38" },
      { id: "rXmvRH9hlPg", title: "How to Toggle Your FPV OSD With a Switch", length: "0:34", short: true },
      { id: "m3ud9Oqab8A", title: "Meteor 75 Pro | How to Change Camera Angle", length: "1:12", short: true },
      { id: "VPkrrY6xlO0", title: "How to take apart an Air75 II", length: "0:25", short: true },
    ],
  },
  {
    id: "reviews",
    title: "Reviews & comparisons",
    intro: "Gear tested side by side, so you can see the difference.",
    videos: [
      { id: "rPBj_TY7ePU", title: "Air75 II Freestyle vs Race vs Champion | Which Is Best?", length: "21:06" },
      { id: "1wmoYFjcva8", title: "I Upgraded My FPV Goggles… Was It Worth It? (VR04 vs SKY04X Pro)", length: "11:26" },
      { id: "DShnbqwHHl0", title: "My First FPV Goggle Upgrade… (Skyzone SKY04X Pro Unboxing)", length: "5:23" },
    ],
  },
  {
    id: "digital",
    title: "Going digital",
    intro: "Trying digital FPV after six months of analog.",
    videos: [
      { id: "UV-LIEY7-k0", title: "I'm DONE With Analog FPV… (Meteor75 Pro II O4 Review)", length: "17:57" },
      { id: "nmbdCi8Gpjk", title: "Analog vs Digital FPV is INSANE", length: "0:30", short: true },
      { id: "3VtYRNwq5FA", title: "Unboxing the Meteor75 Pro II O4", length: "0:29", short: true },
      { id: "EU8uWy9x1zg", title: "Paramotor Water Drag FPV Shot", length: "0:22", short: true },
      { id: "XfKd-4B_RAY", title: "First Flight w/ the DJI Avata 2", length: "0:59", short: true },
    ],
  },
  {
    id: "builds",
    title: "Builds & repairs",
    intro: "Soldering, building, and fixing things I broke.",
    videos: [
      { id: "1FGU_FMeoo4", title: "Can a Beginner Build a 3.5-Inch FPV Drone?", length: "23:57" },
      { id: "jpcwGQwbkCw", title: "I LEARNED HOW TO DIRECT SOLDER MY MOTOR WIRES (Air 65II)", length: "16:14" },
      { id: "mgYs0kuHWBM", title: "I Tried Soldering for the First Time… (FPV Beginner)", length: "12:42" },
    ],
  },
  {
    id: "journey",
    title: "My FPV journey",
    intro: "How it's going so far.",
    videos: [
      { id: "NJK1SpQ9Vdc", title: "6 Months of FPV Changed Everything", length: "14:34" },
      { id: "KraRb8blink", title: "I Went All in on FPV For 90 Days", length: "12:27" },
      { id: "vnu-J_q1_Cg", title: "I Spent 30 Days Learning FPV (Here’s What Happened)", length: "6:26" },
      { id: "KTll97UqMi0", title: "Everything I'm Working On in FPV Right Now | Desk Tour & Favorite Setup", length: "10:31" },
      { id: "DOtNvZF7pjw", title: "Come on an Adventure With Me | Air75 II Mountain Flying", length: "9:35" },
    ],
  },
  {
    id: "streams",
    title: "Live streams",
    intro: "Sim sessions and Q&As with the community.",
    videos: [
      { id: "EqGzFpAjMf4", title: "Community FPV Sim Flying | Liftoff: Micro Drones LIVE", length: "1:39:26" },
      { id: "c5AcZAUXzzk", title: "Flying FPV With You Guys | Liftoff: Micro Drones LIVE", length: "2:30:19" },
      { id: "sFjHbkdhskU", title: "Air75 II Setup + Q&A | Freestyle vs Race vs Champion Prep", length: "2:00:24" },
      { id: "-z6AWeH3v7Q", title: "We Talked FPV for Almost an Hour... (ft. Symbioze)", length: "49:32" },
    ],
  },
];
