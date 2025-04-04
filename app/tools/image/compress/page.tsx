"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, Trash2, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import NextImage from "next/image"

export default function CompressImage() {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState("original")
  const [width, setWidth] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number
    compressedSize: number
    compressionRatio: number
    width?: number
    height?: number
    format?: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      setIsComplete(false)
      setCompressedImage(null)
      setCompressionStats(null)
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleCompress = async () => {
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
      const formData = new FormData()
      formData.append("image", file)
      formData.append("quality", quality.toString())

      // Only append width/height if they are set
      if (width) formData.append("width", width.toString())
      if (height) formData.append("height", height.toString())

      // Handle format
      if (format !== "original") {
        formData.append("format", format)
      }

      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to compress image")
      }

      const data = await response.json()

      if (data.dataUrl) {
        setCompressedImage(data.dataUrl)

        setCompressionStats({
          originalSize: data.originalSize,
          compressedSize: data.compressedSize,
          compressionRatio: data.compressionRatio,
          width: data.width,
          height: data.height,
          format: data.format,
        })
        setIsComplete(true)
        setProgress(100)
      } else {
        throw new Error("No compressed image data returned")
      }
    } catch (err) {
      console.error("Compression error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setCompressedImage(null)
    setCompressionStats(null)
    setProgress(0)
    setIsComplete(false)
    setIsProcessing(false)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB"
    else return (bytes / 1048576).toFixed(2) + " MB"
  }

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value)
    setWidth(value)

    if (maintainAspectRatio && file && preview && typeof value === "number" && value > 0) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        setHeight(Math.round(value / aspectRatio))
      }
      img.src = preview
    }
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value)
    setHeight(value)

    if (maintainAspectRatio && file && preview && typeof value === "number" && value > 0) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        setWidth(Math.round(value * aspectRatio))
      }
      img.src = preview
    }
  }

  return (
    <div className="container py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Compress Image</h1>

      <div className="max-w-full md:max-w-3xl mx-auto">
        <Card className="p-6 mb-6">
          <Tabs defaultValue="basic" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Quality</span>
                  <span>{quality}%</span>
                </div>
                <Slider
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  min={10}
                  max={100}
                  step={5}
                  disabled={isProcessing}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Smaller file size</span>
                  <span>Better quality</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Output Format</h3>
                <RadioGroup
                  value={format}
                  onValueChange={setFormat}
                  className="flex flex-wrap gap-4"
                  disabled={isProcessing}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="original" id="original" />
                    <Label htmlFor="original">Original</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="jpeg" id="jpeg" />
                    <Label htmlFor="jpeg">JPEG</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="png" id="png" />
                    <Label htmlFor="png">PNG</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="webp" id="webp" />
                    <Label htmlFor="webp">WebP</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 pt-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Resize Dimensions</h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="space-y-1 w-full sm:flex-1">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="Auto"
                      value={width}
                      onChange={handleWidthChange}
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="space-y-1 w-full sm:flex-1">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Auto"
                      value={height}
                      onChange={handleHeightChange}
                      disabled={isProcessing}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="aspect-ratio"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="mr-2"
                    disabled={isProcessing}
                  />
                  <Label htmlFor="aspect-ratio" className="text-sm">
                    Maintain aspect ratio
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Leave empty to maintain original dimensions. Specifying only width or height will maintain aspect
                  ratio.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!file ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Upload your image</h3>
                <p className="text-sm text-muted-foreground mb-4">Drag and drop your file here, or click to browse</p>
                <Button asChild>
                  <label>
                    Browse Files
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </label>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Original Image</h3>
                  <div className="border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center h-40 md:h-48">
                    {preview && (
                      <NextImage
                      src={preview || "/placeholder.svg"}
                      alt="Original"
                      width={500} 
                      height={500}
                      className="max-w-full max-h-full object-contain"
                      unoptimized
                    />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>File: {file.name}</p>
                    <p>Size: {formatFileSize(file.size)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Compressed Image</h3>
                  <div className="border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center h-40 md:h-48">
                    {compressedImage ? (
                      <NextImage
                      src={compressedImage || "/placeholder.svg"}
                      alt="Compressed"
                      width={500} 
                      height={500} 
                      className="max-w-full max-h-full object-contain"
                      unoptimized 
                    />
                    ) : (
                      <div className="text-center text-muted-foreground text-sm p-4">
                        {isProcessing ? "Processing..." : "Compression preview will appear here"}
                      </div>
                    )}
                  </div>
                  {compressionStats && (
                    <div className="text-sm text-muted-foreground">
                      <p>Size: {formatFileSize(compressionStats.compressedSize)}</p>
                      <p>
                        Dimensions: {compressionStats.width} × {compressionStats.height}
                      </p>
                      <p>Format: {compressionStats.format?.toUpperCase()}</p>
                    </div>
                  )}
                </div>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {compressionStats && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Compression Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Original Size:</p>
                      <p className="font-medium">{formatFileSize(compressionStats.originalSize)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Compressed Size:</p>
                      <p className="font-medium">{formatFileSize(compressionStats.compressedSize)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Space Saved:</p>
                      <p className="font-medium">
                        {formatFileSize(compressionStats.originalSize - compressionStats.compressedSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reduction:</p>
                      <p className="font-medium">{compressionStats.compressionRatio.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              )}

<div className="flex gap-4 flex-wrap">
                {!isComplete ? (
                  <Button
                    className="flex-1"
                    onClick={handleCompress}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Compress Image"
                    )}
                  </Button>
                ) : (
                  <Button className="flex-1" asChild>
                    <a href={compressedImage || "#"} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Compressed Image
                    </a>
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isProcessing}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">About Image Compression</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Our image compression tool reduces the file size while maintaining reasonable quality. This is useful for:
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Uploading to websites and social media</li>
            <li>Sending via email or messaging apps</li>
            <li>Optimizing images for web pages</li>
            <li>Saving storage space on your device</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

