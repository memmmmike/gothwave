import type { ReactNode } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  Link,
} from "@tanstack/react-router";

import appCss from "@/styles.css?url";

const TITLE = "GOTHWAVE — a cold archive of the underground";
const DESCRIPTION =
  "A browsable index of the deep cuts: coldwave and minimal synth, witch house, death industrial, darksynth, and the adjacent darkness. Filter by scene, search the names, open any entry to find the music.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#0a0a0c" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        type: "image/svg+xml",
        // Asterisk mark: oxblood on ink.
        href:
          "data:image/svg+xml," +
          encodeURIComponent(
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='#0a0a0c'/><text x='16' y='23' font-size='24' text-anchor='middle' fill='#a8323f' font-family='monospace'>✻</text></svg>",
          ),
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;600;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap",
      },
    ],
  }),
  component: RootComponent,
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="gw-grain">{children}</div>
        <Scripts />
      </body>
    </html>
  );
}

/** Shared shell for the error / 404 boundary screens. */
function Boundary({
  code,
  heading,
  children,
}: {
  code: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[1180px] flex-col items-start justify-center px-[22px]">
      <div className="text-[11px] uppercase tracking-[0.22em] text-ice">
        {code}
      </div>
      <h1 className="mb-3 mt-2 font-display text-[clamp(40px,9vw,72px)] font-black uppercase leading-[0.9]">
        {heading}
      </h1>
      <div className="max-w-[560px] text-[13px] leading-[1.65] text-smoke">
        {children}
      </div>
    </main>
  );
}

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Boundary code="Signal lost" heading="Something broke">
      <p className="mb-4">
        The archive hit an unexpected error. Try reloading; if it persists, the
        crate is jammed.
      </p>
      {error?.message ? (
        <pre className="overflow-x-auto border border-hairline bg-ash p-3 text-[11px] text-bone">
          {error.message}
        </pre>
      ) : null}
      <p className="mt-4">
        <Link to="/" className="text-ice underline">
          Back to the archive →
        </Link>
      </p>
    </Boundary>
  );
}

function NotFound() {
  return (
    <Boundary code="404" heading="Not in the crate">
      <p className="mb-4">
        That page isn&apos;t part of the archive. The music, though, is still
        out there.
      </p>
      <p>
        <Link to="/" className="text-ice underline">
          Back to the archive →
        </Link>
      </p>
    </Boundary>
  );
}
