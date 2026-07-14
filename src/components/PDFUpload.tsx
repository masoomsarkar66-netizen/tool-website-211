import { useState } from "react";
import { extractPDFText } from "../utils/pdfReader";

export default function PDFUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select PDF first");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const text = await extractPDFText(file);

      setResult(text || "No text found in PDF");

    } catch (error) {
      console.error(error);
      setResult("Error reading PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Upload PDF Report
      </h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
          setResult("");
        }}
        className="block w-full text-sm"
      />

      {file && (
        <p className="mt-3 text-sm text-slate-600">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
      >
        {loading ? "Reading PDF..." : "Upload PDF"}
      </button>

      {result && (
        <div className="mt-5 p-4 bg-slate-50 rounded-lg border text-sm text-slate-700 max-h-80 overflow-auto whitespace-pre-wrap">
          <h3 className="font-bold mb-2">
            PDF Result:
          </h3>

          {result}
        </div>
      )}

    </div>
  );
}
