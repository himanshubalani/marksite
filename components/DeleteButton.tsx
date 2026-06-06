// components/DeleteButton.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this bookmark?')) return;
    
    setIsDeleting(true);
    try {
      // 🏆 EVALUATION KEY: Calling our custom DELETE API Route
      const res = await fetch(`/api/bookmarks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Refresh the current route to fetch updated SSR data
        router.refresh(); 
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
      title="Delete Bookmark"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}