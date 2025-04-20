"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Trash2, RefreshCw, AlertCircle } from "lucide-react";
import { FileUploadZone } from "@/components/layout/file-upload-zone";
import { ProgressBar } from "@/components/layout/progress-bar";
import NextImage from "next/image";
interface ImageStats {
  originalSize: number;
  convertedSize: number;
  originalFormat: string;
  convertedFormat: string;
  width: number;
  height: number;
}
export default function ConvertImage() {
  // File states
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Result states
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [stats, setStats] = useState<ImageStats | null>(null);

  // Options state
  const [format, setFormat] = useState<string>("jpeg");
  const [quality, setQuality] = useState<number>(90);

  // Create preview when file is selected
  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Reset states
    setIsComplete(false);
    setConvertedImage(null);
    setStats(null);
    setError(null);
  }, [file]);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    // Simulate initial progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("format", format);
      formData.append("quality", quality.toString());

      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to convert image");
      }

      const data = await response.json();

      if (data.dataUrl) {
        setConvertedImage(data.dataUrl);
        setStats({
          originalSize: data.originalSize,
          convertedSize: data.convertedSize,
          originalFormat: data.originalFormat,
          convertedFormat: data.convertedFormat,
          width: data.width,
          height: data.height,
        });
        setIsComplete(true);
        setProgress(100);
      } else {
        throw new Error("No converted image data returned");
      }
    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setConvertedImage(null);
    setStats(null);
    setProgress(0);
    setIsComplete(false);
    setIsProcessing(false);
    setError(null);
  };

  // Format file size helper
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };

  // Get the file extension from the format
  const getFileExtension = (format: string) => {
    switch (format) {
      case "jpeg":
        return "jpg";
      default:
        return format;
    }
  };

  // Format name for display
  const formatName = (format: string) => {
    switch (format) {
      case "jpeg":
        return "JPEG";
      case "png":
        return "PNG";
      case "webp":
        return "WebP";
      default:
        return format.toUpperCase();
    }
  };

  return (
    <div className="container py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Convert Image</h1>

      <div className="max-w-full md:max-w-3xl mx-auto">
        <Card className="p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Conversion Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Target Format</h3>
                <RadioGroup
                  value={format}
                  onValueChange={setFormat}
                  className="flex flex-wrap gap-4"
                  disabled={isProcessing}
                >
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

              {(format === "jpeg" || format === "webp") && (
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
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!file ? (
            <FileUploadZone
              onFilesSelected={handleFileSelected}
              accept="image/*"
              buttonText="Select Image"
              description="Drag and drop your image here, or click to browse"
              disabled={isProcessing}
            />
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
                    <p>
                      Format:{" "}
                      {stats?.originalFormat
                        ? formatName(stats.originalFormat)
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Converted Image</h3>
                  <div className="border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center h-40 md:h-48">
                    {convertedImage ? (
                      <NextImage
                        src={convertedImage || "/placeholder.svg"}
                        alt="Converted"
                        width={500}
                        height={500}
                        className="max-w-full max-h-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="text-center text-muted-foreground text-sm p-4">
                        {isProcessing
                          ? "Processing..."
                          : "Conversion preview will appear here"}
                      </div>
                    )}
                  </div>
                  {stats && (
                    <div className="text-sm text-muted-foreground">
                      <p>Size: {formatFileSize(stats.convertedSize || 0)}</p>
                      <p>
                        Format:{" "}
                        {stats.convertedFormat
                          ? formatName(stats.convertedFormat)
                          : "Unknown"}
                      </p>
                      {stats.width && stats.height && (
                        <p>
                          Dimensions: {stats.width} × {stats.height}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {isProcessing && <ProgressBar progress={progress} />}

              {stats && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Conversion Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Original Format:</p>
                      <p className="font-medium">
                        {formatName(stats.originalFormat)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Converted Format:</p>
                      <p className="font-medium">
                        {formatName(stats.convertedFormat)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Original Size:</p>
                      <p className="font-medium">
                        {formatFileSize(stats.originalSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Converted Size:</p>
                      <p className="font-medium">
                        {formatFileSize(stats.convertedSize || 0)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {!isComplete ? (
                  <Button
                    className="w-full sm:min-w-[610px] sm:w-auto"
                    onClick={handleProcess}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Convert Image"
                    )}
                  </Button>
                ) : (
                  <Button className="w-full sm:auto" asChild>
                    <a
                      href={convertedImage || "#"}
                      download={`converted-${Date.now()}.${getFileExtension(
                        format
                      )}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Converted Image
                    </a>
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isProcessing}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">About Image Conversion</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Our image conversion tool allows you to convert images between
            different formats. This is useful for:
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Converting to WebP for better web performance</li>
            <li>Converting to PNG for lossless quality and transparency</li>
            <li>Converting to JPEG for smaller file sizes</li>
            <li>
              Ensuring compatibility with different applications and platforms
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
