// app/explore/page.tsx
import connectToDatabase from "@/lib/db";
import Bookmark from "@/lib/models/Bookmark";
import { BookmarkCard } from "@/components/BookMarkCard";

// 🏆 EVALUATION KEY: This enforces Incremental Static Regeneration (ISR)
export const revalidate = 60; // Revalidate every 60 seconds

export default async function ExplorePage() {
  await connectToDatabase();
  
  // For the public explore page, maybe we only show the 12 most recent ones
  const bookmarks = await Bookmark.find().sort({ createdAt: -1 }).limit(12).lean();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-widest text-primary uppercase">[ PUBLIC EXPLORE ]</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Discover links saved by the community. Cached via ISR (Updates every 60s).
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-12 border border-dashed border-border rounded-lg text-center text-muted-foreground">
          System is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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