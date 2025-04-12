"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Download, Trash2, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import NextImage from "next/image";
import { FileUploadZone } from "@/components/layout/file-upload-zone";
import { useImageProcessing } from "@/hooks/use-image-processing";

export default function CompressImage() {
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
    apiEndpoint: "/api/compress",
    initialOptions: {
      quality: 80,
      format: "original",
      maintainAspectRatio: true,
    },
  });

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value);
    updateOption("width", value);

    if (options.maintainAspectRatio && file && preview && value !== "") {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        updateOption("height", Math.round(Number(value) / aspectRatio));
      };
      img.src = preview;
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value);
    updateOption("height", value);

    if (options.maintainAspectRatio && file && preview && value !== "") {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        updateOption("width", Math.round(Number(value) * aspectRatio));
      };
      img.src = preview;
    }
  };

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
                  <span>{options.quality}%</span>
                </div>
                <Slider
                  value={[options.quality as number]}
                  onValueChange={(value) => updateOption("quality", value[0])}
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
                      value={options.width || ""}
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
                      value={options.height || ""}
                      onChange={handleHeightChange}
                      disabled={isProcessing}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="aspect-ratio"
                    checked={options.maintainAspectRatio as boolean}
                    onChange={(e) =>
                      updateOption("maintainAspectRatio", e.target.checked)
                    }
                    className="mr-2"
                    disabled={isProcessing}
                  />
                  <Label htmlFor="aspect-ratio" className="text-sm">
                    Maintain aspect ratio
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Leave empty to maintain original dimensions. Specifying only
                  width or height will maintain aspect ratio.
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
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Compressed Image</h3>
                  <div className="border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center h-40 md:h-48">
                    {processedImage ? (
                      <NextImage
                        src={processedImage || "/placeholder.svg"}
                        alt="Compressed"
                        width={500}
                        height={500}
                        className="max-w-full max-h-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="text-center text-muted-foreground text-sm p-4">
                        {isProcessing
                          ? "Processing..."
                          : "Compression preview will appear here"}
                      </div>
                    )}
                  </div>
                  {stats && (
                    <div className="text-sm text-muted-foreground">
                      <p>Size: {formatFileSize(stats.processedSize)}</p>
                      <p>
                        Dimensions: {stats.width} × {stats.height}
                      </p>
                      <p>Format: {stats.format?.toUpperCase()}</p>
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

              {stats && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Compression Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Original Size:</p>
                      <p className="font-medium">
                        {formatFileSize(stats.originalSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Compressed Size:</p>
                      <p className="font-medium">
                        {formatFileSize(stats.processedSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Space Saved:</p>
                      <p className="font-medium">
                        {formatFileSize(
                          stats.originalSize - stats.processedSize
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reduction:</p>
                      <p className="font-medium">
                        {stats.compressionRatio?.toFixed(2)}%
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
                    <a href={processedImage || "#"} download>
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
            Our image compression tool reduces the file size while maintaining
            reasonable quality. This is useful for:
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
  );
}
