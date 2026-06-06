// components/BookmarkCard.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // We'll need to install this!
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

interface BookmarkCardProps {
  _id: string;
  url: string;
  title: string;
  description?: string;
  notes?: string;
  tags: string[];
}

export function BookmarkCard({ _id, url, title, description, notes, tags }: BookmarkCardProps) {
  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors bg-card/50">
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-base font-bold tracking-wide line-clamp-1">
            {title}
          </CardTitle>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors shrink-0"
          >
            <ExternalLinkIcon size={18} />
          </a>
        </div>
        <CardDescription className="text-xs truncate font-mono text-muted-foreground">
          {url}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pt-4 pb-2 space-y-4">
        {description && (
          <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        
        {notes && (
          <div className="bg-background/50 p-3 rounded-md border border-border text-sm italic text-muted-foreground">
            &quot;{notes}&quot;
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 pb-4 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span 
            key={i} 
            className="px-2 py-1 bg-secondary text-secondary-foreground text-[10px] uppercase tracking-widest font-bold rounded-full border border-border"
          >
            {tag}
          </span>
        ))}
      </CardFooter>
    </Card>
  );
}