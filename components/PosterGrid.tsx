'use client';

import { PosterCard } from './PosterCard';

export interface Poster {
  id: string;
  imageUrl: string;
  title: string;
}

interface PosterGridProps {
  posters: Poster[];
  onDownload: (posterId: string) => void;
  onRegenerate: (posterId: string) => void;
  isLoading?: boolean;
}

export function PosterGrid({
  posters,
  onDownload,
  onRegenerate,
  isLoading = false,
}: PosterGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {posters.map((poster) => (
        <PosterCard
          key={poster.id}
          imageUrl={poster.imageUrl}
          title={poster.title}
          onDownload={() => onDownload(poster.id)}
          onRegenerate={() => onRegenerate(poster.id)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
