/* ──────────────────────────────────────────────────────────────────────────
   GOTHWAVE — typed dataset, ported verbatim from gothwave-archive.jsx.
   Source of truth for: the SCENES taxonomy and the ENTRIES list. Do not rename
   ids/codes or drop entries — the UI counts derive from this file.

   STREAMING LINKS
   ───────────────
   Discogs + YouTube links are always deterministic SEARCH URLs. The Bandcamp
   link is a search by default, UPGRADED to a direct artist/label page only where
   it was confirmed by actually fetching the page and matching the artist name
   (set as `bandcamp` on the entry). 84 entries are upgraded; every URL was
   verified to return HTTP 200 and name the artist. Never guess a handle.

   FOR MANUAL REVIEW (confirmed, but worth a human glance — name collisions /
   ambiguous official page):
     - Christian Death -> christiandeathrozz.bandcamp.com is the Rozz Williams-era
       page; the Valor-led lineup may maintain a separate page.
     - Medical Records -> medicalrecords.bandcamp.com (NOT medicalwaste.*).
     - Avant! Records -> avantrecords.bandcamp.com (NOT avantirecords.*).
     - Sol Invictus -> sol-invictus.bandcamp.com is Tony Wakeford's own page.

   KEPT ON SEARCH (no confirmable direct Bandcamp found):
     - Cocteau Twins -> no official Bandcamp; cocteautwins.com is the official
       site but is not used here, to avoid labelling a non-Bandcamp link "Bandcamp".
     - oOoOO, Rome (Jerome Reuter's neofolk), Desire Records.
   Anything not listed above was not web-checked and stays on the search link.
   ────────────────────────────────────────────────────────────────────────── */

export type SceneId =
  | "coldwave"
  | "witch"
  | "industrial"
  | "darksynth"
  | "ethereal"
  | "deathrock"
  | "ebm"
  | "neofolk"
  | "dungeon"
  | "label";

export interface Scene {
  id: SceneId;
  code: string;
  label: string;
}

export interface Entry {
  /** Display name. */
  n: string;
  /** Scene id. */
  s: SceneId;
  /** One-line description. */
  d: string;
  /** Optional web-confirmed direct Bandcamp / official profile URL. */
  bandcamp?: string;
}

export const SCENES: Scene[] = [
  { id: "coldwave", code: "CLD", label: "Coldwave / Minimal Synth" },
  { id: "witch", code: "WCH", label: "Witch House / Drag" },
  {
    id: "industrial",
    code: "PWR",
    label: "Death Industrial / Power Electronics",
  },
  { id: "darksynth", code: "SYN", label: "Darksynth / Outrun" },
  { id: "ethereal", code: "ETH", label: "Ethereal Darkwave" },
  { id: "deathrock", code: "DRK", label: "Deathrock" },
  { id: "ebm", code: "EBM", label: "EBM / Industrial Techno" },
  { id: "neofolk", code: "FLK", label: "Neofolk" },
  { id: "dungeon", code: "DUN", label: "Dungeon Synth" },
  { id: "label", code: "LBL", label: "Labels / Collectives" },
];

export const SCENE_MAP: Record<SceneId, Scene> = Object.fromEntries(
  SCENES.map((s) => [s.id, s]),
) as Record<SceneId, Scene>;

