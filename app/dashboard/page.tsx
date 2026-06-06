// app/dashboard/page.tsx
import connectToDatabase from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';
import { BookmarkCard } from '@/components/BookmarkCard';
import { BookmarkIcon, GlobeIcon, TagIcon } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { AddBookmarkModal } from '@/components/AddBookmarkModal';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ q?: string, tag?: string }> }) {
  await connectToDatabase();
  
  // 💥 NEW: Process Search & Tag Queries
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q || '';
  const tag = resolvedParams?.tag || '';

  const query: any = {};
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { tags: { $regex: q, $options: 'i' } }
    ];
  }
  if (tag) query.tags = tag;

  const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 }).lean();
  
  // Stats (we calculate stats based on ALL user bookmarks, not just the filtered ones)
  const allBookmarks = await Bookmark.find().lean();
  const publicCount = allBookmarks.filter((b: any) => b.isPublic).length;
  const allTags = new Set(allBookmarks.flatMap((b: any) => b.tags));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {tag ? `Filtered by tag: #${tag}` : 'Your saved links · rendered via SSR'}
          </p>
        </div>
		<div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
			<AddBookmarkModal />
          <div className="flex-1 sm:w-72 md:w-100">
    <SearchBar />
  </div>
          
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border/60 bg-card px-4 py-3">
          <div className="flex items-center gap-2 mb-1"><BookmarkIcon size={13} className="text-muted-foreground" /><span className="text-xs text-muted-foreground">Saved</span></div>
          <p className="text-2xl font-semibold tracking-tight">{allBookmarks.length}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card px-4 py-3">
          <div className="flex items-center gap-2 mb-1"><GlobeIcon size={13} className="text-muted-foreground" /><span className="text-xs text-muted-foreground">Public</span></div>
          <p className="text-2xl font-semibold tracking-tight">{publicCount}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card px-4 py-3">
          <div className="flex items-center gap-2 mb-1"><TagIcon size={13} className="text-muted-foreground" /><span className="text-xs text-muted-foreground">Tags</span></div>
          <p className="text-2xl font-semibold tracking-tight">{allTags.size}</p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-border/50 text-muted-foreground gap-3">
          <BookmarkIcon size={28} strokeWidth={1.5} />
          <p className="text-sm">{q || tag ? "No bookmarks match your filter." : "No bookmarks yet — add your first link."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bm: any) => (
            <BookmarkCard key={bm._id.toString()} _id={bm._id.toString()} url={bm.url} title={bm.title} description={bm.description} notes={bm.notes} tags={bm.tags} isPublic={bm.isPublic} favicon={bm.favicon} />
          ))}
        </div>
      )}
    </div>
  );
}