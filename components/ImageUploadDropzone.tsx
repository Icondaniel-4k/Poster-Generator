'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadDropzoneProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizePerFileMB?: number;
}

export function ImageUploadDropzone({
  onImagesSelected,
  maxFiles = 4,
  maxSizePerFileMB = 10,
}: ImageUploadDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndProcessFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    let errors: string[] = [];

    Array.from(files).forEach((file) => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        errors.push('Please upload image files only');
        return;
      }

      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizePerFileMB) {
        errors.push(`File size must be less than ${maxSizePerFileMB}MB`);
        return;
      }

      // Check max files limit
      if (uploadedFiles.length + newFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      newFiles.push(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === newFiles.length) {
          const updatedFiles = [...uploadedFiles, ...newFiles];
          const updatedPreviews = [...previewUrls, ...newPreviews];
          setUploadedFiles(updatedFiles);
          setPreviewUrls(updatedPreviews);
          setUploadError(null);
          onImagesSelected(updatedFiles);
        }
      };
      reader.readAsDataURL(file);
    });

    if (errors.length > 0) {
      setUploadError(errors[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    validateAndProcessFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndProcessFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    onImagesSelected(updatedFiles);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full space-y-4">
      {uploadError && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3">
          <p className="text-sm text-destructive">{uploadError}</p>
        </div>
      )}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative rounded-lg border-2 border-dashed transition-all cursor-pointer p-8 text-center ${
          dragActive
            ? 'border-accent bg-accent/10'
            : 'border-border bg-card/30 hover:bg-card/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          aria-label="Upload images"
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Drag and drop images here</p>
            <p className="text-xs text-muted-foreground">
              or click to select (Max {maxFiles} images, {maxSizePerFileMB}MB each)
            </p>
          </div>
        </div>
      </div>

      {/* Preview Thumbnails */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg border border-border animate-fade-in"
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity hover:opacity-100"
                aria-label={`Remove image ${index + 1}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {uploadedFiles.length} of {maxFiles} images selected
        </p>
      )}
    </div>
  );
}
