'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GeneratorForm, GeneratorFormData } from '@/components/GeneratorForm';
import { PosterGrid, Poster } from '@/components/PosterGrid';
import { LoadingState } from '@/components/LoadingState';
import { ArrowLeft } from 'lucide-react';



export default function GeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [formData, setFormData] = useState<GeneratorFormData | null>(null);

  const handleGeneratePoster = async (data: GeneratorFormData) => {
    setFormData(data);
    setIsLoading(true);

    try {
      // Convert images to base64 data URLs for API
      const imageDataUrls: string[] = [];

      for (const image of data.images) {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
        imageDataUrls.push(dataUrl);
      }

      console.log('[v0] Sending to API with images:', imageDataUrls.length);

      // Call the generator API with images
      const response = await fetch('/api/generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateName: data.candidateName,
          position: data.position,
          slogan: data.slogan,
          style: data.style,
          imageDataUrls: imageDataUrls,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate posters');
      }

      const result = await response.json();
      console.log('[v0] API response received:', result);

      // Convert API response to Poster format with original images
      const posters: Poster[] = imageDataUrls.map((imageUrl, index) => ({
        id: `poster-${index}`,
        imageUrl: imageUrl,
        title: `${data.candidateName} - Image ${index + 1}`,
      }));

      setPosters(posters);
      setIsLoading(false);
      setHasGenerated(true);
    } catch (error) {
      console.error('[v0] Error generating posters:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to generate posters'}`);
      setIsLoading(false);
    }
  };

  const handleDownload = (posterId: string) => {
    console.log(`Downloaded poster: ${posterId}`);
  };

  const handleRegenerate = (posterId: string) => {
    console.log(`Regenerating poster: ${posterId}`);
    // Could implement individual poster regeneration here
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/30">
        <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold">Campaign Poster Generator</h1>
          <p className="mt-2 text-muted-foreground">
            Fill in your campaign details and let AI create stunning posters for you
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Panel - Form */}
          <div className="flex flex-col">
            <div className="sticky top-20 rounded-lg border border-border/30 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">Create Your Posters</h2>
              <GeneratorForm
                onGeneratePosterClick={handleGeneratePoster}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Right Panel - Poster Preview */}
          <div className="flex flex-col">
            <div className="rounded-lg border border-border/30 bg-card/30 p-6">
              {!hasGenerated && !isLoading && (
                <div className="flex h-96 flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-accent/10 p-4 mb-4">
                    <svg
                      className="h-8 w-8 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
                      />
                    </svg>
                  </div>
                  <p className="font-medium">Fill in the form to generate your posters</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your campaign posters will appear here
                  </p>
                </div>
              )}

              {isLoading && <LoadingState />}

              {hasGenerated && !isLoading && (
                <PosterGrid
                  posters={posters}
                  onDownload={handleDownload}
                  onRegenerate={handleRegenerate}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Poster Info */}
            {hasGenerated && !isLoading && formData && (
              <div className="mt-6 rounded-lg border border-border/30 bg-card/50 p-4">
                <h3 className="font-semibold mb-3">Campaign Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Candidate:</span>
                    <span>{formData.candidateName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span>{formData.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slogan:</span>
                    <span>{formData.slogan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Style:</span>
                    <span className="capitalize">{formData.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Photos Used:</span>
                    <span>{formData.images.length}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
