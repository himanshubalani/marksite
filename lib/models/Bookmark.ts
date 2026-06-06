// lib/models/Bookmark.ts
import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBookmark extends Document {
  url: string;
  title: string;
  description?: string;
  notes?: string;
  tags: string[];
  createdAt: Date;
  isPublic: boolean;
  favicon?: string;
}

const BookmarkSchema = new Schema<IBookmark>({
  url: { 
    type: String, 
    required: [true, 'URL is required'],
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'], 
  },
  description: { 
    type: String, 
    default: '' 
  },
  notes: { 
    type: String, 
    default: '' 
  },
  tags: { 
    type: [String], 
    default: [] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  isPublic: {
	type: Boolean,
	default: false
},
  favicon: {
	type: String,
	default: '',
  },
});

// Next.js edge case: Ensure we don't redefine the model if it already exists
const Bookmark = models.Bookmark || mongoose.model<IBookmark>('Bookmark', BookmarkSchema);

export default Bookmark;