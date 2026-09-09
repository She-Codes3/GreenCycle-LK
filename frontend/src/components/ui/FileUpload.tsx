import React, { useRef, useState } from 'react';
import { cn } from './utils';

export interface FileUploadProps {
  id?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  accept,
  multiple = false,
  maxSizeMB = 10,
  disabled = false,
  error,
  helperText = `PDF, PNG, JPG up to ${maxSizeMB}MB`,
  onFilesSelected,
  className,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    setSelectedFiles(files);
    onFilesSelected?.(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    onFilesSelected?.(updated);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={cn('w-full flex flex-col gap-2', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 text-center',
          isDragOver
            ? 'border-secondary bg-primary-light/40'
            : 'border-border-strong bg-surface hover:border-primary/50 hover:bg-muted/40',
          disabled && 'cursor-not-allowed opacity-50 bg-muted',
          error && 'border-red-400 bg-red-50/50'
        )}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />

        <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <p className="text-sm font-medium text-content">
          <span className="text-primary font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-content-muted mt-1">{helperText}</p>
      </div>

      {selectedFiles.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {selectedFiles.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between px-3 py-2 text-xs bg-muted rounded-xl border border-border"
            >
              <div className="flex items-center gap-2 truncate">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium text-content truncate">{file.name}</span>
                <span className="text-content-muted shrink-0">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
                className="text-content-muted hover:text-red-600 p-1 transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
};
