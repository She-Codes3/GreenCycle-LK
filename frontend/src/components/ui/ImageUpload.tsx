import React, { useRef, useState, useEffect } from 'react';
import { cn } from './utils';

export interface ImageUploadProps {
  id?: string;
  value?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  aspectRatio?: 'square' | 'video' | 'banner';
  onChange?: (file: File | null, previewUrl: string | null) => void;
  onRemove?: () => void;
  className?: string;
}

const aspectClasses = {
  square: 'aspect-square max-w-xs',
  video: 'aspect-video max-w-md',
  banner: 'aspect-[3/1] max-w-xl',
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  value,
  label,
  helperText = 'JPG, PNG or WEBP up to 5MB',
  error,
  disabled = false,
  aspectRatio = 'square',
  onChange,
  onRemove,
  className,
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(file, url);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null, null);
    onRemove?.();
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="text-sm font-medium text-content">{label}</span>}

      <div
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          'relative w-full rounded-2xl border-2 border-dashed border-border-strong overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all',
          aspectClasses[aspectRatio],
          preview ? 'border-solid border-border' : 'hover:border-primary hover:bg-muted/40',
          disabled && 'cursor-not-allowed opacity-50 bg-muted',
          error && 'border-red-400'
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          disabled={disabled}
          onChange={handleFileChange}
          className="sr-only"
        />

        {preview ? (
          <>
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
            {!disabled && (
              <div className="absolute inset-0 bg-content/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="px-3 py-1.5 bg-surface text-content text-xs font-medium rounded-lg shadow-sm hover:bg-muted"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg shadow-sm hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-xs font-semibold text-primary">Upload photo</p>
            <p className="text-[11px] text-content-muted mt-0.5">{helperText}</p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