export const ENTRIES: Entry[] = [
  // ── Coldwave / Minimal Synth ──
  {
    n: "Ortrotasce",
    s: "coldwave",
    d: "Raw American minimal synth / coldwave",
    bandcamp: "https://ortrotasce.bandcamp.com/",
  },
  {
    n: "Bestial Mouths",
    s: "coldwave",
    d: "Ritualistic, theatrical darkwave",
    bandcamp: "https://bestialmouths.bandcamp.com/",
  },
  {
    n: "Sextile",
    s: "coldwave",
    d: "Punky, harder-edged synth",
    bandcamp: "https://sextile.bandcamp.com/",
  },
  {
    n: "Hide",
    s: "coldwave",
    d: "Chicago noise / industrial-adjacent",
    bandcamp: "https://hide3.bandcamp.com/",
  },
  {
    n: "Linea Aspera",
    s: "coldwave",
    d: "Analog coldwave; Zoë Zanias pre-Keluar",
    bandcamp: "https://linea-aspera.bandcamp.com/",
  },
  {
    n: "Schwefelgelb",
    s: "coldwave",
    d: "German harsh EBM / coldwave",
    bandcamp: "https://schwefelgelb.bandcamp.com/",
  },
  { n: "Sary", s: "coldwave", d: "French minimal synth obscurity" },
  {
    n: "Vandal Moon",
    s: "coldwave",
    d: "Synth-goth, under the radar",
    bandcamp: "https://vandalmoon.bandcamp.com/",
  },
  {
    n: "Antipole",
    s: "coldwave",
    d: "Norwegian post-punk; prolific & slept-on",
    bandcamp: "https://antipole.bandcamp.com/",
  },
  {
    n: "Xeno & Oaklander",
    s: "coldwave",
    d: "Analog sequencer worship (McBride / Wendelbo)",
    bandcamp: "https://xenoandoaklander.bandcamp.com/",
  },
  {
    n: "Martial Canterel",
    s: "coldwave",
    d: "Sean McBride solo; pure analog minimal synth",
    bandcamp: "https://martialcanterel.bandcamp.com/",
  },
  {
    n: "Automelodi",
    s: "coldwave",
    d: "Montreal, French-language minimal synth",
    bandcamp: "https://automelodi.bandcamp.com/",
  },
  {
    n: "Hante.",
    s: "coldwave",
    d: "Hélène de Thoury's solo darkwave",
    bandcamp: "https://hante.bandcamp.com/",
  },
  {
    n: "Minuit Machine",
    s: "coldwave",
    d: "Hélène de Thoury's modern coldwave duo",
    bandcamp: "https://minuitmachine.bandcamp.com/",
  },
  {
    n: "Selofan",
    s: "coldwave",
    d: "Greek darkwave; runs Fabrika Records",
    bandcamp: "https://selofan.bandcamp.com/",
  },
  {
    n: "Kontravoid",
    s: "coldwave",
    d: "Hard electronic darkwave (ex-Crystal Castles live)",
    bandcamp: "https://kontravoid.bandcamp.com/",
  },
  {
    n: "VR SEX",
    s: "coldwave",
    d: "Andrew Clinco's grimier Drab Majesty offshoot",
    bandcamp: "https://vrsex.bandcamp.com/",
  },
  {
    n: "She Past Away",
    s: "coldwave",
    d: "Turkish Bauhaus-cold post-punk",
    bandcamp: "https://shepastawayofficial.bandcamp.com/",
  },
  {
    n: "Lebanon Hanover",
    s: "coldwave",
    d: "Anglo-German cold post-punk, deadpan",
    bandcamp: "https://lebanonhanover.bandcamp.com/",
  },
  {
    n: "Twin Tribes",
    s: "coldwave",
    d: "Texas darkwave, lush and melodic",
    bandcamp: "https://twintribes.bandcamp.com/",
  },
  {
    n: "Kaelan Mikla",
    s: "coldwave",
    d: "Icelandic post-punk turning synth",
    bandcamp: "https://kaelanmikla.bandcamp.com/",
  },
  {
    n: "Buzz Kull",
    s: "coldwave",
    d: "Australian dark synth-pop with bite",
    bandcamp: "https://buzzkull.bandcamp.com/",
  },
  {
    n: "Schonwald",
    s: "coldwave",
    d: "Italian coldwave / shoegaze blur",
    bandcamp: "https://schonwald.bandcamp.com/",
  },
  {
    n: "Oppenheimer Analysis",
    s: "coldwave",
    d: "Original minimal-wave bloodline",
    bandcamp: "https://oppenheimeranalysis.bandcamp.com/",
  },
  {
    n: "Linear Movement",
    s: "coldwave",
    d: "Belgian minimal synth (reissue canon)",
  },
  { n: "Solid Space", s: "coldwave", d: "DIY minimal synth classic" },
  { n: "Eleven Pond", s: "coldwave", d: "Cult minimal synth" },
  {
    n: "Kas Product",
    s: "coldwave",
    d: "French minimal synth / coldwave",
    bandcamp: "https://kasproduct.bandcamp.com/",
  },

  // ── Witch House / Drag ──
  {
    n: "The Haxan Cloak",
    s: "witch",
    d: "Bobby Krlic; pure dread (Midsommar composer)",
    bandcamp: "https://thehaxancloak.bandcamp.com/",
  },
  {
    n: "Holy Other",
    s: "witch",
    d: "Tri Angle; emotive, blurred witch house",
    bandcamp: "https://holyothermusic.bandcamp.com/",
  },
  {
    n: "Vessel",
    s: "witch",
    d: "Tri Angle; experimental and unsettling",
    bandcamp: "https://vesseluk.bandcamp.com/",
  },
  {
    n: "Evian Christ",
    s: "witch",
    d: "Tri Angle; dark, cavernous club",
    bandcamp: "https://evianchrist.bandcamp.com/",
  },
  { n: "∆AIMON", s: "witch", d: "Long-running witch house / industrial duo" },
  { n: "Modern Witch", s: "witch", d: "Obscure — exactly what it says" },
  { n: "Gr†ll Gr†ll", s: "witch", d: "Deep-scene witch house" },
  { n: "Fostercare", s: "witch", d: "Lo-fi, drone-leaning" },
  {
    n: "White Ring",
    s: "witch",
    d: "Foundational; the early demos era",
    bandcamp: "https://whitering.bandcamp.com/",
  },
  { n: "oOoOO", s: "witch", d: "Pioneer; started on Disaro" },
  {
    n: "Balam Acab",
    s: "witch",
    d: "Pioneer; Tri Angle's first record",
    bandcamp: "https://thebalamacab.bandcamp.com/",
  },
  { n: "Mhorair", s: "witch", d: "Deep-scene witch house" },
  { n: "Naderia", s: "witch", d: "Deep-scene witch house" },
  {
    n: "Ritualz (†‡†)",
    s: "witch",
    d: "Mexican witch house pioneer (JC Lobo)",
  },
  {
    n: "Salem",
    s: "witch",
    d: "The originators; King Night",
    bandcamp: "https://s4lem.bandcamp.com/",
  },
  {
    n: "Mater Suspiria Vision",
    s: "witch",
    d: "German, prolific, scene-defining",
    bandcamp: "https://matersuspiriavision.bandcamp.com/",
  },
  {
    n: "Pictureplane",
    s: "witch",
    d: "Denver; the dancier, poppier edge",
    bandcamp: "https://pictureplane.bandcamp.com/",
  },
  { n: "Crim3s", s: "witch", d: "UK; harsher and screamier" },
  {
    n: "Sidewalks and Skeletons",
    s: "witch",
    d: "Drone / trap-leaning, aged well",
    bandcamp: "https://sidewalksandskeletons.bandcamp.com/",
  },

  // ── Death Industrial / Power Electronics ──
  {
    n: "Pharmakon",
    s: "industrial",
    d: "Visceral, confrontational power electronics",
    bandcamp: "https://pharmakon.bandcamp.com/",
  },
  {
    n: "Lingua Ignota",
    s: "industrial",
    d: "Operatic, brutal, devastating",
    bandcamp: "https://linguaignota.bandcamp.com/",
  },
  {
    n: "Vatican Shadow",
    s: "industrial",
    d: "Militaristic techno-industrial (Dominick Fernow)",
    bandcamp: "https://vaticanshadow.bandcamp.com/",
  },
  {
    n: "Prurient",
    s: "industrial",
    d: "Deep-end PE — same artist as Vatican Shadow",
    bandcamp: "https://prurient.bandcamp.com/",
  },
  {
    n: "Croatian Amor",
    s: "industrial",
    d: "Ambient-industrial; Loke Rahbek (Posh Isolation)",
    bandcamp: "https://croatianamor.bandcamp.com/",
  },
  { n: "Cute Heels", s: "industrial", d: "Harder, Boy Harsher-adjacent" },
  { n: "Years of Denial", s: "industrial", d: "Harder darkwave / industrial" },
  {
    n: "Puce Mary",
    s: "industrial",
    d: "Danish contemporary power electronics; precise",
    bandcamp: "https://puce-mary.bandcamp.com/",
  },
  {
    n: "Genocide Organ",
    s: "industrial",
    d: "German PE cornerstone (provocative imagery)",
  },
  {
    n: "Sutcliffe Jügend",
    s: "industrial",
    d: "Foundational UK power electronics",
  },
  { n: "Ramleh", s: "industrial", d: "Foundational UK PE / noise" },
  {
    n: "Author & Punisher",
    s: "industrial",
    d: "One-man industrial-doom machines",
    bandcamp: "https://authorandpunisher.bandcamp.com/",
  },
  {
    n: "Uniform",
    s: "industrial",
    d: "Industrial rock with PE bones",
    bandcamp: "https://unifuckingform.bandcamp.com/",
  },
  {
    n: "Street Sects",
    s: "industrial",
    d: "Frantic noise-punk / industrial",
    bandcamp: "https://streetsects.bandcamp.com/",
  },
  {
    n: "Gnaw Their Tongues",
    s: "industrial",
    d: "Suffocating blackened noise-industrial",
    bandcamp: "https://gnawtheirtongues.bandcamp.com/",
  },
  {
    n: "Coil",
    s: "industrial",
    d: "The esoteric-industrial ancestor",
    bandcamp: "https://coilofficial.bandcamp.com/",
  },

  // ── Darksynth / Outrun ──
  {
    n: "GosT",
    s: "darksynth",
    d: "Occult darksynth",
    bandcamp: "https://gost1980s.bandcamp.com/",
  },
  {
    n: "Dance With the Dead",
    s: "darksynth",
    d: "Horror-synth duo",
    bandcamp: "https://dancewiththedead.bandcamp.com/",
  },
  {
    n: "Volkor X",
    s: "darksynth",
    d: "Heavy, sci-fi darksynth",
    bandcamp: "https://volkorx.bandcamp.com/",
  },
  {
    n: "Lazerhawk",
    s: "darksynth",
    d: "Early Rosso Corsa outrun",
    bandcamp: "https://lazerhawk.bandcamp.com/",
  },
  { n: "Maniac", s: "darksynth", d: "Hotline Miami contributor" },
  {
    n: "Mega Drive",
    s: "darksynth",
    d: "Sci-fi / cyberpunk darksynth",
    bandcamp: "https://megadrive.bandcamp.com/",
  },
  {
    n: "Dan Terminus",
    s: "darksynth",
    d: "Dense, almost prog darksynth",
    bandcamp: "https://dan-terminus.bandcamp.com/",
  },
  {
    n: "Magic Sword",
    s: "darksynth",
    d: "Narrative, heroic synth",
    bandcamp: "https://magic-sword.bandcamp.com/",
  },
  {
    n: "Waveshaper",
    s: "darksynth",
    d: "Clean outrun / retrowave",
    bandcamp: "https://waveshaper1.bandcamp.com/",
  },
  {
    n: "Robert Parker",
    s: "darksynth",
    d: "Sunlit outrun",
    bandcamp: "https://robertparkerofficial.bandcamp.com/",
  },
  {
    n: "Mitch Murder",
    s: "darksynth",
    d: "Retrowave; Hotline Miami",
    bandcamp: "https://mitchmurder.bandcamp.com/",
  },
  { n: "Jasper Byrne", s: "darksynth", d: "Hotline Miami contributor" },
  { n: "El Huervo", s: "darksynth", d: "Hotline Miami contributor / artist" },
  { n: "Scattle", s: "darksynth", d: "Hotline Miami contributor" },

  // ── Ethereal Darkwave ──
  {
    n: "Lycia",
    s: "ethereal",
    d: "US ethereal / slowcore darkwave; glacial",
    bandcamp: "https://lycia.bandcamp.com/",
  },
  {
    n: "Black Tape for a Blue Girl",
    s: "ethereal",
    d: "Gothic ethereal, long-running",
    bandcamp: "https://blacktapeforabluegirl.bandcamp.com/",
  },
  { n: "This Ascension", s: "ethereal", d: "Ethereal-goth" },
  {
    n: "Faith and the Muse",
    s: "ethereal",
    d: "Theatrical ethereal-goth",
    bandcamp: "https://faithandthemuse.bandcamp.com/",
  },
  { n: "Cocteau Twins", s: "ethereal", d: "The foundational ancestor" },

  // ── Deathrock ──
  {
    n: "Christian Death",
    s: "deathrock",
    d: "The cornerstone (Rozz Williams era)",
    bandcamp: "https://christiandeathrozz.bandcamp.com/",
  },
  {
    n: "Belgrado",
    s: "deathrock",
    d: "Spanish/Polish post-punk / deathrock",
    bandcamp: "https://belgrado.bandcamp.com/",
  },
  {
    n: "Bellicose Minds",
    s: "deathrock",
    d: "Portland deathrock revival",
    bandcamp: "https://bellicoseminds.bandcamp.com/",
  },
  {
    n: "Arctic Flowers",
    s: "deathrock",
    d: "Portland deathrock",
    bandcamp: "https://arcticflowers.bandcamp.com/",
  },
  {
    n: "Tragic Black",
    s: "deathrock",
    d: "Theatrical American deathrock",
    bandcamp: "https://tragicblack.bandcamp.com/",
  },

  // ── EBM / Industrial Techno ──
  {
    n: "DAF",
    s: "ebm",
    d: "Foundational body music",
    bandcamp: "https://daf-official.bandcamp.com/",
  },
  {
    n: "Front 242",
    s: "ebm",
    d: "Foundational EBM",
    bandcamp: "https://front242.bandcamp.com/",
  },
  {
    n: "Nitzer Ebb",
    s: "ebm",
    d: "Foundational EBM",
    bandcamp: "https://nitzerebb.bandcamp.com/",
  },
  {
    n: "Phase Fatale",
    s: "ebm",
    d: "Contemporary EBM / industrial techno (Berlin)",
    bandcamp: "https://phasefatalemusic.bandcamp.com/",
  },
  {
    n: "Container",
    s: "ebm",
    d: "Abrasive noise-techno",
    bandcamp: "https://gentledefect.bandcamp.com/",
  },

  // ── Neofolk ──
  {
    n: "Current 93",
    s: "neofolk",
    d: "David Tibet's apocalyptic folk",
    bandcamp: "https://current931.bandcamp.com/",
  },
  { n: "Rome", s: "neofolk", d: "Literary, cinematic neofolk" },
  { n: ":Of The Wand & The Moon:", s: "neofolk", d: "Core neofolk" },
  {
    n: "Sol Invictus",
    s: "neofolk",
    d: "Core neofolk",
    bandcamp: "https://sol-invictus.bandcamp.com/",
  },

  // ── Dungeon Synth ──
  {
    n: "Mortiis",
    s: "dungeon",
    d: "Early dungeon-synth era",
    bandcamp: "https://mortiis.bandcamp.com/",
  },
  {
    n: "Drowning the Light",
    s: "dungeon",
    d: "Atmospheric / raw black metal",
  },
  {
    n: "Old Tower",
    s: "dungeon",
    d: "Dutch; regal and cavernous",
    bandcamp: "https://oldtower.bandcamp.com/",
  },
  {
    n: "Erang",
    s: "dungeon",
    d: "French; prolific, melodic, lore-heavy",
    bandcamp: "https://erang.bandcamp.com/",
  },
  {
    n: "Fief",
    s: "dungeon",
    d: "Warm, comfy dungeon synth",
    bandcamp: "https://fief.bandcamp.com/",
  },
  {
    n: "Hole Dweller",
    s: "dungeon",
    d: "Comfy dungeon synth",
    bandcamp: "https://holedweller.bandcamp.com/",
  },
  { n: "Secret Stairways", s: "dungeon", d: "Classic '90s dungeon synth" },
  { n: "Depressive Silence", s: "dungeon", d: "Classic '90s dungeon synth" },
  {
    n: "Summoning",
    s: "dungeon",
    d: "Atmospheric black metal with DS keys",
    bandcamp: "https://summoning.bandcamp.com/",
  },
  { n: "Wongraven", s: "dungeon", d: "Satyr's dungeon-synth project" },

  // ── Labels / Collectives ──
  {
    n: "Dark Entries",
    s: "label",
    d: "SF (Josh Cheon); coldwave reissues + new",
    bandcamp: "https://darkentriesrecords.bandcamp.com/",
  },
  {
    n: "Minimal Wave / Cititrax",
    s: "label",
    d: "Veronica Vasicka; the minimal-synth canon",
  },
  {
    n: "Medical Records",
    s: "label",
    d: "Synth / post-punk reissues",
    bandcamp: "https://medicalrecords.bandcamp.com/",
  },
  { n: "Desire Records", s: "label", d: "France; darkwave / coldwave" },
  {
    n: "Avant! Records",
    s: "label",
    d: "Italy; coldwave / post-punk",
    bandcamp: "https://avantrecords.bandcamp.com/",
  },
  {
    n: "Mannequin Records",
    s: "label",
    d: "Berlin; darkwave / EBM",
    bandcamp: "https://mannequinrecords.bandcamp.com/",
  },
  {
    n: "Fabrika Records",
    s: "label",
    d: "Greece; modern darkwave (Selofan)",
    bandcamp: "https://fabrikarecords.bandcamp.com/",
  },
  { n: "Disaro", s: "label", d: "Houston; the witch house origin point" },
  { n: "Tri Angle", s: "label", d: "Defunct; witch house → experimental" },
  {
    n: "Posh Isolation",
    s: "label",
    d: "Copenhagen; noise / ambient / synth (closing)",
    bandcamp: "https://poshisolation.bandcamp.com/",
  },
  {
    n: "Cold Meat Industry",
    s: "label",
    d: "Sweden; the death-industrial cornerstone",
  },
  {
    n: "Rosso Corsa",
    s: "label",
    d: "Darksynth / outrun",
    bandcamp: "https://rossocorsarecords.bandcamp.com/",
  },
  {
    n: "aufnahme + wiedergabe",
    s: "label",
    d: "Berlin; EBM / industrial techno",
  },
  {
    n: "Projekt",
    s: "label",
    d: "Ethereal / darkwave home base",
    bandcamp: "https://projektrecords.bandcamp.com/",
  },
];

/** Strip parenthetical asides, then URL-encode — the prototype's query encoder. */
export const q = (s: string) =>
  encodeURIComponent(s.replace(/\s*\(.*?\)\s*/g, " ").trim());

export interface StreamLink {
  label: string;
  href: string;
}

/**
 * Three external links per entry. If a web-confirmed direct profile exists on
 * the entry (`bandcamp`), use it for the Bandcamp link; otherwise fall back to
 * a Bandcamp search. Discogs + YouTube are always searches.
 */
export const links = (entry: Entry): StreamLink[] => [
  {
    label: "Bandcamp",
    href: entry.bandcamp ?? `https://bandcamp.com/search?q=${q(entry.n)}`,
  },
  {
    label: "Discogs",
    href: `https://www.discogs.com/search/?q=${q(entry.n)}&type=all`,
  },
  {
    label: "YouTube",
    href: `https://www.youtube.com/results?search_query=${q(entry.n)}`,
  },
];
