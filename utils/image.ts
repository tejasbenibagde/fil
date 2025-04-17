import sharp from "sharp";

export async function parseFormData(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const width = parseInt(formData.get("width") as string) || undefined;
  const height = parseInt(formData.get("height") as string) || undefined;
  const format = (formData.get("format") as string)?.toLowerCase() || "jpeg";
  const quality = parseInt(formData.get("quality") as string) || 75;
  const maintainAspectRatio = formData.get("maintainAspectRatio") === "true";

  return { file, width, height, format, quality, maintainAspectRatio };
}

export async function fileToBuffer(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function applyFormat(
  sharpInstance: sharp.Sharp,
  format: string,
  quality: number
): Promise<{ buffer: Buffer; mimeType: string }> {
  switch (format) {
    case "png":
      return {
        buffer: await sharpInstance.png({ quality }).toBuffer(),
        mimeType: "image/png",
      };
    case "webp":
      return {
        buffer: await sharpInstance.webp({ quality }).toBuffer(),
        mimeType: "image/webp",
      };
    case "jpeg":
    case "jpg":
    default:
      return {
        buffer: await sharpInstance.jpeg({ quality }).toBuffer(),
        mimeType: "image/jpeg",
      };
  }
}

export function bufferToBase64(buffer: Buffer, mimeType: string) {
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}
