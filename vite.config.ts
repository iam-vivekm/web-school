import { defineConfig } from "vite";
import path from "path";

export default defineConfig(async () => {
  const plugins: any[] = [];

  // Add React plugin
  plugins.push((await import("@vitejs/plugin-react")).default());

  // ✅ Only load Replit plugins in Replit environment
  if (process.env.REPL_ID !== undefined) {
    const runtimeErrorOverlay = (await import("@replit/vite-plugin-runtime-error-modal")).default;
    const cartographer = (await import("@replit/vite-plugin-cartographer")).cartographer();
    const devBanner = (await import("@replit/vite-plugin-dev-banner")).devBanner();

    plugins.push(runtimeErrorOverlay, cartographer, devBanner);
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
            router: ['wouter'],
            icons: ['lucide-react']
          }
        }
      }
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
