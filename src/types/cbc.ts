export interface CBCResult {
  name: string;
  value: number | string;
  unit: string;
  normalMin: number;
  normalMax: number;
  status: "Normal" | "High" | "Low" | "Unknown";
}

export interface CBCAnalysis {
  patientName?: string;
  labName?: string;
  reportDate?: string;
  results: CBCResult[];
}
