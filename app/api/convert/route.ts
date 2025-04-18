import { NextResponse } from "next/server";
import sharp from "sharp";
import {
  parseFormData,
  fileToBuffer,
  applyFormat,
  bufferToBase64,
} from "@/utils/image";

export async function POST(req: Request) {
  try {
    const { file, format, quality } = await parseFormData(req);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!format || format === "original") {
      return NextResponse.json(
        { error: "Target format is required" },
        { status: 400 }
      );
    }

    const originalSize = file.size;
    const buffer = await fileToBuffer(file);

    // Get original metadata
    const originalMetadata = await sharp(buffer).metadata();

    // Create sharp instance
    const sharpInstance = sharp(buffer);

    // Apply format conversion
    const { buffer: convertedBuffer, mimeType } = await applyFormat(
      sharpInstance,
      format,
      quality
    );

    // Get converted metadata
    const convertedMetadata = await sharp(convertedBuffer).metadata();

    return NextResponse.json({
      dataUrl: bufferToBase64(convertedBuffer, mimeType),
      originalSize,
      convertedSize: convertedBuffer.length,
      originalFormat: originalMetadata.format,
      convertedFormat: convertedMetadata.format,
      width: convertedMetadata.width,
      height: convertedMetadata.height,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Conversion failed", details: String(error) },
      { status: 500 }
    );
  }
}
