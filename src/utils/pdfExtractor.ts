import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export async function extractPDFText(file: File): Promise<string> {
  console.log("===== extractPDFText() START =====");

  try {
    console.log("File Name:", file.name);
    console.log("File Size:", file.size);

    const arrayBuffer = await file.arrayBuffer();
    console.log("ArrayBuffer Loaded");

    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
    });

    console.log("Loading PDF...");

    const pdf = await loadingTask.promise;

    console.log("PDF Loaded Successfully");
    console.log("Total Pages:", pdf.numPages);

    let fullText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      console.log(`Reading Page ${pageNumber}`);

      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item: any) => ("str" in item ? item.str : ""))
        .join(" ");

      console.log(`Page ${pageNumber}:`, pageText);

      fullText += pageText + "\n";
    }

    console.log("========== FINAL PDF TEXT ==========");
    console.log(fullText);
    console.log("====================================");

    return fullText.trim();
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw error;
  }
}
