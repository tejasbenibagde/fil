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
    const { file, width, height, format, quality } = await parseFormData(req);
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const originalSize = file.size;
    const buffer = await fileToBuffer(file);
    let sharpInstance = sharp(buffer);

    if (width || height) {
      sharpInstance = sharpInstance.resize({
        width,
        height,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    const { buffer: compressedBuffer, mimeType } = await applyFormat(
      sharpInstance,
      format,
      quality
    );

    const compressedSize = compressedBuffer.length;
    const compressionRatio = +(
      ((originalSize - compressedSize) / originalSize) *
      100
    ).toFixed(2);

    const metadata = await sharp(compressedBuffer).metadata();

    return NextResponse.json({
      dataUrl: bufferToBase64(compressedBuffer, mimeType),
      originalSize,
      compressedSize,
      compressionRatio,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Compression failed", details: String(error) },
      { status: 500 }
    );
  }
}
