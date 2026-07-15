export interface ReferenceRange {
  name: string;
  aliases: string[];
  min: number;
  max: number;
  unit: string;
}


export const referenceRanges: ReferenceRange[] = [

  {
    name: "Hemoglobin",
    aliases: ["Hemoglobin", "Hb", "HGB"],
    min: 13.5,
    max: 17.5,
    unit: "g/dL",
  },

  {
    name: "WBC",
    aliases: ["WBC", "WBC Count", "TLC", "White Blood Cell"],
    min: 4,
    max: 11,
    unit: "×10³/µL",
  },

  {
    name: "RBC",
    aliases: ["RBC", "RBC Count"],
    min: 4.5,
    max: 5.9,
    unit: "×10⁶/µL",
  },

  {
    name: "Platelets",
    aliases: ["Platelets", "Platelet Count", "PLT"],
    min: 150,
    max: 450,
    unit: "×10³/µL",
  },

  {
    name: "Hematocrit",
    aliases: ["Hematocrit", "HCT"],
    min: 41,
    max: 53,
    unit: "%",
  },

  {
    name: "MCV",
    aliases: ["MCV"],
    min: 80,
    max: 100,
    unit: "fL",
  },

  {
    name: "MCH",
    aliases: ["MCH"],
    min: 27,
    max: 33,
    unit: "pg",
  },

  {
    name: "MCHC",
    aliases: ["MCHC"],
    min: 32,
    max: 36,
    unit: "g/dL",
  },

  {
    name: "RDW",
    aliases: ["RDW", "RDW-CV"],
    min: 11.5,
    max: 14.5,
    unit: "%",
  },

  {
    name: "Neutrophils",
    aliases: ["Neutrophils", "Neut", "NEU"],
    min: 40,
    max: 70,
    unit: "%",
  },

  {
    name: "Lymphocytes",
    aliases: ["Lymphocytes", "Lymph", "LYM"],
    min: 20,
    max: 40,
    unit: "%",
  },

  {
    name: "Monocytes",
    aliases: ["Monocytes", "MONO"],
    min: 2,
    max: 8,
    unit: "%",
  },

  {
    name: "Eosinophils",
    aliases: ["Eosinophils", "EOS"],
    min: 1,
    max: 4,
    unit: "%",
  },

  {
    name: "Basophils",
    aliases: ["Basophils", "BASO"],
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

  if (value < min) {
    return "Low";
  }

  if (value > max) {
    return "High";
  }

  return "Normal";
}
