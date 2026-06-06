// app/dashboard/page.tsx
import connectToDatabase from "@/lib/db";
import Bookmark from "@/lib/models/Bookmark";
import { BookmarkCard } from "@/components/BookMarkCard";


export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await connectToDatabase();
  
  // Fetch bookmarks, sort by newest first. .lean() makes them standard JS objects.
  const bookmarks = await Bookmark.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-widest text-primary uppercase">[ PERSONAL DASHBOARD ]</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Real-time view of your saved links. Rendered via SSR.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-12 border border-dashed border-border rounded-lg text-center text-muted-foreground">
          No bookmarks found. Click + ADD LINK to get started.
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
           isPublic={bm.isPublic}
         />
       ))}
        </div>
      )}
    </div>
  );
}