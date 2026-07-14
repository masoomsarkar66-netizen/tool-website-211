import { useState } from "react";

export default function PDFUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if (!file) {
      setMessage("Please select PDF first");
      return;
    }

    console.log("Uploaded File:", file);

    setMessage(`PDF selected successfully: ${file.name}`);
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
          setMessage("");
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
        Upload PDF
      </button>

      {message && (
        <p className="mt-4 text-sm text-green-600 font-medium">
          {message}
        </p>
      )}

    </div>
  );
}
