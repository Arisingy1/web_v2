"use client";

import { useState } from "react";

/**
 * Renders the exact exported Figma path (e.g. "/step-image-1.png").
 * If that file isn't present yet, it gracefully renders the `fallback`
 * (a crisp DOM widget) instead of a broken image — so the layout always
 * looks right, and swaps to the real export the moment the PNG is added.
 */
export default function FigmaImage({
  src,
  alt = "",
  className = "",
  fallback,
}: {
  src: string;
  alt?: string;
  className?: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
