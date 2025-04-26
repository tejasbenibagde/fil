import { PDFDocument } from "pdf-lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);

    const compressedPdfBytes = await pdfDoc.save();

    const headers = new Headers();
    headers.append(
      "Content-Disposition",
      `attachment; filename="compressed.pdf"`
    );
    headers.append("Content-Type", "application/pdf");

    return new NextResponse(compressedPdfBytes, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Error compressing PDF:", error);
    return new NextResponse("Error compressing PDF", { status: 500 });
  }
}
