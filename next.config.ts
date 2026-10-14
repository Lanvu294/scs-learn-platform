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
    // AVIF first (smaller), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Default widths plus 1536: a 760px-wide card on a 2x screen, so the
    // landing cards don't jump to the 1920 file.
    deviceSizes: [640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840],
    // YouTube video thumbnails, for the landing page's click-to-play previews.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
