import { ManifestV3Export } from "@crxjs/vite-plugin";

import packageJson from "../package.json";

export const manifest: Extract<ManifestV3Export, { version: string }> = {
  manifest_version: 3,
  name: "YouTube Immersive",
  short_name: "yt_im",
  version: packageJson.version,
  description: packageJson.description,
  // icons: {
  // },
  permissions: [
    "storage",
  ],
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
