import { defineConfig, loadEnv } from "vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import vitePluginSvgr from "vite-plugin-svgr";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, path.join(process.cwd(), "..", "..")),
  };

  return defineConfig({
    server: {
      host: true,
      strictPort: true,
      port: parseInt(process.env.FRONTEND_PORT || "5173"),
    },
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
      vitePluginSvgr(),
    ],
  });
};
