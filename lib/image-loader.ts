"use client";

// Every photo on the site is served by Unsplash's own image CDN (imgix). Instead
// of letting Next download a fixed-size original and re-encode it, we ask the CDN
// for exactly the width each breakpoint needs (incl. 2x/3x screens), in AVIF/WebP.
// This is what keeps product photography sharp at every size.
export default function unsplashLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 80));
    return url.toString();
  }
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
