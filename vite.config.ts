import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Plugin order matters: paths + tailwind first, then Start, then Nitro, then React.
// Nitro auto-detects Vercel on the platform; locally we force the `vercel` preset
// (see NITRO_PRESET in the build script) so `npm run build` emits .vercel/output
// in the Build Output API v3 layout that Vercel's Git integration serves directly.
//
// Prerender: the archive has no server-side data, so we render `/` to static HTML
// at build time. Vercel then serves it as a static asset (no function cold start);
// the page still hydrates for client-side filtering/search/modal. crawlLinks picks
// up the only internal link (the boundary "back to archive" → `/`).
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
    }),
    nitro(),
    viteReact(),
  ],
});
