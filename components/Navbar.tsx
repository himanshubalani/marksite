// components/Navbar.tsx
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b bg-background/95 backdrop-blur">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-lg font-bold tracking-widest text-primary hover:opacity-80 transition-opacity">
          [ MARK_SITE ]
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/dashboard" className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            DASHBOARD
          </Link>
          <Link href="/explore" className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            EXPLORE
          </Link>
        </div>
      </div>
    </nav>
  );
}