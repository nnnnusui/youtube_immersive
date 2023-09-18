import { ManifestV3Export } from "@crxjs/vite-plugin";

export const manifest: Extract<ManifestV3Export, { version: string }> = {
  manifest_version: 3,
  name: "YouTube-Immersive",
  version: "0.0.1",
  description: "YouTube UI changed to a more immersive form.",
  // icons: {
  // },
  action: {
    default_popup: "index.html",
  },
  content_scripts: [{
    matches: [
      "https://www.youtube.com/*",
    ],
    // css: ["src/index.css"],
    js: ["src/embed/index.tsx"],
  }],
};
