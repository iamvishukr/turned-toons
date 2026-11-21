// ─────────────────────────────────────────────────────────────
//  TurnedToons — single source of truth for site content.
//  ✏️  Update CONTACT details below with your real info.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "TurnedToons",
  url: "https://turnedtoons.com", // change to your live domain
  tagline: "Your photos, turned into one-of-a-kind cartoons.",
  description:
    "TurnedToons turns your photos into custom cartoon portraits — solo toons, couples, families, pets and fully illustrated fan-world scenes. Hand-drawn detail, vibrant colour and a likeness you'll instantly recognise.",
  keywords: [
    "custom cartoon portrait",
    "photo to cartoon",
    "turn photo into cartoon",
    "cartoon family portrait",
    "custom toon art",
    "anime portrait from photo",
    "pet cartoon portrait",
    "caricature from photo",
    "personalised cartoon gift",
    "cartoon illustration commission",
    "TurnedToons",
    "custom cartoon portrait Phoenix",
    "cartoon portrait Arizona",
  ],
};

export const CONTACT = {
  email: "turnedtoons@gmail.com",
  // Free access key from https://web3forms.com (sent to the email above).
  // Set NEXT_PUBLIC_WEB3FORMS_KEY in Vercel. Until it's set, the form falls back to opening the email app.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
  instagram: "https://www.instagram.com/turnedtoons/",
  instagramHandle: "@turnedtoons",
  facebook: "https://www.facebook.com/share/1EUBxQfkQZ/",
  facebookLabel: "TurnedToons on Facebook",
  address: {
    name: "Arlana Wyke",
    street: "2929 S. 38th Street",
    city: "Phoenix",
    region: "AZ",
    regionName: "Arizona",
    postalCode: "85040",
    country: "US",
  },
};

export const ADDRESS_LINES = [
  CONTACT.address.name,
  CONTACT.address.street,
  `${CONTACT.address.city}, ${CONTACT.address.regionName} (${CONTACT.address.region}) ${CONTACT.address.postalCode}`,
];

export type Work = {
  slug: string;
  title: string;
  blurb: string;
  category: "Families" | "Solo" | "Pets" | "Scenes";
  tags: string[];
  toon: string; // base file name in /public/works (without -sm / .webp)
  w: number;
  h: number;
  refs?: { file: string; w: number; h: number; label: string }[];
  alt: string;
};

