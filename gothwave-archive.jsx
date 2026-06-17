import React, { useState, useMemo, useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   GOTHWAVE — a cold archive of the underground
   An interactive explorer for the crate-digging list: browse by scene,
   search by name, open any entry to find its music.
   Modeled on the zapoutdoorz lineup-explorer pattern (hero · filters ·
   search · card grid · detail modal), restyled for this subject.
   ────────────────────────────────────────────────────────────────────────── */

const SCENES = [
  { id: "coldwave", code: "CLD", label: "Coldwave / Minimal Synth" },
  { id: "witch", code: "WCH", label: "Witch House / Drag" },
  { id: "industrial", code: "PWR", label: "Death Industrial / Power Electronics" },
  { id: "darksynth", code: "SYN", label: "Darksynth / Outrun" },
  { id: "ethereal", code: "ETH", label: "Ethereal Darkwave" },
  { id: "deathrock", code: "DRK", label: "Deathrock" },
  { id: "ebm", code: "EBM", label: "EBM / Industrial Techno" },
  { id: "neofolk", code: "FLK", label: "Neofolk" },
  { id: "dungeon", code: "DUN", label: "Dungeon Synth" },
  { id: "label", code: "LBL", label: "Labels / Collectives" },
];

const SCENE_MAP = Object.fromEntries(SCENES.map((s) => [s.id, s]));

const ENTRIES = [
  // ── Coldwave / Minimal Synth ──
  { n: "Ortrotasce", s: "coldwave", d: "Raw American minimal synth / coldwave" },
  { n: "Bestial Mouths", s: "coldwave", d: "Ritualistic, theatrical darkwave" },
  { n: "Sextile", s: "coldwave", d: "Punky, harder-edged synth" },
  { n: "Hide", s: "coldwave", d: "Chicago noise / industrial-adjacent" },
  { n: "Linea Aspera", s: "coldwave", d: "Analog coldwave; Zoë Zanias pre-Keluar" },
  { n: "Schwefelgelb", s: "coldwave", d: "German harsh EBM / coldwave" },
  { n: "Sary", s: "coldwave", d: "French minimal synth obscurity" },
  { n: "Vandal Moon", s: "coldwave", d: "Synth-goth, under the radar" },
  { n: "Antipole", s: "coldwave", d: "Norwegian post-punk; prolific & slept-on" },
  { n: "Xeno & Oaklander", s: "coldwave", d: "Analog sequencer worship (McBride / Wendelbo)" },
  { n: "Martial Canterel", s: "coldwave", d: "Sean McBride solo; pure analog minimal synth" },
  { n: "Automelodi", s: "coldwave", d: "Montreal, French-language minimal synth" },
  { n: "Hante.", s: "coldwave", d: "Hélène de Thoury's solo darkwave" },
  { n: "Minuit Machine", s: "coldwave", d: "Hélène de Thoury's modern coldwave duo" },
  { n: "Selofan", s: "coldwave", d: "Greek darkwave; runs Fabrika Records" },
  { n: "Kontravoid", s: "coldwave", d: "Hard electronic darkwave (ex-Crystal Castles live)" },
  { n: "VR SEX", s: "coldwave", d: "Andrew Clinco's grimier Drab Majesty offshoot" },
  { n: "She Past Away", s: "coldwave", d: "Turkish Bauhaus-cold post-punk" },
  { n: "Lebanon Hanover", s: "coldwave", d: "Anglo-German cold post-punk, deadpan" },
  { n: "Twin Tribes", s: "coldwave", d: "Texas darkwave, lush and melodic" },
  { n: "Kaelan Mikla", s: "coldwave", d: "Icelandic post-punk turning synth" },
  { n: "Buzz Kull", s: "coldwave", d: "Australian dark synth-pop with bite" },
  { n: "Schonwald", s: "coldwave", d: "Italian coldwave / shoegaze blur" },
  { n: "Oppenheimer Analysis", s: "coldwave", d: "Original minimal-wave bloodline" },
  { n: "Linear Movement", s: "coldwave", d: "Belgian minimal synth (reissue canon)" },
  { n: "Solid Space", s: "coldwave", d: "DIY minimal synth classic" },
  { n: "Eleven Pond", s: "coldwave", d: "Cult minimal synth" },
  { n: "Kas Product", s: "coldwave", d: "French minimal synth / coldwave" },

  // ── Witch House / Drag ──
  { n: "The Haxan Cloak", s: "witch", d: "Bobby Krlic; pure dread (Midsommar composer)" },
  { n: "Holy Other", s: "witch", d: "Tri Angle; emotive, blurred witch house" },
  { n: "Vessel", s: "witch", d: "Tri Angle; experimental and unsettling" },
  { n: "Evian Christ", s: "witch", d: "Tri Angle; dark, cavernous club" },
  { n: "∆AIMON", s: "witch", d: "Long-running witch house / industrial duo" },
  { n: "Modern Witch", s: "witch", d: "Obscure — exactly what it says" },
  { n: "Gr†ll Gr†ll", s: "witch", d: "Deep-scene witch house" },
  { n: "Fostercare", s: "witch", d: "Lo-fi, drone-leaning" },
  { n: "White Ring", s: "witch", d: "Foundational; the early demos era" },
  { n: "oOoOO", s: "witch", d: "Pioneer; started on Disaro" },
  { n: "Balam Acab", s: "witch", d: "Pioneer; Tri Angle's first record" },
  { n: "Mhorair", s: "witch", d: "Deep-scene witch house" },
  { n: "Naderia", s: "witch", d: "Deep-scene witch house" },
  { n: "Ritualz (†‡†)", s: "witch", d: "Mexican witch house pioneer (JC Lobo)" },
  { n: "Salem", s: "witch", d: "The originators; King Night" },
  { n: "Mater Suspiria Vision", s: "witch", d: "German, prolific, scene-defining" },
  { n: "Pictureplane", s: "witch", d: "Denver; the dancier, poppier edge" },
  { n: "Crim3s", s: "witch", d: "UK; harsher and screamier" },
  { n: "Sidewalks and Skeletons", s: "witch", d: "Drone / trap-leaning, aged well" },

  // ── Death Industrial / Power Electronics ──
  { n: "Pharmakon", s: "industrial", d: "Visceral, confrontational power electronics" },
  { n: "Lingua Ignota", s: "industrial", d: "Operatic, brutal, devastating" },
  { n: "Vatican Shadow", s: "industrial", d: "Militaristic techno-industrial (Dominick Fernow)" },
  { n: "Prurient", s: "industrial", d: "Deep-end PE — same artist as Vatican Shadow" },
  { n: "Croatian Amor", s: "industrial", d: "Ambient-industrial; Loke Rahbek (Posh Isolation)" },
  { n: "Cute Heels", s: "industrial", d: "Harder, Boy Harsher-adjacent" },
  { n: "Years of Denial", s: "industrial", d: "Harder darkwave / industrial" },
  { n: "Puce Mary", s: "industrial", d: "Danish contemporary power electronics; precise" },
  { n: "Genocide Organ", s: "industrial", d: "German PE cornerstone (provocative imagery)" },
  { n: "Sutcliffe Jügend", s: "industrial", d: "Foundational UK power electronics" },
  { n: "Ramleh", s: "industrial", d: "Foundational UK PE / noise" },
  { n: "Author & Punisher", s: "industrial", d: "One-man industrial-doom machines" },
  { n: "Uniform", s: "industrial", d: "Industrial rock with PE bones" },
  { n: "Street Sects", s: "industrial", d: "Frantic noise-punk / industrial" },
  { n: "Gnaw Their Tongues", s: "industrial", d: "Suffocating blackened noise-industrial" },
  { n: "Coil", s: "industrial", d: "The esoteric-industrial ancestor" },

  // ── Darksynth / Outrun ──
  { n: "GosT", s: "darksynth", d: "Occult darksynth" },
  { n: "Dance With the Dead", s: "darksynth", d: "Horror-synth duo" },
  { n: "Volkor X", s: "darksynth", d: "Heavy, sci-fi darksynth" },
  { n: "Lazerhawk", s: "darksynth", d: "Early Rosso Corsa outrun" },
  { n: "Maniac", s: "darksynth", d: "Hotline Miami contributor" },
  { n: "Mega Drive", s: "darksynth", d: "Sci-fi / cyberpunk darksynth" },
  { n: "Dan Terminus", s: "darksynth", d: "Dense, almost prog darksynth" },
  { n: "Magic Sword", s: "darksynth", d: "Narrative, heroic synth" },
  { n: "Waveshaper", s: "darksynth", d: "Clean outrun / retrowave" },
  { n: "Robert Parker", s: "darksynth", d: "Sunlit outrun" },
  { n: "Mitch Murder", s: "darksynth", d: "Retrowave; Hotline Miami" },
  { n: "Jasper Byrne", s: "darksynth", d: "Hotline Miami contributor" },
  { n: "El Huervo", s: "darksynth", d: "Hotline Miami contributor / artist" },
  { n: "Scattle", s: "darksynth", d: "Hotline Miami contributor" },

  // ── Ethereal Darkwave ──
  { n: "Lycia", s: "ethereal", d: "US ethereal / slowcore darkwave; glacial" },
  { n: "Black Tape for a Blue Girl", s: "ethereal", d: "Gothic ethereal, long-running" },
  { n: "This Ascension", s: "ethereal", d: "Ethereal-goth" },
  { n: "Faith and the Muse", s: "ethereal", d: "Theatrical ethereal-goth" },
  { n: "Cocteau Twins", s: "ethereal", d: "The foundational ancestor" },

  // ── Deathrock ──
  { n: "Christian Death", s: "deathrock", d: "The cornerstone (Rozz Williams era)" },
  { n: "Belgrado", s: "deathrock", d: "Spanish/Polish post-punk / deathrock" },
  { n: "Bellicose Minds", s: "deathrock", d: "Portland deathrock revival" },
  { n: "Arctic Flowers", s: "deathrock", d: "Portland deathrock" },
  { n: "Tragic Black", s: "deathrock", d: "Theatrical American deathrock" },

  // ── EBM / Industrial Techno ──
  { n: "DAF", s: "ebm", d: "Foundational body music" },
  { n: "Front 242", s: "ebm", d: "Foundational EBM" },
  { n: "Nitzer Ebb", s: "ebm", d: "Foundational EBM" },
  { n: "Phase Fatale", s: "ebm", d: "Contemporary EBM / industrial techno (Berlin)" },
  { n: "Container", s: "ebm", d: "Abrasive noise-techno" },

  // ── Neofolk ──
  { n: "Current 93", s: "neofolk", d: "David Tibet's apocalyptic folk" },
  { n: "Rome", s: "neofolk", d: "Literary, cinematic neofolk" },
  { n: ":Of The Wand & The Moon:", s: "neofolk", d: "Core neofolk" },
  { n: "Sol Invictus", s: "neofolk", d: "Core neofolk" },

  // ── Dungeon Synth ──
  { n: "Mortiis", s: "dungeon", d: "Early dungeon-synth era" },
  { n: "Drowning the Light", s: "dungeon", d: "Atmospheric / raw black metal" },
  { n: "Old Tower", s: "dungeon", d: "Dutch; regal and cavernous" },
  { n: "Erang", s: "dungeon", d: "French; prolific, melodic, lore-heavy" },
  { n: "Fief", s: "dungeon", d: "Warm, comfy dungeon synth" },
  { n: "Hole Dweller", s: "dungeon", d: "Comfy dungeon synth" },
  { n: "Secret Stairways", s: "dungeon", d: "Classic '90s dungeon synth" },
  { n: "Depressive Silence", s: "dungeon", d: "Classic '90s dungeon synth" },
  { n: "Summoning", s: "dungeon", d: "Atmospheric black metal with DS keys" },
  { n: "Wongraven", s: "dungeon", d: "Satyr's dungeon-synth project" },

  // ── Labels / Collectives ──
  { n: "Dark Entries", s: "label", d: "SF (Josh Cheon); coldwave reissues + new" },
  { n: "Minimal Wave / Cititrax", s: "label", d: "Veronica Vasicka; the minimal-synth canon" },
  { n: "Medical Records", s: "label", d: "Synth / post-punk reissues" },
  { n: "Desire Records", s: "label", d: "France; darkwave / coldwave" },
  { n: "Avant! Records", s: "label", d: "Italy; coldwave / post-punk" },
  { n: "Mannequin Records", s: "label", d: "Berlin; darkwave / EBM" },
  { n: "Fabrika Records", s: "label", d: "Greece; modern darkwave (Selofan)" },
  { n: "Disaro", s: "label", d: "Houston; the witch house origin point" },
  { n: "Tri Angle", s: "label", d: "Defunct; witch house → experimental" },
  { n: "Posh Isolation", s: "label", d: "Copenhagen; noise / ambient / synth (closing)" },
  { n: "Cold Meat Industry", s: "label", d: "Sweden; the death-industrial cornerstone" },
  { n: "Rosso Corsa", s: "label", d: "Darksynth / outrun" },
  { n: "aufnahme + wiedergabe", s: "label", d: "Berlin; EBM / industrial techno" },
  { n: "Projekt", s: "label", d: "Ethereal / darkwave home base" },
];

const q = (s) => encodeURIComponent(s.replace(/\s*\(.*?\)\s*/g, " ").trim());
const links = (name) => [
  { label: "Bandcamp", href: `https://bandcamp.com/search?q=${q(name)}` },
  { label: "Discogs", href: `https://www.discogs.com/search/?q=${q(name)}&type=all` },
  { label: "YouTube", href: `https://www.youtube.com/results?search_query=${q(name)}` },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;600;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

:root{
  --ink:#0a0a0c; --ash:#141318; --ash2:#1b1a20;
  --bone:#e9e3d6; --smoke:#74727f; --faint:#3a3942;
  --ox:#a8323f; --ox-dim:#6f2530; --ice:#9fc6d2; --line:#26252c;
}
*{box-sizing:border-box;}
.gw-root{
  background:var(--ink); color:var(--bone);
  font-family:'Space Mono',ui-monospace,monospace;
  min-height:100vh; position:relative; overflow-x:hidden;
}
/* grain */
.gw-root::before{
  content:""; position:fixed; inset:0; pointer-events:none; z-index:50; opacity:.05;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.gw-wrap{max-width:1180px; margin:0 auto; padding:0 22px;}

/* hero */
.gw-hero{padding:64px 0 34px; position:relative;}
.gw-hero::after{
  content:""; position:absolute; inset:0; pointer-events:none; opacity:.35;
  background:repeating-linear-gradient(0deg,transparent 0 2px, rgba(0,0,0,.5) 2px 4px);
  mask-image:linear-gradient(180deg,#000,transparent 70%);
}
.gw-eyebrow{
  font-size:11px; letter-spacing:.42em; text-transform:uppercase; color:var(--smoke);
  display:flex; align-items:center; gap:12px; margin-bottom:14px;
}
.gw-eyebrow::after{content:""; height:1px; flex:1; background:var(--line);}
.gw-title{
  font-family:'Big Shoulders Display',sans-serif; font-weight:900;
  font-size:clamp(58px,15vw,168px); line-height:.82; letter-spacing:-.01em;
  margin:0; text-transform:uppercase;
  text-shadow:.045em 0 var(--ox-dim), -.03em 0 rgba(159,198,210,.22);
}
.gw-sub{
  margin:20px 0 0; max-width:640px; color:var(--bone); font-size:14px; line-height:1.65;
}
.gw-sub .dim{color:var(--smoke);}
.gw-meta{
  margin-top:24px; display:flex; gap:26px; flex-wrap:wrap;
  font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--smoke);
}
.gw-meta b{color:var(--ice); font-weight:700;}

/* filter bar */
.gw-bar{
  position:sticky; top:0; z-index:30; background:rgba(10,10,12,.86);
  backdrop-filter:blur(8px); border-top:1px solid var(--line);
  border-bottom:1px solid var(--line); padding:14px 0;
}
.gw-search{display:flex; align-items:center; gap:10px; margin-bottom:12px;}
.gw-search input{
  flex:1; background:var(--ash); border:1px solid var(--line); color:var(--bone);
  font-family:inherit; font-size:13px; padding:11px 13px; letter-spacing:.04em;
}
.gw-search input::placeholder{color:var(--smoke);}
.gw-search input:focus{outline:none; border-color:var(--ice);}
.gw-clear{
  background:none; border:1px solid var(--line); color:var(--smoke);
  font-family:inherit; font-size:11px; padding:11px 12px; cursor:pointer; letter-spacing:.1em;
}
.gw-clear:hover{color:var(--bone); border-color:var(--ox);}
.gw-chips{display:flex; gap:8px; flex-wrap:wrap;}
.gw-chip{
  background:none; border:1px solid var(--line); color:var(--smoke);
  font-family:inherit; font-size:11px; letter-spacing:.12em; text-transform:uppercase;
  padding:7px 11px; cursor:pointer; transition:.15s; display:inline-flex; gap:8px; align-items:center;
}
.gw-chip:hover{color:var(--bone); border-color:var(--smoke);}
.gw-chip .ct{color:var(--faint); font-size:10px;}
.gw-chip[data-on="1"]{color:var(--ink); background:var(--bone); border-color:var(--bone);}
.gw-chip[data-on="1"] .ct{color:var(--ox-dim);}

/* grid */
.gw-grid{
  display:grid; grid-template-columns:repeat(auto-fill,minmax(244px,1fr));
  gap:1px; background:var(--line); border:1px solid var(--line);
  margin:26px 0 60px;
}
.gw-card{
  background:var(--ash); border:none; text-align:left; cursor:pointer;
  padding:18px 18px 20px; transition:.16s; position:relative; min-height:128px;
  display:flex; flex-direction:column; color:inherit; font-family:inherit;
}
.gw-card:hover{background:var(--ash2); transform:translateY(-2px);}
.gw-card:hover .gw-name{text-shadow:.03em 0 var(--ox), -.025em 0 var(--ice);}
.gw-card:focus-visible{outline:2px solid var(--ice); outline-offset:-2px;}
.gw-code{
  font-size:10px; letter-spacing:.2em; color:var(--smoke);
  display:flex; justify-content:space-between; align-items:center; margin-bottom:auto;
}
.gw-flagdot{color:var(--ox); font-size:12px; line-height:1;}
.gw-name{
  font-family:'Big Shoulders Display',sans-serif; font-weight:700;
  font-size:25px; line-height:1.02; letter-spacing:.005em; margin:18px 0 8px;
  text-transform:uppercase; transition:.16s;
}
.gw-desc{font-size:12px; line-height:1.5; color:var(--smoke);}

.gw-empty{
  background:var(--ash); border:1px solid var(--line); padding:48px 24px; text-align:center;
  margin:26px 0 60px;
}
.gw-empty p{color:var(--smoke); font-size:13px; margin:0 0 16px;}

/* modal */
.gw-back{
  position:fixed; inset:0; z-index:60; background:rgba(4,4,6,.82);
  backdrop-filter:blur(3px); display:flex; align-items:flex-end; justify-content:center;
  padding:0; animation:fade .18s ease;
}
@keyframes fade{from{opacity:0}to{opacity:1}}
.gw-modal{
  background:var(--ash); border-top:2px solid var(--ox); width:100%; max-width:560px;
  padding:30px 26px 34px; position:relative; animation:rise .22s cubic-bezier(.2,.7,.3,1);
}
@keyframes rise{from{transform:translateY(16px);opacity:.4}to{transform:translateY(0);opacity:1}}
.gw-x{
  position:absolute; top:16px; right:16px; background:none; border:1px solid var(--line);
  color:var(--smoke); width:34px; height:34px; cursor:pointer; font-size:16px; line-height:1;
  font-family:inherit;
}
.gw-x:hover{color:var(--bone); border-color:var(--ox);}
.gw-x:focus-visible{outline:2px solid var(--ice);}
.gw-mcode{font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--ice);}
.gw-mname{
  font-family:'Big Shoulders Display',sans-serif; font-weight:900; text-transform:uppercase;
  font-size:clamp(36px,9vw,56px); line-height:.92; margin:10px 0 6px;
}
.gw-mdesc{color:var(--bone); font-size:14px; line-height:1.6; margin:0 0 22px;}
.gw-flag{
  border:1px solid var(--ox-dim); background:rgba(168,50,63,.08);
  padding:12px 14px; margin:0 0 22px; font-size:12px; line-height:1.55; color:var(--bone);
}
.gw-flag b{color:var(--ox); letter-spacing:.14em; font-size:10px; text-transform:uppercase; display:block; margin-bottom:6px;}
.gw-act{font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:var(--smoke); margin:0 0 11px;}
.gw-links{display:flex; gap:9px; flex-wrap:wrap;}
.gw-link{
  border:1px solid var(--line); color:var(--ice); text-decoration:none;
  font-size:12px; letter-spacing:.08em; padding:11px 15px; transition:.15s;
  display:inline-flex; align-items:center; gap:7px;
}
.gw-link:hover{border-color:var(--ice); background:rgba(159,198,210,.06);}
.gw-link span{color:var(--faint);}

/* footer */
.gw-foot{border-top:1px solid var(--line); padding:30px 0 56px; color:var(--smoke); font-size:11px; line-height:1.7;}
.gw-foot .lbl{color:var(--bone); letter-spacing:.16em; text-transform:uppercase; font-size:10px;}

@media (max-width:560px){
  .gw-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));}
  .gw-card{min-height:112px; padding:14px;}
  .gw-name{font-size:20px;}
}
@media (prefers-reduced-motion:reduce){
  *{animation:none !important; transition:none !important;}
  .gw-card:hover{transform:none;}
}
`;

export default function GothwaveArchive() {
  const [scene, setScene] = useState("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);
  const closeRef = useRef(null);

  const counts = useMemo(() => {
    const c = {};
    for (const e of ENTRIES) c[e.s] = (c[e.s] || 0) + 1;
    return c;
  }, []);

  const results = useMemo(() => {
    const t = query.trim().toLowerCase();
    return ENTRIES.filter(
      (e) =>
        (scene === "all" || e.s === scene) &&
        (!t || e.n.toLowerCase().includes(t) || e.d.toLowerCase().includes(t))
    );
  }, [scene, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (ev) => ev.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reset = () => { setScene("all"); setQuery(""); };

  return (
    <div className="gw-root">
      <style>{CSS}</style>

      <header className="gw-wrap gw-hero">
        <div className="gw-eyebrow">A cold archive of the underground</div>
        <h1 className="gw-title">Gothwave</h1>
        <p className="gw-sub">
          A browsable index of the deep cuts — coldwave and minimal synth, witch
          house, death industrial, darksynth, and the adjacent darkness.{" "}
          <span className="dim">Filter by scene, search the names, open any entry to go find the music.</span>
        </p>
        <div className="gw-meta">
          <span><b>{ENTRIES.length}</b> entries</span>
          <span><b>{SCENES.length}</b> scenes</span>
        </div>
      </header>

      <div className="gw-bar">
        <div className="gw-wrap">
          <div className="gw-search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the archive — name or sound…"
              aria-label="Search the archive"
            />
            {(query || scene !== "all") && (
              <button className="gw-clear" onClick={reset}>CLEAR</button>
            )}
          </div>
          <div className="gw-chips">
            <button className="gw-chip" data-on={scene === "all" ? 1 : 0} onClick={() => setScene("all")}>
              ALL <span className="ct">{ENTRIES.length}</span>
            </button>
            {SCENES.map((s) => (
              <button
                key={s.id}
                className="gw-chip"
                data-on={scene === s.id ? 1 : 0}
                onClick={() => setScene(scene === s.id ? "all" : s.id)}
                title={s.label}
              >
                {s.code} <span className="ct">{counts[s.id] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="gw-wrap">
        {results.length === 0 ? (
          <div className="gw-empty">
            <p>Nothing in the archive matches that.</p>
            <button className="gw-clear" onClick={reset}>RESET THE ARCHIVE</button>
          </div>
        ) : (
          <div className="gw-grid">
            {results.map((e) => {
              const sc = SCENE_MAP[e.s];
              return (
                <button key={e.n} className="gw-card" onClick={() => setOpen(e)} aria-label={`Open ${e.n}`}>
                  <div className="gw-code">
                    <span>{sc.code}</span>
                  </div>
                  <div className="gw-name">{e.n}</div>
                  <div className="gw-desc">{e.d}</div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      <footer className="gw-wrap gw-foot">
        Listen links open searches on Bandcamp, Discogs, and YouTube — no profile is
        pre-verified, so trust your ears. Built from the GOTHWAVE crate-digging list.
      </footer>

      {open && (
        <div className="gw-back" onClick={() => setOpen(null)}>
          <div
            className="gw-modal"
            role="dialog"
            aria-modal="true"
            aria-label={open.n}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="gw-x" ref={closeRef} onClick={() => setOpen(null)} aria-label="Close">✕</button>
            <div className="gw-mcode">{SCENE_MAP[open.s].code} — {SCENE_MAP[open.s].label}</div>
            <div className="gw-mname">{open.n}</div>
            <p className="gw-mdesc">{open.d}.</p>
            <p className="gw-act">{open.s === "label" ? "Explore the catalogue" : "Go find the music"}</p>
            <div className="gw-links">
              {links(open.n).map((l) => (
                <a key={l.label} className="gw-link" href={l.href} target="_blank" rel="noreferrer">
                  {l.label} <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
