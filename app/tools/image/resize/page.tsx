"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
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
import { useImageProcessing } from "@/hooks/use-image-processing";

export default function ResizeImage() {
  const {
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
    updateOption,
    handleFileSelected,
    handleProcess,
    handleReset,
    formatFileSize,
  } = useImageProcessing({
    apiEndpoint: "/api/resize",
    initialOptions: {
      format: "original",
      maintainAspectRatio: true,
      percentage: 100,
      resizeMethod: "dimensions",
    },
  });

  // Store original dimensions
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);

  // Use refs to track if dimensions have been set to avoid infinite loops
  const dimensionsSet = useRef(false);

  // Load original dimensions when file is selected
  useEffect(() => {
    if (file && preview) {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);

        // Only set dimensions if they haven't been set yet
        if (!dimensionsSet.current) {
          updateOption("width", img.width);
          updateOption("height", img.height);
          dimensionsSet.current = true;
        }
      };
      img.src = preview;
    } else {
      // Reset the flag when file changes
      dimensionsSet.current = false;
    }
  }, [file, preview, updateOption]);

  // Update dimensions when percentage changes - use a ref to track last percentage
  const lastPercentage = useRef<number | null>(null);

  useEffect(() => {
    const currentPercentage = options.percentage as number;

    // Only update if percentage has changed and is different from last processed value
    if (
      options.resizeMethod === "percentage" &&
      originalWidth &&
      originalHeight &&
      currentPercentage &&
      lastPercentage.current !== currentPercentage
    ) {
      lastPercentage.current = currentPercentage;

      const newWidth = Math.round((originalWidth * currentPercentage) / 100);
      const newHeight = Math.round((originalHeight * currentPercentage) / 100);

      updateOption("width", newWidth);
      updateOption("height", newHeight);
    }
  }, [
    options.percentage,
    originalWidth,
    originalHeight,
    options.resizeMethod,
    updateOption,
    options,
  ]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value);
    updateOption("width", value);

    if (
      options.maintainAspectRatio &&
      originalWidth &&
      originalHeight &&
      value !== ""
    ) {
      const aspectRatio = originalWidth / originalHeight;
      updateOption("height", Math.round(Number(value) / aspectRatio));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value);
    updateOption("height", value);

    if (
      options.maintainAspectRatio &&
      originalWidth &&
      originalHeight &&
      value !== ""
    ) {
      const aspectRatio = originalWidth / originalHeight;
      updateOption("width", Math.round(Number(value) * aspectRatio));
    }
  };

  const toggleAspectRatio = () => {
    updateOption("maintainAspectRatio", !options.maintainAspectRatio);

    // If turning aspect ratio back on, recalculate height based on current width
    if (
      !options.maintainAspectRatio &&
      originalWidth &&
      originalHeight &&
      options.width
    ) {
      const aspectRatio = originalWidth / originalHeight;
      updateOption("height", Math.round(Number(options.width) / aspectRatio));
    }
  };

  const handlePercentageChange = (values: number[]) => {
    updateOption("percentage", values[0]);
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
                    {processedImage ? (
                      <NextImage
                        src={processedImage || "/placeholder.svg"}
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
                  {stats && (
                    <div className="text-sm text-muted-foreground">
                      <p>Size: {formatFileSize(stats.processedSize)}</p>
                      <p>
                        Dimensions: {stats.width} × {stats.height} px
                      </p>
                      <p>Format: {stats.format?.toUpperCase()}</p>
                    </div>
                  )}
                </div>
              </div>

              <Tabs
                defaultValue={options.resizeMethod as string}
                onValueChange={(value) => updateOption("resizeMethod", value)}
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
                          options.maintainAspectRatio
                            ? "Unlock aspect ratio"
                            : "Lock aspect ratio"
                        }
                      >
                        {options.maintainAspectRatio ? (
                          <Lock className="h-4 w-4 text-primary" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="text-sm font-medium">
                        {options.maintainAspectRatio
                          ? "Maintain aspect ratio"
                          : "Free resize"}
                      </span>
                    </div>
                    {originalWidth && originalHeight && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          updateOption("width", originalWidth);
                          updateOption("height", originalHeight);
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
                        value={options.width || ""}
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
                        value={options.height || ""}
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
                      <span>{options.percentage}%</span>
                    </div>
                    <Slider
                      value={[Number(options.percentage)]}
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

                    {options.width && options.height && (
                      <div className="text-sm text-muted-foreground mt-2">
                        New dimensions: {options.width} × {options.height} px
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Output Format</h3>
                  <RadioGroup
                    value={options.format as string}
                    onValueChange={(value) => updateOption("format", value)}
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

              {stats && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Resize Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        Original Dimensions:
                      </p>
                      <p className="font-medium">
                        {stats.originalWidth} × {stats.originalHeight} px
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">New Dimensions:</p>
                      <p className="font-medium">
                        {stats.width} × {stats.height} px
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Original Size:</p>
                      <p className="font-medium">
                        {formatFileSize(stats.originalSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">New Size:</p>
                      <p className="font-medium">
                        {formatFileSize(stats.processedSize)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 flex-wrap">
                {!isComplete ? (
                  <Button
                    className="flex-1"
                    onClick={handleProcess}
                    disabled={
                      isProcessing || (!options.width && !options.height)
                    }
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
                    <a
                      href={processedImage || "#"}
                      download={processedFileName}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resized Image
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
