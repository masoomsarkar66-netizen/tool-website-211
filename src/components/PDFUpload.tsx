import { useState, ChangeEvent } from "react";
import { extractPDFText } from "../utils/pdfExtractor";
import { parseCBC } from "../utils/cbcParser";

interface PDFUploadProps {
  onDataExtracted: (data: any) => void;
}

export default function PDFUpload({
  onDataExtracted,
}: PDFUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // ==========================
  // File Selection
  // ==========================
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setError("");

    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("Maximum allowed size is 20MB.");
      return;
    }

    setSelectedFile(file);
  };

  // ==========================
  // Extract & Parse CBC
  // ==========================
  const handleExtract = async () => {
    if (!selectedFile) {
      setError("Please select a PDF first.");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(20);
      setError("");

      // Step 1
      const pdfText = await extractPDFText(selectedFile);

      setUploadProgress(70);

      // Step 2
      const parsedData = parseCBC(pdfText);

      setUploadProgress(100);

      // Step 3
      onDataExtracted(parsedData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to extract CBC report.");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 border">

      <h2 className="text-2xl font-bold mb-2">
        CBC Lab Report Analyzer
      </h2>

      <p className="text-gray-600 mb-5">
        Upload your CBC laboratory report PDF to extract all blood parameters automatically.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="w-full border rounded-lg p-2 mb-4"
      />

      {selectedFile && (
        <div className="mb-4 text-green-700 text-sm">
          <strong>Selected:</strong> {selectedFile.name}
        </div>
      )}

      {loading && (
        <div className="mb-4">

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${uploadProgress}%`,
              }}
            />

          </div>

          <p className="mt-2 text-sm text-gray-600">
            Extracting CBC report...
          </p>

        </div>
      )}

      {error && (
        <div className="mb-4 text-red-600">
          {error}
        </div>
      )}

      <button
        onClick={handleExtract}
        disabled={!selectedFile || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Extract CBC Data"}
      </button>

    </div>
  );
}