export const WORKS: Work[] = [
  {
    slug: "family-adventure",
    title: "Three-Generation Adventure",
    blurb:
      "Grandpa, dad and the boys reimagined as a battle-ready crew on a sunny beach — complete with flying pizza and their favourite creature sidekicks.",
    category: "Families",
    tags: ["Family", "Adventure scene", "Creatures"],
    toon: "family-adventure-toon",
    w: 1440,
    h: 1080,
    refs: [{ file: "family-adventure-photo", w: 1280, h: 960, label: "Family selfie" }],
    alt: "Custom cartoon of a family of four — grandfather, father and two sons — posing heroically on a beach with fantasy creatures",
  },
  {
    slug: "critter-crew",
    title: "Captain & the Critter Crew",
    blurb:
      "A big personality turned toon — surrounded by his real-life cats and a few legendary pals on the airfield.",
    category: "Pets",
    tags: ["Solo", "Pets", "Fan-world"],
    toon: "critter-crew-toon",
    w: 1440,
    h: 1440,
    refs: [{ file: "critter-crew-photo", w: 1080, h: 1080, label: "Client selfie" }],
    alt: "Cartoon portrait of a bearded man with glasses holding his cats, surrounded by colourful cartoon creatures on an airfield",
  },
  {
    slug: "best-buds",
    title: "Her & Her Pug",
    blurb:
      "Two reference photos, one perfect toon: a portrait and a sleepy pug, combined into a sunny hangout with a giant snoozy buddy.",
    category: "Pets",
    tags: ["Portrait", "Pet", "Two references"],
    toon: "best-buds-toon",
    w: 1440,
    h: 1080,
    refs: [
      { file: "best-buds-photo", w: 960, h: 958, label: "Her selfie" },
      { file: "best-buds-pug-photo", w: 1440, h: 1080, label: "The pug" },
    ],
    alt: "Cartoon illustration of a red-haired woman with her pug on her shoulder, standing in front of a giant sleeping cartoon creature",
  },
  {
    slug: "young-champion",
    title: "The Young Champion",
    blurb:
      "A big smile turned into a stadium-sized moment — a young trainer in the arena with his team ready to battle.",
    category: "Solo",
    tags: ["Kids", "Arena scene", "Action pose"],
    toon: "young-champion-toon",
    w: 1440,
    h: 908,
    refs: [{ file: "young-champion-photo", w: 1440, h: 909, label: "Client photo" }],
    alt: "Cartoon of a young boy in a battle arena with powerful cartoon creatures, drawn from his photo",
  },
  {
    slug: "family-power-team",
    title: "Family Power Team",
    blurb:
      "A golden-hour family shoot transformed into an electric team portrait in front of their own home, with mighty creatures charging up.",
    category: "Families",
    tags: ["Family", "Home backdrop", "Action"],
    toon: "family-power-team-toon",
    w: 6000,
    h: 4000,
    refs: [{ file: "family-power-team-photo", w: 1638, h: 2048, label: "Family photo" }],
    alt: "Cartoon of a family of four in front of their house surrounded by energetic cartoon creatures",
  },
  {
    slug: "grill-master",
    title: "Grill Master",
    blurb: "Classic yellow-sitcom style — bold, bright and instantly recognisable.",
    category: "Solo",
    tags: ["Sitcom style", "Portrait"],
    toon: "grill-master-toon",
    w: 1080,
    h: 1080,
    alt: "Yellow-skinned sitcom-style cartoon of a bearded man in glasses and a cap holding a grilled skewer",
  },
  {
    slug: "stadium-showdown",
    title: "Stadium Showdown",
    blurb: "A full-scale battle poster under the stadium lights, packed with a fierce custom team.",
    category: "Scenes",
    tags: ["Poster", "Stadium", "Team"],
    toon: "stadium-showdown-toon",
    w: 4800,
    h: 3600,
    alt: "Cartoon poster of a man in a stadium surrounded by a team of fierce cartoon creatures",
  },
  {
    slug: "forest-trailblazer",
    title: "Forest Trailblazer",
    blurb: "Anime-style portrait with a cheerful electric sidekick in a lush bamboo forest.",
    category: "Solo",
    tags: ["Anime", "Portrait", "Forest"],
    toon: "forest-trailblazer-toon",
    w: 6378,
    h: 4252,
    alt: "Anime-style cartoon portrait of a smiling bearded man in a forest with a yellow cartoon companion",
  },
  {
    slug: "ramen-break",
    title: "Ramen Break",
    blurb: "Fully rendered anime character art — expressive pose, rich shading, all the noodles.",
    category: "Scenes",
    tags: ["Anime", "Character art"],
    toon: "ramen-break-toon",
    w: 5000,
    h: 6000,
    alt: "Anime character in a straw hat sitting cross-legged and eating a bowl of ramen",
  },
  {
    slug: "valley-hideout",
    title: "Valley Hideout",
    blurb: "A painterly fantasy landscape with a riverside ramen stall and mythical birds in the sky.",
    category: "Scenes",
    tags: ["Background art", "Landscape"],
    toon: "valley-hideout-toon",
    w: 1376,
    h: 828,
    alt: "Painterly cartoon landscape of a green valley, river, mountains and a small food stall with legendary birds above",
  },
  {
    slug: "caricature-collection",
    title: "The Toon Collection",
    blurb: "A wall of happy clients — couples, families and fans, each turned into their own iconic character.",
    category: "Families",
    tags: ["Collection", "Couples", "Families"],
    toon: "caricature-collection-toon",
    w: 1800,
    h: 1000,
    alt: "Collage of many custom cartoon portraits of couples, families and individuals",
  },
];

export const FAQS = [
  {
    q: "What kind of photo should I send?",
    a: "Clear, well-lit photos where faces are easy to see work best. Selfies are totally fine! If you want several people or pets in one toon, you can send separate photos — I'll bring everyone together in one scene.",
  },
  {
    q: "Can you add my pets?",
    a: "Absolutely. Dogs, cats and other furry family members are some of my favourite things to draw. Just send a photo of each pet along with your own.",
  },
  {
    q: "Can I choose a theme, style or fan-world?",
    a: "Yes. From classic sitcom-yellow and anime looks to full adventure, arena or fantasy scenes — tell me your idea, favourite characters or hobbies and I'll design the scene around you.",
  },
  {
    q: "How do I place an order?",
    a: "Send your photos and idea by email, or message TurnedToons on Instagram or Facebook. You'll get a reply with a quote and timeline, then share progress so you can request changes before the final artwork.",
  },
  {
    q: "What do I receive at the end?",
    a: "A high-resolution digital file that's ready to share online, frame, print on mugs, T-shirts, posters or use as a profile picture.",
  },
  {
    q: "Is it a good gift?",
    a: "It's one of the most personal gifts you can give — perfect for birthdays, anniversaries, Father's & Mother's Day, weddings or just to make someone smile.",
  },
];

export const img = (base: string, size: "sm" | "lg" = "lg") =>
  `works/${base}${size === "sm" ? "-sm" : ""}.webp`;
