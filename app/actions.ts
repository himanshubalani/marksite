'use server'

import connectToDatabase from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';
import { revalidatePath } from 'next/cache';

// Next.js 15+ Server Action Signature
export async function saveBookmark(prevState: any, formData: FormData) {
  try {
    await connectToDatabase();

    const url = formData.get('url') as string;
    const notes = formData.get('notes') as string || '';
    const tagsRaw = formData.get('tags') as string || '';

    if (!url) {
      return { error: 'URL is required.' };
    }

    // Clean up tags (e.g., "react, tutorial, web" -> ["react", "tutorial", "web"])
    const tags = tagsRaw.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

	const isPublic = formData.get('isPublic') === 'on';

    // Fetch Metadata automatically so the user doesn't have to type titles!
    let title = url;
    let description = '';
	let favicon = '';

    try {
      const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const meta = await res.json();
      if (meta.status === 'success') {
        title = meta.data.title || url;
        description = meta.data.description || '';
		favicon = meta.data.logo?.url || '';
      }
    } catch (e) {
      console.warn('Metadata fetch failed, falling back to raw URL.');
    }

    // Save to Database
    const newBookmark = new Bookmark({
      url,
      title,
      description,
      notes,
      tags,
	  isPublic,
	  favicon,
    });

    await newBookmark.save();

    revalidatePath('/', 'layout');

    return { success: true };
  } catch (error: any) {
    console.error('Database Error:', error);
    return { error: error.message || 'Failed to save bookmark.' };
  }
}