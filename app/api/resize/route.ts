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
    const { file, width, height, format, maintainAspectRatio } =
      await parseFormData(req);
    if (!file || (!width && !height)) {
      return NextResponse.json(
        { error: "Missing file or dimensions" },
        { status: 400 }
      );
    }

    const originalSize = file.size;
    const buffer = await fileToBuffer(file);
    const metadata = await sharp(buffer).metadata();

    const sharpInstance = sharp(buffer).resize({
      width,
      height,
      fit: maintainAspectRatio ? "inside" : "fill",
    });

    const { buffer: resizedBuffer, mimeType } = await applyFormat(
      sharpInstance,
      format,
      90
    );

    const resizedMetadata = await sharp(resizedBuffer).metadata();

    return NextResponse.json({
      dataUrl: bufferToBase64(resizedBuffer, mimeType),
      originalSize,
      resizedSize: resizedBuffer.length,
      originalWidth: metadata.width,
      originalHeight: metadata.height,
      width: resizedMetadata.width,
      height: resizedMetadata.height,
      format: resizedMetadata.format,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Resize failed", details: String(error) },
      { status: 500 }
    );
  }
}
