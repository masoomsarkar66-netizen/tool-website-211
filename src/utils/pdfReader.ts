import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// PDF Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export async function extractPDFText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
    });

    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item: any) => {
          if ("str" in item) {
            return item.str;
          }
          return "";
        })
        .join(" ");

      fullText += pageText + "\n";
    }

    console.log("========== PDF TEXT ==========");
    console.log(fullText);
    console.log("==============================");

    return fullText.trim();
  } catch (error) {
    console.error("PDF Reader Error:", error);
    throw new Error("Unable to read PDF.");
  }
}
