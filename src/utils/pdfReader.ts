import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";


pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;


export async function extractPDFText(
  file: File
): Promise<string> {

  const arrayBuffer = await file.arrayBuffer();


  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;


  let fullText = "";


  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {

    const page = await pdf.getPage(pageNumber);


    const textContent =
      await page.getTextContent();


    const pageText =
      textContent.items
        .map((item: any) => item.str)
        .join(" ");


    fullText += pageText + "\n";
  }


  return fullText;
}
