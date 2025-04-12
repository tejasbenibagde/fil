"use client"

import { useState, useEffect, useCallback } from "react"

export interface ImageProcessingStats {
  originalSize: number
  processedSize: number // Generic name for either compressed or resized
  compressionRatio?: number
  originalWidth?: number
  originalHeight?: number
  width?: number
  height?: number
  format?: string
}

export interface ProcessingOptions {
  quality?: number
  format?: string
  width?: number | string
  height?: number | string
  maintainAspectRatio?: boolean
  percentage?: number
  [key: string]: any // For any additional options
}

interface UseImageProcessingProps {
  apiEndpoint: string
  initialOptions?: ProcessingOptions
}

export function useImageProcessing({ apiEndpoint, initialOptions = {} }: UseImageProcessingProps) {
  // File states
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  // Processing states
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Result states
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [processedFileName, setProcessedFileName] = useState<string>("")
  const [stats, setStats] = useState<ImageProcessingStats | null>(null)

  // Options state - all processing options in one object
  const [options, setOptions] = useState<ProcessingOptions>(initialOptions)

  // Update options when initialOptions change - ONLY ON MOUNT
  useEffect(() => {
    setOptions(initialOptions)
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Create FormData with all options
  const getFormData = (): FormData => {
    const formData = new FormData()
    if (!file) return formData

    formData.append("image", file)

    // Add all options to formData
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value))
      }
    })

    return formData
  }

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)
      setIsComplete(false)
      setProcessedImage(null)
      setStats(null)
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleProcess = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)
    setError(null)

    // Simulate initial progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const formData = getFormData()

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process image")
      }

      const data = await response.json()

      if (data.dataUrl) {
        setProcessedImage(data.dataUrl)

        // Generate a filename for download
        const fileExt =
          options.format === "original"
            ? file.name.split(".").pop()
            : options.format === "jpeg"
              ? "jpg"
              : options.format

        const processType = apiEndpoint.includes("compress") ? "compressed" : "resized"
        setProcessedFileName(`${processType}-${Date.now()}.${fileExt}`)

        // Set stats with appropriate property names
        setStats({
          originalSize: data.originalSize,
          processedSize: data.compressedSize || data.resizedSize,
          compressionRatio: data.compressionRatio,
          originalWidth: data.originalWidth,
          originalHeight: data.originalHeight,
          width: data.width,
          height: data.height,
          format: data.format,
        })

        setIsComplete(true)
        setProgress(100)
      } else {
        throw new Error("No processed image data returned")
      }
    } catch (err) {
      console.error("Processing error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setProcessedImage(null)
    setProcessedFileName("")
    setStats(null)
    setProgress(0)
    setIsComplete(false)
    setIsProcessing(false)
    setError(null)
    // Don't reset options - they should persist
  }

  // Helper function to update a single option - use useCallback to prevent recreating on every render
  const updateOption = useCallback((key: string, value: any) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Format file size helper
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB"
    else return (bytes / 1048576).toFixed(2) + " MB"
  }

  return {
    // States
    file,
    preview,
    isProcessing,
    progress,
    isComplete,
    error,
    processedImage,
    processedFileName,
    stats,
    options,

    // Setters
    setFile,
    setPreview,
    setOptions,
    updateOption,

    // Actions
    handleFileSelected,
    handleProcess,
    handleReset,
    formatFileSize,
  }
}
