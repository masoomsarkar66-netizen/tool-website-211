export async function extractPDFText(file: File) {
  const fileSize = (file.size / 1024).toFixed(2);

  return `
PDF Upload Successful

File Name:
${file.name}

File Size:
${fileSize} KB

Status:
PDF received successfully.

Note:
Text extraction will be connected in the next step.
`;
}
