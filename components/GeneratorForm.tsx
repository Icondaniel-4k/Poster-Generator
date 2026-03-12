'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUploadDropzone } from './ImageUploadDropzone';
import { Loader2 } from 'lucide-react';

interface GeneratorFormProps {
  onGeneratePosterClick: (formData: GeneratorFormData) => void;
  isLoading?: boolean;
}

export interface GeneratorFormData {
  candidateName: string;
  position: string;
  slogan: string;
  style: string;
  images: File[];
}

const STYLE_OPTIONS = [
  { label: 'Modern', value: 'modern' },
  { label: 'Community', value: 'community' },
  { label: 'Bold Campaign', value: 'bold' },
  { label: 'Professional', value: 'professional' },
];

export function GeneratorForm({
  onGeneratePosterClick,
  isLoading = false,
}: GeneratorFormProps) {
  const [candidateName, setCandidateName] = useState('');
  const [position, setPosition] = useState('');
  const [slogan, setSlogan] = useState('');
  const [style, setStyle] = useState('modern');
  const [images, setImages] = useState<File[]>([]);

  const isValid =
    candidateName.trim() &&
    position.trim() &&
    slogan.trim() &&
    style &&
    images.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onGeneratePosterClick({
        candidateName,
        position,
        slogan,
        style,
        images,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Candidate Name */}
      <div className="space-y-2">
        <label htmlFor="candidateName" className="text-sm font-medium">
          Candidate Name
        </label>
        <Input
          id="candidateName"
          placeholder="Enter candidate name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          disabled={isLoading}
          className="bg-card/50"
        />
      </div>

      {/* Position */}
      <div className="space-y-2">
        <label htmlFor="position" className="text-sm font-medium">
          Position Running For
        </label>
        <Input
          id="position"
          placeholder="e.g., Mayor, City Council, Governor"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          disabled={isLoading}
          className="bg-card/50"
        />
      </div>

      {/* Campaign Slogan */}
      <div className="space-y-2">
        <label htmlFor="slogan" className="text-sm font-medium">
          Campaign Slogan
        </label>
        <Input
          id="slogan"
          placeholder="e.g., 'Together We Rise', 'Building Our Future'"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          disabled={isLoading}
          className="bg-card/50"
        />
      </div>

      {/* Poster Style */}
      <div className="space-y-2">
        <label htmlFor="style" className="text-sm font-medium">
          Poster Style
        </label>
        <Select value={style} onValueChange={setStyle} disabled={isLoading}>
          <SelectTrigger id="style" className="bg-card/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STYLE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Upload Photos <span className="text-destructive">*</span>
        </label>
        <ImageUploadDropzone
          onImagesSelected={setImages}
          maxFiles={4}
          maxSizePerFileMB={10}
        />
      </div>

      {/* Generate Button */}
      <Button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full gap-2 py-6 text-base font-medium gradient-accent text-white hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating Posters...
          </>
        ) : (
          'Generate Campaign Posters'
        )}
      </Button>
      
      {!isValid && (
        <p className="text-xs text-muted-foreground text-center">
          {images.length === 0 
            ? 'Please upload at least one photo to generate posters'
            : 'Please fill in all required fields to generate posters'}
        </p>
      )}
    </form>
  );
}
