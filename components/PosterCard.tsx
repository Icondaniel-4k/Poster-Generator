'use client';

import { useState } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PosterCardProps {
  imageUrl: string;
  title: string;
  onDownload: () => void;
  onRegenerate: () => void;
  isLoading?: boolean;
}

export function PosterCard({
  imageUrl,
  title,
  onDownload,
  onRegenerate,
  isLoading = false,
}: PosterCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Simulate download by creating a link
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-poster.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border bg-card/50 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-card to-card/50">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <div className="border-t border-border p-3">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
      </div>

      {/* Action Overlay */}
      {isHovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-fade-in">
          <Button
            onClick={handleDownload}
            disabled={isLoading || isDownloading}
            variant="default"
            size="sm"
            className="gap-2"
          >
            <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
          <Button
            onClick={onRegenerate}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Regenerate
          </Button>
        </div>
      )}
    </div>
  );
}
