"use client";

import type React from "react";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Upload, FileText, Download, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [compressedFileUrl, setCompressedFileUrl] = useState<string | null>(
    null
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setIsComplete(false);
      setErrorMessage(null);
      setCompressedFileUrl(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setErrorMessage(null);
    setCompressedFileUrl(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/pdf/compress", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setCompressedFileUrl(url);
        setIsComplete(true);
        setProgress(100);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to compress PDF");
      }
    } catch (error) {
      console.error("Error compressing PDF:", error);
      setErrorMessage("Failed to compress PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setProgress(0);
    setIsComplete(false);
    setIsProcessing(false);
    setCompressedFileUrl(null);
    setErrorMessage(null);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Compress PDF</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Compression Settings</h2>
            <div className="mb-4">
              <Slider
                defaultValue={[quality]}
                max={100}
                min={0}
                step={1}
                onValueChange={(value) => setQuality(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>Smaller file size</span>
                <span>Better quality</span>
              </div>
              {/* } */}
            </div>
          </div>

          {!file ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">
                  Upload your PDF file
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your file here, or click to browse
                </p>
                <Button asChild>
                  <label>
                    Browse Files
                    <input
                      type="file"
                      className="sr-only"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center p-4 border rounded-lg">
                <FileText className="h-8 w-8 mr-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleReset}
                  disabled={isProcessing}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
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

              <div className="flex gap-4">
                {!isComplete ? (
                  <Button
                    className="w-full"
                    onClick={handleCompress}
                    disabled={isProcessing}
                  >
                    Compress PDF
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    disabled={!compressedFileUrl}
                    asChild
                  >
                    <a
                      href={compressedFileUrl || "#"}
                      download="compressed.pdf"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Compressed PDF
                    </a>
                  </Button>
                )}
              </div>
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              {isComplete && (
                <p className="text-sm text-center text-muted-foreground">
                  {" "}
                  File compressed successfullly
                </p>
              )}
            </div>
          )}
        </Card>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">About PDF Compression</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Our PDF compression tool reduces the file size while maintaining
            reasonable quality. This is useful for:
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Sending PDFs via email</li>
            <li>Uploading to websites with file size limits</li>
            <li>Saving storage space</li>
            <li>Faster loading times</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
