// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, ArrowRightIcon } from 'lucide-react';

// Fully static (SSG)
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center animate-in fade-in duration-700">
      <div className="w-full max-w-lg text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
           <Image
                        src="/favicon.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="text-white"
                      />
        </div>

        {/* Copy */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Your links, organized.
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
            Save, tag, and revisit the links that matter. Clean, fast, distraction-free.
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5">
              Open dashboard
              <ArrowRightIcon size={15} />
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline" className="border-border/60 text-muted-foreground hover:text-foreground px-5">
              Explore public links
            </Button>
          </Link>
        </div>

        {/* Sub-note */}
        <p className="text-xs text-muted-foreground/50">
          SSG landing · SSR dashboard · ISR explore
        </p>
      </div>
    </div>
  );
}