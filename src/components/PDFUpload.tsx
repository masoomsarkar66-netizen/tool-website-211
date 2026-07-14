const handleUpload = async () => {
  if (!file) {
    alert("Please select PDF first");
    return;
  }

  try {
    setLoading(true);

    const pdfText = await extractPDFText(file);

    const parsedData = parseCBCReport(pdfText);

    setCbcData(parsedData);

  } catch (err) {
    console.error(err);
    alert("Unable to read PDF");
  } finally {
    setLoading(false);
  }
};
