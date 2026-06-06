// components/AddBookmarkModal.tsx
'use client';

import { useState, useActionState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { saveBookmark } from '@/app/actions';
import { SubmitButton } from '@/components/SubmitButton';
import { PlusIcon } from 'lucide-react';

export function AddBookmarkModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(saveBookmark, null);

  useEffect(() => {
    if (state?.success) setOpen(false);
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-sm font-medium border-border/60 hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-500/5 transition-colors"
          />
        }
      >
        <PlusIcon size={14} />
        Add bookmark
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-border/60 bg-card">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">New bookmark</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Paste a URL — title and description are fetched automatically.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="url" className="text-xs text-muted-foreground">
              URL
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://"
              required
              className="font-mono text-sm bg-background/50"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-xs text-muted-foreground">
              Notes{' '}
              <span className="text-muted-foreground/50 font-normal">(optional)</span>
            </Label>
            <Input
              id="notes"
              name="notes"
              placeholder="Why is this useful?"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tags" className="text-xs text-muted-foreground">
              Tags{' '}
              <span className="text-muted-foreground/50 font-normal">(comma-separated)</span>
            </Label>
            <Input
              id="tags"
              name="tags"
              placeholder="react, tutorial, ui"
              className="bg-background/50"
            />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Make public{' '}
              <span className="text-muted-foreground/50 text-xs">(visible on Explore)</span>
            </span>
          </label>

          {state?.error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}