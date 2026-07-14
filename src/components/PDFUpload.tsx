import { useState } from "react";

export default function PDFUpload() {

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    console.log("Selected PDF:", file);

    alert("PDF Selected Successfully");

  };


  return (
    <div className="p-6 border rounded-lg">

      <h2 className="text-2xl font-bold mb-4">
        Upload PDF
      </h2>


      <input
        type="file"
        accept="application/pdf"
        onChange={(e)=> 
          setFile(e.target.files?.[0] || null)
        }
      />


      <button
        onClick={handleUpload}
        className="mt-4 px-5 py-2 bg-black text-white rounded"
      >
        Upload PDF
      </button>


    </div>
  );
}
