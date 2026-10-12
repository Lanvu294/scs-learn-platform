"use client";

import Image from "next/image";
import { useState } from "react";

const embedAllow =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

/**
 * A YouTube video that shows only its thumbnail and a play button until
 * clicked, then swaps in the real player. YouTube's embed can't hide its own
 * title bar, channel avatar or share/watch-later buttons, so they only appear
 * once the video is playing.
 */
export default function YouTubePreview({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  // YouTube only generates maxresdefault for HD uploads; hqdefault always exists.
  const [thumbnail, setThumbnail] = useState<"maxresdefault" | "hqdefault">("maxresdefault");

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow={embedAllow}
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-black"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/${thumbnail}.jpg`}
        onError={() => setThumbnail("hqdefault")}
        alt=""
        fill
        sizes="(min-width: 80rem) 33vw, 100vw"
        className="object-cover"
      />
      <svg
        viewBox="0 0 68 48"
        aria-hidden
        className="absolute top-1/2 left-1/2 h-12 w-[4.25rem] -translate-x-1/2 -translate-y-1/2"
      >
        <path
          d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6c5.3 1.4 26.5 1.4 26.5 1.4s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3Z"
          className="fill-[#212121]/80 transition-colors group-hover:fill-[#f00] group-focus-visible:fill-[#f00]"
        />
        <path d="M45 24 27 14v20" className="fill-white" />
      </svg>
    </button>
  );
}
