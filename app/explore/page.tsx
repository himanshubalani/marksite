// app/explore/page.tsx
import connectToDatabase from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';
import { BookmarkCard } from '@/components/BookmarkCard';
import { GlobeIcon } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { AddBookmarkModal } from '@/components/AddBookmarkModal';

// Disable ISR when search params are used — we need fresh data for filtering
export const dynamic = 'force-dynamic';

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ q?: string, tag?: string }> }) {
  await connectToDatabase();
  
  // Process Search & Tag Queries
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q || '';
  const tag = resolvedParams?.tag || '';

  const query: any = { isPublic: true };
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { tags: { $regex: q, $options: 'i' } }
    ];
  }
  if (tag) query.tags = tag;

  const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 }).limit(12).lean();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Explore</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {tag ? `Filtered by tag: #${tag}` : q ? `Search results for "${q}"` : 'Public bookmarks from the community'}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <AddBookmarkModal />
          <div className="flex-1 sm:w-72 md:w-100">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Grid */}
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-border/50 text-muted-foreground gap-3">
          <GlobeIcon size={28} strokeWidth={1.5} />
          <p className="text-sm">No public bookmarks yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bm: any) => (
            <BookmarkCard
              key={bm._id.toString()}
              _id={bm._id.toString()}
              url={bm.url}
              title={bm.title}
              description={bm.description}
              notes={bm.notes}
              tags={bm.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}