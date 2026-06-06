// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

// This page is completely static (SSG)
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center animate-in fade-in duration-700">
      <div className="w-full max-w-2xl p-10 border border-border bg-card rounded-[12px] shadow-sm text-center space-y-8 relative overflow-hidden">
        
        {/* Subtle grid pattern background for the "workbench" feel */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            System Initialization
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            The Digital Workbench <br/> for your Links.
          </h1>
          <p className="max-w-md mx-auto text-sm leading-relaxed text-muted-foreground">
            Save, organize, and explore bookmarks in a highly utilitarian, distraction-free environment. Built for speed.
          </p>
        </div>

        <div className="relative z-10 flex justify-center pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="font-bold tracking-wider rounded-[6px]">
              ACCESS DASHBOARD
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}