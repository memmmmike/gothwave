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
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
});
