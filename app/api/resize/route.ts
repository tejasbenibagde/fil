import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    // Parse FormData manually
    const formData = await req.formData();
    const file = formData.get("image") as File;

    // Get resize parameters from the request
    const width = Number.parseInt(formData.get("width") as string) || null;
    const height = Number.parseInt(formData.get("height") as string) || null;
    const maintainAspectRatio = formData.get("maintainAspectRatio") === "true";
    const format = (formData.get("format") as string) || "jpeg";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!width && !height) {
      return NextResponse.json(
        { error: "At least one dimension (width or height) is required" },
        { status: 400 }
      );
    }

    // Get original file size
    const originalSize = file.size;

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get original image dimensions
    const metadata = await sharp(buffer).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;

    console.log("🔹 Resizing image with settings:", {
      width,
      height,
      maintainAspectRatio,
      originalWidth,
      originalHeight,
      format,
    });

    // Initialize sharp with the buffer
    let sharpInstance = sharp(buffer);

    // Calculate dimensions based on aspect ratio if needed
    const resizeOptions: sharp.ResizeOptions = {
      fit: maintainAspectRatio ? "inside" : "fill",
      withoutEnlargement: false,
    };

    if (width) resizeOptions.width = width;
    if (height) resizeOptions.height = height;

    // Apply resize
    sharpInstance = sharpInstance.resize(resizeOptions);

    // Apply format
    let resizedBuffer;
    let mimeType;

    if (format === "jpeg" || format === "jpg") {
      resizedBuffer = await sharpInstance.jpeg({ quality: 90 }).toBuffer();
      mimeType = "image/jpeg";
    } else if (format === "png") {
      resizedBuffer = await sharpInstance.png().toBuffer();
      mimeType = "image/png";
    } else if (format === "webp") {
      resizedBuffer = await sharpInstance.webp({ quality: 90 }).toBuffer();
      mimeType = "image/webp";
    } else {
      // Default to JPEG
      resizedBuffer = await sharpInstance.jpeg({ quality: 90 }).toBuffer();
      mimeType = "image/jpeg";
    }

    // Get resized file size
    const resizedSize = resizedBuffer.length;

    // Get resized image dimensions
    const resizedMetadata = await sharp(resizedBuffer).metadata();

    // Convert buffer to base64
    const base64Image = `data:${mimeType};base64,${resizedBuffer.toString(
      "base64"
    )}`;

    console.log("✅ Resize Successful:", {
      originalSize,
      resizedSize,
      originalDimensions: `${originalWidth}x${originalHeight}`,
      newDimensions: `${resizedMetadata.width}x${resizedMetadata.height}`,
    });

    return NextResponse.json({
      dataUrl: base64Image,
      originalSize,
      resizedSize,
      originalWidth,
      originalHeight,
      width: resizedMetadata.width,
      height: resizedMetadata.height,
      format: resizedMetadata.format,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "Resize failed", details: String(error) },
      { status: 500 }
    );
  }
}
