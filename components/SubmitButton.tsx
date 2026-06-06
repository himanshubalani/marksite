// components/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export function SubmitButton() {
  // useFormStatus automatically knows if the parent <form> is submitting
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full font-bold tracking-widest rounded-[6px]"
    >
      {pending ? '[ SAVING... ]' : '[ SAVE LINK ]'}
    </Button>
  );
}