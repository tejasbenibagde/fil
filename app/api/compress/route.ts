import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    // Parse FormData manually
    const formData = await req.formData();
    const file = formData.get("image") as File;

    // Get compression parameters from the request
    const quality = Number.parseInt(formData.get("quality") as string) || 75;
    const width = Number.parseInt(formData.get("width") as string) || 0; // 0 means maintain aspect ratio
    const height = Number.parseInt(formData.get("height") as string) || 0; // 0 means maintain aspect ratio
    const format = (formData.get("format") as string) || "jpeg";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get original file size
    const originalSize = file.size;

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("🔹 Compressing image with settings:", {
      quality,
      width,
      height,
      format,
    });

    // Initialize sharp with the buffer
    let sharpInstance = sharp(buffer);

    // Resize if width or height is specified
    if (width > 0 || height > 0) {
      sharpInstance = sharpInstance.resize({
        width: width || undefined,
        height: height || undefined,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Apply format and compression
    let compressedBuffer;
    let mimeType;

    if (format === "jpeg" || format === "jpg") {
      compressedBuffer = await sharpInstance.jpeg({ quality }).toBuffer();
      mimeType = "image/jpeg";
    } else if (format === "png") {
      compressedBuffer = await sharpInstance.png({ quality }).toBuffer();
      mimeType = "image/png";
    } else if (format === "webp") {
      compressedBuffer = await sharpInstance.webp({ quality }).toBuffer();
      mimeType = "image/webp";
    } else {
      // Default to JPEG
      compressedBuffer = await sharpInstance.jpeg({ quality }).toBuffer();
      mimeType = "image/jpeg";
    }

    // Get compressed file size
    const compressedSize = compressedBuffer.length;
    const compressionRatio = (
      ((originalSize - compressedSize) / originalSize) *
      100
    ).toFixed(2);

    // Convert buffer to base64
    const base64Image = `data:${mimeType};base64,${compressedBuffer.toString(
      "base64"
    )}`;

    console.log("✅ Compression Successful:", {
      originalSize,
      compressedSize,
      compressionRatio: `${compressionRatio}%`,
    });

    // Get image dimensions
    const metadata = await sharp(compressedBuffer).metadata();

    return NextResponse.json({
      dataUrl: base64Image,
      originalSize,
      compressedSize,
      compressionRatio: Number.parseFloat(compressionRatio),
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "Compression failed", details: String(error) },
      { status: 500 }
    );
  }
}
