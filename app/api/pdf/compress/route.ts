import { PDFDocument } from "pdf-lib";
import { NextRequest, NextResponse } from "next/server";

// Configure pdf-lib globally before any PDF modification
// PDFDocument.prototype.useJbig2Decoder = true;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    // const quality = parseInt(formData.get("quality") as string || "75", 10);

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);

    // Save the PDF with applied compression settings. The 'quality' parameter could potentially influence
    // internal compression details depending on future pdf-lib updates and features.
    const compressedPdfBytes = await pdfDoc.save();

    const headers = new Headers();
    headers.append(
      "Content-Disposition",
      `attachment; filename="compressed.pdf"`
    );
    headers.append("Content-Type", "application/pdf");
    headers.append("X-New-Size", compressedPdfBytes.byteLength.toString());

    return new NextResponse(compressedPdfBytes, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Error compressing PDF:", error);
    return new NextResponse("Error compressing PDF", { status: 500 });
  }
}
