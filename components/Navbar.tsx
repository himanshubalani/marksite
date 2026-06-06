// components/Navbar.tsx
import Link from 'next/link';
import { BookmarkIcon } from 'lucide-react';
import { AddBookmarkModal } from './AddBookmarkModal';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 transition-colors">
            <BookmarkIcon size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            MarkSite
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/dashboard"
            className="text-sm px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/explore"
            className="text-sm px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            Explore
          </Link>
        </div>
      </div>

      <AddBookmarkModal />
    </nav>
  );
}