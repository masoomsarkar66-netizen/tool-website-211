export interface CBCValue {
  test: string;
  value: string;
}

export function parseCBC(text: string): CBCValue[] {
  const tests = [
    "Hemoglobin",
    "WBC",
    "RBC",
    "Platelets",
    "Hematocrit",
    "MCV",
    "MCH",
    "MCHC",
    "RDW",
    "Neutrophils",
    "Lymphocytes",
    "Monocytes",
    "Eosinophils",
    "Basophils",
  ];

  const results: CBCValue[] = [];

  tests.forEach((test) => {
    const regex = new RegExp(
      `${test}\\s*[:\\-]?\\s*([0-9]+(?:\\.[0-9]+)?)`,
      "i"
    );

    const match = text.match(regex);

    if (match) {
      results.push({
        test,
        value: match[1],
      });
    }
  });

  return results;
}
