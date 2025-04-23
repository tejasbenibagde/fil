"use client";

import {
  useState,
  useRef,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  buttonText?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

export function FileUploadZone({
  onFilesSelected,
  accept = "*/*",
  maxFiles = 1,
  buttonText = "Browse Files",
  description = "Drag and drop your file here, or click to browse",
  className = "",
  disabled = false,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set isDragging to false if we're leaving the container (not entering a child element)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files?.length) return;

    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    // Filter files based on accept attribute
    let filteredFiles = files;

    if (accept !== "*/*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      filteredFiles = files.filter((file) => {
        return acceptedTypes.some((type) => {
          // Handle mime types (e.g., "image/*")
          if (type.endsWith("/*")) {
            const category = type.split("/")[0];
            return file.type.startsWith(`${category}/`);
          }
          // Handle specific extensions (e.g., ".pdf")
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          // Handle exact mime types
          return file.type === type;
        });
      });
    }

    // Limit number of files
    if (maxFiles > 0 && filteredFiles.length > maxFiles) {
      filteredFiles = filteredFiles.slice(0, maxFiles);
    }

    if (filteredFiles.length > 0) {
      onFilesSelected(filteredFiles);
    }
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    // Only trigger if the click is directly on the container or specific child elements
    // but not on the button or its children
    if (disabled) return;

    // Check if the click target is the button or a child of the button
    const buttonElement = containerRef.current?.querySelector("button");
    if (
      buttonElement &&
      (buttonElement === e.target || buttonElement.contains(e.target as Node))
    ) {
      return; // Don't do anything if clicking on the button
    }

    // Otherwise, trigger the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerFileInput = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`border-2 ${
        isDragging ? "border-primary" : "border-dashed"
      } rounded-lg p-8 text-center transition-colors ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleContainerClick}
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
    >
      <div className="flex flex-col items-center">
        <Upload
          className={`h-10 w-10 mb-4 ${
            isDragging ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <h3 className="text-lg font-medium mb-2">
          {isDragging ? "Drop your file here" : "Upload your file"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {/* Completely separate button without label wrapping */}
        <Button
          aria-label="upload button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            triggerFileInput();
          }}
        >
          {buttonText}
        </Button>

        {/* Hidden file input without label */}
        <input
          data-testid="file-input"
          type="file"
          className="sr-only"
          accept={accept}
          onChange={handleFileInputChange}
          ref={fileInputRef}
          multiple={maxFiles > 1}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
