import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Next 16 only serves qualities on this list. 75 is the default; 90 is for
    // the landing page photography, where 75 visibly softens fine detail.
    qualities: [75, 90],
    // YouTube video thumbnails, for the landing page's click-to-play previews.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
