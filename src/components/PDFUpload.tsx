interface PDFUploadProps {
  onDataExtracted: (data: any) => void;
}
export default function PDFUpload({ onDataExtracted }: PDFUploadProps) {

  const handleUpload = async () => {
    if (!file) {
      alert("Please select PDF first");
      return;
    }

    try {
      setLoading(true);

      const pdfText = await extractPDFText(file);

      const parsedData = parseCBCReport(pdfText);

      // CBC Tool ko data bhej do
      onDataExtracted(parsedData);

    } catch (err) {
      console.error(err);
      alert("Unable to read PDF");
    } finally {
      setLoading(false);
    }
  };

  ...
}
