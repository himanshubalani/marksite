// components/SubmitButton.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
    >
      {pending && <Loader2Icon size={14} className="animate-spin" />}
      {pending ? 'Saving...' : 'Save bookmark'}
    </Button>
  );
}