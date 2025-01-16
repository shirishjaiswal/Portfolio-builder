import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFile = formData.get("filepond"); // Access the file using the key 'filepond'
  let fileName = "";
  let parsedText = "";

  if (uploadedFile && uploadedFile instanceof File) {
    // Generate a unique filename
    fileName = uuidv4();

    // Convert the uploaded file into a temporary file
    const tempFilePath = `/tmp/${fileName}.pdf`;

    // Convert ArrayBuffer to Buffer
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    // Save the buffer as a file
    await fs.writeFile(tempFilePath, fileBuffer);

    // Parse the pdf using pdf2json
    const pdfParser = new PDFParser(null, true);

    // Return a Promise to handle asynchronous parsing
    parsedText = await new Promise<string>((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (errData) => {
        console.log(errData.parserError);
        reject("Error parsing PDF");
      });

      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent());
      });

      pdfParser.loadPDF(tempFilePath);
    });
  } else {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const response = new NextResponse(parsedText);
  response.headers.set("FileName", fileName);
  return response;
}
