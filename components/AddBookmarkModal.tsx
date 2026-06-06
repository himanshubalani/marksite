// components/AddBookmarkModal.tsx
'use client'

import { useState, useActionState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { saveBookmark } from '@/app/actions';
import { SubmitButton } from '@/components/SubmitButton';

export function AddBookmarkModal() {
  const [open, setOpen] = useState(false);
  
  // useActionState hooks our form up to the Server Action we just wrote
  const [state, formAction] = useActionState(saveBookmark, null);

  // Automatically close the modal when the save is successful
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 tracking-widest font-bold">
          + ADD LINK
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-primary tracking-widest uppercase">New Bookmark</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Paste a URL below. Our system will automatically fetch the title and description.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-xs uppercase tracking-widest text-muted-foreground">Target URL</Label>
            <Input 
              id="url" 
              name="url" 
              type="url" 
              placeholder="https://..." 
              required 
              className="font-mono bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-xs uppercase tracking-widest text-muted-foreground">Personal Notes (Optional)</Label>
            <Input 
              id="notes" 
              name="notes" 
              placeholder="Why is this useful?" 
              className="font-mono bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-xs uppercase tracking-widest text-muted-foreground">Tags (Comma separated)</Label>
            <Input 
              id="tags" 
              name="tags" 
              placeholder="react, tutorial, UI" 
              className="font-mono bg-background/50"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-destructive font-bold p-2 border border-destructive/50 bg-destructive/10 rounded">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}