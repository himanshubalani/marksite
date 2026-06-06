// components/Sidebar.tsx
import Link from "next/link";
import Image from "next/image";
import {
  BookmarkIcon,
  LayoutGridIcon,
  GlobeIcon,
  HashIcon,
} from "lucide-react";
import { AddBookmarkModal } from "./AddBookmarkModal";
import connectToDatabase from "@/lib/db";
import Bookmark from "@/lib/models/Bookmark";

export async function Sidebar() {
  await connectToDatabase();
  // Fetch all tags to display in the sidebar
  const bookmarks = await Bookmark.find().select("tags").lean();
  const tagsSet = new Set(bookmarks.flatMap((b: any) => b.tags));
  const uniqueTags = Array.from(tagsSet).slice(0, 10); // Show top 10 tags

  return (
    <aside className="w-64 border-r border-border/60 bg-card/30 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="p-3 border-b border-border/60">
        <Link href="/" className="flex items-center gap-3 group">
          
            <Image
              src="/favicon.png"
              alt="Logo"
              width={48}
              height={48}
              className="text-white"
            />
          
          <span className="text-base font-semibold tracking-tight text-foreground">
            MarkSite
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Library
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <LayoutGridIcon size={16} /> Dashboard
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <GlobeIcon size={16} /> Explore
          </Link>
        </div>

        {/* Dynamic Tags */}
        {uniqueTags.length > 0 && (
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Tags
            </p>
            {uniqueTags.map((tag, i) => (
              <Link
                key={i}
                href={`/dashboard?tag=${tag}`}
                className="flex items-center gap-3 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <HashIcon size={14} className="opacity-50" /> {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Add Button pinned to bottom */}
      <div className="p-4 border-t border-border/60 bg-background/50 text-center">
        <a
          href="https://himanshubalani.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-mono text-muted-foreground/60 hover:text-indigo-500 transition-colors duration-150"
        >
          made by himanshubalani.com
        </a>
      </div>
    </aside>
  );
}
