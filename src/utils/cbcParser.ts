import {
  referenceRanges,
  getStatus,
} from "./referenceRange";

export interface CBCValue {
  name: string;
  value: number;
  status: "Normal" | "High" | "Low" | "Unknown";
}

export function parseCBC(text: string): CBCValue[] {
  const results: CBCValue[] = [];

  referenceRanges.forEach((item) => {
    const regex = new RegExp(
      `${item.name}\\s*[:\\-]?\\s*([0-9]+(?:\\.[0-9]+)?)`,
      "i"
    );

    const match = text.match(regex);

    if (match) {
      const value = Number(match[1]);

      results.push({
        name: item.name,
        value,
        status: getStatus(value, item.min, item.max),
      });
    }
  });

  return results;
}
