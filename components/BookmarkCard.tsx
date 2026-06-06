"use client";

import { useRef, useState } from "react";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import Image from "next/image";

interface BookmarkCardProps {
  _id: string;
  url: string;
  title: string;
  description?: string;
  notes?: string;
  tags: string[];
  isPublic?: boolean;
  favicon?: string;
}

const ACCENT_COLORS = [
  "#4F46E5",
  "#2563EB",
  "#0F766E",
  "#15803D",
  "#B45309",
  "#C2410C",
  "#BE185D",
  "#7C3AED",
];

function getDomainColor(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    let n = 0;
    for (const c of hostname) n += c.charCodeAt(0);
    return ACCENT_COLORS[n % ACCENT_COLORS.length];
  } catch {
    return ACCENT_COLORS[0];
  }
}

function getDomainLabel(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

// Convert hex to rgb triplet for rgba() usage
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export function BookmarkCard({
  _id,
  url,
  title,
  description,
  notes,
  tags,
  isPublic,
  favicon,
}: BookmarkCardProps) {
  const accentColor = getDomainColor(url);
  const domain = getDomainLabel(url);
  const rgb = hexToRgb(accentColor);
  const [hovered, setHovered] = useState(false);

  // Double-tap to open on mobile
  const lastTap = useRef<number>(0);
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    lastTap.current = now;
  };

  return (
    <div
      className="group relative flex flex-col rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
  boxShadow: hovered
    ? `inset 0px 24px 18px -12px rgba(${rgb}, 0.45)`
    : "none",
}}
    >
      {/* Colored top accent bar */}
      <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: accentColor }} />

      {/* Public badge */}
      {isPublic && (
        <span className="absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          public
        </span>
      )}

      {/* Card body */}
      <div
        onClick={handleDoubleTap}
        title="Double-tap to visit website"
        className="flex-1 px-4 pt-3 pb-2.5 space-y-2 cursor-pointer select-none"
      >
        {/* Domain pill */}
        <div className="flex items-center gap-1.5">
          {favicon ? (
            <Image
              src={favicon}
              alt={`${domain} favicon`}
              width={14}
              height={14}
              className="rounded-sm object-cover bg-white"
              unoptimized
            />
          ) : (
            <LinkIcon size={11} style={{ color: accentColor }} />
          )}
          <span className="text-[11px] font-mono text-muted-foreground/70 truncate">
            {domain}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 pr-6">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Notes */}
        {notes && (
          <p
            className="text-xs text-muted-foreground/70 italic border-l-2 pl-2.5 line-clamp-2"
            style={{ borderColor: accentColor + "66" }}
          >
            {notes}
          </p>
        )}
      </div>

      {/* Card footer */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-t border-border/40 flex-wrap">
        {tags.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="text-[11px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/40"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="text-[11px] text-muted-foreground/50">
            +{tags.length - 3}
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-0.5 ml-auto">
          <DeleteButton id={_id} />
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            title="Open link"
          >
            <ExternalLinkIcon size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}