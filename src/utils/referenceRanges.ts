export interface ReferenceRange {
  name: string;
  min: number;
  max: number;
  unit: string;
}

export const referenceRanges: ReferenceRange[] = [
  {
    name: "Hemoglobin",
    min: 13.5,
    max: 17.5,
    unit: "g/dL",
  },
  {
    name: "WBC",
    min: 4,
    max: 11,
    unit: "×10³/µL",
  },
  {
    name: "RBC",
    min: 4.5,
    max: 5.9,
    unit: "×10⁶/µL",
  },
  {
    name: "Platelets",
    min: 150,
    max: 450,
    unit: "×10³/µL",
  },
  {
    name: "Hematocrit",
    min: 41,
    max: 53,
    unit: "%",
  },
  {
    name: "MCV",
    min: 80,
    max: 100,
    unit: "fL",
  },
  {
    name: "MCH",
    min: 27,
    max: 33,
    unit: "pg",
  },
  {
    name: "MCHC",
    min: 32,
    max: 36,
    unit: "g/dL",
  },
  {
    name: "RDW",
    min: 11.5,
    max: 14.5,
    unit: "%",
  },
  {
    name: "Neutrophils",
    min: 40,
    max: 70,
    unit: "%",
  },
  {
    name: "Lymphocytes",
    min: 20,
    max: 40,
    unit: "%",
  },
  {
    name: "Monocytes",
    min: 2,
    max: 8,
    unit: "%",
  },
  {
    name: "Eosinophils",
    min: 1,
    max: 4,
    unit: "%",
  },
  {
    name: "Basophils",
    min: 0,
    max: 1,
    unit: "%",
  },
];

export function getStatus(
  value: number,
  min: number,
  max: number
): "Low" | "Normal" | "High" {
  if (value < min) return "Low";
  if (value > max) return "High";
  return "Normal";
}\
