"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  Trash2,
  RefreshCw,
  Lock,
  Unlock,
  AlertCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NextImage from "next/image";
import { FileUploadZone } from "@/components/layout/file-upload-zone";

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState("original");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resizedFileName, setResizedFileName] = useState<string>("");
  const [resizeMethod, setResizeMethod] = useState<"dimensions" | "percentage">(
    "dimensions"
  );
  const [percentage, setPercentage] = useState(100);
  const [resizeStats, setResizeStats] = useState<{
    originalSize: number;
    resizedSize: number;
    originalWidth: number;
    originalHeight: number;
    width: number;
    height: number;
    format?: string;
  } | null>(null);

  useEffect(() => {
    if (file && preview) {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = preview;
    }
  }, [file, preview]);

  useEffect(() => {
    if (
      resizeMethod === "percentage" &&
      originalWidth &&
      originalHeight &&
      percentage
    ) {
      setWidth(Math.round((originalWidth * percentage) / 100));
      setHeight(Math.round((originalHeight * percentage) / 100));
    }
  }, [percentage, originalWidth, originalHeight, resizeMethod]);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setIsComplete(false);
      setResizedImage(null);
      setResizeStats(null);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value);
    setWidth(value);

    if (
      maintainAspectRatio &&
      originalWidth &&
      originalHeight &&
      typeof value === "number" &&
      value > 0
    ) {
      const aspectRatio = originalWidth / originalHeight;
      setHeight(Math.round(value / aspectRatio));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value);
    setHeight(value);

    if (
      maintainAspectRatio &&
      originalWidth &&
      originalHeight &&
      typeof value === "number" &&
      value > 0
    ) {
      const aspectRatio = originalWidth / originalHeight;
      setWidth(Math.round(value * aspectRatio));
    }
  };

  const handleResize = async () => {
    if (!file || (!width && !height)) return;

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

      if (width) formData.append("width", width.toString());
      if (height) formData.append("height", height.toString());
      formData.append("maintainAspectRatio", maintainAspectRatio.toString());

      // Handle format
      if (format !== "original") {
        formData.append("format", format);
      }

      const response = await fetch("/api/resize", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to resize image");
      }

      const data = await response.json();

      if (data.dataUrl) {
        setResizedImage(data.dataUrl);

        // Generate a filename for download
        const fileExt =
          format === "original"
            ? file.name.split(".").pop()
            : format === "jpeg"
            ? "jpg"
            : format;
        setResizedFileName(`resized-${Date.now()}.${fileExt}`);

        setResizeStats({
          originalSize: data.originalSize,
          resizedSize: data.resizedSize,
          originalWidth: data.originalWidth,
          originalHeight: data.originalHeight,
          width: data.width,
          height: data.height,
          format: data.format,
        });
        setIsComplete(true);
        setProgress(100);
      } else {
        throw new Error("No resized image data returned");
      }
    } catch (err) {
      console.error("Resize error:", err);
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
    setResizedImage(null);
    setResizeStats(null);
    setWidth("");
    setHeight("");
    setOriginalWidth(null);
    setOriginalHeight(null);
    setProgress(0);
    setIsComplete(false);
    setIsProcessing(false);
    setError(null);
    setPercentage(100);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };

  const toggleAspectRatio = () => {
    setMaintainAspectRatio(!maintainAspectRatio);

    // If turning aspect ratio back on, recalculate height based on current width
    if (!maintainAspectRatio && originalWidth && originalHeight && width) {
      const aspectRatio = originalWidth / originalHeight;
      setHeight(Math.round(Number(width) / aspectRatio));
    }
  };

  const handlePercentageChange = (values: number[]) => {
    setPercentage(values[0]);
  };

  return (
    <div className="container py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Resize Image</h1>

      <div className="max-w-full md:max-w-3xl mx-auto">
        <Card className="p-6 mb-6">
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
                    {originalWidth && originalHeight && (
                      <p>
                        Dimensions: {originalWidth} × {originalHeight} px
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Resized Preview</h3>
                  <div className="border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center h-40 md:h-48">
                    {resizedImage ? (
                      <NextImage
                        src={resizedImage || "/placeholder.svg"}
                        alt="Resized"
                        width={500}
                        height={500}
                        className="max-w-full max-h-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="text-center text-muted-foreground text-sm p-4">
                        {isProcessing
                          ? "Processing..."
                          : "Resize preview will appear here"}
                      </div>
                    )}
                  </div>
                  {resizeStats && (
                    <div className="text-sm text-muted-foreground">
                      <p>Size: {formatFileSize(resizeStats.resizedSize)}</p>
                      <p>
                        Dimensions: {resizeStats.width} × {resizeStats.height}{" "}
                        px
                      </p>
                      <p>Format: {resizeStats.format?.toUpperCase()}</p>
                    </div>
                  )}
                </div>
              </div>

              <Tabs
                defaultValue="dimensions"
                onValueChange={(value) =>
                  setResizeMethod(value as "dimensions" | "percentage")
                }
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dimensions">
                    Custom Dimensions
                  </TabsTrigger>
                  <TabsTrigger value="percentage">Percentage</TabsTrigger>
                </TabsList>

                <TabsContent value="dimensions" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleAspectRatio}
                        className="mr-2"
                        title={
                          maintainAspectRatio
                            ? "Unlock aspect ratio"
                            : "Lock aspect ratio"
                        }
                      >
                        {maintainAspectRatio ? (
                          <Lock className="h-4 w-4 text-primary" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="text-sm font-medium">
                        {maintainAspectRatio
                          ? "Maintain aspect ratio"
                          : "Free resize"}
                      </span>
                    </div>
                    {originalWidth && originalHeight && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setWidth(originalWidth);
                          setHeight(originalHeight);
                        }}
                      >
                        Reset to Original
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={handleWidthChange}
                        disabled={isProcessing}
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        disabled={isProcessing}
                        min="1"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="percentage" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between mb-2">
                      <span>Scale</span>
                      <span>{percentage}%</span>
                    </div>
                    <Slider
                      value={[percentage]}
                      onValueChange={handlePercentageChange}
                      min={1}
                      max={200}
                      step={1}
                      disabled={isProcessing}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Smaller</span>
                      <span>Original (100%)</span>
                      <span>Larger</span>
                    </div>

                    {width && height && (
                      <div className="text-sm text-muted-foreground mt-2">
                        New dimensions: {width} × {height} px
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
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
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {resizeStats && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Resize Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        Original Dimensions:
                      </p>
                      <p className="font-medium">
                        {resizeStats.originalWidth} ×{" "}
                        {resizeStats.originalHeight} px
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">New Dimensions:</p>
                      <p className="font-medium">
                        {resizeStats.width} × {resizeStats.height} px
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Original Size:</p>
                      <p className="font-medium">
                        {formatFileSize(resizeStats.originalSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">New Size:</p>
                      <p className="font-medium">
                        {formatFileSize(resizeStats.resizedSize)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {!isComplete ? (
                  <Button
                    className="w-full"
                    onClick={handleResize}
                    disabled={isProcessing || (!width && !height)}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Resize Image"
                    )}
                  </Button>
                ) : (
                  <Button className="w-full" asChild>
                    <a href={resizedImage || "#"} download={resizedFileName}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Resized Image
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
          <h3 className="font-medium mb-2">About Image Resizing</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Our image resizing tool allows you to change the dimensions of your
            images. This is useful for:
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Preparing images for websites and social media</li>
            <li>Creating thumbnails or previews</li>
            <li>Reducing image dimensions for faster loading</li>
            <li>Standardizing image sizes for a collection</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
