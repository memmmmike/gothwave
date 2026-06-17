import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ENTRIES,
  FLAG,
  SCENES,
  SCENE_MAP,
  links,
  type Entry,
  type SceneId,
} from "@/data/lineup";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Explorer,
});

type SceneFilter = SceneId | "all";

function Explorer() {
  const [scene, setScene] = useState<SceneFilter>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Entry | null>(null);

  const counts = useMemo(() => {
    const c = {} as Record<SceneId, number>;
    for (const e of ENTRIES) c[e.s] = (c[e.s] ?? 0) + 1;
    return c;
  }, []);

  const flaggedCount = useMemo(
    () => ENTRIES.filter((e) => e.f).length,
    [],
  );

  const results = useMemo(() => {
    const t = query.trim().toLowerCase();
    return ENTRIES.filter(
      (e) =>
        (scene === "all" || e.s === scene) &&
        (!t ||
          e.n.toLowerCase().includes(t) ||
          e.d.toLowerCase().includes(t)),
    );
  }, [scene, query]);

  const reset = () => {
    setScene("all");
    setQuery("");
  };

  const dirty = query !== "" || scene !== "all";

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <header className="gw-scanlines relative mx-auto max-w-[1180px] px-[22px] pb-[34px] pt-16">
        <div className="mb-[14px] flex items-center gap-3 text-[11px] uppercase tracking-[0.42em] text-smoke">
          A cold archive of the underground
          <span className="h-px flex-1 bg-hairline" />
        </div>
        <h1 className="gw-title-shadow m-0 font-display text-[clamp(58px,15vw,168px)] font-black uppercase leading-[0.82] tracking-[-0.01em]">
          Gothwave
        </h1>
        <p className="mt-5 max-w-[640px] text-sm leading-[1.65] text-bone">
          A browsable index of the deep cuts — coldwave and minimal synth, witch
          house, death industrial, darksynth, and the adjacent darkness.{" "}
          <span className="text-smoke">
            Filter by scene, search the names, open any entry to go find the
            music.
          </span>
        </p>
        <div className="mt-6 flex flex-wrap gap-x-[26px] gap-y-2 text-[11px] uppercase tracking-[0.22em] text-smoke">
          <span>
            <b className="font-bold text-ice">{ENTRIES.length}</b> entries
          </span>
          <span>
            <b className="font-bold text-ice">{SCENES.length}</b> scenes
          </span>
          <span>
            <b className="font-bold text-ice">{flaggedCount}</b> scene notes
          </span>
        </div>
      </header>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-0 z-30 border-y border-hairline bg-[rgba(10,10,12,0.86)] py-[14px] backdrop-blur-[8px]">
        <div className="mx-auto max-w-[1180px] px-[22px]">
          <div className="mb-3 flex items-center gap-[10px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the archive — name or sound…"
              aria-label="Search the archive"
              className="flex-1 border border-hairline bg-ash px-[13px] py-[11px] text-[13px] tracking-[0.04em] text-bone placeholder:text-smoke focus:border-ice focus:outline-none"
            />
            {dirty && (
              <button
                onClick={reset}
                className="border border-hairline px-3 py-[11px] text-[11px] tracking-[0.1em] text-smoke hover:border-oxblood hover:text-bone"
              >
                CLEAR
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={scene === "all"}
              label="ALL"
              count={ENTRIES.length}
              onClick={() => setScene("all")}
            />
            {SCENES.map((s) => (
              <Chip
                key={s.id}
                active={scene === s.id}
                label={s.code}
                count={counts[s.id] ?? 0}
                title={s.label}
                onClick={() => setScene(scene === s.id ? "all" : s.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid / empty state ── */}
      <main className="mx-auto max-w-[1180px] px-[22px]">
        {results.length === 0 ? (
          <div className="my-[26px] mb-[60px] border border-hairline bg-ash px-6 py-12 text-center">
            <p className="mb-4 text-[13px] text-smoke">
              Nothing in the archive matches that.
            </p>
            <button
              onClick={reset}
              className="border border-hairline px-3 py-[11px] text-[11px] tracking-[0.1em] text-smoke hover:border-oxblood hover:text-bone"
            >
              RESET THE ARCHIVE
            </button>
          </div>
        ) : (
          <div className="my-[26px] mb-[60px] grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-px border border-hairline bg-hairline sm:grid-cols-[repeat(auto-fill,minmax(244px,1fr))]">
            {results.map((e) => {
              const sc = SCENE_MAP[e.s];
              return (
                <button
                  key={e.n}
                  onClick={() => setOpen(e)}
                  aria-label={`Open ${e.n}`}
                  className="group flex min-h-[112px] flex-col bg-ash p-[14px] text-left transition-[background-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-ash2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ice motion-reduce:hover:translate-y-0 sm:min-h-[128px] sm:p-[18px] sm:pb-5"
                >
                  <div className="mb-auto flex items-center justify-between text-[10px] tracking-[0.2em] text-smoke">
                    <span>{sc.code}</span>
                    {e.f && (
                      <span
                        className="text-[12px] leading-none text-oxblood"
                        title="Scene note"
                        aria-label="Has a scene note"
                      >
                        ✻
                      </span>
                    )}
                  </div>
                  <div className="mb-2 mt-[18px] font-display text-[20px] font-bold uppercase leading-[1.02] tracking-[0.005em] transition-[text-shadow] duration-150 group-hover:[text-shadow:0.03em_0_var(--color-oxblood),-0.025em_0_var(--color-ice)] sm:text-[25px]">
                    {e.n}
                  </div>
                  <div className="text-[12px] leading-[1.5] text-smoke">
                    {e.d}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Footer: the ✻ note ── */}
      <footer className="mx-auto max-w-[1180px] border-t border-hairline px-[22px] pb-[56px] pt-[30px] text-[11px] leading-[1.7] text-smoke">
        <div className="text-[10px] uppercase tracking-[0.16em] text-bone">
          On the ✻ marks
        </div>
        Some scenes here have documented pockets of NSBM / far-right entryism. A
        handful of entries carry a note so you can screen on your own terms — the
        music&apos;s worth digging; the scene rewards knowing whose hands you put
        money in.
        <br />
        <br />
        Listen links open searches on Bandcamp, Discogs, and YouTube — no profile
        is pre-verified, so trust your ears. Built from the GOTHWAVE crate-digging
        list.
      </footer>

      {/* ── Detail modal ── */}
      <Dialog
        open={open !== null}
        onOpenChange={(o) => !o && setOpen(null)}
      >
        {open && (
          <DialogContent>
            <DialogClose
              aria-label="Close"
              className="absolute right-4 top-4 flex h-[34px] w-[34px] items-center justify-center border border-hairline text-[16px] leading-none text-smoke hover:border-oxblood hover:text-bone focus-visible:outline-2 focus-visible:outline-ice"
            >
              ✕
            </DialogClose>
            <div className="text-[11px] uppercase tracking-[0.22em] text-ice">
              {SCENE_MAP[open.s].code} — {SCENE_MAP[open.s].label}
            </div>
            <DialogTitle className="mb-[6px] mt-[10px] font-display text-[clamp(36px,9vw,56px)] font-black uppercase leading-[0.92]">
              {open.n}
            </DialogTitle>
            <DialogDescription className="mb-[22px] text-[14px] leading-[1.6] text-bone">
              {open.d}.
            </DialogDescription>
            {open.f && (
              <div className="mb-[22px] border border-oxblood-dim bg-[rgba(168,50,63,0.08)] px-[14px] py-3 text-[12px] leading-[1.55] text-bone">
                <b className="mb-[6px] block text-[10px] uppercase tracking-[0.14em] text-oxblood">
                  ✻ Scene note
                </b>
                {FLAG[open.f]}
              </div>
            )}
            <p className="mb-[11px] text-[10px] uppercase tracking-[0.22em] text-smoke">
              {open.s === "label"
                ? "Explore the catalogue"
                : "Go find the music"}
            </p>
            <div className="flex flex-wrap gap-[9px]">
              {links(open).map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-[7px] border border-hairline px-[15px] py-[11px] text-[12px] tracking-[0.08em] text-ice transition-colors hover:border-ice hover:bg-[rgba(159,198,210,0.06)]"
                >
                  {l.label} <span className="text-faint">↗</span>
                </a>
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

function Chip({
  active,
  label,
  count,
  title,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  title?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 border px-[11px] py-[7px] text-[11px] uppercase tracking-[0.12em] transition-colors duration-150",
        active
          ? "border-bone bg-bone text-ink"
          : "border-hairline text-smoke hover:border-smoke hover:text-bone",
      )}
    >
      {label}{" "}
      <span
        className={cn(
          "text-[10px]",
          active ? "text-oxblood-dim" : "text-faint",
        )}
      >
        {count}
      </span>
    </button>
  );
}
