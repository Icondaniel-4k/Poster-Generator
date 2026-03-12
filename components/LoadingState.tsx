'use client';

import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex h-full min-h-96 flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card/30 p-8">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <div className="absolute inset-0 h-12 w-12 animate-pulse-soft rounded-full border border-accent/30" />
      </div>
      <div className="space-y-1 text-center">
        <p className="font-medium text-foreground">AI is designing your campaign posters...</p>
        <p className="text-sm text-muted-foreground">This may take a few moments</p>
      </div>
    </div>
  );
}
